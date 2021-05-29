export class Input{
    constructor(game){  
        
        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleMenu(mouseX,mouseY);
            game.toggleClick(mouseX,mouseY);
        });

        document.addEventListener("mousemove",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            
            game.toggleButtons(mouseX,mouseY);
        });
        
    }
}
