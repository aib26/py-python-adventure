# Py's Python Adventure

A browser-based Python tutorial spanning **ages 7 through high school**. Thirty-two short lessons across three age bands — Beginner (7–10), Intermediate (10–14), and a Stanford CS231n-inspired High School track — with a friendly mascot named Py, content guardrails, anonymous nickname+avatar profiles, a local leaderboard, XP/gems/badges, recap quizzes, screen-break reminders, a light/dark theme toggle, and a parent dashboard.

## For parents and teachers

### Start the site

From this folder, run either:

```bash
python3 -m http.server 8000
```

Or, if Python isn't available yet on your Mac:

```bash
ruby -run -e httpd . -p 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

**Parent Dashboard:** [http://localhost:8000/parent.html](http://localhost:8000/parent.html)

> **Why a server?** The tutorial loads Python-in-the-browser (Skulpt) and fonts from the internet. Opening `index.html` directly from the desktop usually won't work — a simple local server fixes that.

### Parent notifications

1. Open the **Parent Dashboard** on the same computer.
2. Click **Enable notifications** and allow browser alerts.
3. When your child taps **Ask Parent for Help** on a lesson, you'll get a notification and see the request on the dashboard.

> Notifications work on the same device/browser where the parent enabled them. For cross-device alerts, you'd need a hosted backend (not included in this local version).

### Kid safety features

- **Content guardrails** filter unkind words in code, chat, and output.
- **Py** (the in-lesson assistant) gives lesson-aware hints without giving full answers.
- **Ask Parent** button sends a help request when kids are stuck.
- **Screen breaks** — every 2 lessons, a short mandatory pause prompts an eye-rest or movement break (look out a window, jumping jacks, stretches, etc.) before continuing.

### What kids earn

- **XP** for lessons, daily visits, and recap quizzes
- **Gems** as they level up
- **Badges** for milestones (first lesson, 5 lessons, streaks, etc.)
- **Stars** for completing each lesson after code + recap + rating

### Look & feel

- Light/dark theme toggle (🌙/☀️ button in the header) — respects system preference by default, remembers your choice
- Modern flat design with a custom gradient mascot logo (`assets/mascot.svg`)

## Lessons

**🌱 Explorer — Ages 7–10** *(ids 1–20)*

Starts with the slowest possible on-ramp (ids 1–5: one tiny idea per lesson, extra repetition, 2 jokes and 2 logic-quiz questions per lesson instead of 1), then moves into core fundamentals (ids 6–20).

1. What is Python? — the very first `print()`
2. Say Hi Twice — two `print()` lines, slowly
3. Your Very First Box — one single variable
4. Yes or No — the simplest possible `if`/`else`
5. Do It 3 Times — the simplest possible `for` loop
6. Meet Python — first `print()`
7. More print() Lines — multiple prints
8. Variables — memory boxes
9. Math in Python — numbers
10. Change Variables — reassigning (mad-libs style)
11. if and else — decisions
12. Loops — `for` loops with `range()`
13. Lists — lists and indexing
14. Loop a List — `for item in list`
15. Turtle Square — `import turtle`
16. Turtle Turns — left/right turns
17. Turtle Zigzag — forward/backward
18. Turtle Jump — penup/pendown
19. Guess the Number — `random`, `if`, and loops
20. Your Project — capstone project

**🧭 Adventurer — Ages 10–14** *(ids 21–25)*

21. Functions — `def`, parameters, `return`
22. Dictionaries — key/value pairs
23. While Loops — repeat until a condition changes
24. Nested Loops — loops inside loops (grids & patterns)
25. Try/Except — catching errors gracefully

**🎓 Trailblazer — High School** *(ids 26–32, inspired by [Stanford CS231n's Python tutorial](https://cs231n.github.io/python-numpy-tutorial/))*

Covers the parts of CS231n's Python primer that run as real Python: comprehensions, slicing, tuples/sets, dictionary methods, default/keyword arguments, and classes. Skulpt (the in-browser interpreter) can't run NumPy/SciPy/Matplotlib, so instead of broken exercises, lesson 32 teaches the *concept* of vectorization with a runnable pure-Python analogy and points students to Google Colab or a local Python install to try real NumPy.

26. List Comprehensions — building a list in one line
27. Slicing Lists — `list[start:stop]`, negative indices, reversing
28. Tuples & Sets — immutable pairs and automatic de-duplication
29. Dictionaries, Leveled Up — `.items()`, `.get()`
30. Functions: Defaults & Extra Args — default parameter values
31. Classes — Build Your Own Objects — `__init__`, `self`, methods
32. Beyond Python: NumPy & Data Science — vectorization concept + where to go next

## Project structure

```text
kids-python-tutorial/
├── index.html          # Lesson map + XP/badges
├── lesson.html         # Lesson viewer + Py assistant + help button
├── parent.html         # Parent dashboard
├── leaderboard.html    # Local device leaderboard
├── css/styles.css
├── js/
│   ├── lessons.js       # Lesson content (all 4 tiers)
│   ├── recaps.js        # Recap quiz questions
│   ├── logic-quizzes.js # Logic quiz questions
│   ├── jokes.js         # Joke breaks
│   ├── fun-facts.js     # Fun facts
│   ├── practice-examples.js # Practice snippets
│   ├── unstuck.js       # Step-by-step unstuck guides
│   ├── screen-breaks.js # Eye-rest / movement break prompts
│   ├── guardrails.js    # Kid-friendly word filter
│   ├── store.js         # Anonymous profiles, XP, badges, ratings, help requests
│   ├── coach.js         # Py assistant (in-lesson chat helper)
│   ├── ui.js            # Modals (recap, rating, help, profile setup/switch, screen break)
│   ├── theme.js          # Light/dark theme toggle
│   ├── leaderboard.js   # Local leaderboard ranking
│   ├── parent.js        # Parent dashboard logic
│   ├── runner.js        # Skulpt code runner
│   ├── checker.js       # Exercise validation
│   └── app.js           # Main app logic
└── assets/mascot.svg    # Py's logo/mascot (gradient coiled-snake mark)
```

## Anonymous profiles & leaderboard

Kids never enter a real name. On first visit they pick a nickname and an animal avatar (koala, otter, hedgehog, etc). Multiple kids can share one device — each gets their own profile, switchable from the player chip in the header or the Parent Dashboard. The **Leaderboard** (`leaderboard.html`) ranks local profiles on this device by XP, alongside a few clearly-labeled "Py's pal" sample entries so it doesn't feel empty on a fresh install. There is no server — nothing leaves the device.

## Screen breaks

After finishing every even-numbered lesson, a short modal pops up with a randomly chosen eye-rest prompt (look out a window, focus on something far away, slow blinks) or movement prompt (jumping jacks, stretches, wrist rolls). The "back to coding" button stays disabled for ~12-15 seconds to encourage an actual pause. See `js/screen-breaks.js` for the full prompt bank and `LessonUI.showScreenBreak` in `js/ui.js` for the modal.

## Adding a new lesson

1. Add a lesson object to `js/lessons.js` (copy an existing one as a template).
2. Set `id`, `title`, `story`, `starterCode`, `challenge`, and `checks`.
3. Add matching entries to `recaps.js` (required — the recap quiz modal doesn't gracefully handle a missing entry), plus `logic-quizzes.js`, `jokes.js`, `fun-facts.js`, `practice-examples.js`, and `unstuck.js` for the same lesson id (these degrade gracefully if omitted, but are worth adding for a consistent experience).
4. Reload the browser — the home page picks it up automatically.

## Manual smoke test

- [ ] First visit prompts for a nickname + avatar before showing the lesson map
- [ ] Home page shows 32 lessons across 3 labeled age bands; only Lesson 1 is unlocked
- [ ] Run prints output for `print("Hello!")`
- [ ] Completing Lesson 1 awards a star and unlocks Lesson 2
- [ ] Completing lesson 2 triggers a screen-break modal with a working countdown
- [ ] Level 1 (ids 1-5) and Intermediate (ids 21-25) lessons show 2 jokes and 2 logic-quiz questions in a row
- [ ] Turtle lesson (Beginner tier) draws on the canvas
- [ ] A High School lesson (ids 26-32) runs correctly (classes, comprehensions, slicing, etc all work in Skulpt)
- [ ] Dark mode toggle (🌙 button) switches theme and persists across reloads
- [ ] Progress survives a page refresh
- [ ] Leaderboard shows your profile ranked among the sample entries
- [ ] Parent Dashboard can add a second player and switch between them
- [ ] An existing (pre-update) profile's progress migrates: old lesson ids shift +5 automatically the first time it loads
- [ ] Reset progress clears stars

## Tech

- Static HTML, CSS, and JavaScript (no build step)
- [Skulpt](https://skulpt.org/) for running Python in the browser — vendored locally in `js/vendor/skulpt/` so the app works fully offline (no CDN dependency)
- Progress saved in `localStorage`, one profile per player, all on-device — no server, no accounts

## iOS App Store wrapper (Capacitor)

This project can be wrapped as a native iOS app with [Capacitor](https://capacitorjs.com/) — see [`SETUP_IOS.md`](SETUP_IOS.md) for the full step-by-step guide. `package.json`, `capacitor.config.json`, `.capacitorignore`, and a starter `resources/icon.png` are already in place; you'll need Node.js and the full Xcode app installed to generate and build the native project.
