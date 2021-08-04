var i = 1;
export class InteractiveObjects {
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

        this.checkpoint=new Image();
        this.checkpoint.up="checkpoint1";
        this.checkpoint.down="checkpoint";
        this.checkpoint.src=document.getElementById(this.checkpoint.down).src;
        this.checkpoint.height=this.checkpoint.naturalHeight;
        this.checkpoint.width=this.checkpoint.naturalWidth;
        

    }



    start(ctx, game) {

        this.coinAnimation(ctx);
        this.readFiles();

        this.cScore = game.playerProgress.getCookie("level1score",false);
        this.score = this.cScore[2];

        var c = game.playerProgress.getCookie("level1coins",false);
        this.coins = c[2].split(",");

        var c = game.playerProgress.getCookie("level1coins",false);
        this.checkpoints = c[2].split(",");

        c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];
    }
    update(deltaTime, GameWidth, GameHeight, player, game) {

        
        var c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];
        this.checkpoint.height=80;
        this.checkpoint.width=80;
        

    }

    draw(ctx, game) {

        var coinsIndex = 0;
        var checkPIndex =0;
        for (var j = 0; j < this.coinMap.length; j++) {
            var value = this.coinMap[j];
            switch (value){
                case 1:
                    if (this.coins[coinsIndex] == 1) {
        
                        var source_x=(i%this.coinSheet.size.columns)*this.coinSheet.size.width;
                        var source_y=0;
                        var x = (j % this.columns) * this.width + game.player.offsetX;
                        var y = Math.floor(j / this.columns) * this.width;
                       
                        ctx.drawImage(this.coinSheet,source_x,source_y,this.coinSheet.size.width,this.coinSheet.size.height,x,y,this.width,this.height);
                    }
                    coinsIndex++;
                    break;
                case 2:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    if(this.checkpoints[checkPIndex]==1){
                        this.checkpoint.src=document.getElementById(this.checkpoint.down).src;

                    }else{
                        this.checkpoint.src=document.getElementById(this.checkpoint.up).src;

                    }
                    ctx.drawImage(this.checkpoint,x,y,this.checkpoint.width,this.checkpoint.height);
                    checkPIndex++;
                    break;
            }

            
        }


        ctx.font = "50px Arial";
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