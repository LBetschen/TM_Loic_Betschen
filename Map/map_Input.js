export class MapInput{
    constructor(game){  
        document.addEventListener("keydown",(event)=>{

        });

        document.addEventListener("click",(event)=>{
                let mouseX=event.clientX;
                let mouseY=event.clientY;
                game.toggleLevels(mouseX,mouseY);
        });

        document.addEventListener("mouseover",(event)=>{

        });
        
        document.addEventListener("mouseout",(event)=>{

        });
        
    }
}