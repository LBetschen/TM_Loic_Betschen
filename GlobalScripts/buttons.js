export class LevelButtons{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;


        this.returnButton =  new Image();
        this.returnButton.up="returnButton";
        this.returnButton.down="returnButtonDown";
        this.returnButton.src = document.getElementById(this.returnButton.up).src;
        this.returnButton.height=this.gameWidth / 20;
        this.returnButton.width=this.gameWidth  / 20;
        this.returnButton.position={
            x:this.gameWidth/25,
            y:this.gameHeight/20
        }

        this.reloadButton =  new Image();
        this.reloadButton.up="reloadButton";
        this.reloadButton.down="reloadButtonDown";
        this.reloadButton.src = document.getElementById(this.reloadButton.up).src;
        this.reloadButton.height=this.gameWidth / 20;
        this.reloadButton.width=this.gameWidth / 20;
        this.reloadButton.position={
            x: this.gameWidth / 1.15,
            y: this.gameHeight / 20
        }

        this.settingsButton = new Image();
        this.settingsButton.down = "settingsButtonDown";
        this.settingsButton.up = "settingsButton";
        this.settingsButton.src = document.getElementById(this.settingsButton.up).src;
        this.settingsButton.height = this.gameWidth / 20 ;
        this.settingsButton.width = this.gameWidth / 20;
        this.settingsButton.position = {
            x: this.gameWidth / 1.07,
            y: this.gameHeight / 20
        }
        this.settingsButton.audio=false;

        this.buttons=[
            this.reloadButton,
            this.returnButton,
            this.settingsButton
        ]
        
    }

    update(deltaTime,GameWidth,GameHeight){
        this.reloadButton.position={
            x: this.gameWidth / 2-this.reloadButton.width/2,
            y: this.gameHeight / 2 - this.reloadButton.width/2
        }
        this.reloadButton.height=GameWidth / 20;
        this.reloadButton.width=GameWidth / 20;

        this.returnButton.position={
            x:this.reloadButton.position.x- this.returnButton.width*2,
            y:this.gameHeight/2- this.returnButton.width/2
        }
        this.returnButton.height=GameWidth / 20;
        this.returnButton.width=GameWidth / 20;


        this.settingsButton.position = {
            x: this.reloadButton.position.x +this.settingsButton.width*2,
            y: this.gameHeight / 2- this.settingsButton.width/2
        }
        this.settingsButton.height = GameWidth / 20 ;
        this.settingsButton.width = GameWidth / 20;
        
    }

    toggleButton(mouseX,mouseY){

        this.buttons.forEach((object)=>{
            if(mouseX>=object.position.x && 
                mouseX <= object.position.x+object.width &&
                mouseY >= object.position.y &&
                mouseY <= object.position.y+object.height)
                { 
                   
                    object.src=document.getElementById(object.down).src;
                }else{
                    object.src = document.getElementById(object.up).src;
                }
        });
    }

    draw(ctx){
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 4)
        this.buttons.forEach((object)=>{
           
            ctx.drawImage(object,object.position.x,object.position.y,object.width,object.height);
        });
    }
    toggleReturn(mouseX,mouseY,game){
        for(var i=0;i<this.buttons.length;i++){
            if(mouseX>=this.buttons[i].position.x && 
                mouseX <= this.buttons[i].position.x+this.buttons[i].width &&
                mouseY >= this.buttons[i].position.y &&
                mouseY <= this.buttons[i].position.y+this.buttons[i].height)
                { 
                   switch (i){
                       case 0:
                           //clears player progress and reloads page
                            var c = game.playerProgress.getCookie(game.level+"score", true);//gets the index of name in array info
                            game.interactiveObjects.score=c[2];
                            game.playerProgress.changeCookie(game.level+"score",c[2]);
                            c=game.playerProgress.getCookie(game.level+"coins",true),
                            game.playerProgress.changeCookie(game.level+"coins",c[2]);
                            c=game.playerProgress.getCookie(game.level+"Checkpoints",true),
                            game.playerProgress.changeCookie(game.level+"Checkpoints",c[2]);
                            c=game.playerProgress.getCookie(game.level+"Enemies",true),
                            game.playerProgress.changeCookie(game.level+"Enemies",c[2]);
                            location.reload();
                            break;
                        case 1:
                            window.location="../Map/map.html";
                            break;
                        case 2:
                            game.gameState=2;
                            break;
                   }
                }
        }

    }

}