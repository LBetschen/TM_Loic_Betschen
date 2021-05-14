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
        this.back.aspect=this.back.naturalHeight/this.back.naturalWidth;
        this.back.width=game.gameWidth;
        this.back.height=this.back.width*this.back.aspect;
        this.back.position={
            x:0,
            y:game.gameHeight-this.back.height
        }
        this.back.position2={
            x:game.gameWidth,
            y:game.gameHeight-this.back.height
        }
        
        this.back.x_maxSpeed=2;
        this.back.x_speed = 0;
        

        this.mid=new Image();
        this.mid.src=document.getElementById("mid1").src;
        this.mid.aspect=this.mid.naturalHeight/this.mid.naturalWidth;
        this.mid.width=game.gameWidth;
        this.mid.height=this.mid.width*this.mid.aspect;
        this.mid.position={
            x:0,
            y:game.gameHeight-this.mid.height
        }
        this.mid.position2={
            x:game.gameWidth,
            y:game.gameHeight-this.mid.height
        }
        this.mid.x_maxSpeed=4;
        this.mid.x_speed = 0;
        

        this.front=new Image();
        this.front.src=document.getElementById("front").src;
        this.front.aspect=this.front.naturalHeight/this.front.naturalWidth;
        this.front.width=game.gameWidth;
        this.front.height=this.front.width*this.front.aspect;
        this.front.position={
            x:0,
            y:game.gameHeight-this.front.height
        }
        this.front.position2={
            x:game.gameWidth,
            y:game.gameHeight-this.front.height
        }
        this.front.x_maxSpeed=8;
        this.front.x_speed = 0;
        

        
        this.cloud1=new Image();
        this.cloud1.src=document.getElementById("cloud1").src;
        this.cloud1.aspect=this.cloud1.naturalHeight/this.cloud1.naturalWidth;
        this.cloud1.width=this.cloud1.naturalWidth;
        this.cloud1.height=this.cloud1.width*this.cloud1.aspect;
        this.cloud1.position={
            x:game.gameWidth/5,
            y:game.gameHeight/50
        }
        this.cloud1.position2={
            x:this.cloud1.position.x+game.gameWidth,
            y:game.gameHeight/50
        }
        this.cloud1.x_maxSpeed=0.5;
        this.cloud1.x_speed = 0;
        
        
        this.cloud2=new Image();
        this.cloud2.src=document.getElementById("cloud2").src;
        this.cloud2.aspect=this.cloud2.naturalHeight/this.cloud2.naturalWidth;
        this.cloud2.width=this.cloud2.naturalWidth;
        this.cloud2.height=this.cloud2.width*this.cloud2.aspect;
        this.cloud2.position={
            x:game.gameWidth/1.5,
            y:game.gameHeight/10
        }
        this.cloud2.position2={
            x:this.cloud2.position.x-game.gameWidth,
            y:game.gameHeight/10
        }
        this.cloud2.x_maxSpeed=0.5;
        this.cloud2.x_speed = 0;
        
        
        
        /*this.sky= new Image();
        this.sky.src=document.getElementById("sky").src;
        this.sky.aspect=this.sky.naturalHeight/this.sky.naturalWidth;
        this.sky.width=game.gameWidth;
        this.sky.height=this.sky.width*this.sky.aspect;
        this.sky.position={
            x:0,
            y:game.gameHeight-this.sky.height
        }*/

        this.backgroundObjects=[
            this.back,
            this.mid,
            this.front,
            this.cloud1,
            this.cloud2
        ]
            

        
    }

    update(deltaTime,GameWidth,GameHeight){
        
        this.backgroundObjects.forEach((object)=>{
            object.position.x+=object.x_speed;
            object.position2.x+=object.x_speed;
            object.x_speed*=this.friction;
            
            if(object.position.x +object.width <0 ){
                object.position.x=GameWidth-GameWidth/100;
            }else if(object.position.x>GameWidth){
                object.position.x=-object.width+GameWidth/100;
            }
            if(object.position2.x +object.width <0 ){
                object.position2.x=GameWidth-GameWidth/100;
            }else if(object.position2.x>GameWidth){
                object.position2.x=-object.width+GameWidth/100;
            }

        });
        
        
       

    }

    draw(ctx){
        //ctx.drawImage(this.sky,this.sky.position.x,this.sky.position.y,this.sky.width,this.sky.height);
        
        this.backgroundObjects.forEach((object)=>{
            ctx.drawImage(object,object.position.x,object.position.y,object.width,object.height);
            ctx.drawImage(object,object.position2.x,object.position2.y,object.width,object.height);        
        });
        

       
    }

    moveLeft(){
        this.controller.left=true;
        this.friction=1;
        this.backgroundObjects.forEach((object)=>{
            object.x_speed=object.x_maxSpeed;
        });
        
        
        
    }

    moveRight(){
        this.controller.right=true;
        this.friction=1;
        this.backgroundObjects.forEach((object)=>{
            object.x_speed=-object.x_maxSpeed;
        });
        
    }

    stopRight(){
        this.controller.right=false;
        if(this.controller.left==false){
            this.friction=0.9
        }    
    }

    stopLeft(){
        this.controller.left=false;
        if(this.controller.right==false){
            this.friction=0.9;
        }    
    }
}