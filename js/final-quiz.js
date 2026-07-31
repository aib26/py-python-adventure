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
  {
    question: "random.randint(1, 10) picks...?",
    options: ["A surprise number between 1 and 10", "Always the number 10", "A letter"],
    answer: 0,
  },
  {
    question: "def add(a, b): return a + b. What does add(2, 3) give back?",
    options: ["5", "23", "Nothing"],
    answer: 0,
  },
  {
    question: "student = {\"grade\": 5}. How do you look up the grade?",
    options: ["student[\"grade\"]", "student(grade)", "grade.student"],
    answer: 0,
  },
  {
    question: "What keeps a while loop running?",
    options: ["Its condition staying True", "Pressing a key", "A random number"],
    answer: 0,
  },
  {
    question: "A loop inside another loop is called a...?",
    options: ["Nested loop", "Broken loop", "Double variable"],
    answer: 0,
  },
  {
    question: "try/except is used to...?",
    options: ["Catch an error so the program doesn't crash", "Delete your code", "Make the turtle move"],
    answer: 0,
  },
  {
    question: "[n * n for n in [1, 2, 3]] is an example of a...?",
    options: ["List comprehension", "Dictionary", "Turtle command"],
    answer: 0,
  },
  {
    question: "nums[1:3] is called...?",
    options: ["Slicing", "Looping", "Importing"],
    answer: 0,
  },
  {
    question: "Which one CANNOT be changed after it's created?",
    options: ["A tuple", "A list", "A dictionary"],
    answer: 0,
  },
  {
    question: "for key, value in d.items(): gives you...?",
    options: ["Both the key and value together", "Only the keys", "Only the values"],
    answer: 0,
  },
  {
    question: "def greet(name, greeting=\"Hi\"): — what is \"Hi\"?",
    options: ["A default value", "A required value", "An error"],
    answer: 0,
  },
  {
    question: "In a class, __init__ runs...?",
    options: ["Automatically when a new object is created", "Only when you call it by name", "Never"],
    answer: 0,
  },
  {
    question: "What does NumPy help programmers do?",
    options: ["Do math on a whole list of numbers at once", "Draw with a turtle", "Print text"],
    answer: 0,
  },
];

function getFinalQuizQuestions() {
  return FINAL_QUESTIONS;
}
