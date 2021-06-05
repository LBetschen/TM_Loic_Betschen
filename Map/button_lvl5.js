export class level5Button{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("buttonUp").src;

        this.buttonAudio=new Audio;
        this.buttonAudio.src=document.getElementById("buttonAudio").src;
        this.audio=false;

        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.gameWidth/20;
        this.width=this.gameWidth/20;
        this.ratio=this.gameWidth/game.gameWidth;
        
        this.position={
            x:this.gameWidth/1.4,
            y:this.gameHeight/1.55
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        
        this.ratio=this.gameWidth/map.width;
        this.position.x=map.width/1.95;
        this.position.y=map.height/2+GameHeight/10;
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
                if(!this.audio){
                    this.buttonAudio.play();
                    this.audio=true;
                }
            }else{
                this.button.src = document.getElementById("buttonUp").src;
                this.audio=false;
            }
    }

    toggleLevel5(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
                window.location="../Level_5/level_5.html";
            }
    }
}