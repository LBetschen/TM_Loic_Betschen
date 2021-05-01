import {Input} from "./menu_input.js";
import {Menu} from "./menu.js";

export class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
    }

    start(){
        
        this.menu= new Menu(this);

        new Input(this); 
    }

    update(deltaTime,gameWidth,gameHeight){
       this.menu.update(deltaTime,gameWidth,gameHeight);
    }

    draw(ctx){
            this.menu.draw(ctx);
    }

       toggleMenu(mouseX,mouseY){
        if(mouseX>=this.menu.position.x && 
            mouseX <= this.menu.position.x+this.menu.width &&
            mouseY >= this.menu.position.y &&
            mouseY<= this.menu.position.y+this.menu.height)
            { 
               window.location="./Map/map.html";
            }
    }
}