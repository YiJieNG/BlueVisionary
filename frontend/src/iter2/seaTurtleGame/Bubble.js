import img from "../../assets/img/minigame/bubble.png";

export class Bubble {
  dead = false;
  collisionWidth = 68;
  collisionHeight = 38;
  width = 38;
  height = 38;
  pointAdd = 10;
  onCollide = null;

  constructor(xPos, yPos, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
  }

  isDead = () => {
    return this.xPos < -75;
  };

  update = (player) => {
    if (this.dead) return; // if the bubble is dead do nothing
    this.xPos -= this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true; // update bubble dead status
    }

    // Check for collision with player
    if (
      !this.dead &&
      Math.abs(player.posX - this.xPos) < this.collisionWidth &&
      Math.abs(player.posY - this.yPos) < this.collisionHeight
    ) {
      this.dead = true; // Mark bubble as dead immediately
      player.increaseScore(this.pointAdd);
      player.updateIspaused(true);
      this.onCollide(); // Trigger the onCollide callback to pause the game and show the pop-up
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

export default Bubble;
