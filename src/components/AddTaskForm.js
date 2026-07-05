// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: A form where the user types a new task and submits
// it. It keeps track of what's being typed, but doesn't touch
// the actual task list — it just hands the finished title up
// to TaskBoard through the onAdd callback.
// PATTERN: Controlled component — the input's value always
// comes from state, not from the DOM.
// TYPE: Client Component — needs useState and an onSubmit handler.
// PROPS:
//   onAdd — function from TaskBoard, called with the new task's
//           title once the form is submitted. TaskBoard is the
//           only component that's allowed to add to the task list.
// ══════════════════════════════════════════════════════
"use client";

import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  // STATE: title
  // Only this component needs to know what's currently being
  // typed. TaskBoard doesn't need that until the form is
  // actually submitted, so it stays local instead of being
  // lifted up.
  const [title, setTitle] = useState("");

  // STATE: error
  // Controls whether the "can't be blank" message shows up.
  // This is just UI feedback, not real task data, so it lives
  // here instead of in TaskBoard.
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    // Forms reload the page by default when submitted.
    // e.preventDefault() stops that so I can handle the
    // submission with JavaScript instead.
    e.preventDefault();

    const trimmed = title.trim();

    // Reject blank or whitespace-only titles.
    if (!trimmed) {
      setError(true);
      return;
    }

    onAdd(trimmed); // send the new title up to TaskBoard
    setTitle(""); // clear the input for the next task
    setError(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
    >
      <div className="flex-1 w-full">
        {/* Controlled input: value always comes from the title
            state, and onChange updates that state on every
            keystroke so the two stay in sync. */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(false); // clear the warning once they start typing again
          }}
          placeholder="What needs doing?"
          aria-label="New task title"
          className="w-full bg-surface border-2 border-border focus:border-open focus:outline-none focus:ring-4 focus:ring-open/20 rounded-full px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors"
        />
        {/* Only shows up right after a blank submit attempt. */}
        {error && (
          <p className="mt-2 ml-2 text-xs text-danger font-semibold">
            Don&apos;t leave it blank — give it a quick title first!
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto shrink-0 bg-open text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
      >
        Add task
      </button>
    </form>
  );
}
