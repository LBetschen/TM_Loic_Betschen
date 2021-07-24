var i = 1;
export class Coins {
    constructor(game) {

        this.coinSheet = new Image();
        this.coinSheet.src = document.getElementById("coin").src;
        this.coinSheet.size={
            columns:16,
            lignes:1,
            width:256,
            height:256
        }
        this.coinMap = [];
        this.columns = 25;

        this.coinAudio = new Audio();
        this.coinAudio.src = document.getElementById("coinAudio").src;

        this.width=32;
        this.height=32;

    }



    start(ctx, game) {

        this.coinAnimation(ctx);
        this.readFiles();

        this.cScore = game.playerProgress.getCookie("level1score",false);
        this.score = this.cScore[2];

        var c = game.playerProgress.getCookie("level1coins",false);
        this.coins = c[2].split(",");

        c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];
    }
    update(deltaTime, GameWidth, GameHeight, player, game) {

        
        var c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];

        var index = 0;
        for (var k = 0; k < this.coinMap.length; k++) {
            var value = this.coinMap[k];
            if (value == 1) {
                if (this.coins[index] == 1) {
                    var x = (k % this.columns) * this.width+game.player.offsetX;
                    var y = Math.floor(k / this.columns) * this.height;

                    if (player.position.x + player.hero.width / 2 > x &&
                        player.position.x + player.hero.width / 2 < x + this.width &&
                        player.position.y + player.hero.height / 2 > y &&
                        player.position.y + player.hero.height / 2 < y + this.height
                    ) {
                        this.score++;
                        this.coins[index] = 0;
                        game.playerProgress.changeCookie("level1score", this.score);
                        game.playerProgress.changeCookie("level1coins", this.coins);
                        console.log(this.coins);

                        this.coinAudio.play();
                    }
                }
                index++;
            }
        }

    }

    draw(ctx, game) {

        var index = 0;
        for (var j = 0; j < this.coinMap.length; j++) {
            var value = this.coinMap[j];
            if (value == 1) {

                if (this.coins[index] == 1) {

                    var source_x=(i%this.coinSheet.size.columns)*this.coinSheet.size.width;
                    var source_y=0;
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                   
                    ctx.drawImage(this.coinSheet,source_x,source_y,this.coinSheet.size.width,this.coinSheet.size.height,x,y,this.width,this.height);
                }
                index++;
            }
        }


        ctx.font = "50px";
        ctx.fillStyle = "black";

        ctx.fillText("Score : " + this.score, 75, 50);

    }

    coinAnimation(ctx) {
        let t;
        t = setInterval(function () {

            if (i > 15) {
                i = 1;
            } else {
                i++;
            }

        }, 100);
    }

    readFiles() {
        var res;
        fetch("./coins.txt").then(Response => Response.text()).then((data) => {
            res = data.toString().split(",");
            for (var i = 0; i < res.length; i++) {
                res[i] = parseInt(res[i]);
            }
            this.coinMap = res;
        });
    }
}