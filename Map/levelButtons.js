export class levelButtons{
    constructor(game){
        this.buttonAudio=new Audio();
        this.buttonAudio.src=document.getElementById("buttonAudio").src;

        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;

        this.levelLockedUp="levelLocked";
        this.levelLockedDown="levelLockedDown";
        this.lockedAnimation=false;

        
    
        
        this.buttonlvl1 =  new Image();
        this.buttonlvl1.down="level1Down";
        this.buttonlvl1.up="level1";
        this.buttonlvl1.src = document.getElementById(this.buttonlvl1.up).src;
        this.buttonlvl1.target="../Level_1/level_1.html";
        this.buttonlvl1.height=this.gameWidth/20;
        this.buttonlvl1.width=this.gameWidth/20;
        this.buttonlvl1.relativePositionX=6;
        this.buttonlvl1.relativePositionY=4.5;
        this.buttonlvl1.position={
            x:this.gameWidth/this.buttonlvl1.relativePositionX,
            y:this.gameHeight/this.buttonlvl1.relativePositionY
        }
        this.buttonlvl1.audioPlaying=false;
        this.buttonlvl1.locked=game.playerProgress.getCookie("level1locked",false)[2];

        this.buttonlvl2 =  new Image();
        this.buttonlvl2.down="level2Down";
        this.buttonlvl2.up="level2";
        this.buttonlvl2.locked=game.playerProgress.getCookie("level2locked",false)[2];
        this.buttonlvl2.src = document.getElementById(this.buttonlvl2.up).src;
        this.buttonlvl2.target="../Level_2/level_2.html";
        this.buttonlvl2.height=this.gameWidth/20;
        this.buttonlvl2.width=this.gameWidth/20;
        this.buttonlvl2.relativePositionX=4;
        this.buttonlvl2.relativePositionY=1.75;
        this.buttonlvl2.position={
            x:this.gameWidth/this.buttonlvl2.relativePositionX,
            y:this.gameHeight/this.buttonlvl2.relativePositionY
        }
        this.buttonlvl2.audioPlaying=false;

        this.buttonlvl3 =  new Image();
        this.buttonlvl3.down="level3Down";
        this.buttonlvl3.up="level3";
        this.buttonlvl3.src = document.getElementById(this.buttonlvl3.up).src;
        this.buttonlvl3.target="../Level_3/level_3.html";
        this.buttonlvl3.height=this.gameWidth/20;
        this.buttonlvl3.width=this.gameWidth/20;
        this.buttonlvl3.relativePositionX=1.95;
        this.buttonlvl3.relativePositionY=2;
        this.buttonlvl3.position={
            x:this.gameWidth/this.buttonlvl3.relativePositionX,
            y:this.gameHeight/this.buttonlvl3.relativePositionY
        }
        this.buttonlvl3.audioPlaying=false;
        this.buttonlvl3.locked=game.playerProgress.getCookie("level3locked",false)[2];

        this.buttonlvl4=  new Image();
        this.buttonlvl4.down="level4Down";
        this.buttonlvl4.up="level4";
        this.buttonlvl4.src = document.getElementById(this.buttonlvl4.up).src;
        this.buttonlvl4.target="../Level_4/level_4.html";
        this.buttonlvl4.height=this.gameWidth/20;
        this.buttonlvl4.width=this.gameWidth/20;
        this.buttonlvl4.relativePositionX=1.85;
        this.buttonlvl4.relativePositionY=4.5;
        this.buttonlvl4.position={
            x:this.gameWidth/this.buttonlvl4.relativePositionX,
            y:this.gameHeight/this.buttonlvl4.relativePositionY
        }
        this.buttonlvl4.audioPlaying=false;
        this.buttonlvl4.locked=game.playerProgress.getCookie("level4locked",false)[2];

        this.buttonlvl5=  new Image();
        this.buttonlvl5.down="level5Down";
        this.buttonlvl5.up="level5";
        this.buttonlvl5.src = document.getElementById(this.buttonlvl5.up).src;
        this.buttonlvl5.target="../Level_5/level_5.html";
        this.buttonlvl5.height=this.gameWidth/20;
        this.buttonlvl5.width=this.gameWidth/20;
        this.buttonlvl5.relativePositionX=1.4;
        this.buttonlvl5.relativePositionY=4.5;
        this.buttonlvl5.position={
            x:this.gameWidth/this.buttonlvl5.relativePositionX,
            y:this.gameHeight/this.buttonlvl5.relativePositionY
        }
        this.buttonlvl5.audioPlaying=false;
        this.buttonlvl5.locked=game.playerProgress.getCookie("level5locked",false)[2];

        this.buttonlvl6=  new Image();
        this.buttonlvl6.down="level6Down";
        this.buttonlvl6.up="level6";
        this.buttonlvl6.src = document.getElementById(this.buttonlvl6.up).src;
        this.buttonlvl6.target="../Level_6/level_6.html";
        this.buttonlvl6.height=this.gameWidth/20;   
        this.buttonlvl6.width=this.gameWidth/20;
        this.buttonlvl6.relativePositionX=1.15;
        this.buttonlvl6.relativePositionY=1.45;
        this.buttonlvl6.position={
            x:this.gameWidth/this.buttonlvl6.relativePositionX,
            y:this.gameHeight/this.buttonlvl6.relativePositionY
        }
        this.buttonlvl6.audioPlaying=false;
        this.buttonlvl6.locked=game.playerProgress.getCookie("level6locked",false)[2];

        this.buttons=[
            this.buttonlvl1,
            this.buttonlvl2,
            this.buttonlvl3,
            this.buttonlvl4,
            this.buttonlvl5,
            this.buttonlvl6
        ];
        var c =game.playerProgress.getCookie("level1finished",false);
        for(var i=2;i<7;i++){
            
                if(i<6 && c[2]==1){
                    game.playerProgress.changeCookie("level"+i+"locked",1);
                }
            
            c=game.playerProgress.getCookie("level"+i+"finished",false);
            
        }
        this.buttons.forEach((object)=>{
            if(object.locked==0){
                object.src=document.getElementById(this.levelLockedUp).src;
            }
        });


    }

    update(deltaTime,GameWidth,GameHeight,map,game){


        this.ratio=this.gameWidth/map.width;
        
        this.buttons.forEach((object)=>{
            object.position.x=map.width/object.relativePositionX +map.offsetX;
            object.position.y=map.height/object.relativePositionY+GameHeight/10;
            object.height=GameWidth/20;
            object.width=GameWidth/20;
            
        });
        
        var c= game.playerProgress.getCookie("soundVolume",false);
        this.buttonAudio.volume=c[2];

        c =game.playerProgress.getCookie("level1finished",false);
        for(var i=2;i<7;i++){
            
                if(i<6 && c[2]==1){
                    game.playerProgress.changeCookie("level"+i+"locked",1);
                }
            
            c=game.playerProgress.getCookie("level"+i+"finished",false);
            
        }
        
        
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
                    if(object.locked==0){
                        object.src=document.getElementById(this.levelLockedDown).src;
                       
                    }else{
                        object.src=document.getElementById(object.down).src;
                    }    
                    if(!object.audioPlaying){
                        this.buttonAudio.play();
                        object.audioPlaying=true;
                    }
                }else{
                    if(object.locked==0){
                        object.src=document.getElementById(this.levelLockedUp).src;
                    }else{
                        object.src=document.getElementById(object.up).src;
                    }   
                    
                    object.audioPlaying=false;
                }
                
            });
        }
        
        toggleLevels(mouseX,mouseY,game,ctx,){
            
            this.buttons.forEach((object)=>{
                if(mouseX>=object.position.x && 
                    mouseX <= object.position.x+object.width &&
                    mouseY >= object.position.y &&
                    mouseY <= object.position.y+object.height)
                    {   
                        if(object.locked==1){
                            var timeout;
                            game.gameState=3;
                            
                            timeout=setTimeout(function(){window.location=object.target;},2000);
                        
                        }else{
                            this.lockedAnimation=true;
                        }
                }
        });
    }
    
}