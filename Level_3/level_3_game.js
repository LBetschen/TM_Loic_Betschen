import {PauseScreen} from "../GlobalScripts/PauseScreen.js";
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
        this.map=[];
        this.mapObjects=3;
        this.columns=16;
        this.tileWidth=80;
        this.tileHeight=80;

        
    }

    start(){
  
        this.readTextFiles(this.map);
        
        this.player = new Player(this);
        this.PauseScreen= new PauseScreen(this);
        this.returnButton= new ReturnButton(this);
        this.level3Map = new Level3Map(this,this.player,this.map);
        this.reloadButton = new ReloadButton(this);
        this.gameState=GAMESTATE.RUNNING;

        new Level3Input(this);
        
    }

    update(deltaTime,GameWidth,GameHeight){
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        this.player.update(deltaTime,GameWidth,GameHeight);
        this.level3Map.update(deltaTime,GameWidth,GameHeight,this.player,this.map);
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

    readTextFiles(map){
        for(var index=0;index<this.mapObjects;index++){
            var res;
            var f = new XMLHttpRequest();
            switch (index){
                case 0:
                    f.open("GET", "./TileMap/level_3_groundArray.txt", false);
                    break;
                case 1:
                    f.open("GET", "./TileMap/level_3_structures.txt", false);
                    break;
                case 2:
                    f.open("GET", "./TileMap/level_3_collision.txt", false);
                    break;
            }
            
            
            f.onreadystatechange = function (){
                if(f.readyState === 4 && f.status === 200 )
                {
                    res = f.responseText;
                    res=res.split(",");
                    for(var i=0;i<res.length;i++){
                        res[i]=parseInt(res[i]);
                    }
                }
            }
            f.send(null);
            map[index]=res;
        }
    }
}