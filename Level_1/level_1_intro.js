export class Intro{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.intro=new Image();
        this.intro.src=document.getElementById("intro").src;
        this.ratio=this.intro.naturalHeight/this.intro.naturalWidth;
        this.width=game.gameWidth/2;
        this.height=this.width*this.ratio;
        this.position={
            x:game.gameWidth/4,
            y:game.gameHeight/10
        }

        document.addEventListener("keydown",(event)=>{
            switch (event.keyCode){
                case 13:
                    game.gameState=0;
                    break;
            }
        })
    }

    start(game){
        game.gameState=5;
    }
    update(deltaTime, GameWidth, GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        this.width=GameWidth/2;
        this.height=this.width*this.ratio;
        this.position={
            x:GameWidth/4,
            y:GameHeight/10
        }
    }
    draw(ctx){
        
            ctx.drawImage(this.intro,this.position.x,this.position.y,this.width,this.height);
            ctx.font="50px Arial";
            ctx.textAlign="center";
            ctx.fillText("Press enter to continue",this.gameWidth/2,this.gameHeight/2);
        
    }
}