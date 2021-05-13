export class level6Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("buttonUp").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.gameWidth/20;
        this.width=this.gameWidth/20;
        this.ratio=this.gameWidth/game.gameWidth;
        
        this.position={
            x:this.gameWidth/1.15,
            y:this.gameHeight/1.2
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        

        this.ratio=this.gameWidth/map.width;
        this.position.x=map.width/1.15;
        this.position.y=map.height/1.45+GameHeight/10;
        this.height=this.gameWidth/20/this.ratio;
        this.width=this.gameWidth/20/this.ratio;
             
        
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