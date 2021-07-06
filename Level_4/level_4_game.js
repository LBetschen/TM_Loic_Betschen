import {PauseScreen} from "../GlobalScripts/PauseScreen.js";
import {Level4Input} from "./level_4_input.js";
import {ReturnButton} from "./level_4_return.js";

const GAMESTATE={
    RUNNING:0,
    PAUSED:1
}

export class level4Game{
    constructor(GameWidth,GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        this.gameState=GAMESTATE;
    }

    start(){
  
        this.PauseScreen= new PauseScreen(this);
        this.returnButton = new ReturnButton(this);
        this.gameState=GAMESTATE.RUNNING;

        new Level4Input(this);
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.update(deltaTime,GameWidth,GameHeight);
            this.returnButton.update(deltaTime,GameWidth,GameHeight);
        }
    }

    draw(ctx){
        
        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.draw(ctx);
            this.returnButton.draw(ctx);
        }
    }

    togglePause(){
        if(this.gameState==GAMESTATE.PAUSED ){
            this.gameState=GAMESTATE.RUNNING;
        }else if(this.gameState==GAMESTATE.RUNNING){
            this.gameState=GAMESTATE.PAUSED;
        } 
    }
    toggleReturn(mouseX,mouseY){
        if(this.gameState==GAMESTATE.PAUSED){
            this.returnButton.toggleReturn(mouseX,mouseY);
        }
    }
    
    toggleReturnButton(mouseX,mouseY){
        if(this.gameState==GAMESTATE.PAUSED){
            this.returnButton.toggleButton(mouseX,mouseY);
        }
    }
}