import img from "../../assets/img/turtle.png";
export class Player {
  dead = false;
  health = 100;
  score = 0;
  speed = 25;
  width = 90;
  height = 65;
  damageTaken = 10;
  healthRecover = 5;
  bonusAdd = 10;

  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  deductHealth = (damageTaken = this.damageTaken) => {
    this.health -= damageTaken;
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

    if (this.health <= 0) {
      this.dead = true;
      gameOver(this.score);
    }
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.posX, this.posY, this.width, this.height);

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Health: ${this.health}`, 950 - 95, 550 - 15);

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score}`, 15, 25);
  };
}

function gameOver(score) {
  document.body.innerHTML = `
  <center>
  <br/>
  <h2>Game Over!</h2>
  <p>Your Score: ${score}</p>
  <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
  </center>
  `;
}

export default Player;
