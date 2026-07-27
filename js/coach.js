const CoachPy = (() => {
  const CONCEPTS = {
    print: {
      match: ["print", "printing", "show text", "show words", "display"],
      answer:
        "print() shows text on the screen. Words go in quotes: print(\"Hi\"). Numbers can skip quotes: print(42).",
    },
    variable: {
      match: ["variable", "variables", "store", "save", "memory", "equals sign"],
      answer:
        "A variable is a name for a value. name = \"Alex\" saves your name. print(name) shows what's saved — no quotes on the variable name!",
    },
    loop: {
      match: ["loop", "loops", "repeat", "range", "for loop"],
      answer:
        "A for loop repeats code. for i in range(5): runs 5 times. Lines under for: must be indented (scooted right).",
    },
    list: {
      match: ["list", "lists", "bracket", "index", "[0]", "shopping list"],
      answer:
        "A list holds items in order: [\"a\", \"b\", \"c\"]. The first item is [0], second is [1] — computers start at 0!",
    },
    if: {
      match: ["if else", "if/else", "true", "false", "condition", "decision"],
      answer:
        "if checks True or False. True runs the if block. False runs else. Don't forget the colon : at the end of the if line!",
    },
    turtle: {
      match: ["turtle", "forward", "backward", "left", "right", "penup", "pendown", "draw", "canvas"],
      answer:
        "Turtle draws as it moves. forward() walks, left()/right() turn. penup() lifts the pen to jump without drawing. Check the canvas below!",
    },
    random: {
      match: ["random", "dice", "secret number", "randint"],
      answer:
        "random.randint(1, 10) picks a surprise number from 1 to 10. Run your code a few times — the answer changes each time!",
    },
    math: {
      match: ["math", "add", "subtract", "multiply", "divide", "plus", "minus"],
      answer: "Python does math with + - * /. Example: print(10 + 5) shows 15.",
    },
    indent: {
      match: ["indent", "indentation", "scoot", "tab", "spaces under"],
      answer:
        "Lines under for: or if: must be scooted to the RIGHT (press Tab). They should not line up with the for/if line.",
    },
    quotes: {
      match: ["quote", "quotes", "apostrophe", "string"],
      answer: 'Words need matching quotes: "like this" or \'like this\'. Every opening quote needs a closing one.',
    },
    colon: {
      match: ["colon"],
      answer: "for and if lines end with a colon : — like for i in range(5): or if ready:",
    },
    output: {
      match: ["output", "output box", "nothing printed", "blank output"],
      answer:
        "Press ▶ Run to fill the Output box. For turtle lessons, also check the canvas below — empty Output can be OK if you see a drawing!",
    },
    function: {
      match: ["function", "functions", "def", "parameter", "parameters", "return", "call a function"],
      answer:
        "def name(parameter): starts a function — a reusable block of code. Lines under it are indented. Call it later with name(value). return sends a value back so you can use it, like answer = add(2, 3).",
    },
    dictionary: {
      match: ["dictionary", "dictionaries", "dict", "key", "value pair", "key value", "curly braces"],
      answer:
        'A dictionary stores key → value pairs in curly braces: pet = {"name": "Rex", "age": 3}. Use the key in brackets to get the value: pet["name"] shows Rex.',
    },
    while: {
      match: ["while", "while loop", "keep going", "until"],
      answer:
        "A while loop repeats AS LONG AS its condition is True: while count < 5: keeps going until count reaches 5. Make sure something inside the loop changes the condition, or it repeats forever!",
    },
    nested: {
      match: ["nested loop", "nested", "loop inside a loop", "double loop", "grid", "pattern"],
      answer:
        "A nested loop is a loop inside another loop. The inner loop finishes all its trips for every single trip of the outer loop — great for grids and patterns!",
    },
    tryexcept: {
      match: ["try", "except", "error handling", "catch an error", "try except"],
      answer:
        "try: lets Python attempt risky code. If it fails, except: catches the error instead of crashing, so you can print a friendly message instead.",
    },
  };

  function stripHtml(text) {
    return String(text || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s'?]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(text, phrases) {
    return phrases.some((phrase) => text.includes(phrase));
  }

  function formatSteps(steps) {
    if (!steps?.length) return "";
    return steps.map((step, i) => `${i + 1}. ${step}`).join("\n");
  }

  function lessonLabel(lesson) {
    return `Lesson ${lesson.id}: ${lesson.title}`;
  }

  function matchConcept(message) {
    const lower = normalize(message);
    for (const concept of Object.values(CONCEPTS)) {
      if (includesAny(lower, concept.match)) {
        return concept;
      }
    }
    return null;
  }

  function codeIssues(code, lesson) {
    const source = code || "";
    const issues = [];

    if (!source.trim()) {
      issues.push("Your editor looks empty. Use the starter code or tap an Example on the right.");
      return issues;
    }

    const doubleQuotes = (source.match(/"/g) || []).length;
    const singleQuotes = (source.match(/'/g) || []).length;
    if (doubleQuotes % 2 !== 0) {
      issues.push('A double quote " might be missing — check they come in pairs.');
    }
    if (singleQuotes % 2 !== 0) {
      issues.push("A single quote ' might be missing — check they come in pairs.");
    }

    if (lesson.starterCode && source.replace(/\s/g, "") === lesson.starterCode.replace(/\s/g, "")) {
      issues.push("Your code still matches the starter. The challenge wants you to change something!");
    }

    const lines = source.split("\n");
    lines.forEach((line, index) => {
      if (/^\s*(for|if|elif|else)\b/.test(line) && !/:\s*(#.*)?$/.test(line)) {
        issues.push(`Line ${index + 1}: for/if lines need a colon : at the end.`);
      }
      if (/^\s*(for|if|elif)\b.*:\s*$/.test(line)) {
        const next = lines[index + 1];
        if (next !== undefined && next.trim() && !/^\s+/.test(next)) {
          issues.push(`Line ${index + 2}: scoot this line right — it goes under the for/if line above.`);
        }
      }
    });

    if (lesson.hasTurtle && !/import\s+turtle/.test(source)) {
      issues.push("Turtle lessons need import turtle at the top.");
    }

    for (const check of lesson.checks || []) {
      if (check.type === "starterItemsChanged" && check.values?.length) {
        const left = check.values.filter(
          (item) => source.includes(`"${item}"`) || source.includes(`'${item}'`)
        );
        if (left.length === check.values.length) {
          issues.push(`Still using starter words (${left.join(", ")}). Swap them for your own!`);
        } else if (left.length > 0) {
          issues.push(`Change the remaining starter word(s): ${left.join(", ")}.`);
        }
      }
      if (check.type === "outputNotEquals" && check.value) {
        if (source.includes(`"${check.value}"`) || source.includes(`'${check.value}'`)) {
          issues.push(`Still printing "${check.value}". Change the text inside the quotes!`);
        }
      }
    }

    return issues.slice(0, 3);
  }

  function runErrorHelp(state) {
    const error = state.lastResult?.error;
    if (!error) return null;

    const lower = error.toLowerCase();
    if (lower.includes("indent")) {
      return "Your last run had an indentation error. Lines under for: or if: must be scooted right (Tab).";
    }
    if (lower.includes("syntax") || lower.includes("quote")) {
      return "Your last run had a syntax error. Check quotes come in pairs and for/if lines end with :";
    }
    if (state.lesson.hasTurtle && (lower.includes("turtle") || lower.includes("line 1"))) {
      return "Your last run: keep import turtle as line 1, then t = turtle.Turtle() on line 2.";
    }
    return `Your last run said: "${error}". Read that message — it usually points to the line to fix.`;
  }

  function checkFailureHelp(state) {
    const check = state.lastCheck;
    if (!check || check.passed) return null;

    const guide =
      typeof UnstuckGuide !== "undefined" && check.failedRule
        ? UnstuckGuide.get(state.lesson.id, check.failedRule)
        : null;

    const parts = [check.message || "Your last check didn't pass yet."];
    const steps = guide?.steps?.length ? guide.steps : check.steps;
    if (steps?.length) {
      parts.push(formatSteps(steps));
    }
    return parts.join("\n\n");
  }

  function lessonStepsHelp(lesson) {
    if (!lesson.steps?.length) return "";
    return lesson.steps.map((step) => `${step.label}: ${stripHtml(step.text)}`).join("\n");
  }

  function matchIntent(message) {
    const lower = normalize(message);

    if (/^(hi|hello|hey|yo)\b/.test(lower)) return "greeting";
    if (includesAny(lower, ["thank", "thanks", "thx"])) return "thanks";
    if (includesAny(lower, ["stuck", "confused", "lost", "dont understand", "don't understand", "no idea"])) {
      return "stuck";
    }
    if (
      includesAny(lower, [
        "error",
        "red text",
        "red message",
        "broken",
        "didnt work",
        "didn't work",
        "not working",
        "won't work",
        "wont work",
        "crash",
        "failed",
      ])
    ) {
      return "error";
    }
    if (includesAny(lower, ["hint", "clue", "nudge", "tiny hint"])) return "hint";
    if (includesAny(lower, ["challenge", "goal", "pass check", "check challenge", "finish challenge"])) {
      return "challenge";
    }
    if (
      includesAny(lower, [
        "guess",
        "predict",
        "think first",
        "before run",
        "what will happen",
        "what will print",
        "what will show",
        "what happens",
      ])
    ) {
      return "guess";
    }
    if (includesAny(lower, ["example", "starter code", "sample"])) return "example";
    if (includesAny(lower, ["syntax", "how to write", "how do i write", "how do you write"])) return "syntax";
    if (
      includesAny(lower, [
        "what do i do",
        "what should i do",
        "what do i change",
        "instructions",
        "steps",
        "try this",
        "how do i",
        "how to do",
        "help me",
      ])
    ) {
      return "steps";
    }
    if (includesAny(lower, ["main idea", "big idea", "summary", "what is this lesson"])) return "overview";
    if (includesAny(lower, ["tip", "advice"])) return "tip";
    if (matchConcept(lower)) return "concept";
    if (
      includesAny(lower, [
        "what is",
        "what are",
        "what does",
        "what do",
        "why",
        "how does",
        "explain",
        "tell me",
        "mean",
        "means",
      ])
    ) {
      return "explain";
    }
    if (includesAny(lower, ["help"])) return "stuck";

    return "unknown";
  }

  function respondOverview(state) {
    const { lesson } = state;
    const parts = [
      `${lessonLabel(lesson)} — ${lesson.summary}`,
      stripHtml(lesson.bigIdea),
    ];
    return parts.join("\n\n");
  }

  function respondStuck(state) {
    const { lesson } = state;
    const parts = [`You're on ${lessonLabel(lesson)}. Let's tackle this step by step.`];

    const runHelp = runErrorHelp(state);
    if (runHelp) parts.push(runHelp);

    const checkHelp = checkFailureHelp(state);
    if (checkHelp) parts.push(checkHelp);

    const issues = codeIssues(state.code, lesson);
    if (issues.length) {
      parts.push("I looked at your code:\n• " + issues.join("\n• "));
    }

    if (!runHelp && !checkHelp && !issues.length) {
      parts.push(`Challenge: ${lesson.challenge}`);
      parts.push(`Hint: ${lesson.hint}`);
      const steps = lessonStepsHelp(lesson);
      if (steps) parts.push(`Try this:\n${steps}`);
    } else {
      parts.push(`Hint: ${lesson.hint}`);
    }

    return parts.join("\n\n");
  }

  // Hints get more specific each time the same kid asks again in this lesson,
  // instead of repeating the exact same line — a real waterfall from a gentle
  // nudge down to "here's the pattern, copy and adjust it."
  function respondHint(state) {
    const { lesson } = state;
    state.hintCount = (state.hintCount || 0) + 1;
    const n = state.hintCount;

    if (n === 1) {
      return `Hint for ${lesson.title}: ${lesson.hint}`;
    }

    if (n === 2) {
      const steps = lessonStepsHelp(lesson);
      if (steps) {
        return `Let's break it into steps:\n${steps}`;
      }
      return lesson.tip
        ? `A bit more: ${lesson.tip}`
        : `Hint for ${lesson.title}: ${lesson.hint}`;
    }

    if (n === 3) {
      return `Here's exactly how to write it:\n${stripHtml(lesson.syntax)}\n\n${stripHtml(lesson.syntaxNote || "")}`;
    }

    return (
      `Let's do this together! Here's the pattern:\n${stripHtml(lesson.syntax)}\n\n` +
      `Challenge: ${lesson.challenge}\n\n` +
      `Copy that pattern into your code, then change it to match the challenge. You can also peek at the Example box on the right for a full working example!`
    );
  }

  function respondError(state) {
    const runHelp = runErrorHelp(state);
    if (runHelp) {
      const issues = codeIssues(state.code, state.lesson);
      if (issues.length) {
        return `${runHelp}\n\nAlso check:\n• ${issues.join("\n• ")}`;
      }
      return runHelp;
    }

    if (!state.lastResult) {
      return "Press ▶ Run first. If Output turns red, tell me what the error says and I'll help!";
    }

    if (state.lastResult.ok) {
      return "Your last run worked! If ✓ Check challenge still fails, you may need to change more for the challenge. Ask me \"what's the challenge?\"";
    }

    return respondStuck(state);
  }

  function respondConcept(message, state) {
    const concept = matchConcept(message);
    if (concept) {
      const extra = state.lesson.syntaxNote ? `\n\nFor this lesson: ${stripHtml(state.lesson.syntaxNote)}` : "";
      return concept.answer + extra;
    }
    return respondExplain(message, state);
  }

  function respondExplain(message, state) {
    const concept = matchConcept(message);
    if (concept) {
      return respondConcept(message, state);
    }

    const { lesson } = state;
    const lower = normalize(message);

    if (includesAny(lower, ["lesson", "this about", "learning"])) {
      return respondOverview(state);
    }

    return (
      `I'm not sure about that exact question, and I don't want to guess wrong!\n\n` +
      `For ${lessonLabel(lesson)}, I can help with:\n` +
      `• The challenge — ask "what's the challenge?"\n` +
      `• A hint — ask "give me a hint"\n` +
      `• Your error — ask "my code has an error"\n` +
      `• print, variables, loops, lists, turtle — ask "what is a loop?"\n\n` +
      `Main idea: ${stripHtml(lesson.bigIdea)}`
    );
  }

  function respondGreeting(state) {
    const { lesson, challengePassed, lastResult } = state;
    const name = AppStore.read().nickname || "friend";

    if (challengePassed) {
      return `Hi ${name}! You already passed the coding challenge on ${lesson.title}. Want help with quizzes, or replaying the code?`;
    }
    if (lastResult && !lastResult.ok) {
      return `Hi ${name}! I see your last run had an error on ${lesson.title}. Ask me "what's wrong?" or tap "It didn't work" below.`;
    }
    return (
      `Hi ${name}! I'm helping with ${lessonLabel(lesson)}.\n\n` +
      `Challenge: ${lesson.challenge}\n\n` +
      `Ask me about the challenge, a hint, your error, or how something works. I only answer from this lesson — no made-up stuff!`
    );
  }

  function respondToMessage(message, state) {
    const clean = ContentGuardrails.filterCoachMessage(message);
    const intent = matchIntent(clean);
    const { lesson } = state;

    switch (intent) {
      case "greeting":
        return respondGreeting(state);
      case "thanks":
        return "You're welcome! Keep going — you're doing great. 🐍";
      case "stuck":
        return respondStuck(state);
      case "error":
        return respondError(state);
      case "hint":
        return respondHint(state);
      case "challenge":
        return `Challenge: ${lesson.challenge}\n\nTip: ${lesson.tip}`;
      case "guess":
        return lesson.thinkFirst
          ? `${lesson.thinkFirst}\n\nThen press ▶ Run and see what happens!`
          : "Press ▶ Run and see what shows up in Output!";
      case "example":
        return `Try the Example buttons on the right, or start from the starter code.\n\nThis lesson's syntax: ${stripHtml(lesson.syntax)}`;
      case "syntax":
        return `How to write it:\n${stripHtml(lesson.syntax)}\n\n${stripHtml(lesson.syntaxNote)}`;
      case "steps": {
        const steps = lessonStepsHelp(lesson);
        return steps
          ? `Try this:\n${steps}\n\nChallenge: ${lesson.challenge}`
          : `Challenge: ${lesson.challenge}\n\nHint: ${lesson.hint}`;
      }
      case "overview":
        return respondOverview(state);
      case "tip":
        return `Tip: ${lesson.tip}`;
      case "concept":
        return respondConcept(clean, state);
      case "explain":
        return respondExplain(clean, state);
      default:
        return respondExplain(clean, state);
    }
  }

  function quickReplies() {
    return [
      { id: "stuck", label: "I'm stuck", message: "I'm stuck on this lesson" },
      { id: "hint", label: "Hint please", message: "Can I get a hint?" },
    ];
  }

  function mount(container, getState, options = {}) {
    const resolveState = typeof getState === "function" ? getState : () => getState;

    const dock = document.createElement("div");
    dock.className = "coach-dock";

    const panel = document.createElement("aside");
    panel.className = "coach-panel";
    panel.innerHTML = `
      <div class="coach-header">
        <img src="assets/mascot.svg?v=2" alt="" />
        <div>
          <strong>Coach Py</strong>
          <p>Ask me about this lesson</p>
        </div>
        <button class="coach-close" type="button" aria-label="Close Coach Py">×</button>
      </div>
      <div class="coach-messages" id="coach-messages"></div>
      <div class="coach-quick" id="coach-quick"></div>
      <form class="coach-input-row" id="coach-form">
        <input type="text" id="coach-input" placeholder="Ask Coach Py..." maxlength="200" />
        <button class="btn btn-primary" type="submit">Send</button>
      </form>
    `;

    const toggle = document.createElement("button");
    toggle.className = "coach-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open Coach Py");
    toggle.innerHTML = `<img src="assets/mascot.svg?v=2" alt="" class="coach-toggle-icon" /> Coach Py`;

    const askBtn = document.createElement("button");
    askBtn.className = "coach-help-btn";
    askBtn.type = "button";
    askBtn.id = "parent-help-btn";
    askBtn.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" fill="currentColor"/><path d="M12 11.3c1.7-1.2 2.5-2.1 2.5-3.1 0-.9-.7-1.6-1.6-1.6-.6 0-1.1.3-1.4.8-.3-.5-.8-.8-1.4-.8-.9 0-1.6.7-1.6 1.6 0 1 .8 1.9 2.5 3.1Z" fill="#fff"/></svg> Ask Parent`;

    dock.appendChild(toggle);
    dock.appendChild(askBtn);
    container.appendChild(dock);
    container.appendChild(panel);

    if (options.onAskParent) {
      askBtn.addEventListener("click", options.onAskParent);
    }

    const messages = panel.querySelector("#coach-messages");
    const quick = panel.querySelector("#coach-quick");
    const form = panel.querySelector("#coach-form");
    const input = panel.querySelector("#coach-input");

    function addBubble(text, who) {
      const bubble = document.createElement("div");
      bubble.className = `coach-bubble coach-bubble-${who}`;
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    function reply(userMessage) {
      addBubble(userMessage, "kid");
      addBubble(respondToMessage(userMessage, resolveState()), "coach");
    }

    CoachPy.quickReplies().forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "coach-chip";
      btn.textContent = item.label;
      btn.addEventListener("click", () => reply(item.message));
      quick.appendChild(btn);
    });

    addBubble(respondGreeting(resolveState()), "coach");

    toggle.addEventListener("click", () => panel.classList.add("open"));
    panel.querySelector(".coach-close").addEventListener("click", () => panel.classList.remove("open"));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      if (ContentGuardrails.containsBlocked(text)) {
        addBubble(ContentGuardrails.filterCoachMessage(text), "kid");
        addBubble(ContentGuardrails.validateCode(text).message, "coach");
        input.value = "";
        return;
      }
      reply(text);
      input.value = "";
    });
  }

  return { mount, respondToMessage, quickReplies };
})();
