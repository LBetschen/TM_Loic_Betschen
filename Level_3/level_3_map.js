export class Level3Map{
    constructor(game,player){
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


        this.groundArraytxt=document.getElementById("groundArray").innerText;
        /*this.groundArraytxt.addEventListener("change",()=>{
            let files =this.groundArraytxt.files;
            let reader = new FileReader();
            reader.onload=(e)=>{
                var text= reader.result;
                this.groundArraytxt.innerText=text;
                console.log(reader.result.substring(0,200));
            } 
            reader.readAsText(this.groundArraytxt);

        });*/
        console.log(this.groundArraytxt);


        this.map=[  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,];
        

        this.structures=[   9,10,11,12,13,14,9,10,11,12,13,14,9,10,11,12,
                            25,26,27,28,29,30,25,26,27,28,29,30,25,26,27,28,
                            41,42,43,44,45,46,41,42,43,44,45,46,41,42,43,44,
                            73,74,75,76,77,78,73,74,75,76,77,78,73,74,75,76,
                            3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            19,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            35,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            51,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            10,11,0,0,0,0,229,230,231,0,0,0,0,0,0,0,
                            63,27,0,0,0,0,245,246,247,0,0,0,0,0,0,0,
                            79,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

    
        ];

        this.boxCollider=[];
       
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
        for(var i = 0;i<this.map.length;i++){
            var value=this.map[i];
            var source_x=(value%this.groundSheet.size.columns)*this.groundSheet.size.width;
            var source_y=Math.floor(value/this.groundSheet.size.lignes)*this.groundSheet.size.height;
            var x=(i%this.columns)*this.tileWidth + this.offsetX;
            var y=Math.floor(i/this.columns)*this.tileWidth + this.offsetY;
            ctx.drawImage(this.groundSheet,source_x,source_y,this.groundSheet.size.width,this.groundSheet.size.height,x,y,this.tileWidth,this.tileWidth);
            
        }

        for(var i = 0;i<this.structures.length;i++){
            var value=this.structures[i];
            var source_x=(value%this.buildingSheet.size.columns)*this.buildingSheet.size.width;
            var source_y=Math.floor(value/this.buildingSheet.size.lignes)*this.buildingSheet.size.height;
            var x=(i%this.columns)*this.tileWidth + this.offsetX;
            var y=Math.floor(i/this.columns)*this.tileWidth + this.offsetY;
            ctx.drawImage(this.buildingSheet,source_x,source_y,this.buildingSheet.size.width,this.buildingSheet.size.height,x,y,this.tileWidth,this.tileWidth);
            
        }
        
        
         
        
    }

    collision(){

    }
}