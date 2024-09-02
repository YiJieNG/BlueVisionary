import img from "../../assets/img/food.png";
export class Food {
  speed = 1;
  dead = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  isDead = () => {
    return this.xPos < 0;
  };

  update = (player) => {
    if (this.dead) return;
    this.xPos -= this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true;
    }

    if (
      !this.dead &&
      Math.abs(player.posX - this.xPos) < 90 &&
      Math.abs(player.posY - this.yPos) < 65
    ) {
      this.dead = true;
      player.recoverHealth();
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 100, 75);
  };
}

export default Food;
