// Enemies our player must avoid
var Enemy = function(speed,x,y) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (!pauseGame) {
    // Move enemy
    this.x = this.x + this.speed*dt;

    //Check for collisions with player
    var enemyFront = this.x+50;
    var enemyBack = this.x-50;
    var playerFront = player.x-30;
    var playerBack = player.x+30;
    if (this.y == player.y) {
      if (((enemyFront > playerFront) && (enemyFront < playerBack)) || ((enemyBack > playerFront) && (enemyBack < playerBack))) {
        player.x = playerStartX;
        player.y = playerStartY;
        reduceLives();
      }
    }

    // If off screen remove from array and start new enemy
    if (this.x > 500) {
      var doneEnemy = allEnemies.indexOf(this);
      allEnemies.splice(doneEnemy,1);
      startNewEnemy();
//      var yIndex = Math.floor(Math.random() * 3);
//      var enemySpeed = Math.floor(Math.random() * (enemySpeedMax-enemySpeedMin)) + enemySpeedMin;
//      allEnemies.push(new Enemy(enemySpeed,enemyStartX,enemyStartY[yIndex]));
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

// Player update method
Player.prototype.update = function() {
  if (!pauseGame) {
    // Check for gem collection
    var playerX = this.x;
    var playerY = this.y;
    allGems.forEach(function(gem) {
      if ((gem.x == playerX) && (gem.y == playerY)) {
        var collectedGem = allGems.indexOf(gem);
        addGemToCollection(gem);
        allGems.splice(collectedGem,1);
        var gemtype = createGem();
      }
    });
    if (isLevelComplete()) {
      newLevel();
    }
    renderScoreBoard();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
 this.y = playerStartY;
 this.x = playerStartX;
};

// Move player based on keyboard input
// Ensure player does not move off board
// Add points as player moves forward
Player.prototype.handleInput = function(key) {
  if (!pauseGame) {
    if (key == 'up') {
      if ((this.y - playerMoveY) >= playerUpFinish) {
        this.y = this.y - playerMoveY;
        points++;
        score = score + level;
      }
      else {
        player.reset();
        points++;
        score = score + level;
      }
    }
    if (key == 'down') {
      if ((this.y + playerMoveY) <= playerDownEdge) {
        this.y = this.y + playerMoveY;
        points--;
        score = score - level;
      }
    }
    if (key == 'left') {
      if ((this.x - playerMoveX) >= playerLeftEdge) {
        this.x = this.x - playerMoveX;
      }
    }
    if (key == 'right') {
      if ((this.x + playerMoveX) <= playerRightEdge) {
        this.x = this.x + playerMoveX;
      }
    }
    console.log('points = '.concat(points));
    console.log('Player Y: '.concat(this.y));
  }
};

var Gem = function(sprite,x,y,type) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.type = type;
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 2;
var numGems = 2;
var allEnemies = [];
var allGems = [];
var points = 0;
var score = 0;
var highScore = 0;
var level = 1;
var lives = 3;
var orangeCount = 0;
var greenCount = 0;
var blueCount = 0;
var pauseGame = false;
var playerStartX = 201;
var playerStartY = 390;
var playerMoveX = 100;
var playerMoveY = 82;
var playerLeftEdge = 1;
var playerDownEdge = 462;
var playerRightEdge = 401;
var playerUpFinish = 62;
var enemyStartX = -100;
var enemyStartY = [62,144,226];
var GemY = [62,144,226];
var GemX = [1,101,201,301,401,501];
var enemySpeedMax = 100;
var enemySpeedMin = 50;
// Gem odds of appearing (out of 10)
var orangeGem = 5;
var greenGem = 8;
var blueGem = 10;

// Create player
var player1 = new Player(playerStartX,playerStartY);

// Function to add new gem to array for display. Checks to ensure tile not occupied
function createGem() {
  var emptyTile = false;
  var xIndex = 0;
  var yIndex = 0;
  while (!emptyTile) {
    emptyTile = true;
    xIndex = Math.floor(Math.random() * 5);
    yIndex = Math.floor(Math.random() * 3);
    allGems.forEach(function(gem) {
      if ((GemX[xIndex] == gem.x) && (GemY[yIndex] == gem.y)) {
        emptyTile = false;
      }
    });
  }
  var gemOdds = Math.floor(Math.random() * 10);
  if (gemOdds <= orangeGem) {
    allGems.push(new Gem('images/gem-orange-small.png',GemX[xIndex],GemY[yIndex],'orange'));
    return 'orange';
  } else if ((gemOdds > orangeGem) && (gemOdds <= greenGem)) {
      allGems.push(new Gem('images/gem-green-small.png',GemX[xIndex],GemY[yIndex],'green'));
      return 'green';
  } else {
      allGems.push(new Gem('images/gem-blue-small.png',GemX[xIndex],GemY[yIndex],'blue'));
      return 'blue';
  }
}

function startNewEnemy() {
  var yIndex = Math.floor(Math.random() * 3);
  var enemySpeed = Math.floor(Math.random() * (enemySpeedMax-enemySpeedMin)) + enemySpeedMin;
  allEnemies.push(new Enemy(enemySpeed,enemyStartX,enemyStartY[yIndex]));
};

function renderScoreBoard() {
  if (!pauseGame) {
    ctx.font = "10pt Arial";
    ctx.clearRect(0,0,500,60);
    ctx.fillText("Level",20,10);
    ctx.fillText(("   "+level).slice(-3),75,10);
    ctx.fillText("Lives",20,25);
    ctx.fillText(("   "+lives).slice(-3),75,25);
    ctx.fillText("Squares",20,40);
    ctx.fillText(("   "+points).slice(-3),75,40);
    ctx.fillText("Orange",100,10);
    ctx.fillText(("   "+orangeCount).slice(-3),155,10);
    ctx.fillText("Green",100,25);
    ctx.fillText(("   "+greenCount).slice(-3),155,25);
    ctx.fillText("Blue",100,40);
    ctx.fillText(("   "+blueCount).slice(-3),155,40);
    ctx.font = "16pt Arial";
    ctx.fillText("Score",200,25);
    ctx.fillText(("   "+score).slice(-3),275,25);
    ctx.fillText("High Score",320,25);
    ctx.fillText(("   "+highScore).slice(-3),465,25);
  }
};

function reduceLives() {
  lives--;
  if (lives == 0) {
    gameOver();
  }
};

function gameOver() {
  pauseGame = true;
  ctx.font = "20pt Arial";
  ctx.clearRect(0,0,500,60);
  ctx.fillText("GAME OVER!!!  Score = "+score,90,40);
  setTimeout(function() {
    resetGame();
  }, 3000);
};

function newLevel() {
  pauseGame = true;
  ctx.font = "20pt Arial";
  ctx.clearRect(0,0,500,60);
  ctx.fillText("WELCOME TO LEVEL "+(level+1),100,40);
  setTimeout(function() {
    addLevel();
  }, 3000);
};

function resetGame() {
  pauseGame = false;
  if (score > highScore) {
    highScore = score;
  }
  points = 0;
  score = 0;
  orangeCount = 0;
  greenCount = 0;
  blueCount = 0;
  lives = 3;
  level = 1;
  enemySpeedMax = 100;
  enemySpeedMin = 50;
  numEnemies = 2;
  allEnemies = [];
  createEnemies();
  allGems = [];
  createGems();
};

function addGemToCollection(gem) {
  switch(gem.type) {
    case 'orange':
      orangeCount++;
      score = score + (1*level);
      break;
    case 'green':
      greenCount++;
      score = score + (2*level);
      break;
    case 'blue':
      blueCount++;
      score = score + (3*level);
      break;
  }
};

function isLevelComplete() {
  return ((orangeCount > 0) && (greenCount > 0) && (blueCount > 0));
};

function addLevel() {
  pauseGame = false;
  level++;
  enemySpeedMax = 100+(40*level);
  enemySpeedMin = 50+(20*level);
  if((2 + (Math.round(level/4))) > numEnemies) {
    numEnemies++;
    startNewEnemy();
  }
  orangeCount = 0;
  greenCount = 0;
  blueCount = 0;
  player.reset();
};

function createEnemies() {
  for (i=0; i<numEnemies; i++) {
    var yIndex = Math.floor(Math.random() * 3);
    var enemySpeed = Math.floor(Math.random() * (enemySpeedMax-enemySpeedMin)) + enemySpeedMin;
    allEnemies.push(new Enemy(enemySpeed,enemyStartX,enemyStartY[yIndex]));
  }
};

function createGems() {
  for (i=0; i<numGems; i++) {
    var gemtype = createGem();
  }
}

//Create gems
createGems();

// Create enemies
createEnemies();

// Set player variable to created player
var player = player1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
