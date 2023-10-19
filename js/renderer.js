
class Ball { 
  constructor(x, y, radius, speed, angle, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.setAngle(angle);
    this.color = color;
  }

  setAngle(angle) {
    var radian = angle / 180 * Math.PI;
    this.mx = this.speed * Math.cos(radian);
    this.my = this.speed * -Math.sin(radian);
  }

  move(k) {
    this.x += this.mx * k;
    this.y += this.my * k;
  }

  get collideX() {
    if (this.mx > 0) return this.x + this.radius;
    else return this.x - this.radius;
  }

  get collideY() {
    if (this.my > 0) return this.y + this.radius;
    else return this.y - this.radius;
  }

  collideWall(left, top, right) {
    if (this.mx < 0 && this.collideX < left) this.mx *= -1;
    if (this.mx > 0 && this.collideX > right) this.mx *= -1;
    if (this.my < 0 && this.collideY < top) this.my *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks {
  constructor(rows, cols, x, y, width, height, color) {
    this.rows = rows;
    this.cols = cols;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.brickWidth = width / cols;
    this.brickHeight = height / rows;
    this.count = rows * cols;
    this.color = color;
    this.data = [];
    for (var i = 0; i < rows; i++) {
      var line = new Array(cols);
      line.fill(1);
      this.data.push(line);
    }
  }

  collide(x, y) {
    var row = Math.floor((y - this.y) / this.brickHeight);
    var col = Math.floor((x - this.x) / this.brickWidth);
    if (row < 0 || row >= this.rows) return false;
    if (col < 0 || col >= this.cols) return false;
    if (this.data[row][col]) {
      this.data[row][col] = 0;
      this.count--;
      return true;
    }
    else return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "lightgray";
    for (var r = 0; r < this.rows; r++) {
      for (var c = 0; c < this.cols; c++) {
        if (!this.data[r][c]) continue;
        var x = this.x + (this.brickWidth * c);
        var y = this.y + (this.brickHeight * r);
        ctx.beginPath();
        ctx.fillRect(x, y, this.brickWidth, this.brickHeight);
        ctx.strokeRect(x, y, this.brickWidth, this.brickHeight);
        ctx.closePath();
      }
    }
  }
}