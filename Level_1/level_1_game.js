import { PauseScreen } from "../GlobalScripts/PauseScreen.js";
import { LevelInput } from "../GlobalScripts/level_input.js";
import { LevelButtons } from "../GlobalScripts/level_buttons.js";
import { Player } from "../GlobalScripts/Player.js";
import { InteractiveObjects } from "../GlobalScripts/InteractiveObjects.js";
import { PlayerProgress } from "../GlobalScripts/PlayerProgress.js";
import { Settings } from "../GlobalScripts/settings.js";
import { Map } from "../GlobalScripts/level_map.js";
import { Background } from "./level_1_background.js";
import { GameOver } from "../GlobalScripts/GameOver.js";
import { Intro } from "./level_1_intro.js";

const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1,
    SETTINGS:2,
    ABOUT:3,
    GAMEOVER:4,
    INTRO:5
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
        this.interactiveObjects = new InteractiveObjects(this);
        this.gameState = GAMESTATE.RUNNING;
        this.buttons = new LevelButtons(this);
        this.map=new Map(this,this.player);
        this.background = new Background(this);
        this.gameOver = new GameOver(this);
        this.intro=new Intro(this);
     
        new LevelInput(this);
        this.interactiveObjects.start(ctx, this);
        this.map.start();
        this.player.start(this);
       
        this.intro.start(this);

        
        var c=this.playerProgress.getCookie("musicVolume",false);
        this.audio.volume=c[2];
        this.audio.play();


    }

    update(deltaTime, GameWidth, GameHeight) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;

        switch (this.gameState){
            case 0:
                this.background.update(deltaTime,GameWidth,GameHeight,this);
                this.player.update(deltaTime, GameWidth, GameHeight,this);
                this.map.update(deltaTime, GameWidth, GameHeight,this);
                this.interactiveObjects.update(deltaTime, GameWidth, GameHeight, this.player, this);
                break;
            case 1:
                this.PauseScreen.update(deltaTime, GameWidth, GameHeight);
                this.buttons.update(deltaTime, GameWidth, GameHeight);
                break;
            case 2:
                this.settings.update(deltaTime, GameWidth, GameHeight, this.gameState,this)
                break;
            case 3:
                break;
            case 4:
                this.gameOver.update(deltaTime, GameWidth, GameHeight);
                this.buttons.update(deltaTime, GameWidth, GameHeight);
                break;
            case 5:
                this.intro.update(deltaTime, GameWidth, GameHeight);
                break;
        }
    }

    draw(ctx,GameWidth,GameHeight) {
        this.background.draw(ctx,GameWidth,GameHeight);
        this.map.draw(ctx,this);
        this.interactiveObjects.draw(ctx, this);
        this.player.draw(ctx);

        switch (this.gameState){
            case 0:
                break;
            case 1:
                this.PauseScreen.draw(ctx);
                this.buttons.draw(ctx);
                break;
            case 2:
                this.settings.draw(ctx, this.gameState, this);
                break;
            case 3:
                break;
            case 4:
                this.gameOver.draw(ctx);
                this.buttons.draw(ctx);
                break;
            case 5:
                this.intro.draw(ctx);
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