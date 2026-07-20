const ContentGuardrails = (() => {
  // Mild "unkind word" list — flagged in lesson code/output/coach chat with a gentle nudge.
  // Matched as whole words only (never substrings) so things like "Hello!" don't trip on "hell".
  const BLOCKED = [
    "stupid", "dumb", "idiot", "hate", "kill", "die", "dead", "ugly",
    "shut up", "shutup", "suck", "sucks", "loser", "fart", "poop",
    "butt", "heck", "damn", "crap", "hell", "jerk", "moron", "darn",
    "freak", "freaking", "stinks", "stinky", "worst", "trash",
  ];

  // Real profanity/obscenity — used only for public-facing text (nicknames). Split by
  // false-positive risk: short/ambiguous words are matched as whole words only (so
  // "class" doesn't trip on "ass", "grape" doesn't trip on "rape"); longer, unambiguous
  // words are safe to match anywhere inside a token (catches "fuckboy123" etc).
  const PROFANITY_EXACT = [
    "ass", "sex", "cum", "fag", "kys", "meth", "nude", "hell", "damn",
    "crap", "weed", "rape", "piss", "cock",
  ];
  const PROFANITY_SUBSTRING = [
    "fuck", "shit", "bitch", "asshole", "bastard", "dickhead", "pussy",
    "cunt", "whore", "slut", "twat", "nigger", "nigga", "faggot",
    "retard", "tranny", "rapist", "pornhub", "penis", "vagina",
    "orgasm", "horny", "hooker", "nazi", "hitler", "terrorist",
    "cocaine", "heroin", "suicide",
  ];

  // Nonsense/gibberish nicknames (keyboard mashing, "asdf", "xxxxxx", etc.) — not
  // rude, just not a real nickname. Checked separately from profanity so we can
  // give kids a clearer, kinder message ("that doesn't look like a name yet").
  const GIBBERISH_TERMS = [
    "test", "asdf", "asdfg", "asdfgh", "asdfghjkl", "qwerty", "qwertyuiop",
    "noname", "no name", "idk", "unknown", "none", "na", "n a", "abc",
    "abcdef", "xxx", "xyz", "blah", "blahblah", "filler", "placeholder",
    "asdasd", "qweqwe", "zxcvbn", "hjkl",
  ];
  const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

  function maxRun(letters, isTarget) {
    let max = 0;
    let run = 0;
    for (const ch of letters) {
      if (isTarget(ch)) {
        run += 1;
        max = Math.max(max, run);
      } else {
        run = 0;
      }
    }
    return max;
  }

  function maxRepeatRun(letters) {
    let max = letters.length ? 1 : 0;
    let run = 1;
    for (let i = 1; i < letters.length; i++) {
      if (letters[i] === letters[i - 1]) {
        run += 1;
        max = Math.max(max, run);
      } else {
        run = 1;
      }
    }
    return max;
  }

  function looksLikeGibberish(text) {
    const lower = String(text || "").toLowerCase().trim();
    if (!lower) return false;

    const collapsedSpaces = lower.replace(/\s+/g, " ").trim();
    if (GIBBERISH_TERMS.includes(collapsedSpaces)) return true;

    const letters = lower.replace(/[^a-z]/g, "");
    if (!letters) return false;

    if (maxRepeatRun(letters) >= 4) return true;

    if (letters.length >= 4) {
      const vowelCount = [...letters].filter((ch) => VOWELS.has(ch)).length;
      if (vowelCount === 0) return true;

      if (maxRun(letters, (ch) => !VOWELS.has(ch)) >= 5) return true;
    }

    return false;
  }

  const REPLACEMENT = "✨";

  // Collapses common leetspeak substitutions and repeated letters so evasions like
  // "sh1t", "@$$", or "fuuuck" still get caught by a plain word-list check.
  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[@]/g, "a")
      .replace(/[$5]/g, "s")
      .replace(/[0]/g, "o")
      .replace(/[1!|]/g, "i")
      .replace(/[3]/g, "e")
      .replace(/[4]/g, "a")
      .replace(/[7]/g, "t")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/(.)\1{2,}/g, "$1$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function wordsFrom(text) {
    return normalize(text).split(" ").filter(Boolean);
  }

  function findBlockedTerms(text) {
    const normalized = normalize(text);
    const words = wordsFrom(text);
    const found = [];

    BLOCKED.forEach((term) => {
      if (term.includes(" ")) {
        if (normalized.includes(term)) found.push(term);
      } else if (words.includes(term)) {
        found.push(term);
      }
    });

    return found;
  }

  function findProfanity(text) {
    const normalized = normalize(text).replace(/\s+/g, "");
    const words = wordsFrom(text);
    const found = [];

    PROFANITY_EXACT.forEach((term) => {
      if (words.includes(term)) found.push(term);
    });
    PROFANITY_SUBSTRING.forEach((term) => {
      if (normalized.includes(term)) found.push(term);
    });

    return found;
  }

  function containsBlocked(text) {
    return findBlockedTerms(text).length > 0;
  }

  function containsProfanity(text) {
    return findProfanity(text).length > 0;
  }

  // Public-facing text (nicknames, etc.) needs to clear both lists — mild unkind
  // words aren't just "risky code," they're not okay in a name shown to other kids.
  function isNicknameSafe(text) {
    return !containsProfanity(text) && !containsBlocked(text) && !looksLikeGibberish(text);
  }

  // Same check as isNicknameSafe, but tells the caller *why* so the UI can show a
  // kinder message for "that's not a real word yet" vs. "let's keep it kind."
  function getNicknameIssue(text) {
    if (containsProfanity(text) || containsBlocked(text)) return "unkind";
    if (looksLikeGibberish(text)) return "gibberish";
    return null;
  }

  function sanitizeText(text) {
    const words = text.split(/(\s+)/);
    return words
      .map((part) => {
        const lower = part.toLowerCase().replace(/[^a-z]/g, "");
        if (BLOCKED.includes(lower)) {
          return REPLACEMENT;
        }
        return part;
      })
      .join("");
  }

  function validateCode(code) {
    if (containsBlocked(code)) {
      return {
        ok: false,
        message:
          "Let's keep our words kind and friendly! Try different words that make you smile. 😊",
      };
    }
    return { ok: true, message: "" };
  }

  function sanitizeOutput(output) {
    if (!output) return output;
    return sanitizeText(output);
  }

  function filterCoachMessage(text) {
    if (containsBlocked(text)) {
      return "I like kind words! Tell me what part of the lesson feels tricky.";
    }
    return text;
  }

  return {
    validateCode,
    sanitizeOutput,
    containsBlocked,
    containsProfanity,
    isNicknameSafe,
    getNicknameIssue,
    filterCoachMessage,
  };
})();
