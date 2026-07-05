// ══════════════════════════════════════════════════════
// COMPONENT: FilterBar
// PURPOSE: Three buttons — All / Active / Done — that let the
// user narrow down which tasks TaskList shows.
// TYPE: Client Component — the buttons need onClick handlers.
// PROPS:
//   filter — the currently selected filter ("all" | "active" |
//            "done"), owned by TaskBoard. Used here just to
//            highlight the selected button.
//   onFilterChange — TaskBoard's setFilter function, passed
//            straight through. FilterBar doesn't keep its own
//            copy of the filter — TaskBoard is the single
//            source of truth for it.
// ══════════════════════════════════════════════════════
"use client";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export default function FilterBar({ filter, onFilterChange }) {
  return (
    <div role="tablist" aria-label="Filter tasks" className="flex gap-2 flex-wrap">
      {FILTERS.map(({ value, label }) => {
        // CONDITIONAL RENDER (styling): the selected button gets
        // a solid blue fill — the same color every time, so all
        // three buttons look like one consistent set instead of
        // each picking its own color. Every other button stays
        // outlined. The condition is just whether this button's
        // value matches the current filter.
        const isActive = filter === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(value)}
            className={
              "font-semibold text-sm px-5 py-2 rounded-full border-2 transition-colors " +
              (isActive
                ? "bg-open text-white border-transparent"
                : "bg-surface border-border text-ink-soft hover:border-open")
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
