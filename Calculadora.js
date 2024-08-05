let display = '';
let buttons = [];
let operators = ['+', '-', '*', '/'];
let resultDisplayed = false;

function setup() {
  createCanvas(400, 600);
  let buttonWidth = width / 4;
  let buttonHeight = height / 6;
  
  // Create number buttons
  for (let i = 1; i <= 9; i++) {
    buttons.push(new Button(i, (i - 1) % 3 * buttonWidth, Math.floor((i - 1) / 3) * buttonHeight + 100, buttonWidth, buttonHeight));
  }
  buttons.push(new Button('0', 0, 5 * buttonHeight + 100, buttonWidth * 2, buttonHeight));
  
  // Create operator buttons
  let operatorsList = ['+', '-', '*', '/', '='];
  for (let i = 0; i < operatorsList.length; i++) {
    let operator = operatorsList[i];
    buttons.push(new Button(operator, 3 * buttonWidth, i * buttonHeight + 100, buttonWidth, buttonHeight));
  }
  
  // Create clear button
  buttons.push(new Button('C', 0, 0, buttonWidth, buttonHeight));
}

function draw() {
  background(240);
  
  // Draw display area
  fill(255);
  rect(0, 0, width, 100);
  
  fill(0);
  textSize(32);
  textAlign(RIGHT, CENTER);
  text(display, width - 20, 50);
  
  // Draw buttons
  for (let btn of buttons) {
    btn.show();
  }
}

function mousePressed() {
  for (let btn of buttons) {
    if (btn.isClicked(mouseX, mouseY)) {
      handleButtonClick(btn.value);
    }
  }
}

function handleButtonClick(value) {
  if (resultDisplayed && !isNaN(value)) {
    display = value;
    resultDisplayed = false;
  } else if (value === 'C') {
    display = '';
    resultDisplayed = false;
  } else if (value === '=') {
    try {
      display = eval(display).toString();
      resultDisplayed = true;
    } catch {
      display = 'Error';
    }
  } else {
    display += value;
    resultDisplayed = false;
  }
}

class Button {
  constructor(value, x, y, w, h) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(200);
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 5);
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.value, this.x + this.w / 2, this.y + this.h / 2);
  }

  isClicked(mx, my) {
    return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
  }
}
