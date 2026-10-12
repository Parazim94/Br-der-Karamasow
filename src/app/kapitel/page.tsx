import ChapterList from "@/components/ChapterList";

export const metadata = { title: "Kapitel · Karamasow-Begleiter" };

export default function KapitelPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Kapitel</h1>
      <p className="mb-6 mt-1 text-sm text-muted">
        Tippe auf das Kapitel, das du zuletzt gelesen hast. Alles davor gilt als gelesen. Ein erneuter Tipp auf das
        aktuelle Kapitel macht es rückgängig.
      </p>
      <ChapterList />
    </>
  );
}
