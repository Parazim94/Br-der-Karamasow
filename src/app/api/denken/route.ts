import { timingSafeEqual } from "node:crypto";
import { TOTAL_CHAPTERS } from "@/lib/book";
import { buildSystemPrompt, type Mode } from "@/lib/philosophy";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";
const MAX_TURNS = 12;
const MAX_CHARS = 1500;
const PER_IP_PER_HOUR = 40;
const GLOBAL_PER_DAY = 300;

// Einfache Begrenzung im Speicher der Instanz. Auf Serverless ist sie nur ein Grobschutz,
// nicht lückenlos. Das eigentliche Kontingent begrenzt Google.
const ipHits = new Map<string, { count: number; resetAt: number }>();
let day = { count: 0, resetAt: Date.now() + 86_400_000 };

type Msg = { role: "user" | "assistant"; text: string };

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function samePass(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

function allowed(ip: string): boolean {
  const now = Date.now();
  if (now > day.resetAt) day = { count: 0, resetAt: now + 86_400_000 };
  if (day.count >= GLOBAL_PER_DAY) return false;
  const hit = ipHits.get(ip);
  if (!hit || now > hit.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + 3_600_000 });
  } else if (hit.count >= PER_IP_PER_HOUR) {
    return false;
  } else {
    hit.count++;
  }
  day.count++;
  return true;
}

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  const secret = process.env.PHILO_PASSPHRASE;
  if (!key || !secret) {
    return json({ error: "Die KI ist noch nicht eingerichtet." }, 503);
  }

  if (!samePass(request.headers.get("x-passphrase") ?? "", secret)) {
    return json({ error: "Falsches Passwort." }, 401);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!allowed(ip)) {
    return json({ error: "Für heute ist das Limit erreicht. Versuch es später wieder." }, 429);
  }

  let body: { messages?: unknown; mode?: unknown; progress?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Ungültige Anfrage." }, 400);
  }

  const mode: Mode = body.mode === "advocatus" ? "advocatus" : "sokrates";
  const progress = Math.min(Math.max(Math.round(Number(body.progress) || 0), 0), TOTAL_CHAPTERS);
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m): m is Msg =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string" && m.text.trim() !== "",
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json({ error: "Keine Nachricht." }, 400);
  }

  let res: Response;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(mode, progress) }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        })),
        generationConfig: { temperature: 0.8, maxOutputTokens: 700 },
      }),
      signal: AbortSignal.timeout(25_000),
    });
  } catch {
    return json({ error: "Die KI antwortet gerade nicht. Versuch es gleich nochmal." }, 504);
  }

  if (!res.ok) {
    if (res.status === 429) return json({ error: "Das Gratis-Kontingent ist gerade aufgebraucht. Versuch es später nochmal." }, 429);
    return json({ error: "Die KI hat einen Fehler gemeldet." }, 502);
  }

  const data = await res.json();
  const parts: { text?: string }[] = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p) => p.text ?? "").join("").trim();
  if (!text) return json({ error: "Die KI hat nichts geantwortet. Formuliere es anders." }, 502);

  return json({ text });
}
