import CharacterList from "@/components/CharacterList";

export const metadata = { title: "Figuren · Karamasow-Begleiter" };

export default function FigurenPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Figuren</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Nur das, was du bis jetzt gelesen hast.</p>
      <CharacterList />
    </>
  );
}
