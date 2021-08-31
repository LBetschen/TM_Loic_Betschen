var j=1;
export class Map{
    constructor(game,player){
        this.tileMap=new Image();
        this.tileMap.src=document.getElementById("map").src;
        this.tileMap.size={
            columns:6,
            lignes:5,
            width:256,
            height:256
        };
        

        this.waterFall=new Image();
        this.waterFall.src=document.getElementById("water").src;
        this.waterFall.size={
            columns:16,
            lignes:2,
            width:256,
            height:256
        };

      
        this.offsetX=game.player.offsetX;
        this.offsetY=game.player.offsetY;
        

        this.columns=200;
        this.tileWidth=game.gameHeight/12;
        this.tileHeight=game.gameHeight/12;

        this.map=[];
        this.maxMapWidth=this.columns*this.tileWidth;
    
    }

    start(){

        this.readFiles();
        this.waterAnimation();
    }

    update(deltaTime,GameWidth,GameHeight,game){
        this.tileWidth=GameHeight/12;
        this.tileHeight=GameHeight/12;


    }

    draw(ctx,game){
            
       
            for(var i = 0;i<this.map.length;i++){
                var value=this.map[i];
                
                
                    if(value!=0 && value <30){
                        var source_x=((value-1)%this.tileMap.size.columns)*this.tileMap.size.width;
                        var source_y=Math.floor((value-1)/this.tileMap.size.columns)*this.tileMap.size.height;
                        
                        var x=(i%this.columns)*this.tileWidth + game.player.offsetX;
                        var y=Math.floor(i/this.columns)*this.tileWidth ;
    
                        ctx.drawImage(this.tileMap,source_x,source_y,this.tileMap.size.width,this.tileMap.size.height,x,y,this.tileWidth,this.tileWidth);
                    }
                    
                    if(value==30){
                        var source_x=(j%this.waterFall.size.columns)*this.waterFall.size.width;
                        var source_y=0;
                        var x=(i%this.columns)*this.tileWidth + game.player.offsetX;
                        var y=Math.floor(i/this.columns)*this.tileWidth;

                        ctx.drawImage(this.waterFall,source_x,source_y,this.waterFall.size.width,this.waterFall.size.height,x,y,this.tileWidth,this.tileHeight);
                     
                    }
                    if(value==31){
                        var source_x=(j%this.waterFall.size.columns)*this.waterFall.size.width;
                        var source_y=256;
                        var x=(i%this.columns)*this.tileWidth + game.player.offsetX;
                        var y=Math.floor(i/this.columns)*this.tileWidth;
                        

                        ctx.drawImage(this.waterFall,source_x,source_y,this.waterFall.size.width,this.waterFall.size.height,x,y,this.tileWidth,this.tileHeight);
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
    

       
    waterAnimation(ctx) {
        let t;
        t = setInterval(function () {
    
            if (j > 15) {
                j = 1;
            } else {
                 j++;
            }
    
        }, 100);
    }
    
         

}