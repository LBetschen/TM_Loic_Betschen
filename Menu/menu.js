export class Menu {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.gameState = game.gamestate;
        this.constGamewidth = game.gameWidth;

        this.ratio = this.gameWidth / game.gameWidth;

        this.aboutButton = new Image();
        this.aboutButton.down = "aboutButtonDown";
        this.aboutButton.up = "aboutButton";
        this.aboutButton.src = document.getElementById(this.aboutButton.up).src;
        this.aboutButton.height = this.aboutButton.naturalHeight / 3 / this.ratio;
        this.aboutButton.width = this.aboutButton.naturalWidth / 3 / this.ratio;
        this.aboutButton.position = {
            x: this.gameWidth / 50,
            y: this.gameHeight / 50
        }

        this.newGameButton = new Image();
        this.newGameButton.down = "newGameDown";
        this.newGameButton.up = "newGameButton";
        this.newGameButton.src = document.getElementById(this.newGameButton.up).src;
        this.newGameButton.aspect = this.newGameButton.naturalHeight / this.newGameButton.naturalWidth;
        this.newGameButton.width = this.newGameButton.naturalWidth / 3 / this.ratio;
        this.newGameButton.height = this.newGameButton.naturalHeight / 3 / this.ratio;
        this.newGameButton.position = {
            x: this.gameWidth / 2 - this.newGameButton.width / 2,
            y: this.gameHeight / 2 - this.newGameButton.height
        }

        this.settingsButton = new Image();
        this.settingsButton.down = "settingsButtonDown";
        this.settingsButton.up = "settingsButton";
        this.settingsButton.src = document.getElementById(this.settingsButton.up).src;
        this.settingsButton.height = this.settingsButton.naturalHeight / 3 / this.ratio;
        this.settingsButton.width = this.settingsButton.naturalWidth / 3 / this.ratio;
        this.settingsButton.position = {
            x: this.gameWidth / 1.07,
            y: this.gameHeight / 50
        }

        this.resumeGame = new Image();
        this.resumeGame.down = "resumeGameDown";
        this.resumeGame.up = "resumeGame";
        this.resumeGame.src = document.getElementById(this.resumeGame.up).src;
        this.resumeGame.height = this.resumeGame.naturalHeight / 3 / this.ratio;
        this.resumeGame.width = this.resumeGame.naturalWidth / 3 / this.ratio;
        this.resumeGame.position = {
            x: this.gameWidth / 2 - this.resumeGame.width / 2,
            y: this.gameHeight / 50
        }

        this.volumeButton = new Image();
        this.volumeButton.up = "volumeButton";
        this.volumeButton.down = "volumeButtonDown";
        this.volumeButton.mutedUp = "mutedButton";
        this.volumeButton.mutedDown = "mutedButtonDown";
        this.volumeButton.src = document.getElementById(this.volumeButton.up).src;
        this.volumeButton.height = this.volumeButton.naturalHeight / 3 / this.ratio;
        this.volumeButton.width = this.volumeButton.naturalWidth / 3 / this.ratio;
        this.volumeButton.position = {
            x: this.gameWidth / 1.15,
            y: this.gameHeight / 50
        }

        this.gameButtons = [
            this.volumeButton,
            this.newGameButton,
            this.settingsButton,
            this.aboutButton
        ]

        this.input = document.getElementById("nameInput");
        this.input.style.height = this.gameHeight / 25 + "px";
        this.input.style.width = this.gameWidth / 5 + "px";
        this.input.style.left = this.gameWidth / 2 - this.input.offsetWidth / 2 + "px";
        this.input.style.top = this.newGameButton.position.y + this.newGameButton.height * 1.25 + "px";

        this.playersName = document.getElementById("playerNames");
    }

    update(deltaTime, GameWidth, GameHeight, gameState, savedGame) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;
        this.ratio = this.constGamewidth / this.gameWidth;

        this.settingsButton.position = {
            x: this.gameWidth / 1.07,
            y: this.gameHeight / 50
        }
        this.aboutButton.position = {
            x: this.gameWidth / 50,
            y: this.gameHeight / 50
        }
        this.newGameButton.position = {
            x: this.gameWidth / 2 - this.newGameButton.width / 2,
            y: this.gameHeight / 2 - this.newGameButton.height * 1.5
        }
        this.volumeButton.position = {
            x: this.settingsButton.position.x - this.volumeButton.width - 10,
            y: this.gameHeight / 50
        }
        this.resumeGame.position = {
            x: this.gameWidth / 2 - this.resumeGame.width / 2,
            y: this.gameHeight / 2
        }
        this.aboutButton.height = this.aboutButton.naturalHeight / 3 / this.ratio;
        this.aboutButton.width = this.aboutButton.naturalWidth / 3 / this.ratio;
        this.settingsButton.height = this.settingsButton.naturalHeight / 3 / this.ratio;
        this.settingsButton.width = this.settingsButton.naturalWidth / 3 / this.ratio;
        this.volumeButton.height = this.volumeButton.naturalHeight / 3 / this.ratio;
        this.volumeButton.width = this.volumeButton.naturalWidth / 3 / this.ratio;
        this.newGameButton.width = this.newGameButton.naturalWidth / 3 / this.ratio;
        this.newGameButton.height = this.newGameButton.naturalHeight / 3 / this.ratio;
        this.resumeGame.height = this.resumeGame.naturalHeight / 3 / this.ratio;
        this.resumeGame.width = this.resumeGame.naturalWidth / 3 / this.ratio;
        
        this.input.style.left = this.gameWidth / 2 - this.input.offsetWidth / 2 + "px";
        this.input.style.top = this.newGameButton.position.y + this.newGameButton.height * 1.5 + "px";
        this.input.style.height = this.gameHeight /25+ "px";
        this.input.style.width = this.gameWidth / 5 + "px";
    }

    draw(ctx, gameState, savedGame,game) {

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("The Climate Savers", this.gameWidth / 2, this.gameHeight / 14);

        this.gameButtons.forEach((object) => {
            ctx.drawImage(object, object.position.x, object.position.y, object.width, object.height);
        })
        var c= game.playerProgress.getCookie("name",false);
        if (c[2]!=0) {
            ctx.drawImage(this.resumeGame, this.resumeGame.position.x, this.resumeGame.position.y, this.resumeGame.width, this.resumeGame.height);
            this.input.style.left = this.gameWidth / 2 - this.input.offsetWidth / 2 + "px";
            this.input.style.top = this.resumeGame.position.y + this.newGameButton.height * 1.5 + "px";
        }

        if (gameState == 1) {
            ctx.fillRect(400, 100, 100, 100);
        } else if (gameState == 2) {
            ctx.fillStyle = "#e6a661";
            ctx.textAlign = "left";
            ctx.fillRect(this.aboutButton.position.x + this.aboutButton.width, this.aboutButton.position.y, this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillText("This game was created for my baccalaureate", this.aboutButton.position.x + this.aboutButton.width + 20, this.aboutButton.position.y + this.aboutButton.height, this.gameWidth / 2);
            ctx.fillText("project. The goal of my game is to ", this.aboutButton.position.x + this.aboutButton.width + 20, this.aboutButton.position.y + this.aboutButton.height + 30, this.gameWidth / 2);
            ctx.fillText("demonstrate certain solutions that could", this.aboutButton.position.x + this.aboutButton.width + 20, this.aboutButton.position.y + this.aboutButton.height + 60, this.gameWidth / 2);
            ctx.fillText("help the environment.", this.aboutButton.position.x + this.aboutButton.width + 20, this.aboutButton.position.y + this.aboutButton.height + 90, this.gameWidth / 2);
            ctx.fillText("Loïc Betschen", this.aboutButton.position.x + this.aboutButton.width + 20, this.aboutButton.position.y + this.aboutButton.height + 180, this.gameWidth / 2);
        }
    }

    toggleVolumeButton(audioMuted, mouseX, mouseY) {
        if (mouseX >= this.volumeButton.position.x &&
            mouseX <= this.volumeButton.position.x + this.volumeButton.width &&
            mouseY >= this.volumeButton.position.y &&
            mouseY <= this.volumeButton.position.y + this.volumeButton.height) {
            if (audioMuted == false) {
                this.volumeButton.src = document.getElementById(this.volumeButton.down).src;
            } else {
                this.volumeButton.src = document.getElementById(this.volumeButton.mutedDown).src;
            }
        } else {
            if (audioMuted == false) {
                this.volumeButton.src = document.getElementById(this.volumeButton.up).src;
            } else {
                this.volumeButton.src = document.getElementById(this.volumeButton.mutedUp).src;
            }
        }
    }

    savePlayer(game) {
        var name = "name";
        
        if (this.input.value.length != 0) {
            var c = game.playerProgress.getCookie(name, false);//gets the index of name in array info
            game.playerProgress.changeCookie(game.playerProgress.playerVariables[c[0]], this.input.value);
        }
    }

    newGame(game) {
        for(var i=0;i<game.playerProgress.newPlayerVariables.length;i++){
            document.cookie=game.playerProgress.newPlayerVariables[i]+"= 0 ;expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/";
        }
        game.playerProgress.getSavedPlayer(game);
    }

    inputValue(game) {
        var name = "name";
        
        var c = game.playerProgress.getCookie(name, false);//gets the index of name in array info
        console.log(c);
        if (c[2] == 0 ) {
            this.input.value = "PLAYER NAME";
        } else {

            this.input.value = c[2];
        }
    }
}