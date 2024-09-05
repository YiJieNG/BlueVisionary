import spriteSheet from "../../assets/img/minigame/turtle_sprite.png"; // Load your sprite sheet
import hurtImage from "../../assets/img/minigame/turtle_hurt_sprite.png"; // Load the hurt image

export class Player {
  dead = false;
  health = 100;
  score = 0;
  speed = 25;
  width = 96; // Set the width to match the sprite frame width
  height = 96; // Set the height to match the sprite frame height
  damageTaken = 10;
  healthRecover = 5;
  bonusAdd = 10;
  isHurt = false; // Flag to track if the turtle is hurt

  frameIndex = 0; // Current frame index in the animation
  numberOfFrames = 6; // Total number of frames in the sprite sheet for the animation
  ticksPerFrame = 5; // Number of game ticks (or frames) to wait before advancing the animation frame
  tickCount = 0; // Counts the game ticks

  // Sprite coordinates and dimensions on the sprite sheet
  spriteX = 0; // x coordinate of the first frame on the sheet
  spriteY = 0; // y coordinate of the first frame on the sheet
  spriteWidth = 48; // width of each frame
  spriteHeight = 48; // height of each frame
  hurtWidth = 96; // image of displaying the hurt turtle
  hurtHeight = 36; // image of displaying the hurt turtle

  constructor(posX, posY, handleGameOver) {
    this.posX = posX;
    this.posY = posY;
    this.handleGameOver = handleGameOver; // Pass the callback to handle game over
  }

  deductHealth = (damageTaken = this.damageTaken) => {
    this.health -= damageTaken;
    this.isHurt = true; // Set the hurt state to true
    setTimeout(() => {
      this.isHurt = false; // Revert to normal after 0.5 seconds
    }, 500);

    if (this.health <= 0) {
      this.dead = true;
      this.handleGameOver(this.score); // Call the game over handler with the current score
    }
  };

  recoverHealth = (recover = this.healthRecover) => {
    this.health = Math.min(this.health + recover, 100); // health can't exceed 100
  };

  increaseScore = (bonus = this.bonusAdd) => {
    this.score += bonus;
  };

  update = () => {
    document.onkeydown = (e) => {
      if (e.keyCode === 38) {
        // Up arrow
        this.posY -= this.speed;
      }
      if (e.keyCode === 40) {
        // Down arrow
        this.posY += this.speed;
      }
    };

    if (this.posY < 45) this.posY = 45;
    if (this.posY > 550 - 90) this.posY = 550 - 90; // Prevent the player from moving outside the canvas

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
    if (this.isHurt) {
      image.src = hurtImage; // Use hurt image when hurt
    } else {
      image.src = spriteSheet; // Use sprite sheet otherwise
    }

    if (this.isHurt) {
      // Draw hurt image
      ctx.drawImage(
        image,
        this.posX,
        this.posY,
        this.hurtWidth,
        this.hurtHeight
      );
    } else {
      // Calculate the x position of the current frame in the sprite sheet
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
    }

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Health: ${this.health}`, 15, 50);

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 15, 25);
  };
}

export default Player;
