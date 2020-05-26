var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, runner1, runner2;

var track, runner1_img, runner2_img;

var ground,ground1,hurdleimg;
var ground,ground1,invisibleGround,invisibleGround1;
var restartImg,gameOverImg,gameOver,restart;

var cloudsGroup;
var obstaclesGroup;

function preload(){
  track = loadImage("../images/track.jpg");
  runner1_img = loadImage("../images/runner1.png");
  runner2_img = loadImage("../images/runner2.png");
  groundImage = loadImage("../images/ground2.png");
  ground1Image = loadImage("../images/ground2.png");
  cloudImage = loadImage("cloud.png");
  hurdleimg = loadImage("h.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
