export class Input{
    constructor(game){  
        
        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleMenu(mouseX,mouseY);
            
        });
    }
}
