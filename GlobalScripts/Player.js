var t;
var i=1;

export class Player{
    constructor(game){
        this.hero = new Image();
        this.hero.src=document.getElementById("idlePlayerLeft").src;
        
        this.hero.width=80;
        this.hero.height=165;
        this.columns=5;
        
        this.hero.lives=3;
        this.hero.ammo=10;
        
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

        this.bullet=new Image();
        this.bullet.src=document.getElementById("fireball").src;
        this.bullet.height=40;
        this.bullet.width=40;
        this.bullet.speed=20;
        this.bullets=[];
        this.b=0;
        

        this.Ydirection="down";
        this.Xdirection="left";
        
        this.offsetX=0;
        this.offsetY=0;


        this.x_maxSpeed=this.gameWidth/140;
        this.x_speed = 0;
        this.y_speed =0;
        
        this.shooting=false;
        this.moving=false;
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

        
        
        var x = i * this.hero.width;
        var y = Math.floor(i / this.columns) * this.hero.height;
        ctx.drawImage(this.hero,x,0,this.hero.width,this.hero.height,this.position.x,this.position.y,this.hero.width,this.hero.height);
        for(var k=0;k<this.bullets.length;k++){
            ctx.drawImage(this.bullet,this.bullets[k].x,this.bullets[k].y,this.bullet.width,this.bullet.height);
        }

        
        if(x>320){
            if(this.shooting==true){
                this.shooting=false;
            }
            if(this.jumping==true){
            this.jumping=false;
            }
            if(this.doubleJump==true){
                this.doubleJump=false;
            }
        }
       
        
                    
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
        
        for(var k=0;k<this.bullets.length;k++){
            if(this.offsetX==0 ){
                this.bullets[k].x+=this.bullet.speed*this.bullets[k].dir;//+this.offsetX;
            }else{
                this.bullets[k].x+=this.bullet.speed*this.bullets[k].dir-this.x_speed;//+this.offsetX;
            }

        
        }
        
        
        
        for(var k=0;k<game.map.map.length;k++){
            
            if(game.map.map[k]==0 || game.map.map[k]==30 || game.map.map[k]==31){
            }else{
                
                var x=(k%game.map.columns)*game.map.tileWidth + this.offsetX;
                var y=Math.floor(k/game.map.columns)*game.map.tileWidth ;  
                
                if(this.position.y+this.y_speed+this.hero.height>y+game.map.tileHeight/5 && this.Ydirection=="down" && this.position.x+this.hero.width>x && this.position.x<x+game.map.tileWidth){
                    if(y-game.map.tileHeight>this.position.y){
                        this.position.y=y+game.map.tileHeight/5-this.hero.height;
                        this.y_speed=0;
                    }
                    this.jumping=false;
                    this.doubleJump=false;
                }
                
                if(this.position.x+this.x_speed<x+game.map.tileWidth && this.Xdirection=="left" && this.position.x>x && this.position.x< x+game.map.tileWidth){
                    if(this.position.y>y && this.position.y<y+game.map.tileHeight || this.position.y+game.map.tileHeight>y && this.position.y+game.map.tileHeight<y+game.map.tileHeight){
                        if(this.offsetX==0){
                            this.position.x=x+game.map.tileWidth;
                            this.x_speed=0;
                        }else{
                            this.x_speed=0;
                        }
                    }
                }
                
                if(this.position.x+this.x_speed+this.hero.width>x && this.Xdirection=="right" &&  this.position.x<x && this.position.x> x-game.map.tileWidth){
                    if(this.position.y>y && this.position.y<y+game.map.tileHeight || this.position.y+game.map.tileHeight>y && this.position.y+game.map.tileHeight<y+game.map.tileHeight){
                        if(this.offsetX==0){
                            this.position.x=x-this.hero.width;
                            this.x_speed=0;
                        }else{
                            this.x_speed=0;
                        }
                    }
                }

                for(var j=0;j<this.bullets.length;j++){
                   
                    
                    

                    
                    if(this.bullets[j].dir==-1 && this.bullets[j].x<x+game.map.tileWidth && x<this.bullets[j].x &&
                         this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight){
                      
                        this.bullets.splice(j,1);
                    }else if(this.bullets[j].dir==1 && this.bullets[j].x+this.bullet.width>x &&this.bullets[j].x<x+game.map.tileWidth && this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight){
                        
                        this.bullets.splice(j,1);
                    }
                }
            }

            
        }
        var index = 0;
        for(var k=0;k<game.interactiveObjects.coinMap.length;k++){
            
            var value = game.interactiveObjects.coinMap[k];
            if (value == 1) {
                if (game.interactiveObjects.coins[index] == 1) {
                    var x = (k % game.interactiveObjects.columns) * game.interactiveObjects.width+this.offsetX;
                    var y = Math.floor(k / game.interactiveObjects.columns) * game.interactiveObjects.height;

                    
                    if(this.Ydirection=="down" && this.position.y+this.y_speed+this.hero.height>y+game.interactiveObjects.height  && this.position.x+this.hero.width>x && this.position.x<x+game.interactiveObjects.width){
                        if(y-game.interactiveObjects.height>this.position.y){
                            game.interactiveObjects.score++;
                            game.interactiveObjects.coins[index] = 0;
                            game.playerProgress.changeCookie("level1score", game.interactiveObjects.score);
                            game.playerProgress.changeCookie("level1coins", game.interactiveObjects.coins);
                            game.interactiveObjects.coinAudio.play();
                            
                        
                        }
                        
                    }
                    if(this.Ydirection=="up" && this.position.y+this.y_speed+this.hero.height>y+game.interactiveObjects.height  && this.position.x+this.hero.width>x && this.position.x<x+game.interactiveObjects.width){
                        if(y-game.interactiveObjects.height>this.position.y){
                            game.interactiveObjects.score++;
                            game.interactiveObjects.coins[index] = 0;
                            game.playerProgress.changeCookie("level1score", game.interactiveObjects.score);
                            game.playerProgress.changeCookie("level1coins", game.interactiveObjects.coins);
                            game.interactiveObjects.coinAudio.play();
                           

                        }
                        
                    }
                    
                    if(this.Xdirection=="left" && this.position.x+this.x_speed<x+game.interactiveObjects.width && this.position.x>x && this.position.x< x+game.interactiveObjects.width){
                        if(this.position.y>y && this.position.y<y+game.interactiveObjects.height || this.position.y+game.interactiveObjects.height>y && this.position.y+game.interactiveObjects.height<y+game.interactiveObjects.height){
                            game.interactiveObjects.score++;
                            game.interactiveObjects.coins[index] = 0;
                            game.playerProgress.changeCookie("level1score", game.interactiveObjects.score);
                            game.playerProgress.changeCookie("level1coins", game.interactiveObjects.coins);
                            game.interactiveObjects.coinAudio.play();
                            

                        }
                    }
                    
                    if(this.Xdirection=="right" && this.position.x+this.x_speed+this.hero.width>x  &&  this.position.x<x && this.position.x> x-game.interactiveObjects.width){
                        if(this.position.y>y && this.position.y<y+game.interactiveObjects.height || this.position.y+game.interactiveObjects.height>y && this.position.y+game.interactiveObjects.height<y+game.interactiveObjects.height){
                            game.interactiveObjects.score++;
                            game.interactiveObjects.coins[index] = 0;
                            game.playerProgress.changeCookie("level1score", game.interactiveObjects.score);
                            game.playerProgress.changeCookie("level1coins", game.interactiveObjects.coins);
                            game.interactiveObjects.coinAudio.play();
                            

                        }
                    }  
                }
                index++;
            }
        }
        var cindex = 0;
        for(var k=0;k<game.interactiveObjects.coinMap.length;k++){
            
            var value = game.interactiveObjects.coinMap[k];
            if (value == 1) {
                if (game.interactiveObjects.checkpoints[cindex] == 1) {
                    var x = (k % game.interactiveObjects.columns) * game.interactiveObjects.width+this.offsetX;
                    var y = Math.floor(k / game.interactiveObjects.columns) * game.interactiveObjects.height;

                    
                    if(this.Ydirection=="down" && this.position.y+this.y_speed+this.hero.height>y+game.interactiveObjects.height  && this.position.x+this.hero.width>x && this.position.x<x+game.interactiveObjects.width){
                        if(y-game.interactiveObjects.height>this.position.y){
                            game.interactiveObjects.checkpoints[cindex] = 0;
                            game.playerProgress.changeCookie("level1Checkpoints", game.interactiveObjects.checkpoints);
                            
                        
                        }
                        
                    }
                    if(this.Ydirection=="up" && this.position.y+this.y_speed+this.hero.height>y+game.interactiveObjects.height  && this.position.x+this.hero.width>x && this.position.x<x+game.interactiveObjects.width){
                        if(y-game.interactiveObjects.height>this.position.y){
                            game.interactiveObjects.checkpoints[cindex] = 0;
                            game.playerProgress.changeCookie("level1Checkpoints", game.interactiveObjects.checkpoints);
                           

                        }
                        
                    }
                    
                    if(this.Xdirection=="left" && this.position.x+this.x_speed<x+game.interactiveObjects.width && this.position.x>x && this.position.x< x+game.interactiveObjects.width){
                        if(this.position.y>y && this.position.y<y+game.interactiveObjects.height || this.position.y+game.interactiveObjects.height>y && this.position.y+game.interactiveObjects.height<y+game.interactiveObjects.height){
                            game.interactiveObjects.checkpoints[cindex] = 0;
                            game.playerProgress.changeCookie("level1Checkpoints", game.interactiveObjects.checkpoints);
                            

                        }
                    }
                    
                    if(this.Xdirection=="right" && this.position.x+this.x_speed+this.hero.width>x  &&  this.position.x<x && this.position.x> x-game.interactiveObjects.width){
                        if(this.position.y>y && this.position.y<y+game.interactiveObjects.height || this.position.y+game.interactiveObjects.height>y && this.position.y+game.interactiveObjects.height<y+game.interactiveObjects.height){
                            game.interactiveObjects.checkpoints[cindex] = 0;
                            game.playerProgress.changeCookie("level1Checkpoints", game.interactiveObjects.checkpoints);
                            

                        }
                    }  
                }
                cindex++;
            }
        }
       
           
           
           
           if(this.offsetX>=0 ){
                this.offsetX=0;
                this.position.x+=this.x_speed;
            }else if(this.offsetX<=-game.map.maxMapWidth+this.gameWidth+this.hero.width/2){
                this.offsetX=-game.map.maxMapWidth+this.gameWidth+this.hero.width/2;
                this.position.x+=this.x_speed;
           }
           if(this.position.x>this.gameWidth/2-this.hero.width/2 && this.offsetX>=0){
                this.offsetX-=this.x_speed;
           }else if(this.position.x<this.gameWidth/2-this.hero.width/2 && this.offsetX<=-game.map.maxMapWidth+this.gameWidth+this.hero.width/2){
                this.offsetX-=this.x_speed;
           }
           if(this.offsetX>-game.map.maxMapWidth+this.gameWidth+this.hero.width/2 && this.offsetX<0 ){
                this.offsetX-=this.x_speed;
           }

           
           
        
        
        this.position.y+=this.y_speed;
        this.x_speed*=this.friction;



        if(this.jumping==true){
            
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("playerJumpingLeft").src;
            }else{
                this.hero.src=document.getElementById("playerJumpingRight").src;

            }
        }else if(this.shooting==true){
            
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("shootingLeft").src;
            }else{
                this.hero.src=document.getElementById("shootingRight").src;

            }
        }else if(this.moving==true){
            
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("runningLeft").src;
            }else{
                this.hero.src=document.getElementById("runningRight").src;

            }

        }else{
            if(this.Xdirection=="left"){
                this.hero.src=document.getElementById("idlePlayerLeft").src;
            }else if(this.Xdirection=="right"){
                this.hero.src=document.getElementById("idlePlayerRight").src;
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
        if(this.position.x+this.hero.width>GameWidth){
            this.position.x = GameWidth-this.hero.width;
        }
        if(this.position.y<0){
            this.position.y=0;
        }
        if(this.position.x<0 ){
            this.position.x=0;
        }    

       
        if(this.x_speed>0.5 || this.x_speed<-0.5 ) {
                this.moving=true;
        }else{
            this.moving=false;
        }
    }

    moveLeft(){
        
        this.Xdirection="left"
        this.controller.left=true;
        this.friction=1;
        this.x_speed=-this.x_maxSpeed;
       
    }
    
    moveRight(){
        
        this.Xdirection="right"
        this.controller.right=true;
        this.friction=1;
        this.x_speed=this.x_maxSpeed;
        
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

    fire(){
        
        let direction=1;
        let x_bullet=0;
        this.shooting=true;
        i=0;
        if(this.Xdirection=="left"){
            direction=-1;
            x_bullet=this.position.x-this.bullet.width;

        }else{
            direction=1;
            x_bullet=this.position.x+this.hero.width;
        }
        this.fireball={
            x:x_bullet,
            y:this.position.y+this.hero.height/3,
            dir:direction

        }
        this.bullets.push(this.fireball);
        this.b++;
        

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