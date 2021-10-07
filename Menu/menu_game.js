import { Input } from "./menu_input.js";
import { Menu } from "./menu.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";
import { Settings } from "../GlobalScripts/settings.js";

const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
    ABOUT:3,
}



export class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameState = GAMESTATE;

        this.audio = new Audio();//audio for the menu
        this.audio.src = document.getElementById("backgroundSound1").src;
        this.musicMuted = false;
        this.soundMuted=false;

        this.savedGame = false;//true if there is already a player saved

        this.aboutPage=new Image();
        this.aboutPage.src=document.getElementById("aboutText").src;
        this.aboutPage.ratio=this.aboutPage.naturalHeight/this.aboutPage.naturalWidth;
        this.aboutPage.height=gameHeight/1.2;
        this.aboutPage.width=this.aboutPage.height/this.aboutPage.ratio;
        this.aboutPage.position={
            x:gameWidth/2-this.aboutPage.width/2,
            y:gameHeight/2-this.aboutPage.height/2
        }

        this.buttonAudio=new Audio();
        this.buttonAudio.src=document.getElementById("buttonAudio").src;


    }
    

    start() {
     
        this.playerProgress = new PlayerProgress(this);
        this.playerProgress.getSavedPlayer(this);//retrieves the progress of the player or creates cookies to save the players progress
        this.menu = new Menu(this);
        this.settings=new Settings(this);
        
        this.menu.inputValue(this);

        new Input(this);

        this.buttons = [this.menu.aboutButton, this.menu.settingsButton];
        this.buttonsDown = [this.menu.aboutButton, this.menu.settingsButton, this.menu.newGameButton, this.menu.resumeGame];
        this.settingButtons=[this.menu.soundButton, this.menu.musicButton];

        this.gameState = GAMESTATE.RUNNING;

        this.audio.play();
        var c = this.playerProgress.getCookie("musicVolume",false);
        this.audio.volume=c[2];
        
        c = this.playerProgress.getCookie("soundVolume",false);
        this.buttonAudio.volume=c[2];
        

    }

    update(deltaTime, gameWidth, gameHeight) {
        
        this.playerProgress.updatePlayerVariables();
        this.menu.update(deltaTime, gameWidth, gameHeight,this);
        this.settings.update(deltaTime, gameWidth, gameHeight, this.gameState, this)
        this.audio.play();
        if(this.gameState==GAMESTATE.RUNNING){
            this.menu.input.style.display="initial";
         }else if (this.gameState == GAMESTATE.SETTINGS) {
            this.menu.input.style.display="none";
 
             
         } else if (this.gameState == GAMESTATE.ABOUT) {
            this.menu.input.style.display="none"; 
         }

        this.aboutPage.height=gameHeight/1.2;
        this.aboutPage.width=this.aboutPage.height/this.aboutPage.ratio;
        this.aboutPage.position={
            x:gameWidth/2-this.aboutPage.width/2,
            y:gameHeight/2-this.aboutPage.height/2
        }
        this.menu.input.style.height = gameHeight /25+ "px";
        this.menu.input.style.width = gameWidth / 5 + "px";
        this.menu.input.style.left = gameWidth / 2 - this.menu.input.offsetWidth / 2 + "px";
        this.menu.input.style.top = this.menu.newGameButton.position.y + this.menu.newGameButton.height * 1.5 + "px";

        var c = this.playerProgress.getCookie("soundVolume",false);
        this.buttonAudio.volume=c[2];
        
    }

    draw(ctx) {
        this.menu.draw(ctx, this.gameState, this.savedGame, this);
        this.settings.draw(ctx, this.gameState,  this,this.menu.input);
        if(this.gameState==3){
            ctx.drawImage(this.aboutPage,this.aboutPage.position.x,this.aboutPage.position.y,this.aboutPage.width,this.aboutPage.height);
        }
    }



    toggleButtons(mouseX, mouseY) {
        if(this.gameState!=3 && this.gameState!=2){
            this.buttonsDown.forEach((object) => {
                if (mouseX >= object.position.x &&
                    mouseX <= object.position.x + object.width &&
                    mouseY >= object.position.y &&
                    mouseY <= object.position.y + object.height) {
                    object.src = document.getElementById(object.down).src;
                    if(!object.audioPlaying){
                        this.buttonAudio.play();
                        object.audioPlaying=true;
                    }
                } else {
                    object.src = document.getElementById(object.up).src;
                    object.audioPlaying=false;
                }
            });
        }
        this.settings.toggleSettingButtons(this, mouseX, mouseY);
       

    }
    toggleClick(mouseX, mouseY) {
        if(this.gameState==0){
            if (mouseX >= this.menu.newGameButton.position.x &&
            mouseX <= this.menu.newGameButton.position.x + this.menu.newGameButton.width &&
            mouseY >= this.menu.newGameButton.position.y &&
            mouseY <= this.menu.newGameButton.position.y + this.menu.newGameButton.height) {
  
            this.menu.newGame(this);
            this.menu.savePlayer(this);
            window.location = "./Map/map.html";
            }

            if (mouseX >= this.menu.resumeGame.position.x &&
                mouseX <= this.menu.resumeGame.position.x + this.menu.resumeGame.width &&
                mouseY >= this.menu.resumeGame.position.y &&
                mouseY <= this.menu.resumeGame.position.y + this.menu.resumeGame.height) {
                var c= this.playerProgress.getCookie("name",false);
                if (c[2]!=0) {
                    this.menu.savePlayer(this);
                    window.location = "./Map/map.html";
                }
            }
        }
        

        for (var i = 0; i < this.buttons.length; i++) {
            if (mouseX >= this.buttons[i].position.x &&
                mouseX <= this.buttons[i].position.x + this.buttons[i].width &&
                mouseY >= this.buttons[i].position.y &&
                mouseY <= this.buttons[i].position.y + this.buttons[i].height) {
                switch (i) {
                    case 0:
                        if (this.gameState != 3) {
                            this.gameState = GAMESTATE.ABOUT;
                        } else {
                            this.gameState = GAMESTATE.RUNNING;
                        }

                        break;
                    case 1:
                        if (this.gameState != 2) {
                            this.gameState = GAMESTATE.SETTINGS;
                        } else {
                            this.gameState = GAMESTATE.RUNNING;
                        }
                        break;
                }
            }
        }
        this.settings.toggleButtonClick(this,mouseX,mouseY);
        
    }
}
