export class Level1Map{
    constructor(game,player){
        this.tileMap=new Image();
        this.tileMap.src=document.getElementById("map").src;
       
        this.offsetX=player.offsetX;
        this.offsetY=player.offsetY;
        
        this.tileMap.size={
            columns:6,
            lignes:5,
            width:256,
            height:256
        }
        

        this.columns=16;
        this.tileWidth=80;
        this.tileHeight=80;

        this.map=[];
    
    }

    start(){

        this.readFiles();
    }

    update(deltaTime,GameWidth,GameHeight,game){

        if(game.player.offsetX>0){
            this.offsetX=0;
        }else{
           this.offsetX=game.player.offsetX; 
        }

        if(game.player.offsetY>0){
            this.offsetY=0;
        }else{
           this.offsetY=game.player.offsetY; 
        }
        for(var k=0;k<this.map.length;k++){
            if(this.map[k]!=0){
                var x=(k%this.columns)*this.tileWidth + this.offsetX;
                var y=Math.floor(k/this.columns)*this.tileWidth + this.offsetY;
                console.log
                if(game.player.position.y+game.player.hero.height>y+this.tileHeight/10){
                    game.player.position.y=y+this.tileHeight/10-game.player.hero.height;
                }
                if(game.player.position.y + game.player.hero.height>y){
                    game.player.position.y=GameHeight-game.player.hero.height;
                    game.player.jumping=false; 
                    game.player.doubleJump=false;
                    game.player.y_speed=0;
                }
            }

        }

        
      

    }

    draw(ctx,offsetX,offsetY){
       
            for(var i = 0;i<this.map.length;i++){
                var value=this.map[i];
                
                    if(value!=0){
                        var source_x=((value-1)%this.tileMap.size.columns)*this.tileMap.size.width;
                        var source_y=Math.floor((value-1)/this.tileMap.size.lignes)*this.tileMap.size.height;
                        
                        var x=(i%this.columns)*this.tileWidth; + this.offsetX;
                        var y=Math.floor(i/this.columns)*this.tileWidth + this.offsetY;
    
                        ctx.drawImage(this.tileMap,source_x,source_y,this.tileMap.size.width,this.tileMap.size.height,x,y,this.tileWidth,this.tileWidth);
                    }

                
                
            }

        
        
        
        
        
         
        
    }
    readFiles() {
        var res;
        fetch("./map.txt").then(Response => Response.text()).then((data) => {
            res = data.toString().split(",");
            for (var i = 0; i < res.length; i++) {
                res[i] = parseInt(res[i]);
            }
            this.map = res;
        });
    }
}