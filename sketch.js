
let scoopY = 600;
let iceCreamY = 600;
let startButton, pauseButton;
let line = 0;

let soundFile;
let fft;
let isPlaying = false;

function preload() {
  soundFile = loadSound('music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawButtons();
  background(50);
  fft = new p5.FFT();
  soundFile.amp(0.5);

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function icecream(x, y) {     //starting icecream
  noStroke();
  fill(255, 255, 150);
  triangle(x, y, x + 5, y + 5, x + 10, y);  //Cone
}

function drawButtons() {
  startButton = createButton('Start!');
  startButton.position(20, 20);
  startButton.size(110, 50);
  startButton.mousePressed(startMusic);

  pauseButton = createButton('Pause');
  pauseButton.position(startButton.x, startButton.y + 60);
  pauseButton.size(110, 50);
  pauseButton.mousePressed(pauseMusic);
}

function startMusic() {
  soundFile.play();
  isPlaying = true;
}

function pauseMusic() {
  soundFile.pause();
  isPlaying = false;
}


function addVanScoop(x) {  // vanilla scoop

  scoopY -= 7;
  fill(245, 242, 235);
  ellipseMode(CORNER);
  ellipse(x, scoopY - 5, 10, 10);

}

function addChocScoop(x) {   //chocolate scoop

  scoopY -= 7;
  fill(89, 52, 38);
  ellipseMode(CORNER);
  ellipse(x, scoopY - 5, 10, 10);

}
function addStrawScoop(x) {   // strawberry scoop

  scoopY -= 7;
  fill(232, 172, 209);
  ellipseMode(CORNER);
  ellipse(x, scoopY - 5, 10, 10);

}



function draw() {
  if (isPlaying) {
    background(50);
    let spectrum = fft.analyze();
    stroke(0);
    for (let i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 255, 0, height);
      drawIcecream(i * 10, y);
    }
  }
}

function drawIcecream(x, h) {
  scoopY = height - 27;
  icecream(x, height - 30, color(255));
  scoopNum = int(h / 10);
  for (let i = 0; i < scoopNum; i++) {
    if (i % 3 == 0) {
      addChocScoop(x);
    }else if (i % 3 == 1){
      addStrawScoop(x);
    }else{
      addVanScoop(x);
    }
  }


}
