const FINAL_QUIZ_PASS_PERCENT = 70;

const FINAL_QUESTIONS = [
  {
    question: "What does print() do?",
    options: ["Shows words on the screen", "Deletes your code", "Draws a turtle"],
    answer: 0,
  },
  {
    question: "What is a variable?",
    options: ["A labeled box that stores a value", "A type of keyboard", "A Python snake"],
    answer: 0,
  },
  {
    question: "Which line saves the number 10 in a variable?",
    options: ["score = 10", "print(10)", "10 = score"],
    answer: 0,
  },
  {
    question: "What does the + sign do with numbers?",
    options: ["Adds them together", "Makes them disappear", "Turns them into text"],
    answer: 0,
  },
  {
    question: "What goes at the end of an if line?",
    options: ["A colon :", "A question mark ?", "Three exclamation marks !!!"],
    answer: 0,
  },
  {
    question: "What does a for loop help you do?",
    options: ["Repeat code more than once", "Turn off the computer", "Fix spelling mistakes"],
    answer: 0,
  },
  {
    question: "What is a Python list?",
    options: ["A group of items in square brackets []", "A shopping list on paper", "A turtle command"],
    answer: 0,
  },
  {
    question: "How do you visit every item in a list?",
    options: ["Use a for loop", "Press the space bar", "Close the browser"],
    answer: 0,
  },
  {
    question: "What do you type to draw with the turtle?",
    options: ["import turtle", "import pizza", "draw now"],
    answer: 0,
  },
  {
    question: "Which line moves the turtle forward?",
    options: ["t.forward(100)", "t.sleep(100)", "t.delete(100)"],
    answer: 0,
  },
  {
    question: "t.left(90) makes the turtle turn...?",
    options: ["Left", "Backward", "Invisible"],
    answer: 0,
  },
  {
    question: "t.penup() lets the turtle move without...?",
    options: ["Drawing a line", "Turning", "Starting Python"],
    answer: 0,
  },
];

function getFinalQuizQuestions() {
  return FINAL_QUESTIONS;
}
