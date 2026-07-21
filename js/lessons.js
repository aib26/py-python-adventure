const PROGRESS_KEY = "kidsPythonProgress";

const LESSONS = [
  {
    id: 1,
    history: { year: "1991", fact: "Python was created by Guido van Rossum in 1991. He named it after the British comedy show Monty Python's Flying Circus — not the snake!" },
    title: "What is Python?",
    emoji: "🐍",
    summary: "Print your very first word on the screen!",
    bigIdea: "print() tells the computer to show words. That is your first coding trick!",
    thinkFirst: "Look at the word inside the quotes. What will show up when you press Run?",
    syntax: 'print("Hello!")',
    syntaxNote: "<code>print</code> shows words. Put your words inside quotes, like <code>\"Hi\"</code>.",
    steps: [
      { label: "Look", text: "Find the word Hello! inside the quotes." },
      { label: "Guess", text: "What do you think will show up?" },
      { label: "Run", text: "Press ▶ Run. You did it!" },
    ],
    story: `
      <p>Hi! I'm <strong>Py</strong>. I am so happy you're here!</p>
      <p>Python is a way to talk to computers. We type words, and the computer listens.</p>
      <p><code>print()</code> means "show this!" Put your words inside quotes, like <code>"Hi"</code>.</p>
      <p>Press the big ▶ Run button. Watch what happens!</p>
    `,
    tip: "Just press ▶ Run. You can't get this wrong!",
    exampleCode: 'print("Hello!")',
    starterCode: 'print("Hello!")',
    challenge: "Change Hello! to your name!",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLength", value: 1 },
    ],
    hint: "Keep print( and the quotes and ) exactly the same. Only swap out the word Hello for your name.",
  },
  {
    id: 2,
    history: { year: "1972", fact: "The very first program most coders ever write is \"Hello, World!\" — it comes from a 1972 guide written at Bell Labs." },
    title: "Say Hi Twice",
    emoji: "✌️",
    summary: "Print two lines, one after the other.",
    bigIdea: "Each print() makes one line. Two print()s make two lines!",
    thinkFirst: "There are two print lines below. How many lines will show up?",
    syntax: 'print("Hi!")\nprint("Bye!")',
    syntaxNote: "Write <code>print()</code>, then write another <code>print()</code> right under it.",
    steps: [
      { label: "Count", text: "How many print lines do you see? (It's 2!)" },
      { label: "Run", text: "Press ▶ Run. Count the lines in Output." },
      { label: "Change", text: "Change both lines to be about you." },
    ],
    story: `
      <p>Hi again! Py here. ✌️ Last time you printed one line.</p>
      <p>Now let's print two! The computer reads top to bottom, like a book.</p>
      <p>Each <code>print()</code> makes a new line. Two prints make two lines.</p>
      <p>Press ▶ Run. Count the lines!</p>
    `,
    tip: "Line 1 runs first. Then line 2 runs next.",
    exampleCode: `print("Hi!")
print("Bye!")`,
    starterCode: `print("Hi!")
print("Bye!")`,
    challenge: "Change both lines to say two things about you!",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 2 },
    ],
    hint: "Keep both print() lines. Just change the words inside.",
  },
  {
    id: 3,
    history: { year: "1948", fact: "The first computer that could store a program and change it — nicknamed the \"Manchester Baby\" — ran its first program in 1948." },
    title: "Your Very First Box",
    emoji: "🎁",
    summary: "Save a word in a box, then print it.",
    bigIdea: "A variable is like a box with a name. It holds something for you.",
    thinkFirst: "If my_name = \"Sam\", what will print(my_name) show?",
    syntax: 'my_name = "Alex"\nprint(my_name)',
    syntaxNote: "<code>=</code> puts a word in your box. Print the box name with no quotes to see inside.",
    steps: [
      { label: "Look", text: "Line 1 makes a box and puts a name inside." },
      { label: "Run", text: "Press ▶ Run. See your name show up!" },
      { label: "Change", text: "Put YOUR name in the box." },
    ],
    story: `
      <p>Hi! Py here. 📦 Today we make a box!</p>
      <p>A variable is like a box with a name on it. It holds something inside.</p>
      <p><code>my_name = "Alex"</code> puts the word Alex in a box called my_name.</p>
      <p><code>print(my_name)</code> shows what is inside the box.</p>
    `,
    tip: "Change the name in quotes. Keep print(my_name) the same.",
    exampleCode: `my_name = "Sam"
print(my_name)`,
    starterCode: `my_name = "Your Name"
print(my_name)`,
    challenge: "Put your real name in the box, then press ▶ Run.",
    checks: [
      { type: "runs" },
      { type: "starterItemsChanged", values: ["Your Name"] },
      { type: "minLength", value: 1 },
    ],
    hint: "Change the words Your Name to your real name. Keep print(my_name) the same.",
  },
  {
    id: 4,
    history: { year: "1843", fact: "The idea of a computer choosing between two paths goes all the way back to Ada Lovelace's notes in 1843 — often called the first computer program ever written." },
    title: "Yes or No",
    emoji: "✅",
    summary: "Meet True and False. Make the computer choose!",
    bigIdea: "True means yes. False means no. if picks the right message.",
    thinkFirst: "is_sunny is True. Which message do you think wins?",
    syntax: "if is_sunny:\n    print(\"Wear sunglasses!\")\nelse:\n    print(\"Bring an umbrella!\")",
    syntaxNote: "<code>True</code> means yes. <code>False</code> means no. The line under if must be indented.",
    steps: [
      { label: "Learn", text: "True means yes. False means no." },
      { label: "Guess", text: "is_sunny is True. Which message wins?" },
      { label: "Run", text: "Press ▶ Run and check!" },
    ],
    story: `
      <p>Hi friend! Py here. 🤗 Today: True and False!</p>
      <p>True means YES. False means NO. Just like a light switch.</p>
      <p><code>if</code> checks True or False. It picks the right message for you.</p>
      <p>Press ▶ Run and see which message wins!</p>
    `,
    tip: "True picks the top message. False picks the bottom one.",
    exampleCode: `is_sunny = True

if is_sunny:
    print("Wear sunglasses!")
else:
    print("Bring an umbrella!")`,
    starterCode: `is_sunny = True

if is_sunny:
    print("Wear sunglasses!")
else:
    print("Bring an umbrella!")`,
    challenge: "Change True to False. Watch the message change!",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "False" },
      { type: "contains", value: "Bring an umbrella!" },
    ],
    hint: "Change True to False on line 1.",
  },
  {
    id: 5,
    history: { year: "1945", fact: "Loops were crucial to ENIAC, one of the first electronic computers (1945) — but \"programming\" it meant physically rewiring cables, not typing code!" },
    title: "Do It 3 Times",
    emoji: "3️⃣",
    summary: "Repeat one line 3 times with a loop!",
    bigIdea: "for i in range(3): repeats a line 3 times. No retyping!",
    thinkFirst: "range(3) means 3 trips. How many times will it print?",
    syntax: "for i in range(3):\n    print(\"Hooray!\")",
    syntaxNote: "The line under for: must be indented. Don't forget the colon :",
    steps: [
      { label: "Look", text: "range(3) means 3 times." },
      { label: "Guess", text: "How many times will Hooray! print?" },
      { label: "Run", text: "Press ▶ Run and count!" },
    ],
    story: `
      <p>Hi coder! Py here. 🔁 Watch this shortcut!</p>
      <p>A for loop repeats a line for you. No retyping needed!</p>
      <p><code>for i in range(3):</code> means "do this 3 times."</p>
      <p>Press ▶ Run and count how many times it prints!</p>
    `,
    tip: "Keep the for line the same. Just change the word in quotes.",
    exampleCode: `for i in range(3):
    print("Hooray!")`,
    starterCode: `for i in range(3):
    print("Hooray!")`,
    challenge: "Change Hooray! to your own cheer!",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 3 },
    ],
    hint: "Just change the word inside the quotes.",
  },
  {
    id: 6,
    history: { year: "1950s", fact: "Before screens were common, early computers showed their output on paper — a printer really did \"print\" every line." },
    title: "Meet Python",
    emoji: "👋",
    summary: "Say hello to your first line of code!",
    bigIdea: "Python reads your code from top to bottom, one line at a time.",
    thinkFirst: "Before you press Run — what words do you think will show up?",
    syntax: 'print("Hello!")',
    syntaxNote: "<code>print</code> shows text. Put words in quotes like <code>\"Hi\"</code>.",
    steps: [
      { label: "Look", text: "Find <code>print()</code> and the words in quotes." },
      { label: "Guess", text: "What will appear in Output?" },
      { label: "Run", text: "Press ▶ Run. Were you right? Change the words to your name and run again!" },
    ],
    story: `
      <p>Hi! I'm <strong>Py the Python</strong>. Python is a language that tells computers what to do — like giving a robot a recipe!</p>
      <p>Today we'll use <code>print()</code> to make the computer talk. Whatever you put inside the parentheses gets shown on the screen.</p>
      <p>Look at the code on the right — it already says <code>Hello!</code>. Your job: change it to say something about <strong>you</strong>, then press ▶ Run!</p>
    `,
    tip: "Change the words inside the quotes, then press Run.",
    exampleCode: 'print("Hello!")',
    starterCode: 'print("Hello!")',
    challenge: "Change it so the computer prints YOUR name.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "outputNotEquals", value: "Hello!" },
      { type: "minLength", value: 1 },
    ],
    hint: "Keep print() and the quotes — only change the words inside.",
  },
  {
    id: 7,
    history: { year: "1951", fact: "Early computers like UNIVAC I (1951) displayed output using blinking lights or punched paper tape — no monitors yet!" },
    title: "More print() Lines",
    emoji: "💬",
    summary: "Print more than one line.",
    bigIdea: "Each print() makes a new line. Line 1 runs, then line 2, then line 3.",
    thinkFirst: "There are 3 print lines. How many lines will show in Output?",
    syntax: 'print("Your words here")',
    syntaxNote: "Text in quotes is called a <strong>string</strong>. Each print = one new line.",
    steps: [
      { label: "Count", text: "How many print() lines do you see?" },
      { label: "Run", text: "Press ▶ Run. Count the lines in Output." },
      { label: "Change", text: "Write your own 3-line poem or joke." },
    ],
    story: `
      <p>Hey, it's Py again! Last time you made the computer say one thing. Today we'll make it say <strong>three things</strong>.</p>
      <p>Each <code>print()</code> line is like writing on its own line of paper — first message, then the next, then the next. Python reads your code from top to bottom, just like following steps in order.</p>
      <p>Press ▶ Run and count how many lines show up in the Output box!</p>
    `,
    tip: "Read your code from top to bottom.",
    exampleCode: `print("Roses are red")
print("Violets are blue")
print("I love to code!")`,
    starterCode: `print("Line 1")
print("Line 2")
print("Line 3")`,
    challenge: "Write a silly 3-line poem. Change all three lines!",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 3 },
    ],
    hint: "Keep three print() lines. Only change the words inside quotes.",
  },
  {
    id: 8,
    history: { year: "1957", fact: "FORTRAN (1957) was one of the first languages that let programmers name their variables, instead of just numbered memory slots." },
    title: "Variables",
    emoji: "📦",
    summary: "Save stuff in variables and use them later.",
    bigIdea: "A variable is a name for a value. <code>name = \"Alex\"</code> saves your name so you can use it again.",
    thinkFirst: "If name = \"River\", will print(name) show River or the word name?",
    syntax: 'name = "Alex"',
    syntaxNote: "<code>=</code> saves a value. <code>print(name)</code> shows what's saved — no quotes on the variable!",
    steps: [
      { label: "Look", text: "See name, age, and favorite_color on lines 1–3." },
      { label: "Run", text: "Press ▶ Run. Do the prints match what you saved?" },
      { label: "Change", text: "Put YOUR info on the right side of each = sign." },
    ],
    story: `
      <p>Welcome back! Py here. 📦</p>
      <p>Sometimes you want Python to <strong>remember</strong> something — your name, your score, your favorite color. That's what a <strong>variable</strong> does. Think of it like a labeled box: <code>name = "Alex"</code> puts your name in the box called <code>name</code>.</p>
      <p>Later you open the box with <code>print(name)</code> — no quotes around the box name! Let's fill in the boxes with info about you.</p>
    `,
    tip: "Change the value after =, not the variable name.",
    exampleCode: `name = "Sam"
age = 8
print("Hi, my name is", name)
print("I am", age, "years old")`,
    starterCode: `name = "Your Name"
age = 7
favorite_color = "blue"

print("Hi, my name is", name)
print("I am", age, "years old")
print("My favorite color is", favorite_color)`,
    challenge: "Change the variables to tell us about YOU.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 3 },
    ],
    hint: "Edit lines 1–3. Keep the print lines.",
  },
  {
    id: 9,
    history: { year: "1942", fact: "One of the first electronic calculating machines, the Atanasoff-Berry Computer, was built in 1942 just to solve math equations." },
    title: "Math in Python",
    emoji: "🔢",
    summary: "Add, subtract, multiply, and divide.",
    bigIdea: "Python can do math with <code>+ - * /</code>. You can save answers in variables.",
    thinkFirst: "12 slices ÷ 3 friends. What should each person get? Guess before you run!",
    syntax: "answer = 10 + 5",
    syntaxNote: "<code>*</code> means multiply. <code>/</code> means divide.",
    steps: [
      { label: "Guess", text: "Do the pizza math in your head first." },
      { label: "Run", text: "Does each_gets match your answer?" },
      { label: "Change", text: "Try 18 slices and 6 friends." },
    ],
    story: `
      <p>Hi! Py checking in.</p>
      <p>Python isn't just for words — it's great at <strong>math</strong> too! You can add (+), subtract (-), multiply (*), and divide (/).</p>
      <p>Today we're sharing pizza slices fairly. Python does the division for you — just press ▶ Run and see if the answer matches your guess!</p>
    `,
    tip: "Do the math on paper first, then check the code.",
    exampleCode: `slices = 8
friends = 4
each_gets = slices / friends
print("Each friend gets", each_gets, "slices")`,
    starterCode: `pizza_slices = 12
friends = 3
each_gets = pizza_slices / friends

print("We have", pizza_slices, "slices")
print("We have", friends, "friends")
print("Each friend gets", each_gets, "slices")`,
    challenge: "Change to 18 slices and 6 friends. Each should get 3.",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "18" },
      { type: "codeContains", value: "6" },
    ],
    hint: "Set pizza_slices = 18 and friends = 6.",
  },
  {
    id: 10,
    history: { year: "1952", fact: "Grace Hopper helped build the first compiler in 1952 — a program that turns human-readable code into instructions a computer understands." },
    title: "Change Variables",
    emoji: "📖",
    summary: "Swap words to make a silly story.",
    bigIdea: "You can change what's in a variable. Python always uses the newest value.",
    thinkFirst: "If animal = \"cat\" then animal = \"dragon\", which one prints?",
    syntax: 'animal = "cat"',
    syntaxNote: "Change the words on the right side of = to make a new story.",
    steps: [
      { label: "Run", text: "Run the starter story once." },
      { label: "Change", text: "Pick funny words for animal, food, and place." },
      { label: "Run", text: "Run again. Same code, new story!" },
    ],
    story: `
      <p>Hey coder! It's Py.</p>
      <p>Remember variables? You can swap what's inside them anytime — and the whole story changes! It's like mad-libs: same sentences, silly new words.</p>
      <p>Change <code>animal</code>, <code>food</code>, and <code>place</code> to make a story that makes <strong>you</strong> laugh.</p>
    `,
    tip: "Only change values after =, not the print lines.",
    exampleCode: `animal = "penguin"
food = "pickles"
print("My pet", animal, "loves to eat", food)`,
    starterCode: `animal = "cat"
food = "pizza"
place = "the moon"

print("Yesterday I saw a", animal)
print("It was eating", food)
print("On", place, "!")`,
    challenge: "Make a funny 3-line story with your own words.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 3 },
    ],
    hint: "Change animal, food, and place on lines 1–3.",
  },
  {
    id: 11,
    history: { year: "1801", fact: "Punch cards with holes for \"yes\" and blanks for \"no\" were used in weaving looms as early as 1801 — a mechanical version of True and False!" },
    title: "if and else",
    emoji: "🤔",
    summary: "Help the computer pick between two choices.",
    bigIdea: "if asks a yes/no question. True runs the if part. False runs the else part.",
    thinkFirst: "homework_done is True. Which message will print — dessert or homework?",
    syntax: "if homework_done:\n    print(\"Yes!\")\nelse:\n    print(\"Nope\")",
    syntaxNote: "Lines under if: must be scooted right (indented). Don't forget the colon :",
    steps: [
      { label: "Guess", text: "True or False — which part runs?" },
      { label: "Run", text: "Press ▶ Run. Check Output." },
      { label: "Change", text: "Set homework_done to False and run again." },
    ],
    story: `
      <p>Py here! Sometimes the computer needs to make a <strong>choice</strong>.</p>
      <p><code>if</code> asks a yes/no question. If the answer is <code>True</code>, Python runs the if part. If it's <code>False</code>, Python runs the <code>else</code> part instead.</p>
      <p>It's like: "If homework is done → dessert. Else → keep working." Let's see which path your code picks!</p>
    `,
    tip: "True = yes, runs if. False = no, runs else.",
    exampleCode: `homework_done = True

if homework_done:
    print("Yes! Dessert time!")
else:
    print("Finish homework first.")`,
    starterCode: `homework_done = True

if homework_done:
    print("Yes! Dessert time!")
else:
    print("Finish homework first.")`,
    challenge: "Change homework_done to False. You should see the else message.",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "False" },
      { type: "contains", value: "Finish homework first." },
    ],
    hint: "Change True to False (capital F).",
  },
  {
    id: 12,
    history: { year: "1950s", fact: "The word \"loop\" comes from real loops of punched paper tape that early computers fed through again and again to repeat instructions." },
    title: "Loops",
    emoji: "🔁",
    summary: "Repeat code with a for loop.",
    bigIdea: "<code>for i in range(5):</code> runs the loop body 5 times.",
    thinkFirst: "How many times will the loop print? What numbers will you see?",
    syntax: "for i in range(5):\n    print(i)",
    syntaxNote: "Lines under for: must be indented (scooted right).",
    steps: [
      { label: "Guess", text: "range(5) means 5 trips. How many lines print?" },
      { label: "Run", text: "Count the lines in Output." },
      { label: "Change", text: "Make a countdown, then print Go! after the loop." },
    ],
    story: `
      <p>Hi! Tired of typing the same thing over and over? Py has a shortcut: <strong>loops</strong>!</p>
      <p>A <code>for</code> loop repeats code for you. <code>for i in range(5):</code> means "do this 5 times." Lines under the loop are scooted to the right — that's called <strong>indenting</strong>.</p>
      <p>Watch the Output box — you'll see the loop run again and again!</p>
    `,
    tip: "Lines under for: must be indented.",
    exampleCode: `for i in range(5):
    print("Blast off in", 5 - i)`,
    starterCode: `for i in range(5):
    print("Count:", i)

print("Go!")`,
    challenge: "Count down 5 to 1, then print Go! on its own line.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "contains", value: "Go!" },
    ],
    hint: "Try print(5 - i) in the loop. print(\"Go!\") goes OUTSIDE the loop.",
  },
  {
    id: 13,
    history: { year: "1958", fact: "Lisp, one of the first languages built around lists, was created in 1958 by John McCarthy — a founder of AI research." },
    title: "Lists",
    emoji: "🛒",
    summary: "Keep a list of items together.",
    bigIdea: "A list holds items in order: <code>[\"milk\", \"eggs\"]</code>. The first item is <code>[0]</code> — computers start at 0!",
    thinkFirst: "What are the 3 foods in the list? What will item [0] print?",
    syntax: 'foods = ["pizza", "tacos", "sushi"]',
    syntaxNote: "Use [ ] and commas. First item = [0], second = [1], third = [2].",
    steps: [
      { label: "Look", text: "Read the list on line 1." },
      { label: "Run", text: "See how [0], [1], [2] pick each item." },
      { label: "Change", text: "Put 3 foods YOU like in the list." },
    ],
    story: `
      <p>Hey! Py again. 🛒</p>
      <p>A <strong>list</strong> holds lots of items in one place — like a shopping list or a playlist. We write lists with square brackets: <code>["milk", "eggs", "bread"]</code>.</p>
      <p>Here's a funny thing: the <strong>first</strong> item is <code>[0]</code>, not [1]. Computers like to start counting at zero!</p>
    `,
    tip: "First item is [0], not [1]!",
    exampleCode: `snacks = ["apple", "crackers", "juice"]
print("First snack:", snacks[0])
print("Second snack:", snacks[1])`,
    starterCode: `shopping = ["milk", "eggs", "bread"]

print("Item 1:", shopping[0])
print("Item 2:", shopping[1])
print("Item 3:", shopping[2])`,
    challenge: "Replace milk, eggs, and bread with foods you like.",
    checks: [
      { type: "runs" },
      {
        type: "starterItemsChanged",
        values: ["milk", "eggs", "bread"],
        hint: "Change at least one food on line 1!",
      },
      { type: "minLength", value: 1 },
    ],
    hint: "Only edit line 1. Keep the brackets and commas.",
  },
  {
    id: 14,
    history: { year: "1969", fact: "Margaret Hamilton led the team that hand-wrote the software for the Apollo 11 Moon landing in 1969 — the code listings were stacked taller than she was!" },
    title: "Loop a List",
    emoji: "🐾",
    summary: "Print every item in a list with a loop.",
    bigIdea: "<code>for animal in animals:</code> visits each item in the list one by one.",
    thinkFirst: "3 animals in the list. How many lines will print?",
    syntax: "for item in my_list:\n    print(item)",
    syntaxNote: "The word after for (like animal) is just a nickname for each item.",
    steps: [
      { label: "Guess", text: "How many print lines will you get?" },
      { label: "Run", text: "Check Output — one line per animal." },
      { label: "Change", text: "Use your own 3 animals." },
    ],
    story: `
      <p>Welcome back! Remember lists? Today we visit <strong>every item</strong> in a list automatically.</p>
      <p><code>for animal in animals:</code> means "for each animal in the list, do this." One loop can print your whole animal parade — no need to write a separate print for each one!</p>
    `,
    tip: "Change the list. Keep the for loop.",
    exampleCode: `animals = ["cat", "dog", "hamster"]
for pet in animals:
    print("I love my", pet)`,
    starterCode: `animals = ["lion", "zebra", "penguin"]

for animal in animals:
    print("Look, a", animal, "!")`,
    challenge: "Use your own animals and print a parade!",
    checks: [
      { type: "runs" },
      { type: "starterItemsChanged", values: ["lion", "zebra", "penguin"] },
      { type: "containsCode", value: "for" },
      { type: "minLength", value: 1 },
    ],
    hint: "Change line 1. Keep the for loop.",
  },
  {
    id: 15,
    history: { year: "1967", fact: "Turtle graphics were invented in 1967 by Seymour Papert for a language called Logo — built to teach kids to code by moving a turtle." },
    title: "Turtle Square",
    emoji: "🐢",
    summary: "Draw a square with the turtle.",
    bigIdea: "<code>forward()</code> moves. <code>right(90)</code> turns. Do both 4 times = square!",
    thinkFirst: "4 sides, 4 turns. What shape will appear?",
    syntax: "t.forward(100)\nt.right(90)",
    syntaxNote: "Always start with <code>import turtle</code> and <code>t = turtle.Turtle()</code>.",
    steps: [
      { label: "Run", text: "Press ▶ Run. Look at the canvas below." },
      { label: "Change", text: "Pick your favorite color instead of purple." },
      { label: "Run", text: "Same square, new color!" },
    ],
    story: `
      <p>Big day — we're making <strong>art with code</strong>! 🐢</p>
      <p>Python has a turtle that draws as it moves. <code>forward()</code> walks forward. <code>right(90)</code> turns right. Do both 4 times and you get a square!</p>
      <p>Press ▶ Run and look at the <strong>canvas below</strong> — your drawing shows up there. Empty Output is totally OK!</p>
    `,
    tip: "Check the canvas below — empty Output is OK!",
    exampleCode: `import turtle
t = turtle.Turtle()
t.color("blue")
for side in range(4):
    t.forward(80)
    t.right(90)`,
    starterCode: `import turtle
t = turtle.Turtle()
t.color("purple")

for side in range(4):
    t.forward(100)
    t.right(90)`,
    challenge: "Draw the square and change purple to your color.",
    checks: [
      { type: "runs" },
      { type: "usesTurtle" },
      { type: "containsCode", value: "forward" },
      { type: "containsCode", value: "right" },
      { type: "starterItemsChanged", values: ["purple"] },
    ],
    hint: "Change t.color(\"purple\") only.",
    hasTurtle: true,
  },
  {
    id: 16,
    history: { year: "1960s", fact: "The very first \"turtle\" wasn't on a screen at all — it was a real robot named Irving that rolled around drawing on paper!" },
    title: "Turtle Turns",
    emoji: "↩️",
    summary: "Turn left and right to draw a triangle.",
    bigIdea: "<code>left()</code> and <code>right()</code> spin the turtle. A triangle uses <code>left(120)</code> three times.",
    thinkFirst: "3 sides, 3 turns. What shape will you get?",
    syntax: "t.left(120)\nt.forward(100)",
    syntaxNote: "A triangle needs 120° turns (360 ÷ 3 = 120).",
    steps: [
      { label: "Run", text: "See the triangle on the canvas." },
      { label: "Change", text: "Swap blue for your favorite color." },
      { label: "Run", text: "Your triangle, your color!" },
    ],
    story: `
      <p>Py here! Your turtle can turn <strong>left</strong> and <strong>right</strong>.</p>
      <p>A square uses <code>right(90)</code> four times. A triangle needs <code>left(120)</code> three times — because 360 ÷ 3 = 120. Different shape, different turn!</p>
      <p>Run the code and see the triangle appear on the canvas.</p>
    `,
    tip: "3 sides → left(120) three times.",
    exampleCode: `import turtle
t = turtle.Turtle()
t.color("green")
for side in range(3):
    t.forward(100)
    t.left(120)`,
    starterCode: `import turtle
t = turtle.Turtle()
t.color("blue")

for side in range(3):
    t.forward(100)
    t.left(120)`,
    challenge: "Draw the triangle and change blue to your favorite color.",
    checks: [
      { type: "runs" },
      { type: "usesTurtle" },
      { type: "containsCode", value: "left" },
      { type: "containsCode", value: "forward" },
      { type: "starterItemsChanged", values: ["blue"] },
    ],
    hint: "Change t.color(\"blue\"). Keep left(120) and the loop.",
    hasTurtle: true,
  },
  {
    id: 17,
    history: { year: "1967", fact: "Logo and turtle graphics were among the first programming tools ever designed specifically for children — decades before apps like this one." },
    title: "Turtle Zigzag",
    emoji: "↔️",
    summary: "Go forward and backward to make zigzag lines.",
    bigIdea: "<code>backward()</code> moves the turtle back but still draws a line.",
    thinkFirst: "Forward, turn, back, turn, forward. What path will the turtle draw?",
    syntax: "t.forward(50)\nt.backward(50)",
    syntaxNote: "Mix forward, backward, and turns to make cool paths.",
    steps: [
      { label: "Run", text: "See the zigzag on the canvas." },
      { label: "Change", text: "Pick your color instead of teal." },
      { label: "Add", text: "Add one more forward or backward at the end." },
    ],
    story: `
      <p>Hey artist! Today your turtle can go <strong>backward</strong> as well as forward — and it still draws a line!</p>
      <p>Mix <code>forward</code>, <code>backward</code>, and turns to make zigzag paths. Run first to see the shape, then add your own move at the end.</p>
    `,
    tip: "Run first, then add your own line at the end.",
    exampleCode: `import turtle
t = turtle.Turtle()
t.color("red")
t.forward(80)
t.right(90)
t.backward(60)
t.left(90)
t.forward(80)`,
    starterCode: `import turtle
t = turtle.Turtle()
t.color("teal")

t.forward(80)
t.right(90)
t.backward(60)
t.left(90)
t.forward(80)`,
    challenge: "Change teal to your color and add one more forward or backward.",
    checks: [
      { type: "runs" },
      { type: "usesTurtle" },
      { type: "containsCode", value: "backward" },
      { type: "containsCode", value: "forward" },
      { type: "starterItemsChanged", values: ["teal"] },
    ],
    hint: "New color + add t.forward(40) or t.backward(40) at the end.",
    hasTurtle: true,
  },
  {
    id: 18,
    history: { year: "1959", fact: "Early robotic drawing machines called plotters (some from the late 1950s) used a real pen that lifted and lowered — just like penup() and pendown()." },
    title: "Turtle Jump",
    emoji: "✏️",
    summary: "Move without drawing using penup and pendown.",
    bigIdea: "<code>penup()</code> lifts the pen — no line. <code>pendown()</code> draws again.",
    thinkFirst: "Two lines with a gap in the middle. Which move happens while the pen is up?",
    syntax: "t.penup()\nt.pendown()",
    syntaxNote: "Draw → lift pen → jump → lower pen → draw again.",
    steps: [
      { label: "Run", text: "See two lines with a gap between them." },
      { label: "Change", text: "Pick your color instead of gold." },
      { label: "Widen", text: "Change the gap from 50 to 80." },
    ],
    story: `
      <p>Py here! Want a gap between lines? Lift the turtle's pen!</p>
      <p><code>penup()</code> lifts the pen off the paper — the turtle moves but doesn't draw. <code>pendown()</code> puts the pen back down. Think: draw → lift → jump → lower → draw!</p>
    `,
    tip: "Draw, lift, jump, lower, draw!",
    exampleCode: `import turtle
t = turtle.Turtle()
t.color("orange")
t.forward(60)
t.penup()
t.forward(40)
t.pendown()
t.forward(60)`,
    starterCode: `import turtle
t = turtle.Turtle()
t.color("gold")

t.forward(70)
t.penup()
t.forward(50)
t.pendown()
t.forward(70)`,
    challenge: "Change gold to your color and widen the gap (50 → 80).",
    checks: [
      { type: "runs" },
      { type: "usesTurtle" },
      { type: "containsCode", value: "penup" },
      { type: "containsCode", value: "pendown" },
      { type: "starterItemsChanged", values: ["gold"] },
      { type: "codeContains", value: "80" },
    ],
    hint: "New color + change 50 to 80 between penup and pendown.",
    hasTurtle: true,
  },
  {
    id: 19,
    history: { year: "1957", fact: "Early \"random\" numbers in computing weren't random at all at first — some machines used real electrical noise from vacuum tubes to generate true randomness." },
    title: "Guess the Number",
    emoji: "🎲",
    summary: "Use random numbers to make a guessing game.",
    bigIdea: "<code>random.randint(1, 10)</code> picks a surprise number. <code>if guess == secret:</code> checks if you got it!",
    thinkFirst: "Secret changes every run. Will guess = 3 always win?",
    syntax: "import random\nsecret = random.randint(1, 10)",
    syntaxNote: "<code>==</code> checks if two things match. Run a few times — the secret changes!",
    steps: [
      { label: "Read", text: "Secret is 1–10. Guess is 3 right now." },
      { label: "Run", text: "Run 3 times. See different secrets?" },
      { label: "Win", text: "Set guess = 7 and run until you win!" },
    ],
    story: `
      <p>Game time! 🎲 Py here.</p>
      <p><code>random.randint(1, 10)</code> picks a surprise number between 1 and 10. Pair it with <code>if guess == secret:</code> and you have a guessing game!</p>
      <p>Run your code a few times — the secret number changes every time. That's what makes it fun!</p>
    `,
    tip: "Run more than once. Random means different answers each time!",
    exampleCode: `import random
secret = random.randint(1, 10)
guess = 7

if guess == secret:
    print("You win! The number was", secret)
else:
    print("Not quite! The number was", secret)`,
    starterCode: `import random
secret = random.randint(1, 10)
guess = 3

if guess == secret:
    print("You win! The number was", secret)
else:
    print("Not quite! The number was", secret)`,
    challenge: "Set guess to 7 and run until you see You win!",
    checks: [
      { type: "runs" },
      { type: "containsCode", value: "guess = 7" },
      { type: "contains", value: "The number was" },
    ],
    hint: "guess = 7. Run again if you lose — secret is random!",
  },
  {
    id: 20,
    history: { year: "Today", fact: "Python is now one of the most-used languages on Earth — it helps run everything from Instagram to NASA's Mars rovers." },
    title: "Your Project",
    emoji: "🎉",
    summary: "Put it all together — your About Me poster plus turtle art!",
    bigIdea: "Use variables, print, loops, and turtle in one project. Change one part at a time.",
    thinkFirst: "What will you change first — your name, hobbies, or turtle color?",
    syntax: "name = \"You\"\nprint(name)\nimport turtle",
    syntaxNote: "Edit your info first, run to check, then change the turtle color.",
    steps: [
      { label: "You", text: "Change name, age, and hobbies to match you." },
      { label: "Run", text: "Check the About Me text in Output." },
      { label: "Draw", text: "Pick your turtle color and run again!" },
    ],
    story: `
      <p>You made it — the final project! 🎉 Py is so proud of you.</p>
      <p>Today you mix <strong>everything</strong> you learned: variables, print, a loop, and turtle art. Change one part at a time and press ▶ Run after each edit.</p>
      <p>Make it all about <strong>YOU</strong> — your name, your hobbies, your turtle color. This is your coding poster!</p>
    `,
    tip: "One change at a time. Run after each edit.",
    exampleCode: `name = "Coder"
hobbies = ["reading", "drawing", "coding"]

print("About me:", name)
for hobby in hobbies:
    print("I like", hobby)`,
    starterCode: `name = "Your Name"
age = 8
hobbies = ["soccer", "art", "music"]

print("=== About Me ===")
print("Name:", name)
print("Age:", age)

for hobby in hobbies:
    print("I love", hobby)

import turtle
t = turtle.Turtle()
t.color("orange")
for side in range(4):
    t.forward(60)
    t.right(90)`,
    challenge: "Make it about YOU: name, age, hobbies, and your own turtle color!",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 4 },
      { type: "usesTurtle", value: true },
    ],
    hint: "Variables first, run, then turtle color. One step at a time!",
    hasTurtle: true,
  },
  {
    id: 21,
    history: { year: "1843", fact: "The idea of a reusable block of code — what we now call a function — traces back to Ada Lovelace's 1843 notes on Charles Babbage's Analytical Engine." },
    title: "Functions",
    emoji: "🧰",
    summary: "Package up code so you can reuse it anytime.",
    bigIdea: "A function is a mini recipe you can run again and again. def creates it, and return hands back an answer.",
    thinkFirst: "add_numbers(2, 5) adds two numbers. What do you think it hands back?",
    syntax: "def add_numbers(a, b):\n    return a + b",
    syntaxNote: "<code>def</code> starts a function. <code>return</code> hands back an answer you can use.",
    steps: [
      { label: "Look", text: "Find def add_numbers(a, b): and the return line under it." },
      { label: "Run", text: "Press ▶ Run. Check that total matches the numbers you gave it." },
      { label: "Change", text: "Pick two numbers that add up to 20." },
    ],
    story: `
      <p>Hi! Py here. 🧰 Ever wish you could save a chunk of code and use it again without retyping it? That's exactly what a <strong>function</strong> does!</p>
      <p><code>def</code> starts a function — think of it like writing a recipe card. The words in parentheses, like <code>a</code> and <code>b</code>, are <strong>parameters</strong>: ingredients you plug in each time you use the recipe.</p>
      <p><code>return</code> hands the answer back so you can use it later, like printing it or saving it in a variable. Let's make a function that adds two numbers!</p>
    `,
    tip: "return hands back an answer. print() just shows something.",
    exampleCode: `def add_numbers(a, b):
    return a + b

total = add_numbers(3, 4)
print("The total is", total)`,
    starterCode: `def add_numbers(a, b):
    return a + b

total = add_numbers(2, 5)
print("The total is", total)`,
    challenge: "Change the numbers so the total is 20.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "contains", value: "The total is 20" },
    ],
    hint: "Change the numbers inside add_numbers( , ) so they add up to 20, like add_numbers(12, 8).",
  },
  {
    id: 22,
    history: { year: "1953", fact: "The hash table, the clever trick Python dictionaries are built on, was invented in 1953 by IBM researcher Hans Peter Luhn." },
    title: "Dictionaries",
    emoji: "🗂️",
    summary: "Store info as key and value pairs.",
    bigIdea: "A dictionary stores pairs like a label and its value: me[\"name\"] looks up the value saved under the key \"name\".",
    thinkFirst: "me[\"name\"] prints Your Name. What do you think me[\"hobby\"] will print?",
    syntax: 'me = {"name": "Alex", "age": 8}\nprint(me["name"])',
    syntaxNote: "Use curly braces { } with key:value pairs. Look up a value with dict[\"key\"] — no numbers needed!",
    steps: [
      { label: "Look", text: "See the keys name, age, and hobby inside the curly braces." },
      { label: "Run", text: "Press ▶ Run. Each line looks up a value by its key." },
      { label: "Change", text: "Change the values to describe YOU." },
    ],
    story: `
      <p>Hey coder! Py here. 🗂️ Remember lists, where you find items by position, like [0]? A <strong>dictionary</strong> is different — you find things by a <strong>key</strong>, like a labeled drawer in a filing cabinet.</p>
      <p><code>me = {"name": "Alex", "age": 8}</code> makes a dictionary with two keys: <code>"name"</code> and <code>"age"</code>. To open a drawer, use <code>me["name"]</code> — that gives you back <code>"Alex"</code>.</p>
      <p>No more counting positions — just ask for the key you want, and the dictionary hands you the value!</p>
    `,
    tip: "Look up a value with its key name, not a number.",
    exampleCode: `pet = {"name": "Rex", "type": "dog", "age": 3}
print("Name:", pet["name"])
print("Type:", pet["type"])
print("Age:", pet["age"])`,
    starterCode: `me = {"name": "Your Name", "age": 8, "hobby": "coding"}

print("Name:", me["name"])
print("Age:", me["age"])
print("Hobby:", me["hobby"])`,
    challenge: "Change the values in the dictionary to describe YOU.",
    checks: [
      { type: "runs" },
      { type: "starterItemsChanged", values: ["Your Name", "coding"] },
      { type: "minLength", value: 1 },
    ],
    hint: "Change the values after the colons — keep the keys (name, age, hobby) the same.",
  },
  {
    id: 23,
    history: { year: "1988", fact: "In 1988, a program called the Morris Worm spread across the early internet, partly because it kept looping without a proper stopping point — a reminder of why loops need good conditions!" },
    title: "While Loops",
    emoji: "⏳",
    summary: "Repeat code while something is still true.",
    bigIdea: "A while loop keeps going as long as its condition is True. Change the variable inside the loop, or it never stops!",
    thinkFirst: "count starts at 1 and stops after count is bigger than 5. How many times will it print?",
    syntax: "count = 1\nwhile count <= 5:\n    print(count)\n    count = count + 1",
    syntaxNote: "Don't forget to change the variable inside the loop — that's what makes it stop!",
    steps: [
      { label: "Guess", text: "count starts at 1 and stops after 5. How many lines print?" },
      { label: "Run", text: "Press ▶ Run and count the lines in Output." },
      { label: "Change", text: "Make the loop count all the way up to 8." },
    ],
    story: `
      <p>Py here! ⏳ A <code>for</code> loop repeats a set number of times. A <strong>while</strong> loop is different — it keeps going <em>while</em> something is still true, kind of like "keep hopping while you still have energy!"</p>
      <p><code>while count <= 5:</code> means "keep looping as long as count is 5 or less." Inside the loop we write <code>count = count + 1</code> so count keeps growing — that's super important, or the loop would just keep going and going!</p>
      <p>Let's count up together and watch the loop stop right on time.</p>
    `,
    tip: "Always change the variable inside the loop, or it never stops!",
    exampleCode: `count = 1
while count <= 3:
    print("Count is", count)
    count = count + 1`,
    starterCode: `count = 1
while count <= 5:
    print("Count is", count)
    count = count + 1

print("Done counting!")`,
    challenge: "Change the loop so it counts all the way up to 8.",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "count <= 8" },
      { type: "contains", value: "Count is 8" },
    ],
    hint: "Change while count <= 5: to while count <= 8:",
  },
  {
    id: 24,
    history: { year: "1969", fact: "The Apollo Guidance Computer that helped land astronauts on the Moon in 1969 used nested logic to juggle thousands of calculations at once." },
    title: "Nested Loops",
    emoji: "⭐",
    summary: "Put a loop inside a loop to make patterns.",
    bigIdea: "A loop inside another loop is a nested loop. The inner loop finishes completely before the outer loop moves to its next round.",
    thinkFirst: "The outer loop runs 3 times, and the inner loop runs 4 times each round. How many stars total?",
    syntax: 'for row in range(3):\n    line = ""\n    for col in range(4):\n        line = line + "*"\n    print(line)',
    syntaxNote: "The inner for loop is indented under the outer for loop — one loop tucked inside another!",
    steps: [
      { label: "Look", text: "Find the inner for loop tucked inside the outer for loop." },
      { label: "Run", text: "Press ▶ Run and see the grid of stars appear." },
      { label: "Change", text: "Make rows and cols both 5 to draw a 5x5 square." },
    ],
    story: `
      <p>Hi! Py here. ⭐ You already know a loop can repeat code. But what if you put a loop <strong>inside</strong> another loop? That's called a <strong>nested loop</strong>!</p>
      <p>Think of it like coloring a grid: for each row, you visit every column before moving down to the next row. The outer loop picks the row, and the inner loop fills in that whole row before the outer loop moves on.</p>
      <p>Today we'll use nested loops to draw a neat little square of stars!</p>
    `,
    tip: "The inner loop finishes its whole trip before the outer loop moves on.",
    exampleCode: `for row in range(3):
    line = ""
    for col in range(4):
        line = line + "*"
    print(line)`,
    starterCode: `rows = 3
cols = 4

for row in range(rows):
    line = ""
    for col in range(cols):
        line = line + "*"
    print(line)`,
    challenge: "Change rows and cols to draw a 5x5 square of stars.",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "rows = 5" },
      { type: "codeContains", value: "cols = 5" },
      { type: "minLines", value: 5 },
    ],
    hint: "Set rows = 5 and cols = 5 at the top of your code.",
  },
  {
    id: 25,
    history: { year: "1996", fact: "In 1996, the Ariane 5 rocket exploded 37 seconds after launch because of one unhandled software error — exactly the kind of problem try/except is built to catch." },
    title: "Catching Errors",
    emoji: "🛟",
    summary: "Use try and except so your code doesn't crash.",
    bigIdea: "try lets Python attempt some code. If it breaks, except catches the problem so your program keeps running instead of crashing.",
    thinkFirst: "Dividing by zero is impossible. What do you think happens if we try it anyway?",
    syntax: "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"Oops! Can't divide by zero!\")",
    syntaxNote: "Python runs the try: code first. If it breaks, it jumps straight to except: instead of crashing.",
    steps: [
      { label: "Read", text: "Look at the try: block — it divides slices by zero friends on purpose." },
      { label: "Run", text: "Press ▶ Run. See the friendly except message instead of a crash?" },
      { label: "Change", text: "Write your own funny message inside the except block." },
    ],
    story: `
      <p>Py here! 🛟 Sometimes code hits a problem it can't solve, like dividing by zero. Normally that would crash your program — but Python gives us a safety net: <strong>try</strong> and <strong>except</strong>!</p>
      <p>Python tries the code inside <code>try:</code> first. If something breaks, instead of crashing, it jumps to <code>except:</code> and runs that instead. Your program keeps going, and you get a friendly message rather than a scary crash.</p>
      <p>Let's try splitting pizza slices among zero friends and catch the problem with style!</p>
    `,
    tip: "try attempts the risky code. except catches the problem if it breaks.",
    exampleCode: `try:
    friends = 0
    slices = 10
    print(slices / friends)
except ZeroDivisionError:
    print("Oops! You can't split pizza with zero friends!")`,
    starterCode: `try:
    friends = 0
    slices = 10
    print("Each friend gets", slices / friends)
except ZeroDivisionError:
    print("Oops! No dividing by zero allowed!")`,
    challenge: "Write your own funny message inside the except block.",
    checks: [
      { type: "runs" },
      { type: "codeContains", value: "except ZeroDivisionError" },
      { type: "starterItemsChanged", values: ["Oops! No dividing by zero allowed!"] },
      { type: "minLength", value: 1 },
    ],
    hint: "Only change the words inside the except block's print statement.",
  },
  {
    id: 26,
    history: { year: "1980s", fact: "Python's list comprehensions were inspired by set-builder notation from mathematics — and by ABC, an earlier language that directly influenced Python." },
    title: "List Comprehensions",
    emoji: "🔀",
    summary: "Build a whole new list in one line instead of a loop.",
    bigIdea: "A list comprehension squeezes a for loop into one line: [x*x for x in nums] builds a new list from an old one.",
    thinkFirst: "[n for n in range(5)] — what list do you think this creates?",
    syntax: "squares = [n * n for n in range(5)]",
    syntaxNote: "Same idea as a for loop that builds a list, just written on one line inside [ ].",
    steps: [
      { label: "Look", text: "Find the comprehension: [n for n in nums if n % 2 == 0]" },
      { label: "Run", text: "Press ▶ Run and check which numbers made it into evens." },
      { label: "Change", text: "Change the condition so it keeps numbers greater than 2 instead." },
    ],
    story: `
      <p>Hey! Py here. 🔀 You already know how to build a list with a for loop. A <strong>list comprehension</strong> does the exact same thing, just squeezed onto one line.</p>
      <p><code>[n for n in range(5)]</code> means "for every n in range(5), put it in a new list." Add a condition with <code>if</code> at the end to filter what gets in, like <code>[n for n in nums if n % 2 == 0]</code>.</p>
      <p>Professional Python code uses comprehensions constantly — they're shorter and often easier to read once you get used to them. Let's try one!</p>
    `,
    tip: "Read it like a sentence: 'n, for each n in nums, if n is even.'",
    exampleCode: `nums = [1, 2, 3, 4, 5]
squares = [n * n for n in nums]
print(squares)`,
    starterCode: `nums = [1, 2, 3, 4, 5]
evens = [n for n in nums if n % 2 == 0]
print(evens)`,
    challenge: "Change the condition so it keeps numbers greater than 2 instead of even numbers.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "contains", value: "[3, 4, 5]" },
    ],
    hint: "Change n % 2 == 0 to n > 2.",
  },
  {
    id: 27,
    history: { year: "1980s", fact: "Python's slicing syntax was inspired by ABC, the teaching language built in the 1980s that Python's creator worked on before inventing Python." },
    title: "Slicing Lists",
    emoji: "✂️",
    summary: "Grab a chunk of a list without a loop.",
    bigIdea: "list[start:stop] grabs a chunk. Negative numbers count from the end. list[::-1] reverses the whole thing.",
    thinkFirst: "nums[-3:] grabs the last 3 items. What do you think nums[::-1] does?",
    syntax: "nums[1:4]\nnums[::-1]",
    syntaxNote: "start:stop means 'from start up to, but not including, stop.' Leave a side blank to go all the way to the edge.",
    steps: [
      { label: "Look", text: "Find the three different slices on lines 2-4." },
      { label: "Run", text: "Press ▶ Run and match each output to its slice." },
      { label: "Change", text: "Change the first slice to grab the LAST three numbers instead." },
    ],
    story: `
      <p>Py here! ✂️ You've grabbed one item from a list with <code>nums[0]</code>. <strong>Slicing</strong> grabs a whole chunk at once: <code>nums[1:4]</code> means "items 1, 2, and 3" (stop is never included).</p>
      <p>Negative numbers count backward from the end — <code>nums[-1]</code> is the last item, <code>nums[-3:]</code> means "the last three." Leave out a number to go all the way to that edge, like <code>nums[::-1]</code>, which reverses the whole list!</p>
      <p>Slicing is everywhere in real Python code — let's practice reading it.</p>
    `,
    tip: "stop is never included — nums[1:4] stops right before index 4.",
    exampleCode: `letters = ["a", "b", "c", "d", "e"]
print(letters[1:3])
print(letters[:2])
print(letters[::-1])`,
    starterCode: `nums = [10, 20, 30, 40, 50, 60]
print(nums[1:4])
print(nums[-2:])
print(nums[::-1])`,
    challenge: "Change the first line so it prints the LAST three numbers instead of nums[1:4].",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "contains", value: "[40, 50, 60]" },
    ],
    hint: "Change nums[1:4] on line 2 to nums[-3:].",
  },
  {
    id: 28,
    history: { year: "1870s", fact: "The mathematical idea of a \"set\" — a collection with no duplicates — comes from Georg Cantor's set theory, published in the 1870s." },
    title: "Tuples & Sets",
    emoji: "📌",
    summary: "A tuple that can't change, and a set that hates duplicates.",
    bigIdea: "A tuple (3, 4) is locked once made — perfect for pairs that shouldn't change. A set throws out duplicates automatically.",
    thinkFirst: "numbers has two 2s and three 3s. How many items do you think end up in the set?",
    syntax: "point = (3, 4)\nunique = set([1, 2, 2, 3])",
    syntaxNote: "Tuples use ( ) and can't be changed after they're made. Sets use set() or { } and only keep unique values.",
    steps: [
      { label: "Look", text: "Find the tuple point and the set built from numbers." },
      { label: "Run", text: "Press ▶ Run. Count how many items survived in the set." },
      { label: "Change", text: "Change the point tuple to (7, 9)." },
    ],
    story: `
      <p>Hi! Py here. 📌 You know lists — but Python has two more containers worth knowing.</p>
      <p>A <strong>tuple</strong> like <code>(3, 4)</code> is a list that's locked once created — great for something like an (x, y) point that shouldn't accidentally change. A <strong>set</strong> is the opposite of picky about order but very picky about duplicates: <code>set([1, 2, 2, 3])</code> automatically throws out the repeats.</p>
      <p>Let's use both together!</p>
    `,
    tip: "Tuples: locked and ordered. Sets: unordered and unique.",
    exampleCode: `point = (10, 20)
print("x:", point[0], "y:", point[1])

colors = ["red", "blue", "red", "green", "blue"]
print(sorted(set(colors)))`,
    starterCode: `point = (3, 4)
print("x:", point[0], "y:", point[1])

numbers = [1, 2, 2, 3, 3, 3]
unique = set(numbers)
print(sorted(unique))`,
    challenge: "Change the point tuple to (7, 9) and add one more repeated number to the numbers list.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "codeContains", value: "7" },
      { type: "codeContains", value: "9" },
    ],
    hint: "Change point = (3, 4) to point = (7, 9). Then add another repeated number to the numbers list.",
  },
  {
    id: 29,
    history: { year: "2018", fact: "Python 3.7, released in 2018, officially guaranteed that dictionaries remember the order items were added — before that, it wasn't promised!" },
    title: "Dictionaries, Leveled Up",
    emoji: "🗺️",
    summary: "Loop through a whole dictionary and look things up safely.",
    bigIdea: "for key, value in d.items(): loops through every pair at once. d.get(key, default) looks something up without crashing if it's missing.",
    thinkFirst: "scores.get(\"Jordan\", \"not found\") — Jordan isn't in the dictionary. What do you think prints?",
    syntax: 'for name, score in scores.items():\n    print(name, score)',
    syntaxNote: ".items() hands you both the key AND the value together, one pair at a time.",
    steps: [
      { label: "Look", text: "Find scores.items() in the for loop." },
      { label: "Run", text: "Press ▶ Run and see every name and score print." },
      { label: "Change", text: "Add a new player to the scores dictionary." },
    ],
    story: `
      <p>Py here! 🗺️ You've looked up one value in a dictionary with <code>d["key"]</code>. Now let's loop through the <strong>whole thing</strong> at once.</p>
      <p><code>for name, score in scores.items():</code> hands you both the key and the value together on every trip through the loop. And <code>scores.get("Jordan", "not found")</code> is a safe lookup — instead of crashing when a key is missing, it just returns your backup value.</p>
      <p>These two tricks show up constantly in real Python programs. Let's try them!</p>
    `,
    tip: ".get(key, default) never crashes, even if the key is missing.",
    exampleCode: `pets = {"Ana": "cat", "Sam": "dog"}
for name, pet in pets.items():
    print(name, "has a", pet)`,
    starterCode: `scores = {"Ana": 92, "Sam": 85, "Kai": 78}

for name, score in scores.items():
    print(name, "scored", score)

print("Jordan's score:", scores.get("Jordan", "not found"))`,
    challenge: "Add a new player to the scores dictionary, then run it again.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 4 },
    ],
    hint: 'Add a line like scores["Riley"] = 88 before the loop, or add a fourth name into the dictionary on line 1.',
  },
  {
    id: 30,
    history: { year: "1958", fact: "Lisp could already handle functions with a flexible number of arguments back in the late 1950s — a very early ancestor of *args and **kwargs." },
    title: "Functions: Defaults & Extra Args",
    emoji: "🎛️",
    summary: "Give a parameter a backup value, or accept as many arguments as you want.",
    bigIdea: "def greet(name, greeting=\"Hello\"): gives greeting a default value, used only if you don't provide one.",
    thinkFirst: "greet(\"Sam\", \"Hey\") provides both arguments. What do you think greet(\"Ana\") alone prints?",
    syntax: 'def greet(name, greeting="Hello"):\n    return greeting + ", " + name + "!"',
    syntaxNote: "A default value only kicks in when you don't pass that argument yourself.",
    steps: [
      { label: "Look", text: "Find greeting=\"Hello\" in the function definition." },
      { label: "Run", text: "Press ▶ Run and compare the two greet() calls." },
      { label: "Change", text: "Call greet() a third time with your own name and greeting." },
    ],
    story: `
      <p>Hi! Py here. 🎛️ You've written functions with parameters — now let's make them more flexible.</p>
      <p><code>def greet(name, greeting="Hello"):</code> gives <code>greeting</code> a <strong>default value</strong>. Call <code>greet("Ana")</code> and it uses "Hello" automatically. Call <code>greet("Sam", "Hey")</code> and your own value takes over instead.</p>
      <p>This is exactly how a lot of real Python functions work — sensible defaults, with room to customize when you need to.</p>
    `,
    tip: "Skip an argument with a default and Python fills it in for you.",
    exampleCode: `def power(base, exponent=2):
    return base ** exponent

print(power(5))
print(power(2, 3))`,
    starterCode: `def greet(name, greeting="Hello"):
    return greeting + ", " + name + "!"

print(greet("Ana"))
print(greet("Sam", "Hey"))`,
    challenge: "Call greet() a third time with your own name and a custom greeting, then print it.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 3 },
    ],
    hint: 'Add a line like print(greet("YourName", "Yo")).',
  },
  {
    id: 31,
    history: { year: "1967", fact: "Object-oriented programming — classes and objects — was pioneered by a language called Simula, built in Norway in 1967." },
    title: "Classes — Build Your Own Objects",
    emoji: "🏗️",
    summary: "Design your own blueprint for making objects.",
    bigIdea: "A class is a blueprint. __init__ sets up each new object, and self refers to that one specific object.",
    thinkFirst: "Robot(\"Rusty\", 80) creates one robot. What do you think a second Robot(...) call creates?",
    syntax: "class Robot:\n    def __init__(self, name, battery):\n        self.name = name\n        self.battery = battery",
    syntaxNote: "self is how an object refers to its own data. Every method needs self as its first parameter.",
    steps: [
      { label: "Look", text: "Find __init__ — it runs automatically every time you make a new Robot." },
      { label: "Run", text: "Press ▶ Run and read Rusty's status." },
      { label: "Change", text: "Create a second Robot with your own name and battery level." },
    ],
    story: `
      <p>Py here! 🏗️ Everything in Python is an object — even a string or a list. Today you'll build your <strong>own</strong> kind of object with a <strong>class</strong>.</p>
      <p>Think of a class as a blueprint. <code>class Robot:</code> defines what every robot has. <code>__init__</code> runs automatically each time you build one, setting up its starting data with <code>self.name</code> and <code>self.battery</code>. <code>self</code> just means "this specific robot."</p>
      <p>Once you have the blueprint, you can build as many robots as you like, each with its own name and battery level!</p>
    `,
    tip: "self.name stores data ON that object — every robot gets its own copy.",
    exampleCode: `class Pet:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return self.name + " says " + self.sound

dog = Pet("Rex", "Woof")
print(dog.speak())`,
    starterCode: `class Robot:
    def __init__(self, name, battery):
        self.name = name
        self.battery = battery

    def status(self):
        return self.name + " has " + str(self.battery) + "% battery"

bot = Robot("Rusty", 80)
print(bot.status())`,
    challenge: "Create a second Robot with your own name and battery level, then print its status too.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLines", value: 2 },
    ],
    hint: 'Add: bot2 = Robot("YourName", 50) then print(bot2.status())',
  },
  {
    id: 32,
    history: { year: "2005", fact: "NumPy was created in 2005 by Travis Oliphant. It's now used by millions of scientists, including the team that captured the first-ever photo of a black hole in 2019." },
    title: "Beyond Python: NumPy & Data Science",
    emoji: "🔬",
    summary: "See what real data-science code looks like, and why it's fast.",
    bigIdea: "NumPy lets real programmers do math on an entire list at once — called vectorization — without writing a loop.",
    thinkFirst: "A loop converts 5 temperatures one at a time. What do you think a NumPy version would look like?",
    syntax: "temps_f = np.array(temps_c) * 9 / 5 + 32",
    syntaxNote: "That single line replaces the whole loop below — NumPy applies the math to every number at once.",
    steps: [
      { label: "Run", text: "Press ▶ Run and watch the loop convert every temperature." },
      { label: "Read", text: "Compare it to the one-line NumPy version in the box above." },
      { label: "Change", text: "Add one more temperature to the list and run it again." },
    ],
    story: `
      <p>Hey! Py here. 🔬 You've learned a huge amount of real Python — this last stop is a preview of where it goes next.</p>
      <p>Data scientists and AI researchers use a library called <strong>NumPy</strong> to do math on entire lists of numbers at once, instead of writing a loop — that trick is called <strong>vectorization</strong>, and it's a big part of why Python is the top language for data science and machine learning. <strong>Matplotlib</strong> (for charts) and <strong>SciPy</strong> (for science/engineering math) build on top of NumPy the same way.</p>
      <p>This browser tutorial can't run NumPy itself — it needs a full Python install. But the pure-Python code below does the exact same job with a loop, so you can see precisely what NumPy is speeding up. When you're ready to try the real thing, install Python from python.org and run <code>pip install numpy</code>, or just open <a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a> in a browser tab — numpy is already installed there!</p>
    `,
    tip: "NumPy applies math to a whole list at once — no loop needed.",
    exampleCode: `temps_celsius = [0, 10, 20, 30]
temps_fahrenheit = []
for c in temps_celsius:
    temps_fahrenheit.append(c * 9 / 5 + 32)
print(temps_fahrenheit)`,
    starterCode: `temperatures_celsius = [0, 10, 20, 30, 40]
temperatures_fahrenheit = []

for c in temperatures_celsius:
    f = c * 9 / 5 + 32
    temperatures_fahrenheit.append(f)

print(temperatures_fahrenheit)`,
    challenge: "Add one more temperature to the list, then run it again.",
    checks: [
      { type: "runs" },
      { type: "codeChanged" },
      { type: "minLength", value: 1 },
    ],
    hint: "Add another number to temperatures_celsius, like 50.",
  },
];

function getLesson(id) {
  return LESSONS.find((lesson) => lesson.id === Number(id));
}

function getAllLessons() {
  return LESSONS;
}
