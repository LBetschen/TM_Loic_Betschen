export class Input{
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
                    game.player.fire();
                    break;
                case 87:
                    game.player.jump(game.GameHeight);
                    break;
                case 37:
                    game.player.moveLeft();
                    
                    break;
                case 39:
                    game.player.moveRight();
                    break;
                case 38:
                    game.player.jump(game.GameHeight);
                    break;
                case 69:
                    game.player.openChest(game);
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
                case 37:
                    game.player.stopLeft();
                    game.background.stopLeft();
                    break;

                case 39:                   
                    game.player.stopRight();
                    break;                                   
            }
        });      

        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX-game.frameOffsetX;
            let mouseY=event.clientY-game.frameOffsetY;
            game.toggleClick(mouseX,mouseY);
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