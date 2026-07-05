# Task Manager

A task manager built for ISM 3232 Module 10, following the concepts from
the Module 10 workshop but written on my own.

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Features

- **Add tasks** — controlled form in `AddTaskForm.js`. Rejects blank or whitespace-only submissions.
- **Toggle done** — a round button on each row (`TaskCard.js`) marks a task Active or Done. 
- **Delete tasks** — the ✕ button on each row removes that task.
- **Filter view** — All / Active / Done buttons (`FilterBar.js`) show only the matching tasks.
- **Stats bar** — live Total / Active / Done counts (`TaskStats.js`), recalculated from the task list every time it changes, not stored separately.
- **Clear completed** — a "Clear N done" button that only shows up once at least one task is marked done.
- **Persist on refresh** — tasks are saved to `localStorage` any time they change, and loaded back in when the page opens.

## Design decisions

I went with a simple blue color theme and a two-column layout to try and have the tasks as the main point/big picture.

- **Colors**: a light blue background with dark navy text, blue for active tasks/buttons, sky blue for done tasks, and red for delete/clear actions.
- **Layout**: the add-task form, stats, and filter buttons sit in a column on the left. The task list sits on the right and grows downward as more tasks are added. On small screens it stacks into a single column instead.
- **Font**: just one font (Inter) used everywhere.
- **Shapes**: rounded pill buttons and rounded task cards.

## AI Usage Log

- **Asked for**: help making sure my code comments were clear and made sense. **Got**: comment text explaining the why behind different parts of the code. **What I changed/learned**: I actually read through every comment and made sure I understood it and could explain it before keeping it, instead of just pasting it in and moving on. 

- **Asked for**: help figuring out a "Hydration failed" error that popped up after I added localStorage. **Got**: an explanation that the server and the browser were rendering different things on the very first load, which is why it broke. **What I changed/learned**: honestly this one confused me for a while, but I get it now, the app has to start the same way on both the server and the browser, then load the real saved data right after. That's why there's a quick flash before my tasks show up.

- **Asked for**: why some of my files don't need `'use client'` at the top even though the file that uses them does. **Got**: an explanation that once one file says `'use client'`, everything under it counts as client-side too, so it's not actually required everywhere. **What I changed/learned**: this was the hardest thing for me to wrap my head around in this whole project. I had to have it explained more than once before it clicked.

- **Asked for**: some color palette ideas since my first design felt too busy. **Got**: a couple different options (a bold colorful one and a simpler blue one) with actual hex codes. **What I changed/learned**: I went with the blue one because it was way easier for me to explain and felt less cluttered.

- **Asked for**: help figuring out why my browser kept showing the old version of my app even after I changed my code. **Got**: turns out I was running the dev server from an old folder, and my browser was also just caching the old page. **What I changed/learned**: now I always double check which folder my terminal is actually sitting in, and I hard refresh (Ctrl+Shift+R) whenever I test something new.

- **Asked for**: help moving my layout around so the add-task form and stats stay on the left and the task list grows on the right. **Got**: an updated layout using flexbox. **What I changed/learned**: none of my actual state or logic had to change for this, it was purely a styling/layout change, which helped me realize how separate those two things really are in this code.
