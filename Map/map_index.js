import {MapGame} from "./map_game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.height=window.innerHeight-5;
canvas.width=window.innerWidth;

let GAME_HEIGHT = canvas.height;
let GAME_WIDTH = canvas.width;

let map_game = new MapGame(GAME_WIDTH,GAME_HEIGHT);
map_game.start();

let lastTime=0;

function gameLoop(timestamp){
    let deltaTime= timestamp-lastTime;
    lastTime=timestamp;

    canvas.height=window.innerHeight-5;
    canvas.width=window.innerWidth;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    let GameWidth=window.innerWidth;
    let GameHeight=window.innerHeight-5;
    map_game.update(deltaTime,GameWidth,GameHeight);
    map_game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);