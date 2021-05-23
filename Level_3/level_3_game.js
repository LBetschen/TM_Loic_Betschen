import {PauseScreen} from "../Assets/PauseScreen.js";
import {Level3Input} from "./level_3_input.js";
import {ReturnButton} from "./level_3_return.js";
import {Level3Map} from "./level_3_map.js";
import {Player} from "./level_3_player.js";
import {ReloadButton} from "./level_3_reload.js";

const GAMESTATE={
    RUNNING:0,
    PAUSED:1
}


export class level3Game{
    constructor(GameWidth,GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        this.gameState=GAMESTATE;

        
    }

    start(){
  
        this.player = new Player(this);
        this.PauseScreen= new PauseScreen(this);
        this.returnButton= new ReturnButton(this);
        this.level3Map = new Level3Map(this,this.player);
        this.reloadButton = new ReloadButton(this);
        this.gameState=GAMESTATE.RUNNING;

        new Level3Input(this);
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        this.player.update(deltaTime,GameWidth,GameHeight);
        this.level3Map.update(deltaTime,GameWidth,GameHeight,this.player);
        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.update(deltaTime,GameWidth,GameHeight);
            this.returnButton.update(deltaTime,GameWidth,GameHeight);
            this.reloadButton.update(deltaTime,GameWidth,GameHeight);
        }
        
    }

    draw(ctx){

        
        this.level3Map.draw(ctx);
        this.player.draw(ctx);

        if(this.gameState==GAMESTATE.PAUSED){
            this.PauseScreen.draw(ctx);
            this.returnButton.draw(ctx);
            this.reloadButton.draw(ctx);
            
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
            this.reloadButton.toggleReload(mouseX,mouseY);

        }
    }
    
    toggleButtons(mouseX,mouseY){
        if(this.gameState==GAMESTATE.PAUSED){
            this.returnButton.toggleButton(mouseX,mouseY);
            this.reloadButton.toggleButton(mouseX,mouseY);
        }
    }
}