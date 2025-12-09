import Header from '@/app/components/Header';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 p-8 font-sans">
      <div className="mx-auto w-full max-w-4xl">
        <Header />
      </div>
      <main className="flex flex-1 items-center justify-center">
        <WeeklyHighlight />
      </main>
    </div>
  );
}
