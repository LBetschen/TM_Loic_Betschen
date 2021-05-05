export class Level1Input{
    constructor(game){  
        document.addEventListener("keydown",(event)=>{
            switch (event.keyCode){
                case 27:
                    game.togglePause();
                    break;
                case 65:
                    game.player.moveLeft();
                    break;
                case 68:
                    game.player.moveRight();
                    break;
                case 32:
                    game.player.jump();
                    break;
            }
        });

        document.addEventListener("keyup",(event)=>{
            
            switch (event.keyCode){
                case 65:
                    game.player.stop();
                    break;

                case 68:                   
                    game.player.stop();
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