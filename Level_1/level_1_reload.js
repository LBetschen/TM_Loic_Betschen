
export class ReloadButton {
    constructor(game) {
        this.button = new Image();
        this.button.src = document.getElementById("reloadButton").src;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.height = this.button.naturalHeight / 2;
        this.width = this.button.naturalWidth / 2;

        this.position = {
            x: this.gameWidth / 5,
            y: this.gameHeight / 20
        }
    }

    update(deltaTime, GameWidth, GameHeight) {
        this.position.x = this.gameWidth / 1.15;
        this.position.y = this.gameHeight / 20;
        this.height = this.button.naturalHeight / 2;
        this.width = this.button.naturalWidth / 2;

    }

    draw(ctx) {
        ctx.drawImage(this.button, this.position.x, this.position.y, this.width, this.height);
    }

    toggleButton(mouseX, mouseY, game) {
        if (mouseX >= this.position.x &&
            mouseX <= this.position.x + this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y + this.height) {

            this.button.src = document.getElementById("reloadButtonDown").src;
        } else {
            this.button.src = document.getElementById("reloadButton").src;
        }
    }


    toggleReload(mouseX, mouseY, game) {
        if (mouseX >= this.position.x &&
            mouseX <= this.position.x + this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y + this.height) {

                
                var c = game.playerProgress.getCookie("level1score", true);//gets the index of name in array info
                game.coins.score=c[2];
                game.playerProgress.changeCookie("level1score",c[2]);
                c=game.playerProgress.getCookie("level1coins",true),
                game.playerProgress.changeCookie("level1coins",c[2]);
                location.reload();

            }

    }


}