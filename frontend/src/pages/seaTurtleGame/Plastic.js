import img from "../../assets/img/minigame/plastic.png";

export class Plastic {
  dead = false;
  collisionWidth = 70;
  // collisionHeight = 60;
  collisionHeightTop = 30;
  collisionHeightBottom = 60;

  width = 40;
  height = 60;
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

    // Calculate relative positions
    let deltaX = player.posX - this.xPos;
    let deltaY = player.posY - this.yPos;

    // Check for collision with player
    if (!this.dead && Math.abs(deltaX) < this.collisionWidth) {
      if (deltaY < 0 && Math.abs(deltaY) < this.collisionHeightTop) {
        // Collision detected when plastic is above the sea turtle
        this.dead = true;
        player.deductHealth(this.damageCaused);
      } else if (deltaY >= 0 && deltaY < this.collisionHeightBottom) {
        // Collision detected when plastic is below the sea turtle
        this.dead = true;
        player.deductHealth(this.damageCaused);
      }
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
