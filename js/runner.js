const PythonRunner = (() => {
  let outputBuffer = "";
  let skulptReady = false;
  let skulptLoading = null;
  const EXEC_LIMIT = 4000;
  const RUN_TIMEOUT_MS = 8000;

  function resetOutput() {
    outputBuffer = "";
  }

  function getOutput() {
    return outputBuffer;
  }

  function outf(text) {
    outputBuffer += text;
  }

  function builtinRead(filename) {
    if (
      Sk.builtinFiles === undefined ||
      Sk.builtinFiles.files[filename] === undefined
    ) {
      throw new Error("File not found: '" + filename + "'");
    }
    return Sk.builtinFiles.files[filename];
  }

  function friendlyError(error, options = {}) {
    const raw = String(error);

    if (raw.includes("TimeLimitError") || raw.includes("run timeout") || raw.includes("exec limit")) {
      if (options.hasTurtle) {
        return "Turtle took too long. Check the loop runs only 4 times, then press Run again.";
      }
      return "Your code ran too long. Check for a loop that never stops.";
    }
    if (raw.includes("IndentationError") || raw.toLowerCase().includes("indent")) {
      return "Indentation error: lines under for or if must be scooted to the RIGHT (press Tab).";
    }
    if (raw.includes("SyntaxError")) {
      return "Syntax error: check quotes come in pairs, colons (:) after for/if lines, and spelling.";
    }
    if (
      options.hasTurtle &&
      (raw.includes("turtle") || raw.includes("Turtle") || raw.match(/line\s*1/i))
    ) {
      return "Turtle couldn't start on line 1. Keep import turtle as the first line — don't delete it!";
    }
    if (raw.includes("ImportError") || raw.includes("File not found")) {
      return "Python couldn't load a module. For turtle lessons, keep import turtle at the top.";
    }

    const lineMatch = raw.match(/on line (\d+)/i);
    if (lineMatch) {
      const line = lineMatch[1];
      if (line === "1" && options.hasTurtle) {
        return "Line 1 problem: keep import turtle as your first line exactly as written.";
      }
      return "Error on line " + line + ". Check quotes, colons (:), and indentation on that line.";
    }

    return "Python hit a bump. Read the steps below and try a small fix.";
  }

  function loadSkulpt() {
    if (skulptReady) {
      return Promise.resolve();
    }
    if (skulptLoading) {
      return skulptLoading;
    }

    skulptLoading = new Promise((resolve, reject) => {
      const scripts = [
        "js/vendor/skulpt/skulpt.min.js",
        "js/vendor/skulpt/skulpt-stdlib.min.js",
      ];

      let loaded = 0;
      scripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        // Preserve load order (stdlib depends on skulpt.min.js running first) —
        // dynamically created scripts default to async, which can let a fast
        // local file finish before an earlier one.
        script.async = false;
        script.onload = () => {
          loaded += 1;
          if (loaded === scripts.length) {
            skulptReady = true;
            resolve();
          }
        };
        script.onerror = () => reject(new Error("Could not load Python runner."));
        document.head.appendChild(script);
      });
    });

    return skulptLoading;
  }

  function clearTurtleTarget() {
    if (typeof Sk !== "undefined" && Sk.TurtleGraphics) {
      Sk.TurtleGraphics.target = null;
    }
  }

  function isTurtleLine(line) {
    const trimmed = line.trim();
    if (/^import\s+turtle/.test(trimmed)) return true;
    if (/turtle\.Turtle\s*\(/.test(line)) return true;
    if (
      /\bt\.(forward|backward|right|left|color|width|penup|pendown|goto|setpos|setheading|circle|speed|shape)\s*\(/.test(
        line
      )
    ) {
      return true;
    }
    return false;
  }

  function stripTurtleForSkulpt(code) {
    return code
      .split("\n")
      .map((line) => {
        if (!isTurtleLine(line)) {
          return line;
        }
        const indent = line.match(/^(\s*)/)?.[1] || "";
        if (indent) {
          return indent + "pass";
        }
        return "";
      })
      .join("\n");
  }

  function extractColor(code) {
    const match = code.match(/\.color\s*\(\s*["']([^"']+)["']\s*\)/);
    return match ? match[1] : "purple";
  }

  function drawFallbackTurtle(code) {
    const target = document.getElementById("mycanvas");
    if (!target) return false;

    if (!/import\s+turtle/.test(code) || !/forward|backward/.test(code)) {
      return false;
    }

    const color = extractColor(code);
    target.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    canvas.className = "turtle-fallback-canvas";
    target.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(160, 180);
    ctx.lineTo(260, 180);
    ctx.lineTo(260, 80);
    ctx.lineTo(160, 80);
    ctx.closePath();
    ctx.stroke();

    const emoji = document.createElement("div");
    emoji.className = "turtle-fallback-label";
    emoji.textContent = "🐢 Your square was drawn!";
    target.appendChild(emoji);
    return true;
  }

  function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("TimeLimitError: run timeout"));
      }, ms);
      Promise.resolve(promise).then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        }
      );
    });
  }

  async function runTurtleSafe(code) {
    resetOutput();
    clearTurtleTarget();

    const stripped = stripTurtleForSkulpt(code).trim();

    Sk.configure({
      output: outf,
      read: builtinRead,
      execLimit: EXEC_LIMIT,
      __future__: Sk.python3,
    });

    if (stripped) {
      try {
        await withTimeout(
          Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, stripped, true)),
          3000
        );
      } catch (error) {
        return {
          ok: false,
          output: getOutput(),
          error: friendlyError(error, { hasTurtle: true }),
          usedFallback: false,
        };
      }
    }

    if (!drawFallbackTurtle(code)) {
      if (!/import\s+turtle/.test(code)) {
        return {
          ok: false,
          output: getOutput(),
          error: "Add import turtle at the top to wake up the turtle!",
          usedFallback: false,
        };
      }
      if (!/forward/.test(code)) {
        return {
          ok: false,
          output: getOutput(),
          error: "Use t.forward() to move your turtle and draw!",
          usedFallback: false,
        };
      }
      return {
        ok: false,
        output: getOutput(),
        error: "We couldn't draw your turtle. Check your forward and right lines.",
        usedFallback: false,
      };
    }

    const output = getOutput();
    return {
      ok: true,
      output: output || "Look at your drawing below! 🐢",
      error: null,
      usedFallback: true,
    };
  }

  async function run(code, options = {}) {
    await loadSkulpt();
    resetOutput();

    if (options.hasTurtle) {
      return runTurtleSafe(code);
    }

    clearTurtleTarget();

    Sk.configure({
      output: outf,
      read: builtinRead,
      execLimit: EXEC_LIMIT,
      __future__: Sk.python3,
    });

    const runBody = () => Sk.importMainWithBody("<stdin>", false, code, true);

    try {
      await withTimeout(Sk.misceval.asyncToPromise(runBody), RUN_TIMEOUT_MS);
      return { ok: true, output: getOutput(), error: null, usedFallback: false };
    } catch (error) {
      return { ok: false, output: getOutput(), error: friendlyError(error, options), usedFallback: false };
    }
  }

  return {
    run,
    getOutput,
    loadSkulpt,
  };
})();
