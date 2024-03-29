var i=1;
var t;
var dk=1;
export class Player{
    constructor(game){
        this.hero = new Image();
        this.hero.src=document.getElementById("idlePlayerRight").src;
        this.hero.width=80;
        this.hero.height=165;
        this.hero.ratio=this.hero.height/this.hero.width;
        this.columns=5;
        this.width=game.gameWidth/25;
        this.height=this.width*this.hero.ratio;
        
        var c= game.playerProgress.getCookie("playerLives",false);

        this.hero.lives=c[2];
        
        this.jumpAudio=new Audio();
        this.jumpAudio.src=document.getElementById("jumpAudio").src;
    
        this.doubleJumpAudio=new Audio();
        this.doubleJumpAudio.src=document.getElementById("jumpAudio").src;

        

        this.endLevelAudio=new Audio();
        this.endLevelAudio.src=document.getElementById("mailboxAudio").src;
        
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;

        this.position={
            x: this.gameWidth/8,
            y: this.gameHeight/12*11-this.height
        }
        
        this.controller={
            right:false,
            left:false
        }

        this.bullet=new Image();
        this.bullet.src=document.getElementById("leafball").src;
        this.bullet.height=40;
        this.bullet.width=40;
        this.bullet.speed=1;
        this.bullets=[];
        this.bulletAmmo=5;

        this.Ydirection="down";
        this.Xdirection="right";
        
        this.offsetX=0;
        this.offsetY=0;


        this.x_maxSpeed=game.gameWidth/3500;
        this.x_speed = 0;
        this.y_speed =0;
        
        this.shooting=false;
        this.moving=false;
        this.jumping=false;
        this.doubleJump=false;
        this.friction=1;
        this.jumpAnimation=false;

        c= game.playerProgress.getCookie("soundVolume",false);
        this.jumpAudio.volume=c[2];
        this.doubleJumpAudio.volume=c[2];
        
        this.endLevelAudio.volume=c[2];

       

    }
    
    start(game){
        this.playerAnimation();    
        
    }
    draw(ctx){
        var x = i * this.hero.width;
        
        //ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        
        ctx.drawImage(this.hero,x,0,this.hero.width,this.hero.height,this.position.x,this.position.y,this.width,this.height);//draws player
        for(var k=0;k<this.bullets.length;k++){
            ctx.drawImage(this.bullet,this.bullets[k].x,this.bullets[k].y,this.bullet.width,this.bullet.height);//draws bullets
        }

        if(x>320){                  //stops animation after its played
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
    
    update(deltaTime,GameWidth,GameHeight,game,ctx){
        console.log(this.offsetX);

        var c= game.playerProgress.getCookie("soundVolume",false);//gets volume of audio for jumping
        this.jumpAudio.volume=c[2];
        this.doubleJumpAudio.volume=c[2];
        
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;

        this.width=GameHeight/22;
        this.height=this.width*this.hero.ratio;
        
       
        
        
        
        this.x_maxSpeed=GameWidth/3500;
        this.y_speed+=GameHeight/9000;
        
        for(var k=0;k<this.bullets.length;k++){//moves bullets 
            if(this.offsetX==0 ){
                this.bullets[k].x+=this.bullet.speed*this.bullets[k].dir*deltaTime;
            }else{
                this.bullets[k].x+=this.bullet.speed*this.bullets[k].dir*deltaTime-this.x_speed*deltaTime;
            }
        }
        
        
        
        for(var k=0;k<game.map.map.length;k++){//checks if the player and the bullets are colliding with tiles
            
            if(game.map.map[k]==0 || game.map.map[k]==30 || game.map.map[k]==31 || game.map.map[k]==15 || game.map.map[k]==16){
            }else{
                
                var x=(k%game.map.columns)*game.map.tileWidth + this.offsetX;
                var y=Math.floor(k/game.map.columns)*game.map.tileWidth+game.map.tileHeight/5 ;  
                
                

                if(y+game.map.tileHeight<this.position.y+this.height/5 && x+game.map.tileWidth>this.position.x && x<this.position.x+this.width){//if tile is above player
                        if(this.position.y+this.y_speed>y && this.position.y+this.y_speed<y+game.map.tileHeight){
                            this.position.y=y+game.map.tileHeight;
                            this.y_speed=0;
                           
                        }
                } 

                if(y>this.position.y+this.height/2 && x+game.map.tileWidth>this.position.x && x<this.position.x+this.width){//if tile is under player
                    if(this.position.y+this.height+this.y_speed>y && this.position.y +this.height+this.y_speed<y+game.map.tileHeight){
                        this.position.y=y-this.height;
                        this.y_speed=0;
                        this.jumping=false;
                        this.doubleJump=false;
                    }

                }
                if(x+game.map.tileWidth<this.position.x+this.width/2 && y<this.position.y+this.height&& y+game.map.tileHeight>this.position.y){//if the tile is on the left and not under nor above player
                    if(this.offsetX==0 || this.offsetX<=-game.map.maxMapWidth+GameWidth+this.width/2){
                            if(this.position.x+this.x_speed*deltaTime<x+game.map.tileWidth){
                                this.position.x=x+game.map.tileWidth;
                                this.x_speed=0;
                            }
                            
                        }else{
                            if(this.position.x<x+game.map.tileWidth-this.x_speed*deltaTime){
                                
                                this.offsetX= -(k%game.map.columns)*game.map.tileWidth+this.gameWidth/2-this.width/2-game.map.tileWidth;
            
                                if(this.x_speed <0){
                                    this.x_speed=0;
                                }
                                
                            }
                            
                        }
                        
                        
                    
                }
                if(x>this.position.x+this.width/2 && y<this.position.y+this.height&& y+game.map.tileHeight>this.position.y){//if the tile is on the right and not under nor above player
                    if(this.offsetX==0|| this.offsetX<=-game.map.maxMapWidth+GameWidth+this.width/2){
                            if(this.position.x+this.width+this.x_speed*deltaTime>x ){
                                this.position.x=x-this.width;
                                this.x_speed=0;

                            }
                        }else{
                            if(this.position.x+this.width>x-this.x_speed*deltaTime ){
                                this.offsetX= -(k%game.map.columns)*game.map.tileWidth+this.gameWidth/2-this.width/2+this.width+this.x_maxSpeed*deltaTime;
                                if(this.x_speed >0){
                                    this.x_speed=0;
                                }
                                
                                
                            }
                            


                        }
                        
                    

                } 
                
                
                
                
                

                for(var j=0;j<this.bullets.length;j++){
                   
                    if(this.bullets[j].dir==-1 && this.bullets[j].x<x+game.map.tileWidth && x<this.bullets[j].x &&
                         this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight){
                      
                        this.bullets.splice(j,1);
                    }else if(this.bullets[j].dir==1 && this.bullets[j].x+this.bullet.width>x &&this.bullets[j].x<x+game.map.tileWidth &&
                         this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight){
                        
                        this.bullets.splice(j,1);
                    }
                }//checks bullet collision with tiles
            }
        }
        
        
        var cindex=0;
        var index=0;
        var eindex=0;
        var hindex=0;
        var tindex=0;
        var pindex=0;
        var hit=false;
        for(var k=0;k<game.interactiveObjects.coinMap.length;k++){//checks if player and bullets are colliding with interactive objects(coins,enemies,chests,checkpoints)
            var value = game.interactiveObjects.coinMap[k];
            hit = false;
            var x;
            if(value==3 ){
                x = (k % game.interactiveObjects.columns) * game.interactiveObjects.width+this.offsetX+game.interactiveObjects.enemie.distance;

            }else{
                 x = (k % game.interactiveObjects.columns) * game.interactiveObjects.width+this.offsetX;
            }
            var y = Math.floor(k / game.interactiveObjects.columns) * game.interactiveObjects.height;

            if(value==4 || value==5){//collision with chests to display text
                if(value==4 || value==5){
                
                    if(x+game.interactiveObjects.trashChest.width>this.position.x && x<this.position.x+this.width
                        && y+game.interactiveObjects.trashChest.height>this.position.y && y<this.position.y+this.height){
                            hit=true;
                    }
                    ctx.font="20px Arial";
                    if(hit==true){
                        switch (value){
                            case 4:
                                if(game.interactiveObjects.trashChests[tindex]==1){
                                    ctx.fillText("Press E to open",x,y-50);
                                }
                                break;
                            case 5:
                                if(game.interactiveObjects.powerChests[pindex]==1){
                                    ctx.fillText("Press E to open",x,y-50);
                                }
                                break;
                            } 
                    }
                    
                    
                }
            }else if(value!=0){//other collisions
                
                     


                if(
                    x+game.interactiveObjects.width>this.position.x+this.width*0.3 
                    && x<this.position.x+this.width*0.7
                    && y+game.interactiveObjects.height*0.75>this.position.y 
                    && y<this.position.y+this.height){
                        hit=true;
                }

                for(var j=0;j<this.bullets.length;j++){//bullet collisions with enemies
       
                    if(this.bullets[j].dir==-1 && this.bullets[j].x<x+game.map.tileWidth && x<this.bullets[j].x &&
                        this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight && value==3 ){
                            if(game.interactiveObjects.enemies[eindex]==1){
                                game.interactiveObjects.enemies[eindex]=0;
                                game.playerProgress.changeCookie("level"+game.level+"Enemies", game.interactiveObjects.enemies);
                                this.bullets.splice(j,1);
                                game.interactiveObjects.enemieDeathAudio.play();
                            }
                   }else if(this.bullets[j].dir==1 && this.bullets[j].x+this.bullet.width>x &&this.bullets[j].x<x+game.map.tileWidth &&
                        this.bullets[j].y+this.bullet.height>y && this.bullets[j].y<y+game.map.tileHeight && value==3 ){
                            if(game.interactiveObjects.enemies[eindex]==1){
                                game.interactiveObjects.enemies[eindex]=0;
                                game.playerProgress.changeCookie("level"+game.level+"Enemies", game.interactiveObjects.enemies);
                                this.bullets.splice(j,1);
                                game.interactiveObjects.enemieDeathAudio.play();
                            }
                   }

                      
                }
                
                if(hit==true){
                    switch (value){
                        case 1:
                            if(game.interactiveObjects.coins[index]==1){//changes score if hit==true
                                game.interactiveObjects.score++;
                                game.interactiveObjects.coins[index] = 0;
                                game.playerProgress.changeCookie("level"+game.level+"score", game.interactiveObjects.score);
                                game.playerProgress.changeCookie("level"+game.level+"coins", game.interactiveObjects.coins);
                                game.interactiveObjects.coinAudio.play();
                            }
                            break;
                        case 2:
                            if(game.interactiveObjects.checkpoints[cindex]==1){//marks checkpoint if hit==true
                                game.interactiveObjects.checkpoints[cindex] = 0;
                                game.playerProgress.changeCookie("level"+game.level+"Checkpoints", game.interactiveObjects.checkpoints);
                                game.interactiveObjects.checkPointAudio.play();       
                            }
                            
                            break;
                        case 3:
                            if(game.interactiveObjects.enemies[eindex]==1){//kills enemie if hit==true
                                game.interactiveObjects.enemies[eindex]=0;
                                game.playerProgress.changeCookie("level"+game.level+"Enemies", game.interactiveObjects.enemies);
                                this.hero.lives--;
                                
                              
                                this.endAnimation(GameWidth,GameHeight,ctx);
                                
                                this.playerRespawn(game);
                                
                                if(this.hero.lives<=0){
                                    game.gameState=4;
                                    
                                }
                            }
                            break;
                        case 6:
                            if(game.interactiveObjects.hearts[hindex]==1){//kills enemie if hit==true
                                game.interactiveObjects.hearts[hindex]=0;
                                game.playerProgress.changeCookie("level"+game.level+"Hearts", game.interactiveObjects.hearts);
                                this.hero.lives++;
                                
        
                            }
                            break;
                        case 7:
                            this.x_speed=0;
                            this.moving=false;
                            game.interactiveObjects.mailBox.src=document.getElementById(game.interactiveObjects.mailBox.open).src;
                            game.gameState=6;

                            game.playerProgress.changeCookie("level"+game.level+"finished",1);
                            
                            game.playerProgress.changeCookie("level"+game.nextLevel+"locked",1);
                            
                            this.endLevelAudio.play();
                            var timeout;
                            timeout=setTimeout(function(){window.location="../Map/map.html"},2000);
                            break;
                         
                        } 
                }
                switch (value){
                    case 1:
                        index++;
                        break;
                    case 2:
                        cindex++;
                        break;
                    case 3:
                        eindex++;
                        break;
                    case 4:
                        tindex++;
                        break;
                    case 5:
                        pindex++;
                        break;
                    case 6:
                        hindex++;
                        break;
                }
                
            }
        }

        
           console.log(this.offsetX);
        if(this.offsetX>=0 ){//moves map and player depending on the pos of the map and the player
            this.offsetX=0;
            this.position.x+=this.x_speed*deltaTime;
        }else if(this.offsetX<=-game.map.maxMapWidth+this.gameWidth+this.width/2){
            this.offsetX=-game.map.maxMapWidth+this.gameWidth+this.width/2;
            this.position.x+=this.x_speed*deltaTime;
        }
        if(this.position.x>this.gameWidth/2-this.width/2 && this.offsetX>=0){
            this.offsetX-=this.x_speed*deltaTime;
            this.position.x=this.gameWidth/2-this.width/2;
        }else if(this.position.x<this.gameWidth/2-this.width/2 && this.offsetX<=-game.map.maxMapWidth+this.gameWidth+this.width/2){
            this.offsetX-=this.x_speed*deltaTime;
            this.position.x=this.gameWidth/2-this.width/2;
        }
        if(this.offsetX>-game.map.maxMapWidth+this.gameWidth+this.width/2 && this.offsetX<0 ){
            this.offsetX-=this.x_speed*deltaTime;
            this.position.x=this.gameWidth/2-this.width/2;
        }
        
        
           
           
        
        
        this.position.y+=this.y_speed*deltaTime;
        this.x_speed*=this.friction;



        if(this.jumping==true){//changes player depending on which direction he is going
            
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

       
        if(this.position.y >3*GameHeight && game.gameState!=7){//checks if player fell in the water
            this.hero.lives--;
            
            
           
            this.playerRespawn(game,ctx);
            if(this.hero.lives<=0){
                game.gameState=4;
            }
        }
        if(this.hero.lives<=0){
            game.gameState=4;
        }

        if(this.position.x+this.width>GameWidth){//limites how far the player can go
            this.position.x = GameWidth-this.width;
        }
        if(this.position.y<0){
            this.position.y=0;
        }
        if(this.position.x<0 ){
            this.position.x=0;
        }    

       
        if(this.x_speed>0.1 || this.x_speed<-0.1 ) {
                this.moving=true;
        }else{
            this.moving=false;
        }
    }
    playerRespawn(game,ctx){
        this.gameState=7;
        this.x_speed=0;
        this.y_speed=0;
        var c= game.playerProgress.getCookie("level"+game.level+"Checkpoints",false);
        var checkpoints=c[2].split(",");
        var k=0;
        var eindex=0;
        var checkPosX=[];
        var checkPosY=[];
        for(var j=0;j<checkpoints.length;j++){
            if(checkpoints[j]==0){
                k++;
            }
        }
        
        if(k==0){//if no checkpoints marked
                this.offsetX=0;
                this.position={
                    x:200,
                    y:200
                }
        }else{
            for(var j=0;j<game.interactiveObjects.coinMap.length;j++){//respawns player depending on the last checkpoint
            var value = game.interactiveObjects.coinMap[j];
            
            
            
            if(value==2){
                if(checkpoints[eindex]==0){
                    var y = Math.floor(j / game.interactiveObjects.columns) * game.interactiveObjects.height-this.height;
                    var x = (j % game.interactiveObjects.columns) * game.interactiveObjects.width;
                    checkPosX.push(x);
                    checkPosY.push(y);
                    
                }
                eindex++
            }
        
            
            }
            console.log(checkPosX);
            for(var j=0;j<k;j++){
                var spawnx=0;
                var spawny=0;
                if(j==0){
                    spawnx=checkPosX[j];
                    spawny=checkPosY[j];
                }else if(spawnx<checkPosX[j]){
                    spawnx=checkPosX[j];
                    spawny=checkPosY[j];
                }
            }
        
            this.offsetX=this.gameWidth/2-spawnx;
            this.position.y=spawny;
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
                this.y_speed-=this.gameHeight/750; 
                this.jumping=true;
                i=0;
                this.jumpAudio.play();
                this.jumpAnimation=true;
                
                
            }else if(this.jumping==true && this.doubleJump==false){
                this.y_speed-=this.gameHeight/800/2; 
                this.doubleJump=true;
                
                this.doubleJumpAudio.play();
                i=0;
                this.jumpAnimation=true;
                
            }

        
      

 
    }
    
    
    stopRight(){
        this.controller.right=false;
        if(this.controller.left==false){
            this.friction=0.8; 
        }
        
    }
    stopLeft(){
        this.controller.left=false;
        if(this.controller.right==false){
            this.friction=0.8; 
        }
    }

    fire(){
        //creates and fires bullets
        let direction=1;
        let x_bullet=0;
        this.shooting=true;
        i=0;
        if(this.bulletAmmo!=0){
            if(this.Xdirection=="left"){
                direction=-1;
                x_bullet=this.position.x-this.bullet.width;
    
            }else{
                direction=1;
                x_bullet=this.position.x+this.width;
            }
            this.fireball={
                x:x_bullet,
                y:this.position.y+this.height/5,
                dir:direction
    
            }
            this.bullets.push(this.fireball);
            console.log(this.bullets[0]);
            this.bulletAmmo--;
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

    openChest(game,ctx){
        //if E is clicked this checks collision between player and the chest than changes score or ammo count and opens chest
        var pindex=0;
        var tindex=0;
        var hit=false;
        for(var k=0;k<game.interactiveObjects.coinMap.length;k++){
            var value = game.interactiveObjects.coinMap[k];
            hit = false;
            
            if(value==4 || value==5){
                var y = Math.floor(k / game.interactiveObjects.columns) * game.interactiveObjects.height;
                var x = (k % game.interactiveObjects.columns) * game.interactiveObjects.width+this.offsetX;
                
                if(this.position.x>x-this.width && this.position.x<x+game.interactiveObjects.width){
                    if(this.position.y>y && this.position.y<y+game.interactiveObjects.height || this.position.y+game.interactiveObjects.height>y && this.position.y+game.interactiveObjects.height<y+game.interactiveObjects.height){
                        hit=true;
                    }
                }           
                
                if(hit==true){
                    
                    switch (value){
                        case 4:
                            if(game.interactiveObjects.trashChests[tindex]==1){
                                game.interactiveObjects.score+=5;    
                                game.playerProgress.changeCookie("level"+game.level+"score", game.interactiveObjects.score);
                                game.interactiveObjects.trashChests[tindex]=0;
                                game.interactiveObjects.coinChestAudio.play();
                            }
                            break;
                        case 5:
                            if(game.interactiveObjects.powerChests[pindex]==1){
                                game.interactiveObjects.powerChests[pindex]=0;
                                this.bulletAmmo+=2;
                                game.interactiveObjects.powerChestAudio.play();
                            }
                            break;
                        
                        } 
                }

                switch (value){
                    case 4:
                        tindex++;
                        break;
                    case 5:
                        pindex++;
                        break;
                    } 
                
                
            }
        }

    }
    endAnimation(GameWidth,GameHeight,ctx){
        var shade=dk/100;
        ctx.fillStyle="rgba(0,0,0,"+shade+")";
        ctx.fillRect(0,0,GameWidth,GameHeight);
        dk++;
    }

    respawnAnimation(GameWidth,GameHeight,ctx){
        var shade=1;
        ctx.fillStyle="rgba(0,0,0,"+shade+")";
        ctx.fillRect(0,0,GameWidth,GameHeight);
        dk++;
    }


    

    
}