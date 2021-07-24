import { PauseScreen } from "../GlobalScripts/PauseScreen.js";
import { LevelInput } from "../GlobalScripts/level_input.js";
import { LevelButtons } from "../GlobalScripts/level_buttons.js";
import { Player } from "../GlobalScripts/Player.js";
import { Coins } from "../GlobalScripts/level_coins.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";
import { Settings } from "../GlobalScripts/settings.js";
import { Level1Map } from "../GlobalScripts/level_map.js";
import { Background } from "./level_1_background.js";

const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
    ABOUT:3,
    GAMEOVER:4
}

export class level1Game {
    constructor(GameWidth, GameHeight) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
        this.gameState = GAMESTATE;
        

        this.audio = new Audio();//audio for the menu
        this.audio.src = document.getElementById("backgroundSound3").src;
        
    }

    start(ctx) {


        
        this.playerProgress = new PlayerProgress(this);
        this.playerProgress.getSavedPlayer(this);
        this.settings= new Settings(this);
        this.PauseScreen = new PauseScreen(this);
        this.player = new Player(this);
        this.coins = new Coins(this);
        this.gameState = GAMESTATE.RUNNING;
        this.buttons = new LevelButtons(this);
        this.level1Map=new Level1Map(this,this.player);
        this.background = new Background(this);
        
        //this.coins.coinAnimation();
        new LevelInput(this);
        this.coins.start(ctx, this);
        this.player.start();
        this.level1Map.start();

        this.gameState=GAMESTATE.RUNNING;
        var c=this.playerProgress.getCookie("musicVolume",false);
        this.audio.volume=c[2];
        this.audio.play();


    }

    update(deltaTime, GameWidth, GameHeight) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;

        this.middleOfPlayer = {
            x: this.player.position.x + (this.player.width / 2),
            y: this.player.position.y + (this.player.height / 2),
        }
        this.coins.update(deltaTime, GameWidth, GameHeight, this.player, this);
        this.player.update(deltaTime, GameWidth, GameHeight,this);
        this.level1Map.update(deltaTime, GameWidth, GameHeight,this);


      
        
        if(this.gameState==GAMESTATE.RUNNING){

            this.background.update(deltaTime,GameWidth,GameHeight,this);
        }else if(this.gameState==GAMESTATE.PAUSED){
           this.PauseScreen.update(deltaTime, GameWidth, GameHeight);
            this.buttons.update(deltaTime, GameWidth, GameHeight);
        }
        this.settings.update(deltaTime, GameWidth, GameHeight, this.gameState,this)


    }

    draw(ctx,GameWidth,GameHeight) {
        this.background.draw(ctx,GameWidth,GameHeight);
        this.level1Map.draw(ctx,this);
        this.coins.draw(ctx, this);
        this.player.draw(ctx);

        if (this.gameState == GAMESTATE.PAUSED) {
            this.PauseScreen.draw(ctx);
            this.buttons.draw(ctx);
            
        }else if(this.gameState==4){
            ctx.fillText("GAMEOVER",200,200,200,200);
        }
        this.settings.draw(ctx, this.gameState, this);
    }

    togglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else if (this.gameState == GAMESTATE.RUNNING) {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    toggleClick(mouseX, mouseY) {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.buttons.toggleReturn(mouseX, mouseY, this);
           
        }else if(this.gameState==GAMESTATE.SETTINGS){
            this.settings.toggleButtonClick(this,mouseX,mouseY);
        }
    }

    toggleButtons(mouseX, mouseY) {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.buttons.toggleButton(mouseX, mouseY);
            
        }
        this.settings.toggleSettingButtons(this, mouseX, mouseY);
    }


}