// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard 
//  Owns all the task data and the current filter. This
// is the only component that ever changes the tasks array —
// every other component either receives data as props or sends
// events back up here through callback props.
// TYPE: Client Component — it needs useState and useEffect,
// which only work in the browser, not on the server.
// PROPS: none — mounted directly by page.js.
// ══════════════════════════════════════════════════════
"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";
import TaskStats from "./TaskStats";
import TaskList from "./TaskList";

export default function TaskBoard() {
  // STATE: tasks
  // Starting this as an empty array (not reading localStorage
  // yet) is what fixes the hydration error. If I read
  // localStorage directly in useState, the server renders an
  // empty list (there's no localStorage on the server) but the
  // browser would immediately render whatever was saved — two
  // different results for the very first render, which is
  // exactly what "hydration mismatch" means. Starting both the
  // same way (empty) and loading the real data afterward, in an
  // effect, avoids that.
  const [tasks, setTasks] = useState([]);

  // STATE: hasLoaded
  // Tracks whether the one-time localStorage read (below) has
  // finished. I need this so the "save to localStorage" effect
  // doesn't run before the load has happened — otherwise it
  // would immediately overwrite the saved data with an empty
  // array on the very first render.
  const [hasLoaded, setHasLoaded] = useState(false);

  // STATE: filter
  // This is separate from tasks because it changes independently
  // — clicking a filter button doesn't touch the task data.
  const [filter, setFilter] = useState("all");

  // EFFECT: load tasks from localStorage, once
  // Effects only run in the browser, after the page has already
  // rendered once — never on the server — so this is a safe
  // place to touch localStorage without needing a typeof window
  // check. The empty dependency array [] means this only runs a
  // single time, right after the component first mounts.
  useEffect(() => {
    const saved = window.localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setHasLoaded(true);
  }, []);

  // EFFECT: save tasks to localStorage
  // useEffect is for syncing with things outside React, and
  // localStorage is exactly that. The [tasks, hasLoaded]
  // dependency array means this runs again whenever tasks
  // changes. The hasLoaded check inside skips the very first
  // run (when tasks is still just the initial empty array and
  // the real saved data hasn't been loaded in yet) so it doesn't
  // save over the real data before that load finishes.
  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

  // DERIVED VALUES — not stored in state
  // These are just calculated from tasks every time the
  // component renders. I don't store them as their own state
  // because they can always be recalculated from tasks, and
  // storing them separately could let them get out of sync
  // with the real data (e.g. forgetting to update a count when
  // a task is deleted).
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const active = total - completed;

  const visible =
    filter === "active"
      ? tasks.filter((t) => !t.done)
      : filter === "done"
        ? tasks.filter((t) => t.done)
        : tasks; // filter === "all"

  // HANDLERS — passed down to children as callback props.
  // Children don't have access to setTasks directly. They call
  // these functions instead, which keeps TaskBoard as the only
  // place that actually changes the task list.

  // Passed to AddTaskForm as onAdd.
  function handleAdd(title) {
    // Using spread (...tasks) instead of tasks.push() makes a
    // brand new array. React only re-renders when it sees a new
    // array reference, so pushing onto the existing array
    // wouldn't trigger a re-render.
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  }

  // Passed down to TaskList, then to each TaskCard, as onToggle.
  function handleToggle(id) {
    // .map() returns a new array, which is why React notices the
    // change. Directly setting task.done = !task.done would edit
    // the same array in memory and React wouldn't re-render.
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  // Passed down to TaskList, then to each TaskCard, as onDelete.
  function handleDelete(id) {
    // Same idea — .filter() returns a new array without the
    // deleted task instead of mutating the existing one.
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // Passed to TaskStats as onClearCompleted.
  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    // Two columns on larger screens: the form/stats/filters sit
    // on the left and stay in place, while the task list sits on
    // the right and grows downward as tasks are added. On small
    // screens (phones) it just stacks into one column instead,
    // since there isn't room for two side by side.
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* LEFT COLUMN: everything except the list itself */}
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-6">
        <AddTaskForm onAdd={handleAdd} />

        <TaskStats
          total={total}
          active={active}
          completed={completed}
          onClearCompleted={handleClearCompleted}
        />

        <FilterBar filter={filter} onFilterChange={setFilter} />
      </div>

      {/* RIGHT COLUMN: the task list. flex-1 lets it take up the
          remaining width, and it naturally grows taller as more
          tasks get added since each TaskCard just stacks below
          the last one. */}
      <div className="w-full flex-1">
        <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
}
