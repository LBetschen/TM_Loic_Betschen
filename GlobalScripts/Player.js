var t;
var i=1;

export class Player{
    constructor(game){
        this.hero = new Image();
        this.hero.src=document.getElementById("idlePlayerLeft").src;
        
        this.hero.width=80;
        this.hero.height=165;
        this.columns=5;
        this.hero.idle=true;
        
        this.jumpAudio=new Audio();
        this.jumpAudio.src=document.getElementById("jumpAudio").src;
    
        this.doubleJumpAudio=new Audio();
        this.doubleJumpAudio.src=document.getElementById("jumpAudio").src;
        
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.constGameHeight=game.gameHeight;
        this.constGameWidth=game.gameWidth;
        this.ratio=this.constGameHeight/this.gameHeight;

        this.height=this.constGameHeight/5;
        this.width=this.constGameHeight/5;

        this.position={
            x: 200,
            y: 200
        }
        
        this.controller={
            right:false,
            left:false
        }

        this.Ydirection="down";
        this.Xdirection="idle";
        
        this.offsetX=0;
        this.offsetY=0;


        this.x_maxSpeed=this.gameWidth/140;
        this.x_speed = 0;
        this.y_speed =0;
        
        this.jumping=false;
        this.doubleJump=false;
        this.friction=1;
        this.jumpAnimation=false;

        var c= game.playerProgress.getCookie("soundVolume",false);
        this.jumpAudio.volume=c[2];
        this.doubleJumpAudio.volume=c[2];

       
    }
    
    start(){
       this.playerAnimation();        
    
    }
    draw(ctx){

        if(this.jumping==true && i==5 && this.jumpAnimation==true){
            
            this.jumpAnimation=false;
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("idlePlayerLeft").src;
            }else{
                this.hero.src=document.getElementById("idlePlayerRight").src;
            }
        }
        
        var x = i * this.hero.width;
        var y = Math.floor(i / this.columns) * this.hero.height;
        ctx.drawImage(this.hero,x,0,this.hero.width,this.hero.height,this.position.x,this.position.y,this.hero.width,this.hero.height);
                    
    }
    
    update(deltaTime,GameWidth,GameHeight,game){

        var c= game.playerProgress.getCookie("soundVolume",false);
        this.jumpAudio.volume=c[2];
        this.doubleJumpAudio.volume=c[2];
        
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        this.ratio=this.constGameHeight/GameHeight;

        this.height=this.constGameHeight/10/this.ratio;
        this.width=this.constGameHeight/10/this.ratio;

        this.x_maxSpeed=GameWidth/200;
        this.y_speed+=GameHeight/1000;

        
        for(var k=0;k<game.level1Map.map.length;k++){

            if(game.level1Map.map[k]==0 || game.level1Map.map[k]==30 || game.level1Map.map[k]==31){
            }else{

                var x=(k%game.level1Map.columns)*game.level1Map.tileWidth + this.offsetX;
                var y=Math.floor(k/game.level1Map.columns)*game.level1Map.tileWidth + this.offsetY;  

                if(this.position.y+this.y_speed+this.hero.height>y+game.level1Map.tileHeight/5 && this.Ydirection=="down" && this.position.x+this.hero.width>x && this.position.x<x+game.level1Map.tileWidth){
                    if(y-game.level1Map.tileHeight>this.position.y){
                        this.position.y=y+game.level1Map.tileHeight/5-this.hero.height;
                        this.y_speed=0;
                    }
                    this.jumping=false;
                    this.doubleJump=false;
                }
                
                if(this.position.x+this.x_speed<x+game.level1Map.tileWidth && this.Xdirection=="left" && this.position.x>x && this.position.x< x+game.level1Map.tileWidth){
                    if(this.position.y>y && this.position.y<y+game.level1Map.tileHeight || this.position.y+game.level1Map.tileHeight>y && this.position.y+game.level1Map.tileHeight<y+game.level1Map.tileHeight){
                        this.position.x=x+game.level1Map.tileWidth;
                        this.x_speed=0;
                    }
                }
    
                if(this.position.x+this.x_speed+this.hero.width>x && this.Xdirection=="right" &&  this.position.x<x && this.position.x> x-game.level1Map.tileWidth){
                    if(this.position.y>y && this.position.y<y+game.level1Map.tileHeight || this.position.y+game.level1Map.tileHeight>y && this.position.y+game.level1Map.tileHeight<y+game.level1Map.tileHeight){
                        this.position.x=x-this.hero.width;
                        this.x_speed=0;
                    }
                }
            }
        }

        



        this.position.x+=this.x_speed;
        this.position.y+=this.y_speed;
       
        this.x_speed*=this.friction;

        if(this.x_speed<0.5 && this.x_speed>-0.5 && this.jumping==false && this.doubleJump==false){
           this.Xdirection="idle";    
            
           if(this.Xdirection=="right"){
                this.hero.src=document.getElementById("idlePlayerLeft").src;
            }else{
                this.hero.src=document.getElementById("idlePlayerRight").src;

            }
            
        }else if(this.jumping==true && this.jumpAnimation==true){
            
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("playerJumpingLeft").src;
            }else{
                this.hero.src=document.getElementById("playerJumpingRight").src;

            }
        }
        if(this.y_speed>0.5){
            this.Ydirection="down";
        }else if(this.y_speed<-0.5){
            this.Ydirection="up";
        }

       
        if(this.position.y >GameHeight){
            game.gameState=4;
        }

        
        /*if(this.offsetX>0){
            this.offsetX=0;
            //this.position.x-=this.x_speed;
        }else if(this.position.x>this.gameWidth/2+this.hero.width/2){
            this.offsetX+=this.x_speed;
        }else{
            //this.position.x-=this.x_speed;
        }
        
        /*if(this.offsetY>0){
            this.offsetY=0;
            this.position.y-=this.y_speed;
        }else if(this.position.y>this.gameHeight/2+this.hero.height/2){
            this.offsetY+=this.y_speed;
        }else{
            this.position.y-=this.y_speed;
        }*/

        
        ;

        if(this.position.x+this.hero.width>GameWidth){
            this.position.x = GameWidth-this.hero.width;
        }

        if(this.position.y<0){
            this.position.y=0;
        }
        
        if(this.position.x<0 ){
            this.position.x=0;
        }    
    }

    moveLeft(){
        
        this.Xdirection="left"
        this.controller.left=true;
        this.friction=1;
        this.x_speed=-this.x_maxSpeed;
        if(!this.jumping){
            this.hero.src=document.getElementById("runningLeft").src;

        }
    }
    
    moveRight(){
        
        this.Xdirection="right"
        this.controller.right=true;
        this.friction=1;
        this.x_speed=this.x_maxSpeed;
        if(!this.jumping){
            this.hero.src=document.getElementById("runningRight").src;
            
        }
    }

    jump(GameHeight){
        this.Ydirection="up"
        if(this.jumping==false){
            this.y_speed-=this.gameHeight/50; 
            this.jumping=true;
            i=0;
            this.jumpAudio.play();
            this.jumpAnimation=true;
            
            
        }else if(this.jumping==true && this.doubleJump==false){
            this.y_speed-=this.gameHeight/50; 
            this.doubleJump=true;
            
            this.doubleJumpAudio.play();
            i=0;
            this.jumpAnimation=true;
            
        }
        if(this.Xdirection=="left"){
            this.hero.src=document.getElementById("playerJumpingLeft").src;
            
        }else{
            this.hero.src=document.getElementById("playerJumpingRight").src;
            
        }
        let timeout;
        timeout=setTimeout(function(){
            this.hero.src=document.getElementById("playerIdleLeft").src;
        },1000,this.hero.src);
 
    }
    
    
    stopRight(){
        this.controller.right=false;
        if(this.controller.left==false){
            this.friction=0.9; 
        }
        
    }
    stopLeft(){
        this.controller.left=false;
        if(this.controller.right==false){
            this.friction=0.9; 
        }
    }
    
    playerAnimation(){
        t = setInterval(function () {      
            if (i == 5) {
                 i = 0;
            } else {
                 i++;
            }
        }, 175);       
    }
}