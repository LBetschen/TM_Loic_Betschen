import {Input} from "./menu_input.js";
import {Menu} from "./menu.js";
import {PlayerInfo} from "../Assets/playerInfo.js";

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
        this.audio= new Audio();
        this.audio.src=document.getElementById("backgroundSound1").src;
        this.audioMuted=false;
        this.savedPlayer=[];//values of the saved player
        this.info=[];//variable of the saved player
        
    }

    start(){
        
        this.menu= new Menu(this);
        this.playerInfo= new PlayerInfo(this);
       
        new Input(this);
        this.buttons=[this.menu.aboutButton,this.menu.settingsButton]; 
        this.buttonsDown=[this.menu.aboutButton,this.menu.settingsButton,this.menu.newGame,this.menu.resumeGame]; 

        this.gameState=GAMESTATE.RUNNING;
        
        this.audio.play(); 

        this.playerInfo.getSavedPlayer(this.info,this.savedPlayer);//checks if there is a saved player and if not creates base cookies for the new saved player based off playerInfo.txt
        console.log(document.cookie);
        
        
        
    }

    update(deltaTime,gameWidth,gameHeight){
       this.menu.update(deltaTime,gameWidth,gameHeight,this.gameState);
       this.audio.play();
       
    }

    draw(ctx){
            this.menu.draw(ctx,this.gameState);
    }

    toggleMenu(mouseX,mouseY){
    }
    
    toggleButtons(mouseX,mouseY){
        this.buttonsDown.forEach((object)=>{
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
            
            if(mouseX>=this.menu.newGame.position.x && 
                mouseX <= this.menu.newGame.position.x+this.menu.newGame.width &&
                mouseY >= this.menu.newGame.position.y &&
                mouseY<= this.menu.newGame.position.y+this.menu.newGame.height)
                { 
                   window.location="./Map/map.html";
                   this.menu.newPlayer(this.playerInfo,this.info,this.savedPlayer);
                   this.menu.savePlayer(this.playerInfo,this.info,this.savedPlayer);
                   
                   
                }

            if(mouseX>=this.menu.resumeGame.position.x && 
                mouseX <= this.menu.resumeGame.position.x+this.menu.resumeGame.width &&
                mouseY >= this.menu.resumeGame.position.y &&
                mouseY<= this.menu.resumeGame.position.y+this.menu.resumeGame.height)
                { 
                    window.location="./Map/map.html";
                    this.menu.savePlayer(this.playerInfo,this.info,this.savedPlayer);

                       
                }
                
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
                    this.menu.volumeButton.src=document.getElementById("mutedButtonDown").src;
                    this.audioMuted=true;
                    this.audio.muted=true;
                }else{
                    this.menu.volumeButton.src=document.getElementById("volumeButtonDown").src;
                    this.audioMuted=false;
                    this.audio.muted=false;
                }
            }
        
    }
}
