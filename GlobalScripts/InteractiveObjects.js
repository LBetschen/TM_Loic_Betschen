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
        this.coinHeight=60;
        this.coinWidth=60;
        this.coinMap = [];
        this.columns = 200;

        this.coinAudio = new Audio();
        this.coinAudio.src = document.getElementById("coinAudio").src;

        this.width=80;
        this.height=80;

        this.checkpoint=new Image();
        this.checkpoint.up="checkpoint1";
        this.checkpoint.down="checkpoint";
        this.checkpoint.src=document.getElementById(this.checkpoint.down).src;
        this.checkpoint.height=this.checkpoint.naturalHeight;
        this.checkpoint.width=this.checkpoint.naturalWidth;

        this.trashchest=new Image();
        this.trashchest.open="trashcanOpen";
        this.trashchest.closed="trashcan";
        this.trashchest.src=document.getElementById(this.trashchest.closed).src;
        this.trashchest.height=this.height;
        this.trashchest.width=this.trashchest.height*(this.trashchest.naturalWidth/this.trashchest.naturalHeight);

        this.powerChest=new Image();
        this.powerChest.open="recyclingOpen";
        this.powerChest.closed="recycling";
        this.powerChest.src=document.getElementById(this.powerChest.closed).src;
        this.powerChest.height=this.height;
        this.powerChest.width=this.powerChest.height*(this.powerChest.naturalWidth/this.powerChest.naturalHeight);

        

        this.enemie=new Image();
        this.enemie.left="enemieLeft";
        this.enemie.right="enemieRight"
        this.enemie.src=document.getElementById(this.enemie.left).src;
        this.enemie.size={
            columns:4,
            lignes:1,
            width:63,
            height:54
        }
        this.enemie.distance=400;
        this.enemieDir=true;
        
        
        this.heart=new Image();
        this.heart.src=document.getElementById("heart").src;
        this.heart.height=80;
        this.heart.width=80;

        this.powerChests=[1];
        this.trashchests=[1];

    }



    start(ctx, game) {

        this.coinAnimation(ctx);
        this.readFiles();

        this.cScore = game.playerProgress.getCookie("level1score",false);
        this.score = this.cScore[2];

        var c = game.playerProgress.getCookie("level1coins",false);
        this.coins = c[2].split(",");

        var c = game.playerProgress.getCookie("level1Checkpoints",false);
        this.checkpoints = c[2].split(",");

        c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];

        c=game.playerProgress.getCookie("level1Enemies",false);
        this.enemies=c[2].split(",");

        this.objects=[this.coins,this.checkpoints];
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
        var powerChestIndex=0;
        var trashChestIndex=0;
        var eindex=0;
        for (var j = 0; j < this.coinMap.length; j++) {
            var value = this.coinMap[j];
            switch (value){
                case 1:
                    if (this.coins[coinsIndex] == 1) {
        
                        var source_x=(i%this.coinSheet.size.columns)*this.coinSheet.size.width;
                        var source_y=0;
                        var x = (j % this.columns) * this.width + game.player.offsetX;
                        var y = Math.floor(j / this.columns) * this.width;
                       
                        ctx.drawImage(this.coinSheet,source_x,source_y,this.coinSheet.size.width,this.coinSheet.size.height,x,y,this.coinWidth,this.coinHeight);
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
                case 3:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    var source_x=(i%this.enemie.size.columns)*this.enemie.size.width;
                    var source_y=0;
                    if(this.enemies[eindex]==1){
                        ctx.drawImage(this.enemie,source_x,source_y,this.enemie.size.width,this.enemie.size.height,x+this.enemie.distance,y,this.width,this.height);
                        if(this.enemie.distance>400){
                            this.enemieDir=false;
                            this.enemie.src=document.getElementById(this.enemie.left).src;
                        }else if(this.enemie.distance<0){
                            this.enemieDir=true;
                            this.enemie.src=document.getElementById(this.enemie.right).src;
                        }
                    }
                    eindex++;
                    break;
                case 4:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    if(this.trashchests[trashChestIndex]==1){
                        this.trashchest.src=document.getElementById(this.trashchest.closed).src;

                    }else{
                        this.trashchest.src=document.getElementById(this.trashchest.open).src;

                    }
                    ctx.drawImage(this.trashchest,x,y,this.trashchest.width,this.trashchest.height);
                    trashChestIndex++;
                    break;
                case 5:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    if(this.powerChests[powerChestIndex]==1){
                        this.powerChest.src=document.getElementById(this.powerChest.closed).src;

                    }else{
                        this.powerChest.src=document.getElementById(this.powerChest.open).src;

                    }
                    
                    ctx.drawImage(this.powerChest,x,y,this.powerChest.width,this.powerChest.height);
                    powerChestIndex++;
                    break;
                }
                
                
            }
            
            if(this.enemieDir==false){
                this.enemie.distance-=3;
            }else if(this.enemieDir==true){
                this.enemie.distance+=3;
            }

        ctx.font = "50px Arial";
        ctx.fillStyle = "black";

        ctx.fillText(this.score, 100, 75);
        ctx.drawImage(this.coinSheet,0,0,this.coinSheet.size.width,this.coinSheet.size.height,25,25,this.coinWidth,this.coinHeight);

        ctx.font = "50px Arial";
        ctx.fillStyle = "black";

        ctx.fillText(game.player.hero.lives, 300, 75);
        ctx.drawImage(this.heart,200,25,this.heart.width,this.heart.height);

        ctx.fillText(game.player.bulletAmmo, 400, 75);
        //ctx.drawImage(this.heart,200,25,this.heart.width,this.heart.height);


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
        fetch("./IObjects.txt").then(Response => Response.text()).then((data) => {
            res = data.toString().split(",");
            for (var i = 0; i < res.length; i++) {
                res[i] = parseInt(res[i]);
            }
            this.coinMap = res;
        });
    }
}