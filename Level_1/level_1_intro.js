export class Intro{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.intro=new Image();
        this.intro.src=document.getElementById("intro").src;
        this.ratio=this.intro.naturalHeight/this.intro.naturalWidth;
        this.width=game.gameWidth/1.5;
        this.height=this.width*this.ratio;
        this.position={
            x:game.gameWidth/2-this.width/2,
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
        this.width=GameWidth/1.5;
        this.height=this.width*this.ratio;
        this.position={
            x:GameWidth/2-this.width/2,
            y:GameHeight/10
        }
    }
    draw(ctx){
        
            ctx.drawImage(this.intro,this.position.x,this.position.y,this.width,this.height);
            
        
    }
}