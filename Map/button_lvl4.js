export class level4Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("buttonUp").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight;
        this.width=this.button.naturalWidth;
        this.ratio=this.gameWidth/game.width;
        
        this.position={
            x:this.gameWidth/4,
            y:this.gameHeight/1.4
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        
        this.ratio=this.gameWidth/map.width;
        this.position.x=map.width/4;
        this.position.y=map.height/1.75+GameHeight/10;
        this.height=this.button.naturalHeight/5/this.ratio;
        this.width=this.button.naturalWidth/5/this.ratio;
             
        
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

    toggleLevel4(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
                window.location="../Level_4/level_4.html";
            }
   
    }
}