import img from "../../assets/img/plastic.png";

export class Plastic {
  dead = false;
  collisionWidth = 90;
  collisionHeight = 65;
  width = 100;
  height = 75;
  damageCaused = 10;

  constructor(xPos, yPos, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
  }

  isDead = () => {
    return this.xPos < -75;
  };

  update = (player) => {
    if (this.dead) return; // if the plastic is dead do nothing
    this.xPos -= this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true; // update plastic dead status
    }

    // Check for collision with player
    if (
      !this.dead &&
      Math.abs(player.posX - this.xPos) < this.collisionWidth &&
      Math.abs(player.posY - this.yPos) < this.collisionHeight
    ) {
      this.dead = true; // Mark plastic as dead immediately
      player.deductHealth(this.damageCaused);
      // console.log("collide at:", this.xPos, this.yPos);
      // console.log("player at:", player.posX, player.posY);
      // console.log("collide: ", this.xPos, this.yPos);
    }
  };

  draw = (ctx) => {
    if (!this.dead) {
      // Only draw if not dead
      const image = new Image();
      image.src = img;
      ctx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
    }
  };
}

export default Plastic;
