export class Menu{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight= game.gameHeight;
        this.gameState=game.gamestate;

        this.ratio=this.gameWidth/game.gameWidth;
        
        this.height=50;
        this.width=250;
        this.position={
            x:this.gameWidth/2-this.width/2,
            y:this.gameHeight/2-this.height/1.5
        }

        this.aboutButton= new Image();
        this.aboutButton.down="aboutButtonDown";
        this.aboutButton.up="aboutButton";
        this.aboutButton.src=document.getElementById(this.aboutButton.up).src;
        this.aboutButton.height=this.aboutButton.naturalHeight/3/this.ratio;
        this.aboutButton.width=this.aboutButton.naturalWidth/3/this.ratio;
        this.aboutButton.position={
            x:this.gameWidth/50,
            y:this.gameHeight/50
        }

        this.settingsButton= new Image();
        this.settingsButton.down="settingsButtonDown";
        this.settingsButton.up="settingsButton";
        this.settingsButton.src=document.getElementById(this.settingsButton.up).src;
        this.settingsButton.height=this.settingsButton.naturalHeight/3/this.ratio;
        this.settingsButton.width=this.settingsButton.naturalWidth/3/this.ratio;
        this.settingsButton.position={
            x:this.gameWidth/1.07,
            y:this.gameHeight/50
        }

        this.volumeButton= new Image();
        this.volumeButton.up="volumeButton";
        this.volumeButton.down="volumeButtonDown";
        this.volumeButton.mutedUp="mutedButton";
        this.volumeButton.mutedDown="mutedButtonDown";
        this.volumeButton.src=document.getElementById(this.volumeButton.up).src;
        this.volumeButton.height=this.volumeButton.naturalHeight/3/this.ratio;
        this.volumeButton.width=this.volumeButton.naturalWidth/3/this.ratio;
        this.volumeButton.position={
            x:this.gameWidth/1.15,
            y:this.gameHeight/50
        }
        
       
    }
    update(deltaTime,GameWidth,GameHeight,gameState){ 
            this.gameHeight=GameHeight;
            this.gameWidth=GameWidth;
            //this.ratio=this.gameWidth/map.width;
            this.position.x = this.gameWidth/2-this.width/2;
            this.position.y = this.gameHeight/2-this.height/1.5;
            this.settingsButton.position={
                x:this.gameWidth/1.07,
                y:this.gameHeight/50
            }     
            this.aboutButton.position={
                x:this.gameWidth/50,
                y:this.gameHeight/50
            }
            this.aboutButton.height=this.aboutButton.naturalHeight/3/this.ratio;
            this.aboutButton.width=this.aboutButton.naturalWidth/3/this.ratio;
            this.settingsButton.height=this.settingsButton.naturalHeight/3/this.ratio;
            this.settingsButton.width=this.settingsButton.naturalWidth/3/this.ratio;
            this.volumeButton.height=this.volumeButton.naturalHeight/3/this.ratio;
            this.volumeButton.width=this.volumeButton.naturalWidth/3/this.ratio;
            this.volumeButton.position={
                x:this.gameWidth/1.15,
                y:this.gameHeight/50
            } 
    }

    draw(ctx,gameState){
        
            ctx.beginPath();
            ctx.rect(this.position.x,this.position.y,this.width,this.height);
            ctx.stroke();
            ctx.font="30px Arial";
            
            ctx.textAlign="center";
            ctx.fillText("The Climate Savers",this.gameWidth/2,this.gameHeight/14);
            
            
            ctx.fillStyle="black";
            ctx.fillText("Play",this.gameWidth/2,this.gameHeight/2);
            
            ctx.drawImage(this.aboutButton,this.aboutButton.position.x,this.aboutButton.position.y,this.aboutButton.width,this.aboutButton.width);
            ctx.drawImage(this.settingsButton,this.settingsButton.position.x,this.settingsButton.position.y,this.settingsButton.width,this.settingsButton.width);
            ctx.drawImage(this.volumeButton,this.volumeButton.position.x,this.volumeButton.position.y,this.volumeButton.width,this.volumeButton.width);

        if(gameState==1){
            ctx.fillRect(400,100,100,100);
        }else if(gameState==2){
            ctx.fillStyle="#e6a661";
            ctx.textAlign="left";
            ctx.fillRect(this.aboutButton.position.x+this.aboutButton.width,this.aboutButton.position.y,this.gameWidth/2,this.gameHeight/2);
            ctx.fillStyle="rgb(0,0,0)";
            ctx.fillText("This game was created for my baccalaureate",this.aboutButton.position.x+this.aboutButton.width+20,this.aboutButton.position.y+this.aboutButton.height,this.gameWidth/2);
            ctx.fillText("project. The goal of my game is to ",this.aboutButton.position.x+this.aboutButton.width+20,this.aboutButton.position.y+this.aboutButton.height+30,this.gameWidth/2);
            ctx.fillText("demonstrate certain solutions that could",this.aboutButton.position.x+this.aboutButton.width+20,this.aboutButton.position.y+this.aboutButton.height+60,this.gameWidth/2);
            ctx.fillText("help the environment.",this.aboutButton.position.x+this.aboutButton.width+20,this.aboutButton.position.y+this.aboutButton.height+90,this.gameWidth/2);
            ctx.fillText("Loïc Betschen",this.aboutButton.position.x+this.aboutButton.width+20,this.aboutButton.position.y+this.aboutButton.height+180,this.gameWidth/2);

        }
        
    }
    
    toggleVolumeButton(audioMuted,mouseX,mouseY){
        if(mouseX>=this.volumeButton.position.x && 
            mouseX <= this.volumeButton.position.x+this.volumeButton.width &&
            mouseY >= this.volumeButton.position.y &&
            mouseY<= this.volumeButton.position.y+this.volumeButton.height)
            {   if(audioMuted==false){
                this.volumeButton.src=document.getElementById(this.volumeButton.down).src;
                }else{
                    this.volumeButton.src=document.getElementById(this.volumeButton.mutedDown).src;
                }
                
            }else{
                if(audioMuted==false){
                    this.volumeButton.src=document.getElementById(this.volumeButton.up).src;
                }else{
                    this.volumeButton.src=document.getElementById(this.volumeButton.mutedUp).src;
                }
            }
    }

    
}