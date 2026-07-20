const SCREEN_BREAKS = [
  { type: "eyes", emoji: "🌳", title: "Find a Tree", instruction: "Look out a window and find something green — a tree, a plant, anything. Stare at it for a few seconds.", seconds: 15 },
  { type: "eyes", emoji: "🔭", title: "Look Far Away", instruction: "Find the farthest object you can see and focus on it. Your eyes need a break from the close-up screen.", seconds: 15 },
  { type: "eyes", emoji: "😉", title: "Slow Blinks", instruction: "Close your eyes and blink slowly 10 times. Nice and relaxed.", seconds: 12 },
  { type: "eyes", emoji: "🌀", title: "Eye Circles", instruction: "Without moving your head, roll your eyes in a big slow circle 5 times, then reverse.", seconds: 15 },
  { type: "move", emoji: "🤸", title: "Jumping Jacks", instruction: "Stand up and do 5 jumping jacks. Go!", seconds: 15 },
  { type: "move", emoji: "🙆", title: "Big Stretch", instruction: "Stand up, reach your arms as high as you can, and hold the stretch for 10 seconds.", seconds: 12 },
  { type: "move", emoji: "🔄", title: "Shoulder Rolls", instruction: "Roll your shoulders backward 5 times, then forward 5 times.", seconds: 15 },
  { type: "move", emoji: "🦶", title: "Toe Touches", instruction: "Stand up and try to touch your toes 5 times. Bend those knees if you need to!", seconds: 15 },
  { type: "move", emoji: "🌊", title: "Wrist Rolls", instruction: "Shake out your hands, then roll your wrists in circles 10 times.", seconds: 12 },
  { type: "move", emoji: "🚶", title: "Walk It Out", instruction: "Stand up and walk around the room for a few seconds before you sit back down.", seconds: 15 },
  { type: "eyes", emoji: "💧", title: "Water Break", instruction: "Look away from the screen and go take a sip of water.", seconds: 12 },
  { type: "move", emoji: "🧍", title: "Stand Tall", instruction: "Stand up nice and tall, take 3 big deep breaths, then sit back down.", seconds: 15 },
];

function getRandomScreenBreak() {
  return SCREEN_BREAKS[Math.floor(Math.random() * SCREEN_BREAKS.length)];
}
