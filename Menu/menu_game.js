import {Input} from "./menu_input.js";
import {Menu} from "./menu.js";

const GAMESTATE={
    RUNNING:0,
    SETTINGS:1,
    ABOUT:2
}

export class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.gameState=GAMESTATE;
        this.audio=document.getElementById("backgroundSound1");
        this.audioMuted=false;
    }

    start(){
        
        this.menu= new Menu(this);
       
        new Input(this);
        this.buttons=[this.menu.aboutButton,this.menu.settingsButton]; 
        this.gameState=GAMESTATE.RUNNING;
        
        this.audio.play(); 
        
        
        
        
    }

    update(deltaTime,gameWidth,gameHeight){
       this.menu.update(deltaTime,gameWidth,gameHeight,this.gameState);
       this.audio.play();
    }

    draw(ctx){
            this.menu.draw(ctx,this.gameState);
    }

    toggleMenu(mouseX,mouseY){
        if(mouseX>=this.menu.position.x && 
            mouseX <= this.menu.position.x+this.menu.width &&
            mouseY >= this.menu.position.y &&
            mouseY<= this.menu.position.y+this.menu.height)
            { 
               window.location="./Map/map.html";
            }
    }
    toggleButtons(mouseX,mouseY){
        this.buttons.forEach((object)=>{
            if(mouseX>=object.position.x && 
                mouseX <= object.position.x+object.width &&
                mouseY >= object.position.y &&
                mouseY<= object.position.y+object.height)
                { 
                    object.src=document.getElementById(object.down).src;
                }else{
                    object.src=document.getElementById(object.up).src;
                }
        });
        this.menu.toggleVolumeButton(this.audioMuted,mouseX,mouseY);

    }
    toggleClick(mouseX,mouseY){

        for(var i =0;i<this.buttons.length;i++){
            if(mouseX>=this.buttons[i].position.x && 
                mouseX <= this.buttons[i].position.x+this.buttons[i].width &&
                mouseY >= this.buttons[i].position.y &&
                mouseY<= this.buttons[i].position.y+this.buttons[i].height)
                { 
                    switch (i){
                        case 0:
                            if(this.gameState!=2){
                               this.gameState=GAMESTATE.ABOUT; 
                            }else{
                                this.gameState=GAMESTATE.RUNNING;
                            }
                            
                            break;
                        case 1:
                            if(this.gameState!=1){
                                this.gameState=GAMESTATE.SETTINGS; 
                             }else{
                                 this.gameState=GAMESTATE.RUNNING;
                             }
                            break;
                    }
                }
        }

        if(mouseX>=this.menu.volumeButton.position.x && 
            mouseX <= this.menu.volumeButton.position.x+this.menu.volumeButton.width &&
            mouseY >= this.menu.volumeButton.position.y &&
            mouseY<= this.menu.volumeButton.position.y+this.menu.volumeButton.height){
                if(!this.audioMuted){

                    this.audioMuted=true;
                    this.audio.muted=true;
                }else{
                    this.audioMuted=false;
                    this.audio.muted=false;
                }
            }
        
    }
}