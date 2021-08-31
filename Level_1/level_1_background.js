export class Background{
    constructor(game){
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;

        this.controller={
                    right:false,
                    left:false
        }
        this.friction=1;

        this.back=new Image();
        this.back.src=document.getElementById("background").src;
        this.back.position={
            x:0,
            y:game.gameHeight-this.height
        }
        this.back.x_maxSpeed=2;
        this.back.x_speed = 0;


        this.mid=new Image();
        this.mid.src=document.getElementById("mid1").src;
        this.mid.position={
            x:0,
            y:game.gameHeight-this.height
        }
        this.mid.x_maxSpeed=4;
        this.mid.x_speed = 0;
        

        this.front=new Image();
        this.front.src=document.getElementById("front").src;
        this.front.position={
            x:0,
            y:game.gameHeight-this.height
        }
        this.front.x_maxSpeed=8;
        this.front.x_speed = 0;

        
        this.aspect=this.back.naturalHeight/this.back.naturalWidth;
        this.width=game.gameWidth;
        this.height= this.width*this.aspect;

        
        this.cloud1=new Image();
        this.cloud1.src=document.getElementById("cloud1").src;
        this.cloud1.aspect=this.cloud1.naturalHeight/this.cloud1.naturalWidth;
        this.cloud1.width=this.cloud1.naturalWidth;
        this.cloud1.height=this.cloud1.width*this.cloud1.aspect;
        this.cloud1.ratio=this.gameWidth/this.cloud1.width;
        this.cloud1.Y_ratio=50;
        this.cloud1.position={
            x:game.gameWidth/5,
            y:game.gameHeight/this.cloud1.Y_ratio
        }
        this.cloud1.x_maxSpeed=0.5;
        this.cloud1.x_speed = 0;

        
        this.cloud2=new Image();
        this.cloud2.src=document.getElementById("cloud2").src;
        this.cloud2.aspect=this.cloud2.naturalHeight/this.cloud2.naturalWidth;
        this.cloud2.width=this.cloud2.naturalWidth;
        this.cloud2.height=this.cloud2.width*this.cloud2.aspect;
        this.cloud2.ratio=this.gameWidth/this.cloud2.width;
        this.cloud2.Y_ratio=10;
        this.cloud2.position={
            x:game.gameWidth/1.5,
            y:game.gameHeight/this.cloud2.Y_ratio
        }
        this.cloud2.x_maxSpeed=0.5;
        this.cloud2.x_speed = 0;
        
        this.backgroundObjects=[
            this.back,
            this.mid,
            this.front
        ]

        this.backgroundSkyObjects=[
            this.cloud1,
            this.cloud2
        ]

        this.tuto=new Image();
        this.tuto.src=document.getElementById("tuto").src;
        this.tuto.height=this.tuto.naturalHeight/4;
        this.tuto.width=this.tuto.naturalWidth/4;
        this.tuto.position={
            x:this.gameWidth/20,
            y:this.gameHeight/5
        }
        
    }

    update(deltaTime,GameWidth,GameHeight,game){
        
        this.width=GameWidth;
        this.height=this.width*this.aspect;
        this.offsetX=game.player.offsetX;

        this.playerSpeed=game.player.x_speed;

        
        this.tuto.height=this.tuto.naturalHeight/4;
        this.tuto.width=this.tuto.naturalWidth/4;
        this.tuto.position={
            x:this.gameWidth/20+game.player.offsetX,
            y:this.gameHeight/5
        }
        if(this.playerSpeed!=0){

            this.backgroundObjects.forEach((object)=>{
                
                object.position.y=GameHeight-this.height;
                object.position.x+=object.x_speed;
                object.x_speed*=this.friction;
                
                if(object.position.x +  this.width <0 || object.position.x>GameWidth){
                    object.position.x=0;
                }
            });
    
            this.backgroundSkyObjects.forEach((object)=>{
                object.width=GameWidth/object.ratio;
                object.height=object.width*object.aspect;
                
                object.position.x+=object.x_speed;
                object.x_speed*=this.friction;
                object.position.y=GameWidth/object.Y_ratio;
                
                if(object.position.x + object.width <0){
                    object.position.x=GameWidth-object.width;
                }else if(object.position.x>GameWidth){
                    object.position.x=0;
                }
            });
        }

    }

    draw(ctx,GameWidth,GameHeight){
        
        /*this.backgroundSkyObjects.forEach((object)=>{
            ctx.drawImage(object,object.position.x,object.position.y,object.width,object.height);
            ctx.drawImage(object,object.position.x + GameWidth,object.position.y,object.width,object.height);    
            ctx.drawImage(object,object.position.x - GameWidth,object.position.y,object.width,object.height);        
        });
        
        this.backgroundObjects.forEach((object)=>{
            ctx.drawImage(object,object.position.x,object.position.y,this.width,this.height);
            ctx.drawImage(object,object.position.x + this.width,object.position.y,this.width,this.height);    
            ctx.drawImage(object,object.position.x - this.width,object.position.y,this.width,this.height);      
        });*/

        ctx.drawImage(this.tuto,this.tuto.position.x,this.tuto.position.y,this.tuto.width,this.tuto.height);
    }

    moveLeft(){
        this.controller.left=true;
        this.friction=1;
        if(this.offsetX==0 || this.playerSpeed==0){
            this.backgroundObjects.forEach((object)=>{
                object.x_speed=0;
            });
            this.backgroundSkyObjects.forEach((object)=>{
                object.x_speed=0;
            });
            
        }else{
            this.backgroundObjects.forEach((object)=>{
                object.x_speed=object.x_maxSpeed;
            });
            this.backgroundSkyObjects.forEach((object)=>{
                object.x_speed=object.x_maxSpeed;
            });
        }
    }

    moveRight(){
        this.controller.right=true;
        this.friction=1;
        if(this.offsetX==0 || this.playerSpeed==0){
            this.backgroundObjects.forEach((object)=>{
                object.x_speed=0;
            });
            this.backgroundSkyObjects.forEach((object)=>{
                object.x_speed=0;
            });
        }else{
            this.backgroundObjects.forEach((object)=>{
                object.x_speed=-object.x_maxSpeed;
            });
            this.backgroundSkyObjects.forEach((object)=>{
                object.x_speed=-object.x_maxSpeed;
            });
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
}