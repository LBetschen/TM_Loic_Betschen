export class PauseScreen {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;


    }
    update(deltaTime, GameWidth, GameHeight) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;

    }
    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2)


    }




}