import {PauseScreen} from "../Assets/PauseScreen.js";
import {Level1Input} from "./level_1_input.js";
import {ReturnButton} from "./level_1_return.js";
import {Player} from "./level_1_player.js";

const GAMESTATE={
    RUNNING:0,
    PAUSED:1
}

export class level1Game{
    constructor(GameWidth,GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        this.gameState=GAMESTATE;
    }

    start(){
  
        this.PauseScreen= new PauseScreen(this);
        this.player= new Player(this);
        this.gameState=GAMESTATE.RUNNING;
        this.returnButton = new ReturnButton(this);

        new Level1Input(this);
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;

        this.player.update(deltaTime,GameWidth,GameHeight);
        this.returnButton.update(deltaTime,GameWidth,GameHeight);

        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.update(deltaTime,GameWidth,GameHeight);
        }
        
    }

    draw(ctx){
        
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