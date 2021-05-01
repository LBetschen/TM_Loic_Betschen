export class level3Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("lvl1btn").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight;
        this.width=this.button.naturalWidth;
        
        this.position={
            x:this.gameWidth/1.4,
            y:this.gameHeight/2.8
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        this.position.x=map.width/1.4;
        this.position.y=map.height/2.8;
        this.height=this.button.naturalHeight*map.ratio;
        this.width=this.button.naturalWidth*map.ratio;
        
    }

    draw(ctx){
        ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
    }
}