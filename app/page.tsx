import Feedback from "./components/Feedback";

export default function Home() {
  return (
    <>
      <Feedback />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
          <div className="w-full max-w-5xl text-center">
            <h1 className="text-4xl font-semibold mb-4 text-black dark:text-zinc-50">
              Canny Feedback Widget Demo
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Click the floating feedback button in the bottom-right corner! 👉
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
