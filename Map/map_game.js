import {PauseScreen} from "../Assets/PauseScreen.js";
import {MapInput} from "./map_Input.js";
import {Map} from "./map.js";
import {level1Button} from "./button_lvl1.js";
import {level2Button} from "./button_lvl2.js";
import {level3Button} from "./button_lvl3.js";
import {level4Button} from "./button_lvl4.js";
import {level5Button} from "./button_lvl5.js";
import {level6Button} from "./button_lvl6.js";


    

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

        new MapInput(this);

        this.gameObjects=[
            this.level1Button,
            this.level2Button,
            this.level3Button,
            this.level4Button,
            this.level5Button,
            this.level6Button

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
    
    toggleLevels(mouseX,mouseY){
        
        if(mouseX>=this.level1Button.position.x && 
            mouseX <= this.level1Button.position.x+this.level1Button.width &&
            mouseY >= this.level1Button.position.y &&
            mouseY <= this.level1Button.position.y+this.level1Button.height)
            { 
               window.location="../Level_1/level_1.html";
            }

        if(mouseX>=this.level2Button.position.x && 
            mouseX <= this.level2Button.position.x+this.level2Button.width &&
            mouseY >= this.level2Button.position.y &&
            mouseY <= this.level2Button.position.y+this.level2Button.height)
            { 
               window.location="../Level_2/level_2.html";
            }

        if(mouseX>=this.level3Button.position.x && 
            mouseX <= this.level3Button.position.x+this.level3Button.width &&
            mouseY >= this.level3Button.position.y &&
            mouseY <= this.level3Button.position.y+this.level3Button.height)
            { 
               window.location="../Level_3/level_3.html";
            }

        if(mouseX>=this.level4Button.position.x && 
            mouseX <= this.level4Button.position.x+this.level4Button.width &&
            mouseY >= this.level4Button.position.y &&
            mouseY <= this.level4Button.position.y+this.level4Button.height)
            { 
               window.location="../Level_4/level_4.html";
            }

        if(mouseX>=this.level5Button.position.x && 
            mouseX <= this.level5Button.position.x+this.level5Button.width &&
            mouseY >= this.level5Button.position.y &&
            mouseY <= this.level5Button.position.y+this.level5Button.height)
            { 
               window.location="../Level_5/level_5.html";
            }     

        if(mouseX>=this.level6Button.position.x && 
            mouseX <= this.level6Button.position.x+this.level6Button.width &&
            mouseY >= this.level6Button.position.y &&
            mouseY <= this.level6Button.position.y+this.level6Button.height)
            { 
               window.location="../Level_6/level_6.html";
            }   
    }
}