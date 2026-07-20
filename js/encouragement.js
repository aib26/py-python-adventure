const LESSON_ENCOURAGEMENT = {
  2: {
    emoji: "🌟",
    title: "Two lessons done!",
    message: "You can already make the computer talk. Keep going!",
  },
  4: {
    emoji: "🔥",
    title: "Four lessons done!",
    message: "Variables and math — you're learning real coding skills!",
  },
  6: {
    emoji: "🧠",
    title: "Six lessons done!",
    message: "Your programs can make choices now, just like you do!",
  },
  8: {
    emoji: "💪",
    title: "Eight lessons done!",
    message: "Lists hold lots of items — apps use lists for scores and friends!",
  },
  10: {
    emoji: "🐢",
    title: "Lesson 10 — double digits!",
    message: "You can draw with code! Turtle art is coding plus art.",
  },
  12: {
    emoji: "🎨",
    title: "Twelve lessons done!",
    message: "Forward, back, left, right — you control the turtle like a pro!",
  },
  14: {
    emoji: "🚀",
    title: "Fourteen lessons done!",
    message: "Almost there! Your final project and certificate are next!",
  },
};

function getEncouragementForLesson(lessonId) {
  return LESSON_ENCOURAGEMENT[lessonId];
}
