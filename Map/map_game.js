import {PauseScreen} from "../Assets/PauseScreen.js";
import {MapInput} from "./map_Input.js";
import {Map} from "./map.js";
import {level1Button} from "./button_lvl1.js";
import {level2Button} from "./button_lvl2.js";
import {level3Button} from "./button_lvl3.js";
import {level4Button} from "./button_lvl4.js";
import {level5Button} from "./button_lvl5.js";
import {level6Button} from "./button_lvl6.js";
import {ReturnToMenu} from "./map_return.js";

    

export class MapGame{
    constructor(GameWidth,GameHeight){
        this.gameWidth=GameWidth;
        this.gameHeight=GameHeight;
        
        
    }

    start(){
  
        this.map = new Map(this);
        this.PauseScreen = new PauseScreen(this);
        
        this.level1Button = new level1Button(this);
        this.level2Button = new level2Button(this);
        this.level3Button = new level3Button(this);
        this.level4Button = new level4Button(this);
        this.level5Button = new level5Button(this);
        this.level6Button = new level6Button(this);
        this.returnToMenu = new ReturnToMenu(this);

        new MapInput(this);

        this.gameObjects=[
            this.level1Button,
            this.level2Button,
            this.level3Button,
            this.level4Button,
            this.level5Button,
            this.level6Button,
            this.returnToMenu

        ];
          
    }

    update(deltaTime,gameWidth,gameHeight){

        this.map.update(deltaTime,gameWidth,gameHeight);

        this.gameObjects.forEach((object)=> object.update(deltaTime,gameWidth,gameHeight,this.map));

        
    }

    draw(ctx){

        this.map.draw(ctx);

        this.gameObjects.forEach((object)=> object.draw(ctx));
          
    }

    togglePause(){
        if(this.gameState==GAMESTATE.PAUSED ){
            this.gameState=GAMESTATE.RUNNING;
        }else if(this.gameState!=GAMESTATE.MENU){
            this.gameState=GAMESTATE.PAUSED;
        }
    }

    toggleButtons(mouseX,mouseY){
        this.gameObjects.forEach((object)=> object.toggleButton(mouseX,mouseY));
        
    }

    toggleClick(mouseX,mouseY){
        this.returnToMenu.toggleReturn(mouseX,mouseY);
        this.level1Button.toggleLevel1(mouseX,mouseY);
        this.level2Button.toggleLevel2(mouseX,mouseY);
        this.level3Button.toggleLevel3(mouseX,mouseY);
        this.level4Button.toggleLevel4(mouseX,mouseY);
        this.level5Button.toggleLevel5(mouseX,mouseY);
        this.level6Button.toggleLevel6(mouseX,mouseY);

           
    }
}