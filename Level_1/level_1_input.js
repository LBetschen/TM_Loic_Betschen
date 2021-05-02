export class Level1Input{
    constructor(game){  
        document.addEventListener("keydown",(event)=>{
            switch (event.keyCode){
                case 27:
                    game.togglePause();
                    break;
            }
        });

        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleReturn(mouseX,mouseY);
        });

        document.addEventListener("mousemove",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleReturnButton(mouseX,mouseY);
        });
        
        document.addEventListener("mouseout",(event)=>{

        });
        
    }
}