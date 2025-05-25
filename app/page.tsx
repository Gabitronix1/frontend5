import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">The Orphan AI Agent</h1>
      <Chat />
    </main>
  );
}