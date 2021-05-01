import {level6Game} from "./level_6_game.js";
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.height=window.innerHeight-5;
canvas.width=window.innerWidth;

let GAME_HEIGHT = canvas.height;
let GAME_WIDTH = canvas.width;

let level6game= new level6Game(GAME_WIDTH,GAME_HEIGHT);
level6game.start();

let lastTime=0;

function gameLoop(timestamp){
    let deltaTime= timestamp-lastTime;
    lastTime=timestamp;
    
    canvas.height=window.innerHeight-5;
    canvas.width=window.innerWidth;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    let GameWidth=window.innerWidth;
    let GameHeight=window.innerHeight-5;

    ctx.font="30px Arial";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("Level 6",GameWidth/2,GameHeight/6);
    
    level6game.update(deltaTime,GameWidth,GameHeight);
    level6game.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);