import img from "../../assets/img/plastic.png";

export class Plastic {
  speed = 1;
  dead = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  isDead = () => {
    return this.xPos < 5;
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
      Math.abs(player.posX - this.xPos) < 90 &&
      Math.abs(player.posY - this.yPos) < 65
    ) {
      this.dead = true; // Mark plastic as dead immediately
      if (!player.isInvulnerable) {
        player.deductHealth();
        console.log("collide at:", this.xPos, this.yPos);
        console.log("player at:", player.posX, player.posY);
        console.log("collide: ", this.xPos, this.yPos);
        player.isInvulnerable = true; // Make player invulnerable for a short period
        setTimeout(() => {
          player.isInvulnerable = false;
        }, 100); // Adjust the time as needed
      }
    }
  };

  draw = (ctx) => {
    if (!this.dead) {
      // Only draw if not dead
      const image = new Image();
      image.src = img;
      ctx.drawImage(image, this.xPos, this.yPos, 100, 75);
    }
  };
}

export default Plastic;
