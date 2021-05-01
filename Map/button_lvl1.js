export class level1Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("lvl1btn").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight;
        this.width=this.button.naturalWidth;
        
        this.position={
            x:this.gameWidth/6,
            y:this.gameHeight/2.7
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        this.position.x=map.width/6;
        this.position.y=map.height/2.7;
        this.height=this.button.naturalHeight*map.ratio;
        this.width=this.button.naturalWidth*map.ratio;
        
    }

    draw(ctx){
        ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
    }
}