import ThinkView from "@/components/ThinkView";

export const metadata = { title: "Philosophieren · Karamasow-Begleiter" };

export default function DenkenPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Philosophieren</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Denk laut mit einer KI, die dir nichts verrät.</p>
      <ThinkView />
    </>
  );
}
