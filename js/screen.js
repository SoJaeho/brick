function startGame(no) {
  game = new Game(no);
  canvas.focus();
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BALL_RADIUS = 7;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 15;
const PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
const PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
const PADDLE_SPEED = 7;
const COLOR = "#303030";

var keys = { left: false, right: false };
 canvas.addEventListener("keydown", function(ev) {
      if (ev.code == "ArrowLeft") keys.left = true;
      if (ev.code == "ArrowRight") keys.right = true;
      if (ev.code != "F5") ev.preventDefault();
    });

    canvas.addEventListener("keyup", function(ev) {
      if (ev.code == "ArrowLeft") keys.left = false;
      if (ev.code == "ArrowRight") keys.right = false;
      if (ev.code != "F5") ev.preventDefault();
    });



class Game {
  constructor(no) {
    var ballSpeeds = [6, 7];
    let heightBrick = Math.floor(Math.random() * 9) + 3;
    let widthBrick = heightBrick * 2;
    var brickSettings = [heightBrick, widthBrick, 0, 50, WIDTH, 150, COLOR];
      
    
   
    this.state = "start";
    this.timeCount = 0;
    this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
      PADDLE_SPEED, COLOR);
    this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
      ballSpeeds[no], 75, COLOR);
    this.bricks = new Bricks(...brickSettings);
      

  
  }

  update() {
    if (this.state == "start") {
      this.timeCount++;
      if (this.timeCount >= 100) this.state = "play";
      return ;
    }
    if (this.state != "play") return;

    if (keys.left) this.paddle.moveLeft(0);
    if (keys.right) this.paddle.moveRight(WIDTH);

    const DIV = 10;
    for (var i = 0; i < DIV; i++) {
      this.ball.move(1 / DIV);
      this.ball.collideWall(0, 0, WIDTH);
      this.paddle.collide(this.ball);
      if (this.bricks.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
      if (this.bricks.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
    }

    if (this.ball.y > HEIGHT + 50) this.state = "end";
    if (this.bricks.count == 0) this.state = "clear";
  }

  draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.bricks.draw(ctx);
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
  }
}

function drawText(text) {
  ctx.font = "bold 70px arial";
  ctx.fillStyle = "#858585";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
}

var game = null;

function mainLoop() {
  requestAnimationFrame(mainLoop);

  if (game) {
    game.update();
    game.draw();
    if (game.state == "end") drawText("ReTry?");
    if (game.state == "clear") drawText("CLEAR!");
  }
  else drawText("Breakout");
}

mainLoop();

