import {PauseScreen} from "../Assets/PauseScreen.js";
import {Level2Input} from "./level_2_input.js";
import {ReturnButton} from "./level_2_return.js";
import {Player} from "./level_2.player.js";
import {Background} from "./level_2_background.js";

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
        this.player = new Player(this);
        this.returnButton = new ReturnButton(this);
        this.background = new Background(this);
        this.gameState=GAMESTATE.RUNNING;

        new Level2Input(this);
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;

        if(this.gameState==GAMESTATE.RUNNING){
            this.player.update(deltaTime,GameWidth,GameHeight,this.gameState);
            this.background.update(deltaTime,GameWidth,GameHeight,this.gameState);
        }else if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.update(deltaTime,GameWidth,GameHeight);
            this.returnButton.update(deltaTime,GameWidth,GameHeight);
        }
    }

    draw(ctx){
        this.background.draw(ctx);
        this.player.draw(ctx);
    
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