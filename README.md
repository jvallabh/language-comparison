# Language Showdown: Java vs Go vs Python

An interactive web page comparing three popular backend programming languages: **Java**, **Go (Golang)**, and **Python**.

## Features

**Exploration**
- **Language Cards** — click "Explore" to open a modal with pros, cons, use cases, and code examples
- **Tabbed Modals** — Overview and Code Examples tabs per language
- **Code Categories** — HTTP Server, File I/O, Concurrency, Error Handling, JSON Parsing

**Comparison**
- **Head-to-Head Table** — performance, concurrency, memory, typing, deployment, and learning curve with real benchmark numbers (TechEmpower, startup times, idle RSS)
- **Side-by-Side Code Comparison** — pick a topic to see all three implementations at once
- **"When to Choose" Quiz** — 3-question decision helper that recommends the best language for your use case

**Usability**
- **Light/Dark Mode** — toggle button respects `prefers-color-scheme` on first visit and persists via `localStorage`
- **Syntax Highlighting** — highlight.js with atom-one-dark theme across all code blocks
- **Copy to Clipboard** — SVG clipboard icon on every code block, swaps to a checkmark on success
- **Keyboard Navigation** — arrow keys navigate topic and category button groups (roving tabindex)
- **Smooth Animations** — modal fades/slides in on open and out on close
- **Mobile Scroll** — comparison grid scrolls horizontally on small screens, one column per swipe
- **Styled Scrollbars** — thin 4px scrollbar on code blocks matching the dark aesthetic

## How to Run

No build process or server required — it's a static page.

```bash
open index.html
```

Or just double-click `index.html` in Finder.

## Stack

- **HTML5** / **CSS3** / **JavaScript (ES6+)** — no frameworks
- **highlight.js 11.9** (CDN) — syntax highlighting
- **Google Fonts** — Outfit typeface
