const LESSON_JOKES = {
  1: [
    { setup: "What do you call a snake that works for the government?", punchline: "A civil serpent! 🐍" },
    { setup: "Why are snakes so hard to trick?", punchline: "You can't pull their leg — they don't have one! 😄" },
  ],
  2: [
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻" },
    { setup: "Why did the golfer bring two pairs of pants?", punchline: "In case he got a hole in one! ⛳" },
  ],
  3: [
    { setup: "Why don't eggs tell each other secrets?", punchline: "They'd crack up! 🥚" },
    { setup: "What did one ocean say to the other ocean?", punchline: "Nothing, they just waved! 🌊" },
  ],
  4: [
    { setup: "Why did the coin roll down the hill?", punchline: "To get to the bottom! 🪙" },
    { setup: "What do you call a fish with no eyes?", punchline: "A fsh! 🐟" },
  ],
  5: [
    { setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crumbly! 🍪" },
    { setup: "Why can't a bicycle stand up by itself?", punchline: "It's two tired! 🚲" },
  ],
  6: { setup: "Why did the computer go to the doctor?", punchline: "Because it caught a virus! 🤒" },
  7: { setup: "What do computers like to eat?", punchline: "Microchips! 😄" },
  8: { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field! 🌾" },
  9: { setup: "Why was the math book sad?", punchline: "It had too many problems! 📖" },
  10: { setup: "Why did the picture go to jail?", punchline: "Because it was framed! 🖼️" },
  11: { setup: "Why can't you trust stairs?", punchline: "They're always up to something! 😂" },
  12: { setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore! 🦕" },
  13: { setup: "Why did the banana go to the doctor?", punchline: "Because it wasn't peeling well! 🍌" },
  14: { setup: "Why did the elephants get kicked out of the pool?", punchline: "Because they kept dropping their trunks! 🐘" },
  15: { setup: "Why did the turtle cross the road?", punchline: "To get to the shell station! 🐢" },
  16: { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything! ⚛️" },
  17: { setup: "What do you call a turtle that can fly?", punchline: "A shell-icopter! 🚁" },
  18: { setup: "What did the pen say to the pencil?", punchline: "You're looking sharp! ✏️" },
  19: { setup: "Why couldn't the leopard play hide and seek?", punchline: "Because he was always spotted! 🐆" },
  20: { setup: "Why did the student eat his homework?", punchline: "Because the teacher said it was a piece of cake! 🍰" },
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
