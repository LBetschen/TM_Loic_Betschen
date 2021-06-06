export class Level3Map{
    constructor(game,player,map){
        this.groundSheet=new Image();
        this.groundSheet.src=document.getElementById("map").src;
        this.buildingSheet=new Image();
        this.buildingSheet.src=document.getElementById("building").src;

        this.offsetX=player.offsetX;
        this.offsetY=player.offsetY;
        
        this.groundSheet.size={
            columns:16,
            lignes:12,
            width:32,
            height:32
        }
        this.buildingSheet.size={
            columns:16,
            lignes:16,
            width:32,
            height:32
        }

        this.columns=16;
        this.tileWidth=80;
        this.tileHeight=80;
        
        this.map=map;
    }

    update(deltaTime,GameWidth,GameHeight,player){

        if(player.offsetX>0){
            this.offsetX=0;
        }else{
           this.offsetX=player.offsetX; 
        }

        if(player.offsetY>0){
            this.offsetY=0;
        }else{
           this.offsetY=player.offsetY; 
        }
        
       

    }

    draw(ctx,offsetX,offsetY){
       for(var index=0;index<this.map.length;index++){
            for(var i = 0;i<this.map[index].length;i++){
                var value=this.map[index][i];
                
                if(index==0){
                    var source_x=(value%this.groundSheet.size.columns)*this.groundSheet.size.width;
                    var source_y=Math.floor(value/this.groundSheet.size.lignes)*this.groundSheet.size.height;
                    var x=(i%this.columns)*this.tileWidth + this.offsetX;
                    var y=Math.floor(i/this.columns)*this.tileWidth + this.offsetY;
                    ctx.drawImage(this.groundSheet,source_x,source_y,this.groundSheet.size.width,this.groundSheet.size.height,x,y,this.tileWidth,this.tileWidth);
                }else if(index==1){
                    var source_x=(value%this.buildingSheet.size.columns)*this.buildingSheet.size.width;
                    var source_y=Math.floor(value/this.buildingSheet.size.lignes)*this.buildingSheet.size.height;
                    var x=(i%this.columns)*this.tileWidth + this.offsetX;
                    var y=Math.floor(i/this.columns)*this.tileWidth + this.offsetY;
                    ctx.drawImage(this.buildingSheet,source_x,source_y,this.buildingSheet.size.width,this.buildingSheet.size.height,x,y,this.tileWidth,this.tileWidth);
                }
                
            }

        }
        
        
        
        
         
        
    }

   
   
    
}


