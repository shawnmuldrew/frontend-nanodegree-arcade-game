// Enemies our player must avoid
var Enemy = function(speed,x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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
      points = 0;
    }
  }

  // If off screen remove from array and start new enemy
  if (this.x > 500) {
    var doneEnemy = allEnemies.indexOf(this);
    allEnemies.splice(doneEnemy,1);
    var yIndex = Math.floor(Math.random() * 3);  
    var enemySpeed = Math.floor(Math.random() * (enemySpeedMax-enemySpeedMin)) + enemySpeedMin; 
    allEnemies.push(new Enemy(enemySpeed,enemyStartX,enemyStartY[yIndex]));
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

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  console.log(key);
  if (key == 'up') {
    if ((this.y - playerMoveY) >= playerUpFinish) {
      this.y = this.y - playerMoveY;
      points++;
    }
    else {
      this.y = playerStartY;
    }
  }
  if (key == 'down') {
    if ((this.y + playerMoveY) <= playerDownEdge) {
      this.y = this.y + playerMoveY;
      points--;
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 4;
var allEnemies = [];
var points = 0;
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
var enemySpeedMax = 300;
var enemySpeedMin = 100;

var player1 = new Player(playerStartX,playerStartY);

for (i=0; i<numEnemies; i++) {
  var yIndex = Math.floor(Math.random() * 3);  
  var enemySpeed = Math.floor(Math.random() * (enemySpeedMax-enemySpeedMin)) + enemySpeedMin; 
  allEnemies.push(new Enemy(enemySpeed,enemyStartX,enemyStartY[yIndex]));
};

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
