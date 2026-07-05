// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: Shows the total/active/done counts as one simple
// line of text, and holds the "Clear completed" button. It
// doesn't calculate anything itself — it just displays numbers
// that TaskBoard already calculated and passed down.
// TYPE: Client Component — the clear button needs onClick.
// PROPS:
//   total — total number of tasks
//   active — number of tasks that aren't done
//   completed — number of tasks that are done
//   onClearCompleted — TaskBoard's function for removing all
//     done tasks at once. TaskStats can't do this itself since
//     it doesn't have the actual task data, only the counts.
// ══════════════════════════════════════════════════════
"use client";

export default function TaskStats({ total, active, completed, onClearCompleted }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-ink-soft">
        <span className="font-semibold text-ink">{total}</span> total &middot;{" "}
        <span className="font-semibold text-ink">{active}</span> active &middot;{" "}
        <span className="font-semibold text-ink">{completed}</span> done
      </p>

      {/* CONDITIONAL RENDER: only show the clear button once
          there's at least one done task to clear. No point
          showing a button that has nothing to do. */}
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="self-start text-sm font-semibold text-danger hover:underline underline-offset-4"
        >
          Clear {completed} done
        </button>
      )}
    </div>
  );
}
