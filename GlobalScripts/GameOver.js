export class GameOver{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
    }

    update(deltaTime, GameWidth, GameHeight){
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
    }

    draw(ctx){
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 4)
    }
}