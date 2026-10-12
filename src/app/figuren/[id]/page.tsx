import CharacterView from "@/components/CharacterView";
import { CHARACTERS } from "@/lib/characters";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ id: c.id }));
}

export default async function FigurPage({ params }: PageProps<"/figuren/[id]">) {
  const { id } = await params;
  return <CharacterView id={id} />;
}
