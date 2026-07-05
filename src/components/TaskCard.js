// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: One row in the task list. Shows the title, a toggle
// button to mark it done/active, and a delete button. It
// doesn't change any task data directly — it just calls the
// callback props and lets TaskBoard do that.
// TYPE: Client Component — needs onClick for the toggle and
// delete buttons.
// PROPS:
//   id — the task's unique id (made with crypto.randomUUID()
//        back in TaskBoard when the task was created)
//   title — the task text
//   done — true if the task is complete
//   onToggle — called with id when the toggle is clicked.
//        TaskBoard owns this and flips done for the matching task.
//   onDelete — called with id when delete is clicked.
//        TaskBoard owns this and removes the matching task.
// ══════════════════════════════════════════════════════
"use client";

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  // CONDITIONAL RENDER (styling): a done task gets a
  // strikethrough and lighter color so it visually stands out
  // as finished. Just based on the done prop, no local state.
  const titleClass = done ? "line-through text-ink-soft/60" : "text-ink";

  return (
    <li className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface border-2 border-border">
      {/* The toggle button. aria-pressed tells screen readers
          it's a toggle, since this is a styled button and not
          a real checkbox. */}
      <button
        type="button"
        aria-pressed={done}
        aria-label={done ? "Mark as active" : "Mark as done"}
        onClick={() => onToggle(id)}
        className={
          "shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm " +
          (done ? "border-done bg-done text-white" : "border-border text-transparent hover:border-open")
        }
      >
        ✓
      </button>

      <span className={`flex-1 text-sm font-medium ${titleClass}`}>{title}</span>

      {/* CONDITIONAL RENDER: the "Done" label only shows for
          finished tasks — one more visual cue alongside the
          strikethrough and toggle color. */}
      {done && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-done bg-done/10 rounded-full px-3 py-1">
          Done
        </span>
      )}

      <button
        type="button"
        aria-label="Delete task"
        onClick={() => onDelete(id)}
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:text-white hover:bg-danger transition-colors text-sm"
      >
        ✕
      </button>
    </li>
  );
}
