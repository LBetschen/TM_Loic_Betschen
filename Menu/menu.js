export class Menu{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight= game.gameHeight;
        this.gameState=game.gamestate;
        
        this.height=50;
        this.width=250;
        this.position={
            x:this.gameWidth/2-this.width/2,
            y:this.gameHeight/2-this.height/1.5
        }
       
    }
    update(deltaTime,GameWidth,GameHeight){ 
            this.gameHeight=GameHeight;
            this.gameWidth=GameWidth;
            this.position.x = this.gameWidth/2-this.width/2;
            this.position.y = this.gameHeight/2-this.height/1.5;     
    }

    draw(ctx){
        ctx.fillStyle="rgba(0,0,0,1)";
        ctx.fillRect(0,0,this.gameWidth,this.gameHeight);

        ctx.font="30px Arial";
        ctx.fillStyle="white";
        ctx.textAlign="center";
        ctx.fillText("The Climate Savers",this.gameWidth/2,this.gameHeight/6);
        
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        ctx.fillStyle="black";
        ctx.fillText("Play",this.gameWidth/2,this.gameHeight/2);
    }
   
}