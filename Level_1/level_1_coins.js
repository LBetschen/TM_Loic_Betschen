
var i =1;
export class Coins{
    constructor(game){
        this.coin=new Image();
        this.coin.src=document.getElementById("coin1").src;
        
        this.width=this.coin.naturalWidth/5;

        this.height=this.coin.naturalHeight/5;
        this.position={
            x:200,
            y:400
        }
        this.hit=false;
        this.score=0;
    }

    update(deltaTime,GameWidth,GameHeight,player){

        this.height=this.coin.naturalHeight/5;
        this.coin.src=document.getElementById("coin"+i).src;

        if(this.hit==false &&
            player.x>this.position.x &&
            player.x<this.position.x+this.width &&
            player.y>this.position.y &&
            player.y<this.position.y +this.height
            ){
                
                this.hit=true;
                this.score++;
        }
        
    }
    draw(ctx){
        if(this.hit==false){
            ctx.drawImage(this.coin,this.position.x,this.position.y,this.width,this.height);
            

        }else{
            ctx.font="50px";
            ctx.fillStyle="black";
            ctx.fillText("Score : " + this.score,75,50);
        }
    }
    
    coinAnimation(ctx){
        let t;
        t=setInterval(function(){
            
            if(i>15){
                i=1;
            }else{
                i++;
            }
            
        },100);
        
    }
}