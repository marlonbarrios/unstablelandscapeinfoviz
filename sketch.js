
// Define variables for Perlin noise offsets
let offsets = [
  { xoff: 100, yoff: 0, roff: 200 }, // Dance Improvisation
  { xoff: 500, yoff: 10, roff: 400 }, // Embodied Cognition
  { xoff: 700, yoff: 20, roff: 500 }, // Creative Coding
  { xoff: 1000, yoff: 300, roff: 600 }, // Embodied Interaction
  { xoff: 1100, yoff: 400, roff: 700 }, // Machine Learning
  { xoff: 1200, yoff: 500, roff: 800 }, // Real-time
  { xoff: 1300, yoff: 600, roff: 900 }, // Software Engineering
  { xoff: 1400, yoff: 700, roff: 1000 }, // Complexity | Systems Theory
  { xoff: 1500, yoff: 800, roff: 1100 }, // Open Source
  { xoff: 1600, yoff: 900, roff: 1200 }, // Post-Humanism
  { xoff: 1700, yoff: 1000, roff: 1300 }, // Speculative Futures
  { xoff: 1800, yoff: 1100, roff: 1400 }, // Generative AI
  { xoff: 1900, yoff: 1200, roff: 1500 }, // Generative Design
  { xoff: 2000, yoff: 1300, roff: 1600 }, // mindfulness
  { xoff: 2100, yoff: 1400, roff: 1700 }, // Communities
  { xoff: 2200, yoff: 1500, roff: 1800 },  // Social Networks
  { xoff: 2300, yoff: 1600, roff: 1900 },  // Generativity
  { xoff: 2400, yoff: 1700, roff: 2000 },  // Governance
  { xoff: 2500, yoff: 1800, roff: 2100 },  // Ethics
  { xoff: 2600, yoff: 1900, roff: 2200 }, // Care
  { xoff: 2700, yoff: 2000, roff: 2300 }, // WEB3
  { xoff: 2800, yoff: 2100, roff: 2400 }, // Performance
  { xoff: 2900, yoff: 2200, roff: 2500 }, // Education
  { xoff: 3000, yoff: 2300, roff: 2600 }, // Installations
  { xoff: 3100, yoff: 2400, roff: 2700 }, // Interdisciplinary
];



let concepts = [
  "Dance Improvisation", "Embodied Cognition", "Creative Coding",
  "Embodied Interaction", "Machine Learning", "Real-time",
  "Software Engineering", "Complexity | Systems Theory", "Open Source",
  "Post-Humanism", "Speculative Futures", "Generative AI", 
  "Generative Design", "Mindfulness", "Communities", "Social Networks", "Generativity", "Governance", "Ethics", "Care", "Web3", "Performance", "Open Pedagogies", "Installations", 'Interdisciplinary'
];

// Visibility flags
let showLines = false;
let showEllipses = true;
let showText = false;

let slider; // Slider for controlling animation speed
let textSizeT = 40; // Text size for the title

// Variables for the scrolling text
let tickerText; // Will be initialized dynamically
let textX; // Position of the scrolling text
let textSpeed = 1.5; // Speed of the scrolling text

function setup() {
  createCanvas(windowWidth, windowHeight);
  textX = width;

  // Initialize the slider
  slider = createSlider(0, 0.02, 0.001, 0.001);
  slider.position(10, 10);
  slider.style('width', '200px');

  // Dynamically generate the scrolling text from the concepts array
  tickerText = concepts.join(" | ");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(125, 175, 156);
  let speed = slider.value(); // Use the slider value to control the speed

  // Update offsets with speed
  offsets.forEach(off => {
    off.xoff += speed;
    off.yoff += speed;
    off.roff += speed;
  });

  // Calculate positions and conditionally draw ellipses/lines/text based on visibility flags
  drawConceptsAndLines();

  // Scrolling text logic
  fill(0); // Text color
  textSize(textSizeT);
  text(tickerText, textX, height - 50); // Position text near the bottom
  textX -= textSpeed; // Move text to the left
  if (textX < -textWidth(tickerText)) {
    textX = width; // Reset text position to the right once it's fully offscreen
  }
}

function drawConceptsAndLines() {
  let positions = offsets.map(off => ({
    x: noise(off.xoff) * width,
    y: noise(off.yoff) * height,
    r: noise(off.roff) * 200
  }));

  if (showLines) {
    stroke(255); // Line color
    strokeWeight(5); // Line width
    positions.forEach((pos, i) => {
      for (let j = i + 1; j < positions.length; j++) {
        let d = dist(pos.x, pos.y, positions[j].x, positions[j].y);
        if (d < 250) { // Draw line if ellipses are close enough
          line(pos.x, pos.y, positions[j].x, positions[j].y);
        }
      }
    });
  }

  // Draw ellipses
  noStroke();
  positions.forEach((pos, index) => {
    if (showEllipses) {
      fill(getColorForConcept(index)); // Ellipse color
      ellipse(pos.x, pos.y, pos.r, pos.r);
    }
    if (showText) { // Check if text should be drawn
      fill(0); // Text color
      textSize(20);
      textAlign(CENTER, CENTER);
      text(concepts[index], pos.x, pos.y);
    }
  });
}

function getColorForConcept(index) {
  // Define a palette of colors
  const colors = [
    [64, 224, 208], [100, 149, 237], [173, 216, 230],
    [95, 158, 160], [72, 209, 204], [70, 130, 180],
    [32, 178, 170], [176, 224, 230], [0, 206, 209],
    [65, 105, 225], [123, 104, 238], [0, 191, 255],
    [135, 206, 250], [0, 255, 255], [0, 255, 127],
    [0, 250, 154], [0, 255, 0], [50, 205, 50],
    [152, 251, 152], [144, 238, 144], [0, 128, 0],
    [0, 100, 0], [34, 139, 34], [0, 255, 127],
  ];

  return color(...colors[index % colors.length], 180); // Return color with opacity
}

function keyPressed() {
  if (key === 'l') {
    showLines = !showLines;
  } else if (key === 'c') {
    showEllipses = !showEllipses;
  } else if (key === 't') {
    showText = !showText;
  }
}



