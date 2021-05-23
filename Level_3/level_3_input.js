export class Level3Input{
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
                case 83:
                    game.player.moveBack();
                    break;
                case 87:
                    game.player.moveForward();
                    break;
                
            }
        });

        document.addEventListener("keyup",(event)=>{
            
            switch (event.keyCode){
                case 65:
                    game.player.stopLeft();
                    break;

                case 68:                   
                    game.player.stopRight();
                    break; 
                case 83:
                    game.player.stopBack();
                    break;
                case 87:
                    game.player.stopForward();
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
            game.toggleButtons(mouseX,mouseY);
        });
        
        document.addEventListener("mouseout",(event)=>{

        });
        
    }
}