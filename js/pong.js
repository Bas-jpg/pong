console.log("-------pong loaded-------");


let board;
let boardWidth = 1000;
let boardHeight = 600;
let context;

// players
let playerWidth = 10;
let playerHeight = 100;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

// ball
let ballWidth = 15;
let ballHeight = 15;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 2,
  velocityY: 3,
};


// sounds for collisions
let sound1 = new Audio("../sounds/sound1.mp3");
let sound2 = new Audio("../sounds/sound2.mp3");
let sound3 = new Audio("../sounds/sound3.ogg");

function soundWin() {
  let winsound = new Audio("../sounds/win.ogg");
  winsound.play();
}

let mainTrack = new Audio("../sounds/mainSoundTrack.mp3");
function mainSoundTrackStart() {
  mainTrack.play();
  mainTrack.loop = true;
}

function mainSoundTrackStop() {
  mainTrack.pause();
}

const audioArray = ["../sounds/sound1.mp3", "../sounds/sound2.mp3", "../sounds/sound3.ogg"];
function playRandomAudio() {
  const audioIndex = Math.floor(Math.random() * audioArray.length);
  const audio = new Audio(audioArray[audioIndex]);
  audio.play();
}



// score system
let player1Score = 0;
let player2Score = 0;

// when the page loads this function draws an canvas
window.onload = function () {
  board = document.querySelector(".board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // draw player 1
  context.fillStyle = "White";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  // loop and check for key presses
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveplayer);
};

// function that loops every single time to update the canvas
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  console.log("de canvas update zoveel keer");

  // player 1
  context.fillStyle = "White";
  // check if player 1 is allowed to move
  let nextPlayer1Y = player1.y + player1.velocityY;
  if (!outOfBounds(nextPlayer1Y)) {
    player1.y = nextPlayer1Y;
  }
  // update player 1
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  // player 2
  // check if player 2 is allowed to move
  let nextPlayer2Y = player2.y + player2.velocityY;
  if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
  }
  // update player 2
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  // ball
  context.fillStyle = "#8f9299";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // if ball touches top or bottom of the canvas
  if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY *= -1; // flip x direction
    playRandomAudio();
  }

  // bounces the ball from the paddle when a collision is detected
  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      // left side of ball touches right side of player 1
      ball.velocityX--;
      playRandomAudio();
      ball.velocityX *= -1;
    }
  } else if (detectCollision(ball, player2)) {
    if (ball.x + ball.width >= player2.x)
      // right side of ball touches left side of player 2
      ball.velocityX++;
      playRandomAudio();
    ball.velocityX *= -1; // flip x direction
  }

  // this caps the velocity of the ball at 9 or -9
  if (ball.velocityX >= 15) {
    ball.velocityX = 15;
  }
  else if (ball.velocityX <= -15) {
    ball.velocityX = -15;
  }


  if (ball.velocityX == 14) {
    mainSoundTrackStart();
  }
  else if (ball.velocityX == -14) {
    mainSoundTrackStart();
  }


  // game over
  if (ball.x < 0) {
    player2Score++;
    mainSoundTrackStop();
    soundWin();
    resetGame(1);
  } else if (ball.x + ballWidth > boardWidth) {
    player1Score++;
    mainSoundTrackStop();
    soundWin();
    resetGame(-1);
  }

  // score of player 1 and 2
  context.font = " 45px sans-serif";
  context.fillText(player1Score, boardWidth / 5, 45);
  context.fillText(player2Score, (boardWidth * 4) / 5, 45);

  let ballSpeed = (document.querySelector(".ballSpeed").innerHTML = ball.velocityX);

  // line in the middle of the board
  for (let i = 10; i < board.height; i += 25) {
    context.fillRect(board.width / 2 - 10, i, 5, 7);
  }
}

// function that checks if the paddles are out of bounds or not
function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + playerHeight > boardHeight;
}

// function that checks if a specific key is pressed and then gives a velocity
function moveplayer(e) {
  // player 1 velocity
  if (e.code == "KeyW") {
    player1.velocityY = -5; // if they W  key is pressed give player 1 a velocity of -3 on the y axis
  } else if (e.code == "KeyS") {
    player1.velocityY = 5; // if they S key is pressed give player 1 a velocity of 3 on the y axis
  }
  // player 2 velocity
  if (e.code == "ArrowUp") {
    player2.velocityY = -5; // if they arrow down key is pressed give player 2 a velocity of -3 on the y axis
  } else if (e.code == "ArrowDown") {
    player2.velocityY = 5; // if they arrow up key is pressed give player 2 a velocity of 3 on the y axis
  }
}

// function that checks if a key is unpressed and then stops the velocity
document.addEventListener("keyup", function (e) {
  // player 1 velocity
  if (e.code == "KeyW") {
    player1.velocityY = 0; // if the W key is upressed give player 1 a velocity of 0
  } else if (e.code == "KeyS") {
    player1.velocityY = 0; // if the S key is upressed give player 1 a velocity of 0
  }
});
// function that checks if a key is unpressed and then stops the velocity
document.addEventListener("keyup", function (e) {
  // player 2 velocity
  if (e.code == "ArrowUp") {
    player2.velocityY = 0; // if the arrow up key is upressed give player 2 a velocity of 0
  } else if (e.code == "ArrowDown") {
    player2.velocityY = 0; // if the arrow down key is upressed give player 2 a velocity of 0
  }
});

// function to detect if an collision happens for the ball with a paddle
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && // a's top left corner doesnt reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && // a's top left corner doesnt reach b's bottom left corner
    a.y + b.height > b.y
  ); // a's bottom left corner doesnt reach b's bottom right corner
}


// resets the ball at the original spot when a point is scored
function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 3
    };
}
