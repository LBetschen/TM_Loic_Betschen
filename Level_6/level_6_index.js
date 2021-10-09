import {level6Game} from "./level_6_game.js";
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

let Level="level6";

let level6game= new level5Game(GAME_WIDTH,GAME_HEIGHT,frameOffsetX,frameOffsetY,Level);
level6game.start();


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
   
    level6game.draw(ctx,GameWidth,GameHeight);    
    level6game.update(deltaTime,GameWidth,GameHeight,ctx,frameOffsetX,frameOffsetY);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);