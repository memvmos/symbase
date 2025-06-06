let angle = 0;
let moodIndex = 0;
let moods = [
  { name: 'Dream', bg: [10, 10, 50], emoji: '🌙' },
  { name: 'Loop',  bg: [50, 10, 60], emoji: '🔁' },
  { name: 'Pulse', bg: [80, 20, 20], emoji: '❤️' },
  { name: 'Echo',  bg: [20, 50, 60], emoji: '🌊' }
];
let currentBG = moods[0].bg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('symbolicCanvas');

  // Use standard DOM to create emoji buttons manually
  const ui = document.createElement('div');
  ui.id = 'mood-ui';
  ui.style.position = 'absolute';
  ui.style.top = '10px';
  ui.style.left = '20px';
  ui.style.zIndex = '20';
  document.body.appendChild(ui);

  moods.forEach((mood, idx) => {
    const btn = document.createElement('button');
    btn.textContent = mood.emoji;
    btn.style.fontSize = '1.5rem';
    btn.style.marginRight = '0.5rem';
    btn.onclick = () => {
      moodIndex = idx;
      currentBG = moods[moodIndex].bg;
      document.getElementById('currentMood').textContent = `${mood.emoji} ${mood.name}`;
    };
    ui.appendChild(btn);
  });

  // Mood label
  const label = document.createElement('div');
  label.id = 'currentMood';
  label.textContent = `${moods[0].emoji} ${moods[0].name}`;
  label.style.position = 'absolute';
  label.style.top = '10px';
  label.style.right = '20px';
  label.style.color = 'white';
  label.style.fontSize = '1.5rem';
  label.style.zIndex = '15';
  document.body.appendChild(label);

  noFill();
}

function draw() {
  background(...currentBG);

  rotateX(angle * 0.2);
  rotateY(angle * 0.3);
  strokeWeight(1.5);

  // Morphing symbolic torus
  push();
  stroke(255);
  torus(100, 30);
  pop();

  // Floating ellipse ring
  push();
  rotateZ(angle * 0.5);
  stroke(100, 200, 255);
  beginShape();
  for (let i = 0; i < TWO_PI; i += 0.05) {
    let x = 200 * cos(i);
    let y = 200 * sin(i);
    let z = 40 * sin(i * 3 + angle);
    vertex(x, y, z);
  }
  endShape(CLOSE);
  pop();


  // Symbolic helix
  push();
  stroke(255, 100, 200);
  rotateY(angle);
  beginShape();
  for (let i = 0; i < TWO_PI * 4; i += 0.1) {
    let x = 100 * cos(i);
    let y = 100 * sin(i);
    let z = 10 * i;
    vertex(x, y, z - 200);
  }
  endShape();
  pop();

  angle += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}