const LESSON_JOKES = {
  1: [
    { setup: "Why do snakes make great programmers?", punchline: "They're really good at Python! 🐍" },
    { setup: "Why was the computer excited to meet Python?", punchline: "Because it finally had a snake that could talk — one print() at a time! 💬" },
  ],
  2: [
    { setup: "Why did Py say hi twice?", punchline: "Because one \"hi\" just wasn't two-tal enough! 👋👋" },
    { setup: "What did the first print() line say to the second print() line?", punchline: "After you — I already went! 🚶" },
  ],
  3: [
    { setup: "Why did the variable get its own box?", punchline: "It needed space to store its stuff! 📦" },
    { setup: "What did the empty box say when you finally gave it a name?", punchline: "Finally, somebody remembers me! 🙋" },
  ],
  4: [
    { setup: "Why did if and else never hang out at the same party?", punchline: "One of them always says the opposite of the other! 🎭" },
    { setup: "What does True say when False walks into the room?", punchline: "Well, this is awkward — we're never both here at once! 😅" },
  ],
  5: [
    { setup: "Why did the for loop keep telling the same joke?", punchline: "range(3) told it to do it exactly three times — no more, no less! 🔁" },
    { setup: "What did the loop say after its third lap?", punchline: "Okay okay, range(3) means I'm done — no encore! 🏁" },
  ],
  6: { setup: "Why did the computer bring a snake to career day?", punchline: "To show everyone it could finally speak Python! 🐍" },
  7: { setup: "Why do programmers never get lonely?", punchline: "They always have plenty of lines to print! 📃" },
  8: { setup: "Why are variables like backpacks?", punchline: "You can stuff anything inside and carry it around just by knowing its name! 🎒" },
  9: { setup: "Why did the plus sign show up to the party?", punchline: "Because it heard things were about to add up! ➕" },
  10: { setup: "Why did the variable change its mind so many times?", punchline: "It's allowed — reassigning itself is literally its job! 🔄" },
  11: { setup: "How does a computer make a tough decision?", punchline: "One if at a time! 🤔" },
  12: { setup: "Why did the for loop keep going around and around?", punchline: "Nobody told it the range — now it just won't stop hugging its friends! 🔁" },
  13: { setup: "Why is a Python list so easy to search?", punchline: "Because every item has its own saved seat — an index! 🎫" },
  14: { setup: "Why did the for loop visit every single item in the list?", punchline: "It's polite — it never skips saying hi to anyone! 👋" },
  15: { setup: "Why did the turtle bring a ruler to class?", punchline: "It wanted to draw the *perfect* square! 📐" },
  16: { setup: "Why does the turtle never get lost?", punchline: "It always knows exactly how many degrees to turn! 🔺" },
  17: { setup: "Why did the turtle zigzag across the screen?", punchline: "forward(), backward(), forward() again — turtle's got the beat! 🕺" },
  18: { setup: "Why did the turtle lift its pen?", punchline: "It didn't want to draw any more conclusions! ✏️" },
  19: { setup: "Why couldn't the number-guessing game keep a secret?", punchline: "random.randint() kept blurting out a new number before you could even guess! 🤫" },
  20: { setup: "Why did the young coder throw a party?", punchline: "Because they finally built something ALL their own — no starter code required! 🎉" },
  21: [
    { setup: "Why did the function feel proud?", punchline: "It finally learned to return the favor! 🎁" },
    { setup: "Why do functions make terrible secret keepers?", punchline: "They always return everything! 🗣️" },
  ],
  22: [
    { setup: "Why did the dictionary make a great friend?", punchline: "It always had the right key to the conversation! 🗝️" },
    { setup: "What did the dictionary say to the nervous key?", punchline: "Relax, I've got your value covered! 🗂️" },
  ],
  23: [
    { setup: "Why did the while loop keep going to the gym?", punchline: "It just couldn't stop while it was true! 🏋️" },
    { setup: "Why did the programmer's while loop get grounded?", punchline: "It refused to stop when it was told to! ⏳" },
  ],
  24: [
    { setup: "Why did the outer loop bring the inner loop everywhere it went?", punchline: "The inner loop has to finish its ENTIRE trip before the outer loop can take one single step! 🪆" },
    { setup: "Why do nested loops make great tour guides?", punchline: "They never miss a single row or column! 🗺️" },
  ],
  25: [
    { setup: "Why did the code wear a helmet?", punchline: "In case it needed to try something risky and except a bump! 🛟" },
    { setup: "What's a debugger's favorite kind of exception?", punchline: "Any one it can catch! 🎯" },
  ],
};

function getJokesForLesson(lessonId) {
  const entry = LESSON_JOKES[lessonId];
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}
