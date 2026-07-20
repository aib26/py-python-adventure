const ExerciseChecker = (() => {
  const FAIL_HINTS = {
    runs: "Your code needs to run without errors first.",
    codeChanged: "Change the starter code to make it your own.",
    starterItemsChanged: "Change at least one starter item in your list.",
    outputNotEquals: "Change the code so the output is different from the example.",
    notEquals: "Your output should be different now.",
    contains: "Your output is missing something from the challenge.",
    notContains: "Change a few more words in your code.",
    codeNotContains: "Update the values still left from the starter code.",
    codeContains: "Your code is missing something the challenge needs.",
    minLines: "You need more lines in the Output box.",
    minLength: "Press Run so something prints in Output.",
    containsCode: "Your code is missing a piece. See steps below.",
    usesTurtle: "Keep import turtle and the turtle drawing code.",
    turtleOk: "Run your code and check the turtle canvas below.",
  };

  function normalizeOutput(text) {
    return text.replace(/\r\n/g, "\n").trim();
  }

  function normalizeCode(code) {
    return (code || "").replace(/\s+/g, " ").trim();
  }

  function lineCount(text) {
    const trimmed = normalizeOutput(text);
    if (!trimmed) return 0;
    return trimmed.split("\n").length;
  }

  function starterItemStillInCode(source, item) {
    const quoted = [`"${item}"`, `'${item}'`];
    return quoted.some((pattern) => source.includes(pattern));
  }

  function buildFailure(lesson, failedRule, fallbackMessage) {
    const guide = UnstuckGuide.get(lesson?.id, failedRule);
    return {
      passed: false,
      message: guide.message || fallbackMessage || FAIL_HINTS[failedRule],
      steps: guide.steps || [],
      level: failedRule === "runs" ? "error" : "hint",
      failedRule,
      canSkip: true,
    };
  }

  function check(check, result, code, lesson) {
    const output = normalizeOutput(result.output || "");
    const source = code || "";

    switch (check.type) {
      case "runs":
        return result.ok;
      case "codeChanged":
        if (!lesson?.starterCode) return true;
        return normalizeCode(source) !== normalizeCode(lesson.starterCode);
      case "starterItemsChanged": {
        const items = check.values || [];
        if (!items.length) return true;
        return items.some((item) => !starterItemStillInCode(source, item));
      }
      case "equals":
        return output === normalizeOutput(check.value);
      case "notEquals":
        return output !== normalizeOutput(check.value);
      case "outputNotEquals":
        return output !== normalizeOutput(check.value);
      case "contains":
        return output.toLowerCase().includes(String(check.value).toLowerCase());
      case "notContains":
        return !output.toLowerCase().includes(String(check.value).toLowerCase());
      case "codeContains":
        return source.replace(/\s/g, "").includes(String(check.value).replace(/\s/g, ""));
      case "codeNotContains":
        return !source.includes(check.value);
      case "minLines":
        return lineCount(output) >= check.value;
      case "minLength":
        return output.length >= check.value;
      case "containsCode":
        return source.replace(/\s/g, "").includes(String(check.value).replace(/\s/g, ""));
      case "usesTurtle":
        return /import\s+turtle/.test(source);
      case "turtleOk":
        return result.ok && lesson?.hasTurtle;
      default:
        return true;
    }
  }

  function evaluate(checks, result, code, lesson) {
    if (!result.ok) {
      const failure = buildFailure(lesson, "runs", result.error);
      if (result.error && failure.steps.length) {
        failure.detail = result.error;
      }
      return failure;
    }

    for (const rule of checks) {
      if (!check(rule, result, code, lesson)) {
        const failure = buildFailure(lesson, rule.type, rule.hint || FAIL_HINTS[rule.type]);
        return failure;
      }
    }

    return {
      passed: true,
      message: "Amazing work! You earned a star!",
      steps: [],
      level: "success",
    };
  }

  return { evaluate };
})();
