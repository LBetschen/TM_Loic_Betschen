export class ReturnToMenu{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("returnButton").src;

        this.buttonAudio=new Audio;
        this.buttonAudio.src=document.getElementById("buttonAudio").src;
        this.audio=false;


        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight/2;
        this.width=this.button.naturalWidth/2;
        this.ratio=this.gameWidth/game.width;

        this.position={
            x:this.gameWidth/25,
            y:this.gameHeight/20
        }
    }

    update(deltaTime,GameWidth,GameHeight,map){
        

        this.ratio=this.gameWidth/map.width;
        this.position.x=map.width/25;
        this.position.y=GameHeight/20  ;
        this.height=this.button.naturalHeight/3/this.ratio;
        this.width=this.button.naturalWidth/3/this.ratio;
        
    }

    toggleButton(mouseX,mouseY){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
               
                this.button.src=document.getElementById("returnButtonDown").src;
                if(!this.audio){
                    this.buttonAudio.play();
                    this.audio=true;
                }
            }else{
                this.button.src = document.getElementById("returnButton").src;
                this.audio=false;
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