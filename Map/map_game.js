import { Input } from "../GlobalScripts/Input.js";
import { Map } from "./map.js";
import { levelButtons } from "./levelButtons.js";
import { Settings } from "../GlobalScripts/settings.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";

var dk=1;
const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
    LEVELANIMATION:3
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

    start(ctx) {
        this.playerProgress=new PlayerProgress(this);
        this.playerProgress.getSavedPlayer(this);
        this.map = new Map(this);
        this.settings=new Settings(this);
        this.levelButtons = new levelButtons(this);
        
        new Input(this,ctx);
        
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
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }
    
    draw(ctx) {
        this.map.draw(ctx);
        this.levelButtons.draw(ctx);
        this.settings.draw(ctx, this.gameState, this);
        if(this.gameState==3){
            this.levelAnimation(this.gameWidth,this.gameHeight,ctx);
        }
        
    }

  

    toggleButtons(mouseX, mouseY) {
        if(this.gameState==0){
            this.levelButtons.toggleButton(mouseX, mouseY);
        }
            this.map.toggleButton(mouseX, mouseY);
            this.settings.toggleSettingButtons(this, mouseX, mouseY);
        
        

    }

    toggleClick(mouseX, mouseY,ctx) {
        if(this.gameState==0){
            this.levelButtons.toggleLevels(mouseX, mouseY,this,ctx);
            
        }else{
            this.settings.toggleButtonClick(this,mouseX,mouseY);
        }
        this.map.toggleClick(mouseX, mouseY,this);
    }

    levelAnimation(GameWidth,GameHeight,ctx){
        var shade=dk/100;
        ctx.fillStyle="rgba(0,0,0,"+shade+")";
        ctx.fillRect(0,0,GameWidth,GameHeight);
        dk++;
    }
}