import { PlayerInfo } from "../Assets/playerInfo.js";
export class ReloadButton{
    constructor(game){
        this.button =  new Image();
        this.button.src = document.getElementById("reloadButton").src;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.height=this.button.naturalHeight/2;
        this.width=this.button.naturalWidth/2;
        
        this.position={
            x:this.gameWidth/5,
            y:this.gameHeight/20
        }
    }

    update(deltaTime,GameWidth,GameHeight){
        this.position.x=this.gameWidth/1.15;
        this.position.y=this.gameHeight/20;
        this.height=this.button.naturalHeight/2;
        this.width=this.button.naturalWidth/2;
        
    }

    draw(ctx){
            ctx.drawImage(this.button,this.position.x,this.position.y,this.width,this.height);
    }

    toggleButton(mouseX,mouseY,game){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
               
                this.button.src=document.getElementById("reloadButtonDown").src;
            }else{
                this.button.src = document.getElementById("reloadButton").src;
            }
    }

    
    toggleReload(mouseX,mouseY,game){
        if(mouseX>=this.position.x && 
            mouseX <= this.position.x+this.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y+this.height)
            { 
               
                location.reload();
                var c=game.playerInfo.getCookie("level1score",game.info);
                game.playerInfo.changeCookie("level1score",game.info,c[]),
                
            }

    }

    
}