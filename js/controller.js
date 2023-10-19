
class Paddle {
  constructor(x, y, width, height, speed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.halfWidth = width / 2;
    this.height = height;
    this.speed = speed;
    this.color = color;
  }
   
  get center() { return this.x + this.halfWidth; }

  moveLeft(wallLeft) {
    this.x -= this.speed;
    if (this.x < wallLeft) this.x = wallLeft;
  }

  moveRight(wallRight) {
    this.x += this.speed;
    if (this.x + this.width > wallRight) this.x = wallRight - this.width;
  }

  collide(ball) {
    var yCheck = () => this.y - ball.radius < ball.y && 
      ball.y < this.y + ball.radius;
    var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
    if (ball.my > 0 && yCheck() && xCheck()) {
      const hitPos = ball.x - this.center;
      var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
      if (hitPos < 0) angle += 20; // 100 ~ 160
      ball.setAngle(angle);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

