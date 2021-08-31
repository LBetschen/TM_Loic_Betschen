import { Input } from "../GlobalScripts/Input.js";
import { Map } from "./map.js";
import { levelButtons } from "./levelButtons.js";
import { Settings } from "../GlobalScripts/settings.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";


const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
}

export class MapGame {
    constructor(GameWidth, GameHeight,FrameOffsetX,FrameOffsetY) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
        this.gameState = GAMESTATE;
        this.musicMuted = false;
        this.soundMuted=false;
        this.frameOffsetX=parseInt(FrameOffsetX);
        this.frameOffsetY=parseInt(FrameOffsetY);
        console.log(this.frameOffsetX);

        this.audio = new Audio();//audio for the menu
        this.audio.src = document.getElementById("backgroundSound2").src;
    }

    start() {
        this.playerProgress=new PlayerProgress(this);
        this.playerProgress.getSavedPlayer(this);
        this.map = new Map(this);
        this.settings=new Settings(this);
        this.levelButtons = new levelButtons(this);
        
        new Input(this);
        
        this.gameState=GAMESTATE.RUNNING;
        var c=this.playerProgress.getCookie("musicVolume",false);
        this.audio.volume=c[2];
        this.audio.play();
    }

    update(deltaTime, gameWidth, gameHeight,FrameOffsetX,FrameOffsetY) {
        this.map.update(deltaTime, gameWidth, gameHeight,this);
        this.levelButtons.update(deltaTime, gameWidth, gameHeight, this.map,this);
        this.settings.update(deltaTime, gameWidth, gameHeight, this.gameState,this)
        this.audio.play();
        this.frameOffsetX=parseInt(FrameOffsetX);
        this.frameOffsetY=parseInt(FrameOffsetY);
    }

    draw(ctx) {
        this.map.draw(ctx);
        this.levelButtons.draw(ctx);
        this.settings.draw(ctx, this.gameState, this);
        
    }

  

    toggleButtons(mouseX, mouseY) {
        if(this.gameState==0){
            this.levelButtons.toggleButton(mouseX, mouseY);
        }
            this.map.toggleButton(mouseX, mouseY);
            this.settings.toggleSettingButtons(this, mouseX, mouseY);
        
        

    }

    toggleClick(mouseX, mouseY) {
        if(this.gameState==0){
            this.levelButtons.toggleLevels(mouseX, mouseY);
            
        }else{
            this.settings.toggleButtonClick(this,mouseX,mouseY);
        }
        this.map.toggleClick(mouseX, mouseY,this);
    }
}