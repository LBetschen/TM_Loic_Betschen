import { PauseScreen } from "../GlobalScripts/PauseScreen.js";
import { MapInput } from "./map_Input.js";
import { Map } from "./map.js";
import { levelButtons } from "./levelButtons.js";
import { ReturnToMenu } from "./map_return.js";

export class MapGame {
    constructor(GameWidth, GameHeight) {
        this.gameWidth = GameWidth;
        this.gameHeight = GameHeight;
    }

    start() {

        this.map = new Map(this);
        this.PauseScreen = new PauseScreen(this);
        this.levelButtons = new levelButtons(this);
        this.returnToMenu = new ReturnToMenu(this);
        new MapInput(this);
        console.log(document.cookie);
    }

    update(deltaTime, gameWidth, gameHeight) {
        this.map.update(deltaTime, gameWidth, gameHeight);
        this.levelButtons.update(deltaTime, gameWidth, gameHeight, this.map);
        this.returnToMenu.update(deltaTime, gameWidth, gameHeight, this.map);
    }

    draw(ctx) {
        this.map.draw(ctx);
        this.levelButtons.draw(ctx);
        this.returnToMenu.draw(ctx);
    }

    togglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else if (this.gameState != GAMESTATE.MENU) {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    toggleButtons(mouseX, mouseY) {
        this.levelButtons.toggleButton(mouseX, mouseY);
        this.returnToMenu.toggleButton(mouseX, mouseY);
    }

    toggleClick(mouseX, mouseY) {
        this.returnToMenu.toggleReturn(mouseX, mouseY);
        this.levelButtons.toggleLevel1(mouseX, mouseY);
    }
}