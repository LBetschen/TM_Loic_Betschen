import {PauseScreen} from "../Assets/PauseScreen.js";
import {Level2Input} from "./level_2_input.js";

const GAMESTATE={
    RUNNING:0,
    PAUSED:1
}

export class level2Game{
    constructor(GameWidth,GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        this.gameState=GAMESTATE;
    }

    start(){
  
        this.PauseScreen= new PauseScreen(this);
        this.gameState=GAMESTATE.RUNNING;

        new Level2Input(this);
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.update(deltaTime,GameWidth,GameHeight);
        }
    }

    draw(ctx){
        
        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.draw(ctx);
        }
    }

    togglePause(){
        if(this.gameState==GAMESTATE.PAUSED ){
            this.gameState=GAMESTATE.RUNNING;
        }else if(this.gameState==GAMESTATE.RUNNING){
            this.gameState=GAMESTATE.PAUSED;
        } 
    }
}