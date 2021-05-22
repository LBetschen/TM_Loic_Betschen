export class Player{
    constructor(game){
        this.hero = new Image();
        this.hero.src=document.getElementById("playerRight").src;
        
        
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.constGameHeight=game.gameHeight;
        this.constGameWidth=game.gameWidth;
        this.ratio=this.constGameHeight/this.gameHeight;

        this.height=this.constGameHeight/15;
        this.width=this.constGameHeight/15;

        

        this.position={
            x: this.gameWidth/2-this.width/2,
            y: this.gameHeight-this.height
        }
        
        this.controller={
            right:false,
            left:false,
            forward:false,
            back:false

        }


        this.x_maxSpeed=this.gameWidth/140;
        this.x_speed = 0;
        this.y_maxSpeed=this.gameWidth/140;
        this.y_speed = 0;
        
        
        this.y_friction=1;
        this.x_friction=1;

    }
    
    
    draw(ctx){
        
        ctx.drawImage(this.hero,this.position.x,this.position.y,this.width,this.height);
    }
    
    update(deltaTime,GameWidth,GameHeight){
        
        
        this.gameHeight=GameHeight;
        this.gameWidth=GameWidth;
        this.ratio=this.constGameHeight/GameHeight;

        this.height=this.constGameHeight/15/this.ratio;
        this.width=this.constGameHeight/15/this.ratio;

        this.x_maxSpeed=GameWidth/400;
        this.y_maxSpeed=GameWidth/500;
        
        this.position.x+=this.x_speed;
        this.position.y+=this.y_speed;
       
        this.x_speed*=this.x_friction;
        this.y_speed*=this.y_friction;
       
        if(this.position.y + this.height>GameHeight){
            this.position.y=GameHeight-this.height;
            
        }

        if(this.position.x+this.width>GameWidth){
            this.position.x = GameWidth-this.width;
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
        this.x_friction=1;
        this.x_speed=-this.x_maxSpeed;
        this.hero.src=document.getElementById("playerLeft").src;
    }

    moveRight(){
        this.controller.right=true;
        this.x_friction=1;
        this.x_speed=this.x_maxSpeed;
        this.hero.src=document.getElementById("playerRight").src;
        
    }

    moveForward(){
        this.controller.forward=true;
        this.y_friction=1;
        this.y_speed=-this.y_maxSpeed;
        
    }

    moveBack(){
        this.controller.back=true;
        this.y_friction=1;
        this.y_speed=this.y_maxSpeed;
    }

    stopRight(){
        this.controller.right=false;
        if(this.controller.left==false){
            this.x_friction=0.9; 
        }
         
    }
    stopLeft(){
        this.controller.left=false;
        if(this.controller.right==false){
            this.x_friction=0.9; 
        }
         
    }
    stopForward(){
        this.controller.forward=false;
        if(this.controller.back==false){
            this.y_friction=0.9; 
        }
         
    }
    stopBack(){
        this.controller.back=false;
        if(this.controller.forward==false){
            this.y_friction=0.9; 
        }
         
    }
    
    
}