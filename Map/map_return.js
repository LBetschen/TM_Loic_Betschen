export class ReturnToMenu{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("returnButton").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight/2;
        this.width=this.button.naturalWidth/2;
        
        this.position={
            x:this.gameWidth/25,
            y:this.gameHeight/20
        }
    }

    update(deltaTime,GameWidth,GameHeight){
        this.position.x=this.gameWidth/25;
        this.position.y=this.gameHeight/20;
        this.height=this.button.naturalHeight/2;
        this.width=this.button.naturalWidth/2;
        
    }

    toggleButton(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
               
                this.button.src=document.getElementById("returnButtonDown").src;
            }else{
                this.button.src = document.getElementById("returnButton").src;
            }
    }

    draw(ctx){
        ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
    }
    toggleReturn(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
               
                window.location="../index.html";
            }

    }

    
}