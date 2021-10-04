export class MapInput{
    constructor(game,ctx){  
        document.addEventListener("keydown",(event)=>{

        });

        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX-game.frameOffsetX;
            let mouseY=event.clientY-game.frameOffsetY;
                game.toggleClick(mouseX,mouseY,ctx);
        });

        document.addEventListener("mousemove",(event)=>{
            let mouseX=event.clientX-game.frameOffsetX;
            let mouseY=event.clientY-game.frameOffsetY;
            game.toggleButtons(mouseX,mouseY);
            game.settings.moveScrolls(mouseX,mouseY,game);
            
            
        });
        
        document.addEventListener("mousedown",(event)=>{
            let mouseX=event.clientX-game.frameOffsetX;
            let mouseY=event.clientY-game.frameOffsetY;
            game.settings.toggleScroll(mouseX,mouseY,true);
        });
        document.addEventListener("mouseup",(event)=>{
            let mouseX=event.clientX-game.frameOffsetX;
            let mouseY=event.clientY-game.frameOffsetY;
            game.settings.toggleScroll(mouseX,mouseY,false);
        });
        
    }
}