export class level2Button{
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
            x:this.gameWidth/1.85,
            y:this.gameHeight/2.8
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
    
        this.ratio=this.gameWidth/map.width;
        this.position.x=map.width/1.85;
        this.position.y=map.height/4.5+GameHeight/10;
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
    toggleLevel2(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
                window.location="../Level_2/level_2.html";
            }
    }
    
}