import img from "../../assets/img/food.png";

export class Food {
  dead = false;
  collisionWidth = 90;
  collisionHeight = 65;
  width = 100;
  height = 75;
  healthRecover = 5;

  constructor(xPos, yPos, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
  }

  isDead = () => {
    return this.xPos < -75;
  };

  update = (player) => {
    if (this.dead) return;
    this.xPos -= this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true;
    }

    if (
      !this.dead &&
      Math.abs(player.posX - this.xPos) < this.collisionWidth &&
      Math.abs(player.posY - this.yPos) < this.collisionHeight
    ) {
      this.dead = true;
      player.recoverHealth(this.healthRecover);
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
  };
}

export default Food;
