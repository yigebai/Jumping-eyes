let walkingEye = []; //this is a class to reserve multiple WalkingEyes
let hands = []; //this is a class to reserve multiple hands
let eyeballs = []; ///this is a class to reserve multiple eyeballs
let imgEye = []; ///this is a picture class to reserve multiple WalkingEyes images
let imgHands = []; //this is a picture class to reserve multiple hands images
let imgEyeball = []; //this is a picture class to reserve multiple eyeball images
let imgDiff =[];
let imgLevelbg;
let imgLevelbg2;//define difficulty

let jumpSound; //define the jumping sound
let gameoverSound; //define the ending soundg
let imgBackground;   //define a variable of background
let imgGround; //define a variable of ground
let imgMountoun; //define a variable of mountain
let groundX = 0; //Define the abscissa variable of the ground picture position and set the initial value to 0
let mountounX = 0; //Define the abscissa variable of the mountain picture position and set the initial value to 0

let video; //this is the video input
let poseNet; // this comes from p5ml which is to recognize face
let poses = [];

let cnv; //define a variable, this is canvas
let cled = 0; //Define a variable that determines whether a collision occurred between a dinosaur and an obstacle, with a value of 0 indicating no collision
let index = 1; //define a index which is control the change of image

let score = 0; //define the score of the game
let lastAddTime = 0; //Define a variable that records the last time an obstacle was added, and set the initial value to 0
let bestScore = 0; //define  the heighest score and set the initial valure to 0
let gameScreen = 0; //define  the game pages and set the initial valure to 0
let level =0;
let difficultyButtonX = 600; // X position of the difficulty button
let difficultyButtonY = 350; // Y position of the difficulty button
let difficultyButtonSize = 100; // Size (diameter) of the difficulty button
let difficultyButton2X = 600;
let difficultyButton2Y = 200;
let difficulty2ButtonSize = 100;
let levelX;
let draggingDifficultyButton = false; // 这个变量用来判断是否在拖拽难度按钮
let faceDetectButton = false;
let port, reader, writer;//arduino set up start here


setup = function () {
  cnv = createCanvas(800, 400);
  windowResiz(); //resize the canvas
  faceSet(); // Call the face recognition function
  walkingEye = new WalkingEye(); //Define an object named walkingEye, which belongs to the walkingEye class
  hand = new Hand();
  //Define an object named hand, which belongs to the Hand class
  eyeball = new Eyeball();
  //Define an object named eyeball, which belongs to the Eyeball class
  
};
preload = function () {
  
  for (let u = 0; u <=7; u++) {
    //using for loop, load five image of walking eyes
    let str0 = "diffe/" + u + ".png";
    //Define a character variable and assign it a string with the name of the dinosaur picture
    imgDiff[u] = loadImage(str0); //Load the image with that name into the array
  }
  
  for (let i = 1; i <= 6; i++) {
    //using for loop, load five image of walking eyes
    let str1 = "walkingEye/eye" + i + ".png";
    //Define a character variable and assign it a string with the name of the dinosaur picture
    imgEye[i] = loadImage(str1); //Load the image with that name into the array
  }
  for (let j = 1; j <= 8; j++) {
    //using for loop, load five image of hand eyes
    let str2 = "hand/hand" + j + ".png";
    imgHands[j] = loadImage(str2);
  }
  for (let k = 1; k <= 2; k++) {
    //using for loop, load five image of hand eyes
    let str3 = "eyeball/eye" + k + ".png";
    imgEyeball[k] = loadImage(str3);
  }
 imgLevelbg = loadImage("diff.png");
  imgLevelbg2=loadImage("diff2.png");

  imgBackground =loadImage("bg.png");
  imgGround = loadImage("ground.png");
  imgMountoun = loadImage("mountoun.png");
  jumpSound = loadSound("jump.m4a");
  gameoverSound = loadSound("gameover.m4a");
};
draw = function () {
  //Check the current interface status and go to different interfaces
  if (gameScreen == 0) {
    
    //If the current interface is preparation,go  to start screen state
    initScreen(); //Call the game preparation method, enter the game preparation interface
  } else if (gameScreen == 1) {
    //If the current interface is gaming ,go to gaming screen state
    gamePlayScreen(); //Call the game stating method, enter the gaming interface
  } else if (gameScreen == 2) {
    
    //If the current interface is gaming ,go to gaming screen state
    gameOverScreen(); // call the gameoverscreen
  } else if (gameScreen == 3) {
    difficultyScreen();
    //print(mouseX,mouseY);
  }else if (gameScreen == 4) {
   settings();
  }
};

mousePressed = function () {
/*  let d = dist(
    difficultyButton2X,
    difficultyButton2Y,
    difficultyButtonX,
    difficultyButtonY
  );
  mouseReleased(d)*/;//传递给mouseRelease
  let d2 = dist(mouseX, mouseY, difficultyButtonX, difficultyButtonY);
  if (d2 < difficultyButtonSize / 2 && gameScreen === 0) {
    draggingDifficultyButton = true;
  }

  if (
    gameScreen == 0 &&
    mouseX > 220 &&
    mouseX < 492 &&
    mouseY > 305 &&
    mouseY < 330
  ) {
    //When pressing the mouse, if the current interface is the game ready to start interface
    startGame(); //Call the game Start method to start the game
  }
  if (gameScreen == 2) {
    //if it is gameover interface
    restart(); //call restar function
  }
  if (gameScreen == 1) {
    //if it is gaming interface
    walkingEye.jump(); //Call the walkingEye class jump method, so that the dinosaur jump
    jumpSound.play(); //play the jumping sound
  }
  if (gameScreen == 3) {
   // difficultyScreen();
  }
  if(gameScreen ==4){
    //settings();
  }
};
addObstacle = function () {
  //Define the function that increases the obstacle
  let interval = random(800, 4000); //The time between the two obstacles is a random number between 700 and 4000 milliseconds
  if (millis() - lastAddTime > interval) {
    //If there is more than one time interval between the current time and the time of the last obstacle class, a new obstacle class is added

    if (int(interval) % 2 == 0) {
      //If the interval is rounded, it's divisible by 2
      hands.push(new Hand()); //Add a new Hand object to the array of hand classes
    } else {
      //If the interval is rounded, it isn't divisible by 2
      eyeballs.push(new Eyeball()); //Add a new eyeball object to the array of eyebal classes
    }
    lastAddTime = millis(); //Set the time when the obstacle was last added to the current time
  }
};

backGroundPicture = function () {
  //Defines a function for the background image
  if (groundX > (-1 * imgGround.width) / 2) {
    //If the left half of the picture is on the canvas
    groundX -= 8; //Make the horizontal coordinate of the picture to reduce a certain value, the realization of the picture to the left
  } else groundX = 0; //If the left half of the image is completely off the canvas, return the image to its original position
  image(imgGround, groundX, height - 20, imgGround.width, imgGround.height); //Show a picture of the ground
  if (mountounX > (-1 * imgMountoun.width) / 4) {
    //If the left half of the picture is on the canvas
    mountounX -= 0.3; //The horizontal coordinate of the picture is reduced by a certain value, and the picture is moved to the left
  } else mountX = 0; //If the left half of the image is completely off the canvas, return the image to its original position
  image(imgMountoun, mountounX, 0, imgMountoun.width, imgMountoun.height); //Show a picture of the mountain
};
function printScore() {
  //Print scoring method
  textAlign(LEFT);
  fill(50);
  textSize(30);
  text("Scores: " + score, (5 * width) / 6, height / 9);
}

function initScreen() {
  // Game start screen
  image(imgBackground,0,0,800,400)
  textAlign(CENTER);
  noStroke();
  rectMode(CENTER);

}
function gamePlayScreen() {
  //gaming interface
  background(236, 240, 241);
  backGroundPicture(); //Call the function of the background image to display the background image
  faceDraw();
  addObstacle(); //Call the function that adds an obstacle
  printScore(); //Call the function that prints the score to display the score on the canvas
  walkingEye.update(); //Set the picture of the walkingEye to its current state by calling the update method of the walkingEye class
  walkingEye.move(); //call move function of walkingEye
  walkingEye.show(); //call show function of walkingEye
  if (frameCount % 6 == 0) index++; //Set the animation speed
  for (let c of hands) {
    //make hands move and show the hand
    c.move();
    c.show();
    if (walkingEye.hits(c)) {
      //Determine whether the walkingeyes collided with the hands object and if so
      cled = 1; //Setting the value of the variable to 1 indicates that a collision has occurred
      gameoverSound.play();
      textAlign(CENTER); //center the tex
      textSize(70);
      gameOver(); //Call the end of the game function to display the end of the game interface
    }
    walkingEye.addScore(c); //Call the walkingeye class scoring method
  }
  for (let b of eyeballs) {
    //Makes each eyeballs object in the eyeballs class array move and display
    b.update();
    b.move();
    b.show();

    if (walkingEye.hits(b)) {
      //Determine if the walkingeyes collided with the eyeballs object, and if so
      cled = 1; //Setting the value of the variable to 1 indicates that a collision has occurred
      textAlign(CENTER);
      textSize(70);
      gameoverSound.play();
      gameOver(); //Call the end of the game function to display the end of the game interface
    }
    walkingEye.addScore(b); //Call the dinosaur class scoring method
  }
}
function gameOverScreen() {
  //Game Over interface
  
  background(23, 24, 24, 3); //Set the background color and reduce the image by drawing repeatedly
  textAlign(CENTER);

  if (bestScore < score) {
    //Compare the highest score with the score and get the current highest score
    bestScore = score;
  }
  //"record"
  fill(255);
  textSize(14);
  text("Record", width / 2, height / 10);
  textSize(18);
  text(bestScore, width / 2, height / 5 - 20);
  //"scores"
  fill(255);
  textSize(18);
  text("Scores", width / 2, height / 2 - 80);
  textSize(150);
  text(score, width / 2, height / 2 + 50);
  //restar bottom
  fill(255);
  rectMode(CENTER);
  noStroke();
  //rect(width / 2, height - 40, 160, 48, 5);
}
function startGame() {
  //stargame functions
  gameScreen = 1; // Set the current interface status to the game interface
}
function gameOver() {
  //Game Over interface
  gameScreen = 2; //Set the current interface status to the game end interface
  gameoverSound.play();
}
function restart() {
  //function of restart
   //Make the current interface a game interface
  lastAddTime = 0; //Reset the time for adding obstacles
  eyeballs = []; //Initializes the array of eyeballs, emptying the original stored eyeballs objects
  hands = []; //Initializes the array of hands, emptying the original stored hands objects
  cled = 0; //Reset the variable used to determine whether a collision occurred
  score = 0; //Reset the variable of the score
  gameScreen = 0;
}
function printScore() {
  //print the function of scores
  textAlign(LEFT);
  fill(50);
  textSize(8);
  text("Scores: " + score, (5 * width) / 6, height / 9);
}
function centerCanvas() {
  //reset the canvas to center
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
function windowResiz() {
  //resize the windos
  centerCanvas();
}
faceSet = function () {
  // face detection set
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, function () {
    console.log("model ready");
  });
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
  noStroke();
};
faceDraw = function () {
  // show the dectected eyes
  if(faceDetectButton){
   let leftEye = poses[0].pose.keypoints[1].position;
  let rightEye = poses[0].pose.keypoints[2].position;
  let volume =
    poses[0].pose.keypoints[1].position.x -
    poses[0].pose.keypoints[2].position.x;
    //left eye
  if (leftEye.y > height / 2 && rightEye.y > height / 2) {
    walkingEye.jump();
  } else if (leftEye.y > height / 2 && rightEye.y > height / 2) {
    walkingEye.vy = 0;
  }
   push();
  translate(leftEye.x - 30, leftEye.y - 25);
  //rotate(-frameCount * 0.1);
  textAlign(CENTER, CENTER);
  ellipse(0, 0, 15);

  pop();
  //right eye
  push();
  translate(rightEye.x - 30, rightEye.y - 25);
  ellipse(0, 0, 15);

  pop(); 
  }
  
  
  
};
function difficultyScreen() {
   // Display the difficulty selection options
  // You can add buttons or other elements here for users to choose the difficulty
  clear();
  
  if(faceDetectButton){
    image(imgLevelbg2, 0, 0);
  }else {
    image(imgLevelbg, 0, 0);
  }
  difficultyButtonX = 600; // initializeX position of the difficulty button
  difficultyButtonY = 350; // initializey position of the difficulty button
  //background(236, 240, 241);
  let d= dist(mouseX,mouseY,35,35)<25;
  let d2 =dist(mouseX,mouseY,242,103.5)<25
  //image(imgEye[1], 10, 10, 50, 50);
  let eyeX= [77.5,125.5,157.5,293.5,346.5,417.5,507.5,598.5,600.5,691.5];
  let eyeY=[80.5,170.5,275.5,240.5,80.5,164.5,265.5,194.5,105.5,90];
  push();
  imageMode(CENTER);
  if(level>0&&mouseIsPressed===true&&
    mouseX > 530 &&
    mouseX < 567 &&
    mouseY > 283 &&
    mouseY < 310){
    frameRate(3);
    level--;
  }else if(level>=7){
    level=7;
  }else if(level<7&&mouseIsPressed===true&&mouseX > 569 &&
    mouseX < 601 &&
    mouseY > 283 &&
    mouseY < 310){
    frameRate(3);
    level++
  }else if(level<=0){
         level=0;  
           }
    else{
  frameRate(60);
  }/*
  image(imgEye[6], 77.5, 80.5, 100, 100);
  image(imgEye[6], 125.5, 170.5, 100, 100);
  image(imgEye[6], 157.5, 275.5, 100, 100);
  image(imgEye[6], 293.5, 240.5, 100, 100);
  image(imgEye[6], 346.5, 80.5, 100, 100);
  image(imgEye[6], 417.5, 164.5, 100, 100);
  image(imgEye[6], 507.5, 265.5, 100, 100);
  image(imgEye[6], 598.5, 194.5, 100, 100);
  image(imgEye[6], 600.5, 105.5, 100, 100);
  image(imgEye[6], 691.5, 90, 100, 100);*/
  image(imgDiff[level],width/2,height/2);
  image(imgEye[6], eyeX[level], eyeY[level], 100, 100);
  
  pop();
  //setgravity
  strokeWeight(2);
  stroke(0)
  
  if(d&&mouseIsPressed===true||(d2&&mouseIsPressed===true)
    ){
    gameScreen=0;
  }
}
mouseDragged = function () {
  if (draggingDifficultyButton) {
    // 如果正在拖拽难度按钮，更新它的位置为当前鼠标位置
    difficultyButtonX = mouseX;
    difficultyButtonY = mouseY;
  }
}
mouseClicked =function(d,s){
  

  if(gameScreen === 3&&
     mouseX>539&&
     mouseX<600&&
     mouseY>95&&
     mouseY<112.5
    ){
    faceDetectButton=!faceDetectButton;
  }
  s=dist(mouseX,mouseY,750,50)

  if(gameScreen == 0 &&
    mouseX > 272 &&
    mouseX < 445 &&
    mouseY > 346 &&
    mouseY < 374.5){
    gameScreen = 3;
  }
  
}
mouseReleased = function (d) {
  // 停止拖拽难度按钮
  d = dist(
    difficultyButton2X,
    difficultyButton2Y,
    difficultyButtonX,
    difficultyButtonY
  );
  draggingDifficultyButton = false;
  if (d < difficultyButtonSize / 3 && gameScreen === 0) {
      gameScreen = 3; // Set the game state to the difficulty selection screen
      // You can add code here to actually display the difficulty selection screen
      return;
    }
};
