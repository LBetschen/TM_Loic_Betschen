export class levelButtons{
    constructor(game){
        this.buttonAudio=new Audio();
        this.buttonAudio.src=document.getElementById("buttonAudio").src;
        this.buttonAudio.playing=false;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;

        this.buttonlvl1 =  new Image();
        this.buttonlvl1.src = document.getElementById("buttonUp").src;
        this.buttonlvl1.down="buttonDown";
        this.buttonlvl1.up="buttonUp";
        this.buttonlvl1.target="../Level_1/level_1.html";
        this.buttonlvl1.height=this.gameWidth/20;
        this.buttonlvl1.width=this.gameWidth/20;
        this.buttonlvl1.relativePositionX=6;
        this.buttonlvl1.relativePositionY=4.5;
        this.buttonlvl1.position={
            x:this.gameWidth/this.buttonlvl1.relativePositionX,
            y:this.gameHeight/this.buttonlvl1.relativePositionY
        }

        this.buttonlvl2 =  new Image();
        this.buttonlvl2.src = document.getElementById("buttonUp").src;
        this.buttonlvl2.down="buttonDown";
        this.buttonlvl2.up="buttonUp";
        this.buttonlvl2.target="../Level_2/level_2.html";
        this.buttonlvl2.height=this.gameWidth/20;
        this.buttonlvl2.width=this.gameWidth/20;
        this.buttonlvl2.relativePositionX=1.85;
        this.buttonlvl2.relativePositionY=4.5;
        this.buttonlvl2.position={
            x:this.gameWidth/this.buttonlvl2.relativePositionX,
            y:this.gameHeight/this.buttonlvl2.relativePositionY
        }

        this.buttonlvl3 =  new Image();
        this.buttonlvl3.src = document.getElementById("buttonUp").src;
        this.buttonlvl3.down="buttonDown";
        this.buttonlvl3.up="buttonUp";
        this.buttonlvl3.target="../Level_3/level_3.html";
        this.buttonlvl3.height=this.gameWidth/20;
        this.buttonlvl3.width=this.gameWidth/20;
        this.buttonlvl3.relativePositionX=1.4;
        this.buttonlvl3.relativePositionY=4.5;
        this.buttonlvl3.position={
            x:this.gameWidth/this.buttonlvl3.relativePositionX,
            y:this.gameHeight/this.buttonlvl3.relativePositionY
        }

        this.buttonlvl4=  new Image();
        this.buttonlvl4.src = document.getElementById("buttonUp").src;
        this.buttonlvl4.down="buttonDown";
        this.buttonlvl4.up="buttonUp";
        this.buttonlvl4.target="../Level_4/level_4.html";
        this.buttonlvl4.height=this.gameWidth/20;
        this.buttonlvl4.width=this.gameWidth/20;
        this.buttonlvl4.relativePositionX=4;
        this.buttonlvl4.relativePositionY=1.75;
        this.buttonlvl4.position={
            x:this.gameWidth/this.buttonlvl4.relativePositionX,
            y:this.gameHeight/this.buttonlvl4.relativePositionY
        }

        this.buttonlvl5=  new Image();
        this.buttonlvl5.src = document.getElementById("buttonUp").src;
        this.buttonlvl5.down="buttonDown";
        this.buttonlvl5.up="buttonUp";
        this.buttonlvl15target="../Level_5/level_5.html";
        this.buttonlvl5.height=this.gameWidth/20;
        this.buttonlvl5.width=this.gameWidth/20;
        this.buttonlvl5.relativePositionX=1.95;
        this.buttonlvl5.relativePositionY=2;
        this.buttonlvl5.position={
            x:this.gameWidth/this.buttonlvl5.relativePositionX,
            y:this.gameHeight/this.buttonlvl5.relativePositionY
        }

        this.buttonlvl6=  new Image();
        this.buttonlvl6.src = document.getElementById("buttonUp").src;
        this.buttonlvl6.down="buttonDown";
        this.buttonlvl6.up="buttonUp";
        this.buttonlvl6.target="../Level_6/level_6.html";
        this.buttonlvl6.height=this.gameWidth/20;   
        this.buttonlvl6.width=this.gameWidth/20;
        this.buttonlvl6.relativePositionX=1.15;
        this.buttonlvl6.relativePositionY=1.45;
        this.buttonlvl6.position={
            x:this.gameWidth/this.buttonlvl6.relativePositionX,
            y:this.gameHeight/this.buttonlvl6.relativePositionY
        }

        this.buttons=[
            this.buttonlvl1,
            this.buttonlvl2,
            this.buttonlvl3,
            this.buttonlvl4,
            this.buttonlvl5,
            this.buttonlvl6
        ];

    }

    update(deltaTime,GameWidth,GameHeight,map,game){
        this.ratio=this.gameWidth/map.width;
        
        this.buttons.forEach((object)=>{
            object.position.x=map.width/object.relativePositionX +map.offsetX;
            object.position.y=map.height/object.relativePositionY+GameHeight/10;
            object.height=this.gameWidth/20/this.ratio;
            object.width=this.gameWidth/20/this.ratio;
        });

        var c= game.playerProgress.getCookie("soundVolume",false);
        this.buttonAudio.volume=c[2];
             
    }
    
    draw(ctx){
        this.buttons.forEach((object)=>{
            ctx.drawImage(object,object.position.x,object.position.y,object.width,object.width);
        });
    }

    toggleButton(mouseX,mouseY){

        this.buttons.forEach((object)=>{
            if(mouseX>=object.position.x && 
                mouseX <= object.position.x+object.width &&
                mouseY >= object.position.y &&
                mouseY <= object.position.y+object.height)
                {    
                    object.src=document.getElementById(object.down).src;
                    if(!this.buttonAudio.playing){
                        this.buttonAudio.play();
                        this.buttonAudio.playing=true;
                    }
                }else{
                    object.src = document.getElementById(object.up).src;
                    this.buttonAudio.playing=false;
                }
                console.log(this.buttonAudio.playing);
        });
    }

    toggleLevels(mouseX,mouseY){

        this.buttons.forEach((object)=>{
            if(mouseX>=object.position.x && 
                mouseX <= object.position.x+object.width &&
                mouseY >= object.position.y &&
                mouseY <= object.position.y+object.height)
                { 
                    window.location=object.target;
                }
        });
    }
}