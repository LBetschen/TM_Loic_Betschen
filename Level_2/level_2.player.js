export class Player{
    constructor(game){
        this.hero = new Image();
        this.hero.src=document.getElementById("playerRight").src;

        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        
        this.height=60;
        this.width=50;

        this.position={
            x: this.gameWidth/2-this.width/2,
            y: this.gameHeight-this.height
        }
        
        this.controller={
            right:false,
            left:false
        }

        this.x_maxSpeed=1;
        this.x_speed = 0;
        this.y_maxspeed = 10;
        this.y_speed =0;
        
        this.jumping=false;
        this.doubleJump=false;
        this.friction=1;              
    }
    
    
    draw(ctx){
        
        ctx.drawImage(this.hero,this.position.x,this.position.y,this.width,this.height);
    }
    
    update(deltaTime,GameWidth,GameHeight){
        
        this.y_speed+=1;
        
        this.position.x+=this.x_speed;
        this.position.y+=this.y_speed;
       
        this.x_speed*=this.friction;
       
        if(this.position.y + this.height>this.gameHeight){
            this.position.y=this.gameHeight-this.height;
            this.jumping=false; 
            this.doubleJump=false;
            this.y_speed=0;
        }

        if(this.position.x+this.width>this.gameWidth){
            this.position.x = this.gameWidth-this.width;
        }

        if(this.position.y<0){
            this.position.y=0;
        }
        
        if(this.position.x<0 ){
            this.position.x=0;
        }
    }

    moveLeft(){
        this.controller.left=true;
        this.friction=1;
        this.x_speed=-this.x_maxSpeed;
        this.hero.src=document.getElementById("playerLeft").src;
    }

    moveRight(){
        this.controller.right=true;
        this.friction=1;
        this.x_speed=this.x_maxSpeed;
        this.hero.src=document.getElementById("playerRight").src;
    }

    jump(){
        if(this.jumping==false){
            this.y_speed-=20; 
            this.jumping=true;
        }else if(this.jumping==true && this.doubleJump==false){
            this.y_speed-=20; 
            this.doubleJump=true;
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