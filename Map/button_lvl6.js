export class level6Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("buttonUp").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight;
        this.width=this.button.naturalWidth;
        
        this.position={
            x:this.gameWidth/1.15,
            y:this.gameHeight/1.2
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        this.position.x=map.width/1.15;
        this.position.y=map.height/1.2;
        this.height=this.button.naturalHeight*map.ratio;
        this.width=this.button.naturalWidth*map.ratio;
        
    }

    draw(ctx){
            ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
        }

    toggleButton(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
                this.button.src=document.getElementById("buttonDown").src;
            }else{
                this.button.src = document.getElementById("buttonUp").src;
            }
    }

    toggleLevel6(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
                window.location="../Level_6/level_6.html";
            }
    }
    
}