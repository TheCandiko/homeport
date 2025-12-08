import HomeportLogo from '@/app/components/HomeportLogo';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 p-8 font-sans">
      <header className="mx-auto flex w-full max-w-4xl justify-between">
        <HomeportLogo />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <WeeklyHighlight />
      </main>
    </div>
  );
}
