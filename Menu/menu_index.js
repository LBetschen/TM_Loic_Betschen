import {Game} from "./menu_game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.height=window.innerHeight-5;
canvas.width=window.innerWidth+5;

let GAME_HEIGHT = canvas.height;
let GAME_WIDTH = canvas.width;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

let lastTime=0;



function gameLoop(timestamp){
    let deltaTime= timestamp-lastTime;
    lastTime=timestamp;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    canvas.height=window.innerHeight-5;
    canvas.width=window.innerWidth;

    let GameWidth=window.innerWidth;
    let GameHeight=window.innerHeight-5;
    

    game.update(deltaTime,GameWidth,GameHeight);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);



