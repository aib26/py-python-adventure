const LESSON_FUN_FACTS = {
  1: {
    topic: "Coding",
    emoji: "📺",
    fact: "Python is named after a funny British TV show called Monty Python's Flying Circus — not the snake!",
  },
  2: {
    topic: "Coding",
    emoji: "✌️",
    fact: "The very first computers could only do one tiny step at a time — just like print() does one line at a time!",
  },
  3: {
    topic: "History",
    emoji: "🎁",
    fact: "In the 1950s, computer pioneer Grace Hopper helped invent one of the first languages that let people use real words instead of pure numbers — an early step toward naming your own variables!",
  },
  4: {
    topic: "Coding",
    emoji: "✅",
    fact: "Deep inside every computer, everything is really just a bunch of on/off switches — a lot like True and False!",
  },
  5: {
    topic: "Coding",
    emoji: "🔁",
    fact: "Loops are so useful that video games use them to redraw the entire screen about 60 times every second — that's 60 loops before you even blink!",
  },
  6: {
    topic: "History",
    emoji: "💻",
    fact: "Ada Lovelace wrote the first computer program in the 1840s — long before laptops existed!",
  },
  7: {
    topic: "Coding",
    emoji: "📱",
    fact: "Big apps like Instagram are built from millions of lines of code — and every single one of them started with a programmer typing a first line, just like you!",
  },
  8: {
    topic: "History",
    emoji: "🔢",
    fact: "The = sign was invented in 1557 by mathematician Robert Recorde. He said he picked two parallel lines because \"no two things can be more equal\"!",
  },
  9: {
    topic: "Math",
    emoji: "➗",
    fact: "The ÷ division symbol is called an obelus, and mathematicians argued for over 700 years about the best way to write division!",
  },
  10: {
    topic: "History",
    emoji: "📝",
    fact: "Mad Libs, the fill-in-the-blank word game, was invented in 1953 — it works exactly like a variable: swap out one word, and the whole story changes!",
  },
  11: {
    topic: "Science",
    emoji: "🧠",
    fact: "Scientists estimate your brain makes about 35,000 decisions a day. Your if/else code is doing the exact same job — just way, way faster!",
  },
  12: {
    topic: "Coding",
    emoji: "🔄",
    fact: "Programmers call a loop that never stops an \"infinite loop.\" On early computers, one could run for hours before anyone noticed something was stuck!",
  },
  13: {
    topic: "Science",
    emoji: "🧬",
    fact: "Your DNA is basically a giant list — over 3 billion letters long (just A, T, C, and G)! Scientists really do use Python and lists to study it.",
  },
  14: {
    topic: "Science",
    emoji: "🐘",
    fact: "Africa is home to over 1,100 kinds of mammals. Researchers use loops in code to sort through thousands of wildlife camera photos and count every one!",
  },
  15: {
    topic: "Math",
    emoji: "📐",
    fact: "A square has 4 sides at 90° each. That's 360° total — exactly one full turn!",
  },
  16: {
    topic: "Math",
    emoji: "🔺",
    fact: "A triangle's angles add up to 180°. That's why turning left(120) three times brings the turtle in a full circle!",
  },
  17: {
    topic: "Science",
    emoji: "🚀",
    fact: "NASA's Mars rovers get driving commands a lot like turtle's forward() and backward() — except each command takes several minutes just to reach Mars!",
  },
  18: {
    topic: "Coding",
    emoji: "🖊️",
    fact: "Real plotter machines — robots that draw with an actual pen — use the exact same penup/pendown idea, so they don't scribble while moving between shapes!",
  },
  19: {
    topic: "Math",
    emoji: "🎲",
    fact: "Computers can't roll real dice, so they use a math trick to fake randomness — the same trick that shuffles songs on your favorite music app!",
  },
  20: {
    topic: "Coding",
    emoji: "🌟",
    fact: "Python is used by NASA, YouTube, Instagram, and Spotify — you're learning the exact same language the pros use!",
  },
  21: [
    {
      topic: "Coding",
      emoji: "🧰",
      fact: "Programmers write functions so they never have to type the same code twice — even huge apps are built from thousands of small functions!",
    },
    {
      topic: "Math",
      emoji: "📐",
      fact: "The math idea of a 'function' is over 300 years old — mathematicians used it to describe how one number turns into another long before computers existed!",
    },
  ],
  22: [
    {
      topic: "Coding",
      emoji: "🗂️",
      fact: "Dictionaries in Python are used by real apps to store things like usernames, scores, and settings — all matched to a key!",
    },
    {
      topic: "History",
      emoji: "📖",
      fact: "The first English dictionary was published in 1755 by Samuel Johnson — it took him almost 9 years to write, with no keyboard shortcuts!",
    },
  ],
  23: [
    {
      topic: "Science",
      emoji: "⏳",
      fact: "Some devices use while loops to keep checking, like a smoke alarm checking the air again and again for as long as it's plugged in!",
    },
    {
      topic: "Biology",
      emoji: "❤️",
      fact: "Your heart is basically a while loop — it keeps beating while you're alive, no code required!",
    },
  ],
  24: [
    {
      topic: "Math",
      emoji: "🔲",
      fact: "Checkerboards, waffles, and city street maps are all grids — nested loops are how computers draw them!",
    },
    {
      topic: "Culture",
      emoji: "🪆",
      fact: "Russian nesting dolls (matryoshka) are a real-life example of nesting — a doll inside a doll inside a doll, just like a loop inside a loop!",
    },
  ],
  25: [
    {
      topic: "Coding",
      emoji: "🛟",
      fact: "Try/except is used in real apps like games and phones so one small hiccup doesn't crash the whole program!",
    },
    {
      topic: "History",
      emoji: "🦋",
      fact: "The first computer 'bug' was an actual real moth, found stuck in a Harvard computer relay in 1947!",
    },
  ],
};

function getFunFactsForLesson(lessonId) {
  const entry = LESSON_FUN_FACTS[lessonId];
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

function getFunFactForLesson(lessonId) {
  return getFunFactsForLesson(lessonId)[0];
}
