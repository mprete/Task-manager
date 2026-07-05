// ══════════════════════════════════════════════════════
// COMPONENT: Home (page.js)
// PURPOSE: The homepage. Renders the page title/intro text and
// mounts TaskBoard, which is where all the actual task logic
// lives. This file itself doesn't hold any state.
// TYPE: Server Component (no 'use client'). It doesn't use
// useState or useEffect, so it can stay on the server. Per the
// assignment, page.js should just render — no logic here.
// PROPS: none — this is the route root, Next.js renders it for "/"
// ══════════════════════════════════════════════════════
import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="font-bold text-4xl sm:text-5xl text-ink tracking-tight">
            Task Manager
          </h1>
          <p className="mt-3 text-ink-soft text-base max-w-prose">
            Add what you need to get done, check it off when it&apos;s
            finished, and clear the list when you&apos;re ready.
          </p>
        </header>

        {/* TaskBoard owns all the task state and logic. This
            page just places it on the screen. */}
        <TaskBoard />

        <footer className="mt-10 text-center">
          <p className="text-xs text-ink-soft">
            Saved locally in this browser — nothing here is sent anywhere
          </p>
        </footer>
      </div>
    </main>
  );
}
