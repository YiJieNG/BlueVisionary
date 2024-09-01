import img from "../../assets/img/sea_grass.png";
export class SeaGrass {
  speed = 1;
  dead = false;

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
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
      Math.abs(player.posX - this.xPos) < 90 &&
      Math.abs(player.posY - this.yPos) < 65
    ) {
      this.dead = true;
      player.increaseScore(20);
      pauseGameWithInfo();
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.xPos, this.yPos, 75, 100);
  };
}

function pauseGameWithInfo() {
  // Pause the game and show additional educational information
  alert(
    "Congratulations! You've found a sea grass! Sea grass is vital for the marine ecosystem. Let's learn more about it..."
  );
  // Add further logic for pausing and showing info here
}

export default SeaGrass;
