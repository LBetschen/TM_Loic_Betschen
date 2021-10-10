var i = 1;
export class InteractiveObjects {
    constructor(game) {
        this.width=game.gameHeight/20;
        this.height=game.gameHeight/20;

        this.coinSheet = new Image();
        this.coinSheet.src = document.getElementById("coin").src;
        this.coinSheet.size={
            columns:16,
            lignes:1,
            width:840,
            height:859
        }
        this.coinHeight=this.height*0.75;
        this.coinWidth=this.width*0.75;
        this.coinMap = [];
        this.columns = 200;

        this.coinAudio = new Audio();
        this.coinAudio.src = document.getElementById("coinAudio").src;

        this.checkPointAudio = new Audio();
        this.checkPointAudio.src = document.getElementById("coinAudio").src;

        this.powerChestAudio = new Audio();
        this.powerChestAudio.src = document.getElementById("coinAudio").src;

        this.coinChestAudio = new Audio();
        this.coinChestAudio.src = document.getElementById("coinAudio").src;

        this.enemieDeathAudio = new Audio();
        this.enemieDeathAudio.src = document.getElementById("coinAudio").src;
        
        this.heartAudio = new Audio();
        this.heartAudio.src = document.getElementById("coinAudio").src;

        

        this.checkpoint=new Image();
        this.checkpoint.up="checkpoint1";
        this.checkpoint.down="checkpoint";
        this.checkpoint.src=document.getElementById(this.checkpoint.down).src;
        this.checkpoint.height=this.height;
        this.checkpoint.width=this.width;

        this.trashChest=new Image();
        this.trashChest.open="trashcanOpen";
        this.trashChest.closed="trashcan";
        this.trashChest.src=document.getElementById(this.trashChest.closed).src;
        this.trashChest.ratio=this.trashChest.naturalWidth/this.trashChest.naturalHeight;
        this.trashChest.height=this.height;
        this.trashChest.width=this.trashChest.height*this.trashChest.ratio;

        this.powerChest=new Image();
        this.powerChest.open="recyclingOpen";
        this.powerChest.closed="recycling";
        this.powerChest.src=document.getElementById(this.powerChest.closed).src;
        this.powerChest.ratio=this.powerChest.naturalWidth/this.powerChest.naturalHeight;
        this.powerChest.height=this.height;
        this.powerChest.width=this.powerChest.height*this.powerChest.ratio;


        this.mailBox=new Image();
        this.mailBox.open="mailboxFull";
        this.mailBox.closed="mailboxEmpty";
        this.mailBox.src=document.getElementById(this.mailBox.closed).src;
        this.mailBox.ratio=this.mailBox.naturalWidth/this.mailBox.naturalHeight;
        this.mailBox.height=this.height;
        this.mailBox.width=this.mailBox.height*this.mailBox.ratio;
        

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
        this.heart.ratio=this.heart.naturalWidth/this.heart.naturalHeight;
        this.heart.height=this.height;
        this.heart.width=this.heart.height*this.heart.ratio;

        this.powerLeaf=new Image();      
        this.powerLeaf.src=document.getElementById("leafball").src;
        this.powerLeaf.ratio=this.powerLeaf.naturalWidth/this.powerLeaf.naturalHeight;
        this.powerLeaf.height=this.height;
        this.powerLeaf.width=this.powerLeaf.height*this.powerLeaf.ratio;

        
        this.powerChests=[1];
        this.trashChests=[1];

        this.heartCountHeight=game.gameHeight/25;
        this.heartCountWidth=this.heartCountHeight/this.heart.ratio;
        this.heartCountPosition={
            x:game.gameWidth/50,
            y:game.gameHeight/50
        }

        this.powerCountHeight=game.gameHeight/25;
        this.powerCountWidth=this.powerCountHeight/this.powerLeaf.ratio;
        this.powerCountPosition={
            x:this.heartCountPosition.x+game.gameWidth/15,
            y:game.gameHeight/50
        }

        this.coinCountHeight=game.gameHeight/25;
        this.coinCountWidth=this.coinCountHeight;
        this.coinCountPosition={
            x:this.powerCountPosition.x+game.gameWidth/15,
            y:game.gameHeight/50
        }


        this.countPositionY=2.5*game.gameHeight/50;

        this.xCount=new Image();      
        this.xCount.src=document.getElementById("xcount").src;
        this.xCount.ratio=this.xCount.naturalWidth/this.xCount.naturalHeight;
        this.xCount.height=game.gameHeight/50;
        this.xCount.width=this.xCount.height*this.xCount.ratio;
        this.xCount.position={
            x:game.gameWidth/50,
            y:this.heartCountPosition.y+this.heartCountHeight/2-this.xCount.height/2
        }

    }



    start(ctx, game) {

        //this.coinAnimation(ctx);
        this.readFiles();
        //getting all the saved progress
        this.cScore = game.playerProgress.getCookie("level"+game.level+"score",false);
        this.score = parseInt(this.cScore[2]);

        var c = game.playerProgress.getCookie("level"+game.level+"coins",false);
        this.coins = c[2].split(",");

        var c = game.playerProgress.getCookie("level"+game.level+"Checkpoints",false);
        this.checkpoints = c[2].split(",");

        c=game.playerProgress.getCookie("musicVolume",false);
        this.coinAudio.volume=c[2];
        this.checkPointAudio.volume=c[2];
        this.powerChestAudio.volume=c[2];
        this.coinChestAudio.volume=c[2];
        this.enemieDeathAudio.volume=c[2];
        this.heartAudio.volume=c[2];


        c=game.playerProgress.getCookie("level"+game.level+"Enemies",false);
        this.enemies=c[2].split(",");

        c=game.playerProgress.getCookie("level"+game.level+"Hearts",false);
        this.hearts=c[2].split(",");

        this.objects=[this.coins,this.checkpoints];
    }
    update(deltaTime, GameWidth, GameHeight, player, game) {

        
        var c=game.playerProgress.getCookie("soundVolume",false);
        this.coinAudio.volume=c[2];
        this.checkPointAudio.volume=c[2];
        this.powerChestAudio.volume=c[2];
        this.coinChestAudio.volume=c[2];
        this.enemieDeathAudio.volume=c[2];
        this.width=GameHeight/20;
        this.height=GameHeight/20;

        this.mailBox.height=this.height;
        this.mailBox.width=this.mailBox.height*(this.mailBox.naturalWidth/this.mailBox.naturalHeight);
        this.trashChest.height=this.height;
        this.trashChest.width=this.trashChest.height*(this.trashChest.naturalWidth/this.trashChest.naturalHeight);
        this.checkpoint.height=this.height;
        this.checkpoint.width=this.width;
        this.coinHeight=this.height*0.75;
        this.coinWidth=this.width*0.75;

        this.heartCountHeight=game.gameHeight/25;
        this.heartCountWidth=this.heartCountHeight/this.heart.ratio;
        this.heartCountPosition={
            x:game.gameWidth/50,
            y:game.gameHeight/50
        }

        
        this.powerCountHeight=game.gameHeight/25;
        this.powerCountWidth=this.powerCountHeight/this.powerLeaf.ratio;
        this.powerCountPosition={
            x:this.heartCountPosition.x+game.gameWidth/15,
            y:game.gameHeight/50
        }

        
        this.coinCountHeight=game.gameHeight/25;
        this.coinCountWidth=this.coinCountHeight;
        this.coinCountPosition={
            x:this.powerCountPosition.x+game.gameWidth/15,
            y:game.gameHeight/50
        }
        this.countPositionY=2.5*game.gameHeight/50;

        this.xCount.height=game.gameHeight/50;
        this.xCount.width=this.xCount.height*this.xCount.ratio;
        this.xCount.position={
            x:game.gameWidth/50,
            y:this.heartCountPosition.y+this.heartCountHeight/2-this.xCount.height/2
        }

    }

    draw(ctx, game) {

        var coinsIndex = 0;
        var checkPIndex =0;
        var heartIndex=0;
        var powerChestIndex=0;
        var trashChestIndex=0;
        var eindex=0;
        for (var j = 0; j < this.coinMap.length; j++) {//draws all the interactive objects
            var value = this.coinMap[j];
            switch (value){
                case 1:
                    if (this.coins[coinsIndex] == 1) {

                        var x = (j % this.columns) * this.width + game.player.offsetX;
                        var y = Math.floor(j / this.columns) * this.width;
                       
                        ctx.drawImage(this.coinSheet,x,y,this.coinWidth,this.coinHeight);
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
                    if(this.trashChests[trashChestIndex]==1){
                        this.trashChest.src=document.getElementById(this.trashChest.closed).src;

                    }else{
                        this.trashChest.src=document.getElementById(this.trashChest.open).src;

                    }
                    ctx.drawImage(this.trashChest,x,y,this.width,this.height);
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
                    
                    ctx.drawImage(this.powerChest,x,y,this.width,this.height);
                    powerChestIndex++;
                    break;
                case 6:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    if(this.hearts[heartIndex]==1){
                        ctx.drawImage(this.heart,x,y,this.heart.width,this.heart.height);
                    }
                    
                    heartIndex++;
                    break;
                case 7:
                    var x = (j % this.columns) * this.width + game.player.offsetX;
                    var y = Math.floor(j / this.columns) * this.width;
                    
                        ctx.drawImage(this.mailBox,x,y,this.mailBox.width,this.mailBox.height);
                    
                    
                    
                    break;
                }


                
                
            }
            
            if(this.enemieDir==false){
                this.enemie.distance-=3;
            }else if(this.enemieDir==true){
                this.enemie.distance+=3;
            }

        ctx.font = game.gameWidth/50+"px Arial";
        ctx.fillStyle = "black";

        ctx.fillText(this.score, this.coinCountPosition.x+game.gameWidth/25, this.countPositionY);
        ctx.drawImage(this.xCount,this.coinCountPosition.x+game.gameWidth/45,this.xCount.position.y,this.xCount.width,this.xCount.height);
        ctx.drawImage(this.coinSheet,this.coinCountPosition.x,this.coinCountPosition.y,this.coinCountWidth,this.coinCountHeight);

        

        ctx.fillText(game.player.hero.lives, this.heartCountPosition.x+game.gameWidth/25, this.countPositionY);
        ctx.drawImage(this.xCount,this.heartCountPosition.x+game.gameWidth/45,this.xCount.position.y,this.xCount.width,this.xCount.height);
        ctx.drawImage(this.heart,this.heartCountPosition.x,this.heartCountPosition.y,this.heartCountWidth,this.heartCountHeight);
        

        ctx.fillText(game.player.bulletAmmo, this.powerCountPosition.x+game.gameWidth/25,this.countPositionY);
        ctx.drawImage(this.xCount,this.powerCountPosition.x+game.gameWidth/45,this.xCount.position.y,this.xCount.width,this.xCount.height);
        ctx.drawImage(this.powerLeaf,this.powerCountPosition.x,this.powerCountPosition.y,this.powerCountWidth,this.powerCountHeight);


    }

    
    

    readFiles() {
        //opens txt file and reads the matrix and puts it into an array
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