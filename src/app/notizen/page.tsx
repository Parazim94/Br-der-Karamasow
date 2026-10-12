import NotesView from "@/components/NotesView";

export const metadata = { title: "Notizen · Karamasow-Begleiter" };

export default function NotizenPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Notizen</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Gedanken und Zitate, jeweils mit deinem Lesestand.</p>
      <NotesView />
    </>
  );
}
