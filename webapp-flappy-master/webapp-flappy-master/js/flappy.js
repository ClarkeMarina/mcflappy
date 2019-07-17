// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var player;
var pipes = [];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("playerImg", "../assets/flappy.png");

  game.load.image("pipeBlock", "../assets/pipe_red.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of tcene
  game.stage.setBackgroundColor("#yeet");
  labelScore = game.add.text(20, 20, "0", {fill: "red"});

  player = game.add.sprite(20,50, "playerImg");
  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;

  generatePipe();

  game.input
   .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
   .onDown.add(playerJump2);

 game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);

  game.input
   .keyboard.addKey(Phaser.Keyboard.RIGHT)
   .onDown.add(moveRight);


  game.input
    .keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);


  game.input
    .keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval, generatePipe);

}
function spaceHandler(){
  score = score + 1;
  game.add.text(0, 0, score.toString())
  game.sound.play("score");
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);

}

function spaceHandler() {
  changeScore();
 game.sound.play("score");
}

 function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
 }
function moveRight(){
player.x = player.x + 35;
}
function moveUp(){
  player.y = player.y - 35;
}

function moveDown(){
  player.y = player.y + 35;
}

function moveLeft(){
  player.x = player.x - 35;
}
function generatePipe(){
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count < 8; count = count + 1){
    if(count != gapStart && count != gapStart +1){
    // game.add.sprite(200, count * 50, "pipeBlock");
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();

}

function addPipeBlock(x, y) {
   var pipeBlock = game.add.sprite(x,y,"pipeBlock");
   pipes.push(pipeBlock);
   game.physics.arcade.enable(pipeBlock);
   pipeBlock.body.velocity.x = -200;
}

function playerJump2(){
  player.body.velocity.y = -130;
}

function playerJump() {
  game.sound.play("score");
  game.add.sprite(event.x, event.y, "playerImg");
}
function gameOver(){
  registerScore(score);
  game.state.restart();
  score = 0;
}
