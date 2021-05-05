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
        
        this.x_maxSpeed=10;
        this.x_speed = 0;
        this.y_maxspeed = 10;
        this.y_speed =0;
        
        this.jumping=false;
        this.jumpForce=20;               
    }
    
    
    draw(ctx){
        
        ctx.drawImage(this.hero,this.position.x,this.position.y,this.width,this.height);
    }
    
    update(deltaTime,GameWidth,GameHeight){
        
        this.y_speed+=1.5;

        this.position.x+=this.x_speed;
        this.position.y+=this.y_speed;

        if(this.position.y + this.height>this.gameHeight){
            this.position.y=this.gameHeight-this.height;
            this.y_speed=0;
            this.jumping=false; 
        }

        if(this.position.x+this.width>this.gameWidth){
            this.position.x = this.gameWidth-this.width;
        }

        if(this.position.y<0){
            this.position.y=0;
        }
        
        if(this.position.x<0 ){
            this.position.x =0
        }
        

    }

    moveLeft(){
        this.x_speed=-this.x_maxSpeed;
        this.hero.src=document.getElementById("playerLeft").src;
    }
    
    moveRight(){
        this.x_speed=this.x_maxSpeed;
        this.hero.src=document.getElementById("playerRight").src;
    }
    jump(){
        if(this.jumping==false){
           this.y_speed -=this.jumpForce;
            this.jumping=true; 
        }
    }
    
    stop(){
        if(this.x_speed<0){
            this.x_speed=0;           
        }else if(this.x_speed>0){
            this.x_speed=0;
        }
    }
    
    
}