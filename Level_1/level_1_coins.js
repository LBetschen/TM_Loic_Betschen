var i = 1;
export class Coins {
    constructor(game) {

        this.coin = new Image();
        this.coin.src = document.getElementById("coin1").src;
        this.coinMap = [];
        this.columns = 32;

        this.coinAudio = new Audio();
        this.coinAudio.src = document.getElementById("coinAudio").src;

        this.width = this.coin.naturalWidth / 8;
        this.height = this.coin.naturalHeight / 8;

    }



    start(ctx, game) {

        this.coinAnimation(ctx);
        this.readFiles();

        this.cScore = game.playerProgress.getCookie("level1score");
        this.score = this.cScore[2];
        console.log(this.score);
        console.log(this.cScore[2]);

        var c = game.playerProgress.getCookie("level1coins");
        this.coins = c[2].split(",");
    }

    update(deltaTime, GameWidth, GameHeight, player, game) {

        this.coin.src = document.getElementById("coin" + i).src;
        var index = 0;
        for (var k = 0; k < this.coinMap.length; k++) {
            var value = this.coinMap[k];
            if (value == 1) {
                if (this.coins[index] == 1) {
                    var x = (k % this.columns) * this.width;
                    var y = Math.floor(k / this.columns) * this.height;

                    if (player.position.x + player.width / 2 > x &&
                        player.position.x + player.width / 2 < x + this.width &&
                        player.position.y + player.height / 2 > y &&
                        player.position.y + player.height / 2 < y + this.height
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
        for (var i = 0; i < this.coinMap.length; i++) {
            var value = this.coinMap[i];
            if (value == 1) {

                if (this.coins[index] == 1) {

                    var x = (i % this.columns) * this.width;
                    var y = Math.floor(i / this.columns) * this.width;
                    ctx.drawImage(this.coin, x, y, this.width, this.height);
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