import { Input } from "../GlobalScripts/Input.js";
import { LevelButtons } from "../GlobalScripts/buttons.js";
import { Player } from "../GlobalScripts/Player.js";
import { InteractiveObjects } from "../GlobalScripts/InteractiveObjects.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";
import { Settings } from "../GlobalScripts/settings.js";
import { Map } from "../GlobalScripts/map.js";



const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
    ABOUT:3,
    GAMEOVER:4,
    INTRO:5,
    END:6,
    DEATH:7
}

export class level5Game {
    constructor(GameWidth, GameHeight,FrameOffsetX,FrameOffsetY,Level) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
        this.gameState = GAMESTATE;
        this.frameOffsetX=parseInt(FrameOffsetX);
        this.frameOffsetY=parseInt(FrameOffsetY);
        this.audio=new Audio();
        this.audio.src=document.getElementById("gameMusic").src;

        
        this.level=Level;
        
    }

    start(ctx) {


        
        this.playerProgress = new PlayerProgress(this);
        this.playerProgress.getSavedPlayer(this);
        this.settings= new Settings(this);
        this.player = new Player(this);
        this.interactiveObjects = new InteractiveObjects(this);
        this.gameState = GAMESTATE.RUNNING;
        this.buttons = new LevelButtons(this);
        this.map=new Map(this,this.player);
        
        
     
        new Input(this);
        this.interactiveObjects.start(ctx, this);
        this.map.start();
        this.player.start(this);
       

        var c=this.playerProgress.getCookie("musicVolume",false);
        this.audio.volume=c[2];
        this.audio.play();
        
        


    }

    update(deltaTime, GameWidth, GameHeight,ctx) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;
        this.audio.play();
        
        this.map.update(deltaTime, GameWidth, GameHeight,this);
        switch (this.gameState){
            case 0:
                this.player.update(deltaTime, GameWidth, GameHeight,this,ctx);
                this.interactiveObjects.update(deltaTime, GameWidth, GameHeight, this.player, this,ctx);
                break;
            case 1:
                this.buttons.update(deltaTime, GameWidth, GameHeight,this);
                break;
            case 2:
                this.settings.update(deltaTime, GameWidth, GameHeight, this.gameState,this)
                break;
            case 3:
                break;
            case 4:
                this.buttons.update(deltaTime, GameWidth, GameHeight);
                break;
            case 5:
                
                break;
            case 6:
                break;
        }
        
    }

    draw(ctx,GameWidth,GameHeight) {


        
       
        this.map.draw(ctx,this);
        this.interactiveObjects.draw(ctx, this);

        switch (this.gameState){
            case 0:
                this.player.draw(ctx);
                break;
            case 1:
                this.player.draw(ctx);
                this.buttons.draw(ctx);
                ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 4)
                break;
            case 2:
                this.player.draw(ctx);
                this.settings.draw(ctx, this.gameState, this);

                break;
            case 3:
                break;
            case 4:
                this.player.draw(ctx);
                this.buttons.draw(ctx);
                ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 4)
                
                
                break;
            case 5:
                
                break;
            case 6:
                this.player.draw(ctx);
                this.player.endAnimation(GameWidth,GameHeight,ctx);

                break;
            case 7:
                this.player.endAnimation(GameWidth,GameHeight,ctx);
                break;
        }
        
    }

    togglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else if (this.gameState == GAMESTATE.RUNNING) {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    toggleClick(mouseX, mouseY) {
        
        switch (this.gameState){
            case 0:
                break;
            case 1:
                this.buttons.toggleReturn(mouseX, mouseY, this);
                break;
            case 2:
                this.settings.toggleButtonClick(this,mouseX,mouseY);
                break;
            case 3:
                break;
            case 4:
                this.buttons.toggleReturn(mouseX, mouseY, this);
                break;
        }
        
    }

    toggleButtons(mouseX, mouseY) {
        
       
        switch (this.gameState){
            case 0:
                break;
            case 1:
                this.buttons.toggleButton(mouseX, mouseY);
                break;
            case 2:
                this.settings.toggleSettingButtons(this, mouseX, mouseY);                
                break;
            case 3:
                break;
            case 4:
                this.buttons.toggleButton(mouseX, mouseY);
                break;
        }
    }
    
    


}