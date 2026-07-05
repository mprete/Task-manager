// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Renders the list of tasks it's given, or a "nothing
// here" message if the list is empty. TaskBoard already
// filtered the tasks before handing them to this component, so
// TaskList doesn't do any filtering of its own.
// TYPE: No 'use client' here. This file is only ever imported
// by TaskBoard, which already has 'use client' at the top of
// its file — once that boundary exists, everything it imports
// and renders is automatically part of the same client bundle.
// Adding 'use client' again here wouldn't be wrong, just extra.
// PROPS:
//   tasks — the already-filtered array of tasks to show
//   onToggle — passed straight through to each TaskCard
//   onDelete — passed straight through to each TaskCard
// ══════════════════════════════════════════════════════
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  // CONDITIONAL RENDER (early return): if there's nothing to
  // show — either no tasks exist yet, or none match the current
  // filter — show a message instead of an empty list.
  if (tasks.length === 0) {
    return (
      <p className="font-semibold text-ink-soft text-center py-12">
        Nothing here yet — add a task above to get started.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {/* .map() turns the tasks array into a TaskCard for each
          one. key={task.id} uses the task's own id instead of
          the array index, because using the index would cause
          React to mix up which row is which once tasks get
          deleted or reordered. */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
