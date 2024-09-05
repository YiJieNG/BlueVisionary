import img from "../../assets/img/minigame/food.png";

export class Food {
  dead = false;
  collisionWidth = 70;
  collisionHeight = 60;
  width = 90; // Set the width of each frame
  height = 90; // Set the height of each frame
  pointAdd = 5;

  frameIndex = 0; // Current frame index in the animation
  numberOfFrames = 4; // Total number of frames in the sprite sheet for the animation
  ticksPerFrame = 50; // Number of game ticks (or frames) to wait before advancing the animation frame
  tickCount = 0; // Counts the game ticks

  // Sprite coordinates and dimensions on the sprite sheet
  spriteX = 0; // x coordinate of the first frame on the sheet
  spriteY = 0; // y coordinate of the first frame on the sheet
  spriteWidth = 48; // width of each frame in the sprite sheet
  spriteHeight = 48; // height of each frame in the sprite sheet

  constructor(xPos, yPos, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;

    // Load the image
    this.image = new Image();
    this.image.src = img;
    this.image.onload = () => {
      console.log("Food image loaded successfully");
    };
    this.image.onerror = (err) => {
      console.error("Failed to load food image", err);
    };
  }

  isDead = () => {
    return this.xPos < -this.width;
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
      player.increaseScore(this.pointAdd);
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
    if (this.image.complete && this.image.naturalWidth !== 0) {
      const frameX = this.frameIndex * this.spriteWidth;

      // Draw the current frame from the sprite sheet
      ctx.drawImage(
        this.image,
        frameX,
        this.spriteY, // y coordinate stays the same
        this.spriteWidth,
        this.spriteHeight,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );
    } else {
      console.error("Image not loaded or failed to load");
    }
  };
}

export default Food;
