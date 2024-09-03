import img from "../../assets/img/sea_grass.png";

export class SeaGrass {
  dead = false;
  collisionWidth = 90;
  collisionHeight = 65;
  width = 100;
  height = 75;
  score = 10;

  constructor(xPos, yPos, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
  }

  isDead = () => {
    return this.yPos < -75;
  };

  update = (player) => {
    if (this.dead) return;
    this.yPos += this.speed;

    if (!this.dead && this.isDead()) {
      this.dead = true;
    }

    if (
      !this.dead &&
      Math.abs(player.posX - this.xPos) < this.collisionWidth &&
      Math.abs(player.posY - this.yPos) < this.collisionHeight
    ) {
      this.dead = true;
      player.increaseScore(this.score); // Method to add bonus score
      pauseGameWithInfo(); // Method to pause the game and show information
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
  };
}

function pauseGameWithInfo() {
  // Pause the game and show additional educational information
  alert(
    "Congratulations! You've found a sea grass! Sea grass is vital for the marine ecosystem. Let's learn more about it..."
  );
}

export default SeaGrass;
