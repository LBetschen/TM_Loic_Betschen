import { PauseScreen } from "../Assets/PauseScreen.js";
import { Level1Input } from "./level_1_input.js";
import { ReturnButton } from "./level_1_return.js";
import { Player } from "./level_1_player.js";
import { Coins } from "./level_1_coins.js";
import { ReloadButton } from "./level_1_reload.js";
import { PlayerInfo } from "../Assets/playerInfo.js";

const GAMESTATE = {
    RUNNING: 0,
    PAUSED: 1
}

export class level1Game {
    constructor(GameWidth, GameHeight) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
        this.gameState = GAMESTATE;
        this.savedPlayer = [];//values of the saved player
        this.info = [];//variables of the saved player
    }

    start(ctx) {



        this.playerInfo = new PlayerInfo(this);
        this.playerInfo.getSavedPlayer(this.info, this.savedPlayer);

        this.PauseScreen = new PauseScreen(this);
        this.player = new Player(this);
        this.coins = new Coins(this);
        this.gameState = GAMESTATE.RUNNING;
        this.returnButton = new ReturnButton(this);
        this.reloadButton = new ReloadButton(this);
        //this.coins.coinAnimation();
        new Level1Input(this);
        this.coins.start(ctx, this);


    }

    update(deltaTime, GameWidth, GameHeight) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;

        this.middleOfPlayer = {
            x: this.player.position.x + (this.player.width / 2),
            y: this.player.position.y + (this.player.height / 2),
        }
        this.coins.update(deltaTime, GameWidth, GameHeight, this.player, this);
        this.player.update(deltaTime, GameWidth, GameHeight);


        if (this.gameState == GAMESTATE.PAUSED) {
            this.PauseScreen.update(deltaTime, GameWidth, GameHeight);
            this.returnButton.update(deltaTime, GameWidth, GameHeight);
            this.reloadButton.update(deltaTime, GameWidth, GameHeight);
        }

    }

    draw(ctx) {

        this.coins.draw(ctx, this);
        this.player.draw(ctx);

        if (this.gameState == GAMESTATE.PAUSED) {
            this.PauseScreen.draw(ctx);
            this.returnButton.draw(ctx);
            this.reloadButton.draw(ctx);
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
        if (this.gameState == GAMESTATE.PAUSED) {
            this.returnButton.toggleReturn(mouseX, mouseY, this);
            this.reloadButton.toggleReload(mouseX, mouseY, this);
        }
    }

    toggleButtons(mouseX, mouseY) {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.returnButton.toggleButton(mouseX, mouseY);
            this.reloadButton.toggleButton(mouseX, mouseY);
        }
    }


}