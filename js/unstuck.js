const UnstuckGuide = (() => {
  const GUIDES = {
    13: {
      runs: {
        message: "Python couldn't run your list code. Fix it with these steps:",
        steps: [
          "Check line 1 looks like: shopping = [\"apple\", \"pear\", \"mango\"]",
          "Use straight quotes \" not curly quotes",
          "Put commas between each food, inside the [ ] brackets",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      starterItemsChanged: {
        message: "Your shopping list still has the starter foods.",
        steps: [
          "On line 1, replace milk, eggs, or bread with foods YOU like",
          "Example: shopping = [\"pizza\", \"grapes\", \"cookies\"]",
          "Keep the three print lines below — only change line 1",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLength: {
        message: "Nothing showed in the Output box yet.",
        steps: [
          "Press ▶ Run first",
          "You should see Item 1, Item 2, and Item 3 lines",
          "If Output is empty, check for a red error message above",
        ],
      },
    },
    14: {
      runs: {
        message: "Your loop has a small bug. Follow these steps:",
        steps: [
          "Line 3 must be: for animal in animals:  (with a colon at the end!)",
          "Line 4 must start with SPACES or Tab — scoot print(...) to the RIGHT",
          "It should look indented under the for line, not lined up with it",
          "Press ▶ Run. If Output is red, fix the line number it mentions",
          "When Output shows three animal lines, press ⭐ Check my work",
        ],
      },
      starterItemsChanged: {
        message: "Your list still has lion, zebra, or penguin.",
        steps: [
          "Change line 1 to your own animals, like: animals = [\"dog\", \"cat\", \"bird\"]",
          "Replace at least one of: lion, zebra, penguin",
          "Keep the for loop (lines 3–4) the same",
          "Press ▶ Run — you should see 3 lines like: Look, a dog !",
        ],
      },
      containsCode: {
        message: "You need a for loop for the animal parade.",
        steps: [
          "Keep: for animal in animals:",
          "Keep the indented print line under it",
          "The for loop visits every animal automatically — don't delete it!",
        ],
      },
      minLength: {
        message: "The Output box is empty — your parade didn't print yet.",
        steps: [
          "Press ▶ Run first",
          "Fix indentation: print must be scooted right under the for line",
          "You should see 3 lines in Output (one per animal)",
        ],
      },
      codeChanged: {
        message: "Change the starter animals on line 1.",
        steps: [
          "Edit animals = [\"lion\", \"zebra\", \"penguin\"] to use your own animals",
          "Example: animals = [\"puppy\", \"kitten\", \"bunny\"]",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "You need 3 lines in Output (one for each animal).",
        steps: [
          "Use a list with 3 animals on line 1",
          "Keep the for loop so it prints once per animal",
          "Press ▶ Run — count the lines in Output (need 3)",
        ],
      },
    },
    15: {
      runs: {
        message: "Turtle couldn't start — this is usually line 1. Do this:",
        steps: [
          "Line 1 must be exactly: import turtle  (don't delete or change it!)",
          "Line 2 must be: t = turtle.Turtle()",
          "Change ONLY the color on line 3: t.color(\"red\") instead of purple",
          "Keep the for loop — scoot forward/right lines to the RIGHT",
          "Press ▶ Run and look at the Turtle box below (not the Output box)",
          "Empty Output is OK if you see a drawing!",
        ],
      },
      starterItemsChanged: {
        message: "Change purple to your own favorite color.",
        steps: [
          "Find: t.color(\"purple\")",
          "Change to: t.color(\"orange\") or red, blue, green, pink — your pick!",
          "Keep the for loop that draws the square",
          "Press ▶ Run and look at the canvas below",
        ],
      },
      usesTurtle: {
        message: "Turtle code is missing.",
        steps: [
          "Keep: import turtle",
          "Keep: t = turtle.Turtle()",
          "Don't delete those — they start the turtle!",
        ],
      },
      containsCode: {
        message: "Your square needs forward and turn commands.",
        steps: [
          "Inside the loop keep: t.forward(100)",
          "Inside the loop keep: t.right(90)",
          "Four sides = one square!",
        ],
      },
    },
    16: {
      runs: {
        message: "Triangle turtle code needs these pieces:",
        steps: [
          "Keep: import turtle and t = turtle.Turtle()",
          "Loop should use t.forward(100) and t.left(120)",
          "Three sides = range(3) in the for loop",
          "Press ▶ Run and check the canvas below",
        ],
      },
      starterItemsChanged: {
        message: "Change blue to your own color.",
        steps: [
          "Find: t.color(\"blue\")",
          "Change to your favorite color in quotes",
          "Keep the left(120) triangle loop",
        ],
      },
      containsCode: {
        message: "A triangle needs left turns and forward moves.",
        steps: [
          "Keep t.left(120) inside the loop",
          "Keep t.forward(100) inside the loop",
          "left(120) × 3 = triangle!",
        ],
      },
    },
    17: {
      runs: {
        message: "Zigzag turtle code — check these lines:",
        steps: [
          "Keep: import turtle and t = turtle.Turtle()",
          "You need both t.forward() and t.backward()",
          "Add turns with t.left() or t.right() between moves",
          "Press ▶ Run and look at the canvas",
        ],
      },
      starterItemsChanged: {
        message: "Change teal and add one more move.",
        steps: [
          "Change t.color(\"teal\") to your color",
          "Add a line like t.forward(40) at the end",
          "Press ▶ Run again",
        ],
      },
      containsCode: {
        message: "This lesson needs backward and forward.",
        steps: [
          "Keep t.backward(60) or similar",
          "Keep t.forward() lines",
          "Mix them with turns for a zigzag!",
        ],
      },
    },
    18: {
      runs: {
        message: "Pen up/down drawing — follow these steps:",
        steps: [
          "Keep: import turtle and t = turtle.Turtle()",
          "Order: draw, penup(), jump forward, pendown(), draw again",
          "Change the gap number from 50 to 80",
          "Press ▶ Run — you should see TWO separate lines",
        ],
      },
      starterItemsChanged: {
        message: "Change gold and widen the gap.",
        steps: [
          "Change t.color(\"gold\") to your color",
          "Change the 50 between penup and pendown to 80",
          "Press ▶ Run and look for a gap between two lines",
        ],
      },
      containsCode: {
        message: "You need penup and pendown.",
        steps: [
          "Add t.penup() before the jump",
          "Add t.pendown() before drawing the second line",
          "forward() between them makes the invisible jump",
        ],
      },
    },
    19: {
      runs: {
        message: "Python couldn't run your guessing game. Fix it with these steps:",
        steps: [
          "Line 1 must be: import random",
          "Line 2 must be: secret = random.randint(1, 10)",
          "Check the if/else lines end with a colon :",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      containsCode: {
        message: "Set guess to 7 so you have the best shot at winning.",
        steps: [
          "Find: guess = 3",
          "Change the 3 to a 7",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      contains: {
        message: "Output doesn't show The number was yet.",
        steps: [
          "Make sure guess = 7 is set",
          "Press ▶ Run — if you don't win, press ▶ Run again (secret is random!)",
          "Keep running until Output says You win!",
        ],
      },
    },
    20: {
      runs: {
        message: "Your final project didn't run. Fix it with these steps:",
        steps: [
          "Check every print(...) line has matching quotes and parentheses",
          "Check the for loop line ends with a colon :",
          "Check import turtle is still on its own line",
          "Press ▶ Run and fix any red error message",
        ],
      },
      codeChanged: {
        message: "Make it about YOU — change the starter info.",
        steps: [
          "Change name, age, and hobbies to your own",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "Output needs at least 4 lines.",
        steps: [
          "Keep the About Me prints and the hobby loop",
          "Press ▶ Run and count the lines in Output",
        ],
      },
      usesTurtle: {
        message: "Your turtle drawing is missing.",
        steps: [
          "Keep: import turtle and t = turtle.Turtle()",
          "Pick your own t.color(...)",
          "Keep the for loop that draws the square",
        ],
      },
    },
    21: {
      runs: {
        message: "Python couldn't run your function. Fix it with these steps:",
        steps: [
          "Line 1 must start with def and end with a colon : like def add_numbers(a, b):",
          "The return line must be indented under def — scoot it to the right",
          "Check both parentheses ( ) are there after add_numbers",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Change the numbers so the total is different from the starter.",
        steps: [
          "Find: total = add_numbers(2, 5)",
          "Change 2 and 5 to two new numbers",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      contains: {
        message: "Your Output doesn't show The total is 20 yet.",
        steps: [
          "Pick two numbers that add up to 20, like add_numbers(12, 8)",
          "Change the numbers inside add_numbers( , )",
          "Press ▶ Run and check Output says The total is 20",
        ],
      },
    },
    22: {
      runs: {
        message: "Python couldn't run your dictionary code. Fix it with these steps:",
        steps: [
          "Check the dictionary uses curly braces { } like me = {\"name\": \"Alex\"}",
          "Use a colon : between each key and its value",
          "Put commas between key:value pairs",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      starterItemsChanged: {
        message: "Your dictionary still has the starter values.",
        steps: [
          "Change \"Your Name\" to your own name",
          "Change \"coding\" to your own hobby",
          "Keep the keys (name, age, hobby) the same — only change the values",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLength: {
        message: "Nothing showed in the Output box yet.",
        steps: [
          "Press ▶ Run first",
          "You should see Name, Age, and Hobby lines",
          "If Output is empty, check for a red error message above",
        ],
      },
    },
    23: {
      runs: {
        message: "Your while loop has a small bug. Follow these steps:",
        steps: [
          "Line 2 must be: while count <= 5:  (with a colon at the end!)",
          "Lines inside the loop must be indented — scoot them to the right",
          "Make sure count = count + 1 is INSIDE the loop, or it never stops",
          "Press ▶ Run and fix any red error message",
        ],
      },
      codeContains: {
        message: "The loop still stops at 5 instead of 8.",
        steps: [
          "Find: while count <= 5:",
          "Change the 5 to an 8",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      contains: {
        message: "Output doesn't show Count is 8 yet.",
        steps: [
          "Change while count <= 5: to while count <= 8:",
          "Keep count = count + 1 inside the loop so it keeps counting",
          "Press ▶ Run and check Output goes all the way to 8",
        ],
      },
    },
    24: {
      runs: {
        message: "Your nested loop has a small bug. Follow these steps:",
        steps: [
          "The outer loop: for row in range(rows):  needs a colon at the end",
          "The inner loop: for col in range(cols):  must be indented under the outer loop",
          "print(line) must line up with the inner loop, not inside it",
          "Press ▶ Run and fix any red error message",
        ],
      },
      codeContains: {
        message: "Your grid still uses the starter rows or cols numbers.",
        steps: [
          "Find: rows = 3 and change it to rows = 5",
          "Find: cols = 4 and change it to cols = 5",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "Output needs 5 rows of stars.",
        steps: [
          "Set rows = 5 so the outer loop runs 5 times",
          "Press ▶ Run and count the rows of stars in Output",
        ],
      },
    },
    25: {
      runs: {
        message: "Your try/except code needs these pieces. Follow these steps:",
        steps: [
          "Line 1 must be: try:  (with a colon at the end!)",
          "The line that starts except must match: except ZeroDivisionError:",
          "Lines inside try: and except: must be indented — scoot them to the right",
          "Press ▶ Run and fix any red error message",
        ],
      },
      codeContains: {
        message: "Your code still needs except ZeroDivisionError.",
        steps: [
          "Keep the line: except ZeroDivisionError:",
          "This catches the divide-by-zero problem so the program doesn't crash",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      starterItemsChanged: {
        message: "The except message is still the starter message.",
        steps: [
          "Find the print(...) line inside except:",
          "Change the message to your own funny line",
          "Keep the quotes around your message",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
    },
    26: {
      runs: {
        message: "Python couldn't run your list comprehension. Fix it with these steps:",
        steps: [
          "Check the brackets: evens = [n for n in nums if n % 2 == 0]",
          "for and if go inside the [ ] — no colon needed here",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Change the condition so it keeps different numbers.",
        steps: [
          "Find: if n % 2 == 0",
          "Change it to: if n > 2",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      contains: {
        message: "Output doesn't show [3, 4, 5] yet.",
        steps: [
          "Change n % 2 == 0 to n > 2 inside the [ ]",
          "Keep nums = [1, 2, 3, 4, 5] the same",
          "Press ▶ Run and check Output shows [3, 4, 5]",
        ],
      },
    },
    27: {
      runs: {
        message: "Python couldn't run your slicing code. Fix it with these steps:",
        steps: [
          "Check the colons inside the brackets: nums[1:4]",
          "Make sure every [ ] has a matching close bracket",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Change the first line to grab the LAST three numbers.",
        steps: [
          "Find: print(nums[1:4])",
          "Change it to: print(nums[-3:])",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      contains: {
        message: "Output doesn't show [40, 50, 60] yet.",
        steps: [
          "Change nums[1:4] to nums[-3:] on the first print line",
          "-3: means 'start 3 from the end, go to the end'",
          "Press ▶ Run and check Output shows [40, 50, 60]",
        ],
      },
    },
    28: {
      runs: {
        message: "Python couldn't run your tuples & sets code. Fix it with these steps:",
        steps: [
          "Tuples use ( ) — check point = (3, 4) has both parentheses",
          "set(...) needs a list inside its parentheses",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Change the point tuple and add a repeated number.",
        steps: [
          "Change point = (3, 4) to point = (7, 9)",
          "Add another repeated number to the numbers list",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      codeContains: {
        message: "Your code still needs both 7 and 9.",
        steps: [
          "Find: point = (3, 4)",
          "Change it to: point = (7, 9)",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
    },
    29: {
      runs: {
        message: "Python couldn't run your dictionary loop. Fix it with these steps:",
        steps: [
          "Line 3 must be: for name, score in scores.items():  (with a colon!)",
          "The print line under it must be indented",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Add a new player to the scores dictionary.",
        steps: [
          "Find: scores = {\"Ana\": 92, \"Sam\": 85, \"Kai\": 78}",
          "Add one more name and score, like \"Lee\": 95",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "Output needs at least 4 lines.",
        steps: [
          "Keep the for loop that prints every name and score",
          "Add another player so there's one more line of Output",
          "Press ▶ Run and count the lines",
        ],
      },
    },
    30: {
      runs: {
        message: "Python couldn't run your function. Fix it with these steps:",
        steps: [
          "Line 1 must be: def greet(name, greeting=\"Hello\"):  (with a colon!)",
          "The return line must be indented under def",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Call greet() a third time with your own name and greeting.",
        steps: [
          "Add a new line: print(greet(\"YourName\", \"Yo\"))",
          "Use your own name and greeting word",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "Output needs at least 3 lines.",
        steps: [
          "Keep both starter print(greet(...)) lines",
          "Add one more print(greet(...)) call",
          "Press ▶ Run and count the lines in Output",
        ],
      },
    },
    31: {
      runs: {
        message: "Python couldn't run your Robot class. Fix it with these steps:",
        steps: [
          "Line 1 must be: class Robot:  (with a colon!)",
          "def __init__(self, name, battery): needs self first, then a colon",
          "Every line inside __init__ must be indented",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Create a second Robot with your own name and battery level.",
        steps: [
          "Add: bot2 = Robot(\"YourName\", 50)",
          "Add: print(bot2.status())",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLines: {
        message: "Add both a new Robot and a print for it.",
        steps: [
          "Make a second robot: bot2 = Robot(\"YourName\", 50)",
          "Print its status: print(bot2.status())",
          "Press ▶ Run and check Output shows two robots",
        ],
      },
    },
    32: {
      runs: {
        message: "Python couldn't run your temperature code. Fix it with these steps:",
        steps: [
          "Check the for loop line ends with a colon :",
          "The f = c * 9 / 5 + 32 line must be indented under the for loop",
          "Press ▶ Run — fix any red error before Check my work",
        ],
      },
      codeChanged: {
        message: "Add one more temperature to the list.",
        steps: [
          "Find: temperatures_celsius = [0, 10, 20, 30, 40]",
          "Add another number, like 50",
          "Press ▶ Run, then ⭐ Check my work",
        ],
      },
      minLength: {
        message: "Nothing showed in the Output box yet.",
        steps: [
          "Press ▶ Run first",
          "You should see a list of Fahrenheit temperatures print",
          "If Output is empty, check for a red error message above",
        ],
      },
    },
  };

  const DEFAULTS = {
    runs: {
      message: "Your code didn't run yet. Try this:",
      steps: [
        "Read the red message in the Output box",
        "Check quotes come in pairs: \"like this\"",
        "Check spelling and colons (:) at the end of if/for lines",
        "Press ▶ Run again after each small fix",
      ],
    },
    codeChanged: {
      message: "Make the code your own — change something from the starter.",
      steps: [
        "Read the coding challenge card",
        "Change at least one line of code",
        "Press ▶ Run, then ⭐ Check my work",
      ],
    },
    starterItemsChanged: {
      message: "Swap the starter words for your own.",
      steps: [
        "Find the starter words in your code and replace them",
        "Press ▶ Run to test",
        "Press ⭐ Check my work when Output looks good",
      ],
    },
    containsCode: {
      message: "Your code is missing something important.",
      steps: [
        "Compare your code to the Example on the right",
        "Add the missing line the challenge asks for",
        "Press ▶ Run, then ⭐ Check my work",
      ],
    },
    minLines: {
      message: "You need more lines in Output.",
      steps: [
        "Add more print() lines, or fix your loop",
        "Press ▶ Run and count the lines in Output",
      ],
    },
    minLength: {
      message: "Nothing printed yet.",
      steps: ["Press ▶ Run first", "Fix any red errors", "Try again"],
    },
  };

  function get(lessonId, failedRule, context = {}) {
    const lessonGuide = GUIDES[lessonId]?.[failedRule] || DEFAULTS[failedRule];
    if (lessonGuide) {
      return { ...lessonGuide };
    }
    return {
      message: "Almost there! Try these steps:",
      steps: [
        "Read the coding challenge card",
        "Compare your code to the Example",
        "Press ▶ Run, then ⭐ Check my work",
        "Or tap ⏭️ Continue anyway to move on",
      ],
    };
  }

  return { get };
})();
