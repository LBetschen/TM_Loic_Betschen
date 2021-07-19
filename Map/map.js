export class Map{
    constructor(game){
        this.map = new Image();
        this.map.src=document.getElementById("map").src;
        this.aspect=this.map.naturalHeight/this.map.naturalWidth;
        this.width=8*game.gameWidth/10;
        this.height=this.width*this.aspect;
        this.offsetX=(game.gameWidth-this.width)/2;

        this.buttonAudio=new Audio();
        this.buttonAudio.src=document.getElementById("buttonAudio").src;
        
        this.ratio=game.gameWidth/this.map.naturalWidth;
        this.Xtext=game.gameWidth/2;
        this.Ytext=game.gameHeight/10;
        this.gameHeight=game.gameHeight;
        this.gameWidth=game.gameWidth;
        this.position={
            x:this.offsetX,
            y:game.gameHeight/10
        }
        


        this.ratio = this.gameWidth / game.gameWidth;
        
        this.settingsButton = new Image();
        this.settingsButton.down = "settingsButtonDown";
        this.settingsButton.up = "settingsButton";
        this.settingsButton.src = document.getElementById(this.settingsButton.up).src;
        this.settingsButton.height = this.settingsButton.naturalHeight / 3 / this.ratio;
        this.settingsButton.width = this.settingsButton.naturalWidth / 3 / this.ratio;
        this.settingsButton.position = {
            x: this.gameWidth / 1.07,
            y: this.gameHeight / 50
        }
        this.settingsButton.audio=false;
        
        this.returnButton =  new Image();
        this.returnButton.up="returnButton";
        this.returnButton.down="returnButtonDown";
        this.returnButton.src = document.getElementById("returnButton").src;
        this.returnButton.height=this.returnButton.naturalHeight/2;
        this.returnButton.width=this.returnButton.naturalWidth/2;
        this.returnButton.position={
            x:this.gameWidth/25,
            y:this.gameHeight/20
        }    
        ;
        this.returnButton.audio=false;


        this.buttons=[
            this.settingsButton,
            this.returnButton
        ]
    }

    update(deltaTime,GameWidth,GameHeight,game){  
        this.ratio=this.gameWidth/map.width;

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

        this.returnButton.position.x=this.width/25;
        this.returnButton.position.y=GameHeight/20  ;
        this.returnButton.height=this.returnButton.naturalHeight / 2.5 / this.ratio;
        this.returnButton.width=this.returnButton.naturalWidth / 2.5 / this.ratio;

        this.settingsButton.height = this.settingsButton.naturalHeight / 2.5 / this.ratio;
        this.settingsButton.width = this.settingsButton.naturalWidth / 2.5 / this.ratio;
        this.settingsButton.position = {
            x: this.gameWidth / 1.07,
            y: this.gameHeight / 50
        }

        var c= game.playerProgress.getCookie("soundVolume",false);
       
        this.buttonAudio.volume=c[2];
             
    }

    draw(ctx){
        ctx.fillStyle="rgb(72,205,250)";
        ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
        
        ctx.drawImage(this.map,this.position.x,this.position.y,this.width,this.height);
        ctx.drawImage(this.settingsButton,this.settingsButton.position.x,this.settingsButton.position.y,this.settingsButton.width,this.settingsButton.height);
        ctx.drawImage(this.returnButton,this.returnButton.position.x,this.returnButton.position.y,this.returnButton.width,this.returnButton.height);
        
        
    }

    toggleClick(mouseX,mouseY,game){
            for (var i = 0; i < this.buttons.length; i++) {
                if (mouseX >= this.buttons[i].position.x &&
                    mouseX <= this.buttons[i].position.x + this.buttons[i].width &&
                    mouseY >= this.buttons[i].position.y &&
                    mouseY <= this.buttons[i].position.y + this.buttons[i].height) {
                    switch (i) {
                        case 0:
                            if (game.gameState != 2) {
                                game.gameState = 2;
                            } else {
                                game.gameState = 0;
                            }
                            break;
                        case 1:
                            window.location="../index.html";
                            break;
                    }
                }
            }
    }

    toggleButton(mouseX,mouseY){
        this.buttons.forEach((object) => {
            if (mouseX >= object.position.x &&
                mouseX <= object.position.x + object.width &&
                mouseY >= object.position.y &&
                mouseY <= object.position.y + object.height) {
                    
                object.src = document.getElementById(object.down).src;
                if(!object.audio){
                    this.buttonAudio.play();
                    object.audio=true;
                }
            } else {
                object.src = document.getElementById(object.up).src;
                object.audio=false;
            }
        });
    }
}