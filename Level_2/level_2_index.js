import {level2Game} from "./level_2_game.js";
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

canvas.height=window.innerHeight-5;
canvas.width=window.innerWidth;
if(canvas.width/canvas.height<16/9){
    canvas.height=canvas.width*9/16;
}else if(canvas.width/canvas.height>16/9){
    canvas.width=canvas.height*16/9;
}
canvas.style.left=(window.innerWidth-canvas.width)/2+"px";
canvas.style.top=(window.innerHeight-canvas.height)/2+"px";

let frameOffsetX=canvas.style.left;
let frameOffsetY=canvas.style.top;
let GAME_HEIGHT = canvas.height;
let GAME_WIDTH = canvas.width;

let Level="2";
let nextLevel="3";

let level2game= new level2Game(GAME_WIDTH,GAME_HEIGHT,frameOffsetX,frameOffsetY,Level,nextLevel);
level2game.start();


let lastTime=0;

function gameLoop(timestamp){
    let deltaTime= timestamp-lastTime;
    lastTime=timestamp;

    canvas.height=window.innerHeight-5;
    canvas.width=window.innerWidth;
    if(canvas.width/canvas.height<16/9){
        canvas.height=canvas.width*9/16;
    }else if(canvas.width/canvas.height>16/9){
        canvas.width=canvas.height*16/9;
    }
    canvas.style.left=(window.innerWidth-canvas.width)/2+"px";
    canvas.style.top=(window.innerHeight-canvas.height)/2+"px";

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    let GameWidth=canvas.width;
    let GameHeight=canvas.height;
    let frameOffsetX=canvas.style.left;
    let frameOffsetY=canvas.style.top;
   
    level2game.draw(ctx,GameWidth,GameHeight);    
    level2game.update(deltaTime,GameWidth,GameHeight,ctx,frameOffsetX,frameOffsetY);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);