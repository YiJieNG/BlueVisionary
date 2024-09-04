import img from "../../assets/img/minigame/food.png";

export class Food {
  dead = false;
  collisionWidth = 30;
  collisionHeight = 50;
  width = 40;
  height = 60;
  healthRecover = 5;

  frameIndex = 0; // Current frame index in the animation
  numberOfFrames = 4; // Total number of frames in the sprite sheet for the animation
  ticksPerFrame = 30; // Number of game ticks (or frames) to wait before advancing the animation frame
  tickCount = 0; // Counts the game ticks

  // Sprite coordinates and dimensions on the sprite sheet
  spriteX = 0; // x coordinate of the first frame on the sheet
  spriteY = 0; // y coordinate of the first frame on the sheet
  spriteWidth = 48; // width of each frame
  spriteHeight = 48; // height of each frame
  hurtWidth = 96; // image of displaying the hurt turtle
  hurtHeight = 36; // image of displaying the hurt turtle

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

    // Update the frame index for animation
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
      if (this.frameIndex >= this.numberOfFrames) {
        this.frameIndex = 0; // Loop back to the first frame
      }
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    const frameX = this.frameIndex * this.spriteWidth;

    // Draw the current frame from the sprite sheet
    ctx.drawImage(
      image,
      frameX,
      this.spriteY, // y coordinate stays the same
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  };
}

export default Food;
