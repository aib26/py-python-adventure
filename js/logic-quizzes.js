const LOGIC_QUESTIONS = {
  1: [
    {
      question: "If print(\"Hello!\") is in your code, what shows up in Output?",
      options: ["Hello!", "print", "Nothing"],
      answer: 0,
      explain: "print() shows exactly the words inside the quotes!",
    },
    {
      question: "Do you need quotes around the words you want to print?",
      options: ["Yes, always", "No, never", "Only for numbers"],
      answer: 0,
      explain: "Quotes tell Python exactly where your words start and stop.",
    },
  ],
  2: [
    {
      question: "You write print(\"Hi!\") and print(\"Bye!\"). How many lines show up?",
      options: ["2 lines", "1 line", "0 lines"],
      answer: 0,
      explain: "Each print() makes its very own line!",
    },
    {
      question: "Which prints first: the top print() or the bottom one?",
      options: ["The top one", "The bottom one", "They race"],
      answer: 0,
      explain: "Python always reads your code from top to bottom.",
    },
  ],
  3: [
    {
      question: "If my_name = \"Mia\" and you print(my_name), what shows up?",
      options: ["Mia", "my_name", "Nothing"],
      answer: 0,
      explain: "print(my_name) shows what's INSIDE the box, not its label.",
    },
    {
      question: "Can you change what's inside a box (variable) later?",
      options: ["Yes, just set it again", "No, never", "Only on Fridays"],
      answer: 0,
      explain: "Variables can be changed anytime just by using = again.",
    },
  ],
  4: [
    {
      question: "is_sunny is True. Which message prints — the if one or the else one?",
      options: ["The if message", "The else message", "Neither"],
      answer: 0,
      explain: "True runs the if part. False would run the else part instead.",
    },
    {
      question: "Which word means the SAME as True?",
      options: ["Yes", "No", "Maybe"],
      answer: 0,
      explain: "True is Python's way of saying yes!",
    },
  ],
  5: [
    {
      question: "for i in range(3): print(\"Hi!\") — how many times does Hi! print?",
      options: ["3 times", "1 time", "0 times"],
      answer: 0,
      explain: "range(3) means the loop takes 3 trips!",
    },
    {
      question: "Does the loop save you from typing print() over and over?",
      options: ["Yes!", "No, you still type it every time", "Only for turtles"],
      answer: 0,
      explain: "That's the whole point of a loop — write once, repeat many times!",
    },
  ],
  6: {
    question: "If you run print(\"Hi!\") two times, how many lines show up?",
    options: ["2 lines", "1 line", "0 lines"],
    answer: 0,
    explain: "Each print() makes its own new line!",
  },
  7: {
    question: "Which line runs FIRST in your code?",
    options: ["The top line", "The bottom line", "All at the same time"],
    answer: 0,
    explain: "Python reads from top to bottom, like reading a book.",
  },
  8: {
    question: "If name = \"Alex\" and you print(name), what shows up?",
    options: ["Alex", "name", "Nothing"],
    answer: 0,
    explain: "print(name) shows what's INSIDE the box, not the label.",
  },
  9: {
    question: "You have 10 cookies and 2 friends (including you). How many each if you share equally?",
    options: ["5 each", "10 each", "2 each"],
    answer: 0,
    explain: "10 / 2 = 5. Division splits things fairly!",
  },
  10: {
    question: "If animal = \"cat\" then animal = \"dragon\", which animal prints?",
    options: ["dragon", "cat", "Both"],
    answer: 0,
    explain: "The newest value wins — Python uses what you set last.",
  },
  11: {
    question: "homework_done is False. Which message prints?",
    options: ["The else message", "The if message", "Neither"],
    answer: 0,
    explain: "if only runs when the test is True. False goes to else!",
  },
  12: {
    question: "for i in range(3) runs the loop how many times?",
    options: ["3 times", "2 times", "Forever"],
    answer: 0,
    explain: "range(3) gives 0, 1, 2 — that's three trips!",
  },
  13: {
    question: "In [\"apple\", \"pear\", \"mango\"], which is the SECOND item?",
    options: ["pear", "apple", "mango"],
    answer: 0,
    explain: "First is [0], second is [1]. Computers count from 0!",
  },
  14: {
    question: "A list has 4 animals. A loop prints each one. How many lines print?",
    options: ["4 lines", "1 line", "0 lines"],
    answer: 0,
    explain: "One print per item — four animals, four lines!",
  },
  15: {
    question: "To draw a square, how many turns of 90° do you need?",
    options: ["4 turns", "2 turns", "1 turn"],
    answer: 0,
    explain: "Four sides means forward + turn, four times!",
  },
  16: {
    question: "A triangle needs how many left(120) turns to finish?",
    options: ["3 turns", "4 turns", "1 turn"],
    answer: 0,
    explain: "Three sides = three turns. 3 × 120° = 360°!",
  },
  17: {
    question: "t.forward(80) then t.backward(40). Net distance forward?",
    options: ["40 steps", "120 steps", "0 steps"],
    answer: 0,
    explain: "Forward 80, back 40 — you end up 40 ahead!",
  },
  18: {
    question: "Between penup() and pendown(), does the turtle draw?",
    options: ["No — the pen is up", "Yes, always", "Only in red"],
    answer: 0,
    explain: "penup() lifts the pen — movement without a line!",
  },
  19: {
    question: "guess is 7 and secret is 7. What happens?",
    options: ["You win!", "You lose", "The game crashes"],
    answer: 0,
    explain: "When guess == secret, the if block says you win!",
  },
  20: {
    question: "Which skills did you use in the final project?",
    options: ["Variables, print, loops, and turtle", "Only one skill", "None — magic"],
    answer: 0,
    explain: "You combined everything you learned. That's real coding!",
  },
  21: [
    {
      question: "def double(n): return n * 2. What does double(4) give back?",
      options: ["8", "4", "2"],
      answer: 0,
      explain: "return sends back n * 2, and 4 * 2 = 8.",
    },
    {
      question: "def mystery(x): return x * x + 1. What does mystery(3) return?",
      options: ["10", "9", "7"],
      answer: 0,
      explain: "3 * 3 = 9, plus 1 = 10.",
    },
  ],
  22: [
    {
      question: "student = {\"grade\": 5}. What does student[\"grade\"] print?",
      options: ["5", "grade", "student"],
      answer: 0,
      explain: "The key \"grade\" looks up its value, 5.",
    },
    {
      question: "d = {\"a\": 1, \"b\": 2}. What does len(d) return?",
      options: ["2", "1", "4"],
      answer: 0,
      explain: "len() counts the key-value pairs — there are 2.",
    },
  ],
  23: [
    {
      question: "num = 1, then it prints and adds 1 while num < 4. How many numbers print?",
      options: ["3", "4", "Forever"],
      answer: 0,
      explain: "It prints 1, 2, 3 — then stops once num is no longer less than 4.",
    },
    {
      question: "x = 10. while x > 0: x = x - 3. How many times does the loop run?",
      options: ["4", "3", "10"],
      answer: 0,
      explain: "x goes 10, 7, 4, 1 — four trips before it drops below 0.",
    },
  ],
  24: [
    {
      question: "Outer loop runs 2 times, inner loop runs 5 times each round. How many total inner-loop prints?",
      options: ["10", "7", "2"],
      answer: 0,
      explain: "2 rows × 5 columns = 10 total prints.",
    },
    {
      question: "for i in range(2): for j in range(3): print(i, j) — how many lines print total?",
      options: ["6", "5", "2"],
      answer: 0,
      explain: "2 outer trips × 3 inner trips = 6 total prints.",
    },
  ],
  25: [
    {
      question: "try: print(10 / 0) except ZeroDivisionError: print(\"Oops!\"). What prints?",
      options: ["Oops!", "10", "Nothing"],
      answer: 0,
      explain: "Dividing by zero breaks the try block, so Python jumps to except and prints Oops!.",
    },
    {
      question: "try: x = 5 / 0 except ZeroDivisionError: x = 0. print(x) — what prints?",
      options: ["0", "5", "The program crashes"],
      answer: 0,
      explain: "The except block catches the crash and sets x to 0 before printing.",
    },
  ],
};

function getLogicQuestions(lessonId) {
  const entry = LOGIC_QUESTIONS[lessonId];
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}
