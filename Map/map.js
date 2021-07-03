export class Map{
    constructor(game){
        this.map = new Image();
        this.map.src=document.getElementById("map").src;
        this.aspect=this.map.naturalHeight/this.map.naturalWidth;
        this.width=8*game.gameWidth/10;
        this.height=this.width*this.aspect;
        this.offsetX=(game.gameWidth-this.width)/2;
        
        this.ratio=game.gameWidth/this.map.naturalWidth;
        this.Xtext=game.gameWidth/2;
        this.Ytext=game.gameHeight/10;
        this.gameHeight=game.gameHeight;
        this.gameWidth=game.gameWidth;
        this.position={
            x:this.offsetX,
            y:game.gameHeight/10
        }
    }

    update(deltaTime,GameWidth,GameHeight){  
        if(GameHeight<=this.height+2*GameHeight/2){
            this.height= 8*GameHeight/10;
            this.width=this.height/this.aspect;
          
        }else{
            this.width=8*GameWidth/10;
            this.height=this.width*this.aspect;
        }
        this.offsetX=(GameWidth-this.width)/2;
        
        this.position.y= GameHeight/10;
        this.position.x=this.offsetX;
        
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        this.Xtext=GameWidth/2;
        this.Ytext=GameHeight/10;
    }

    draw(ctx){
        ctx.fillStyle="rgb(72,205,250)";
        ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
        
        ctx.drawImage(this.map,this.position.x,this.position.y,this.width,this.height);
        
        ctx.font="50px Monospace";
        ctx.textAlign="center";
        ctx.fillStyle="white";
        ctx.fillText("Save the World!!!",this.Xtext,this.Ytext,300,50);
    }
}