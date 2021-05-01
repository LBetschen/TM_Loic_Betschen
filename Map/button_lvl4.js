export class level4Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("lvl1btn").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight;
        this.width=this.button.naturalWidth;
        
        this.position={
            x:this.gameWidth/4,
            y:this.gameHeight/1.4
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        this.position.x=map.width/4;
        this.position.y=map.height/1.4;
        this.height=this.button.naturalHeight*map.ratio;
        this.width=this.button.naturalWidth*map.ratio;
        
    }

    draw(ctx){
        ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
    }
}