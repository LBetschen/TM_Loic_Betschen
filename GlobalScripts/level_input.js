export class LevelInput{
    constructor(game){  

        document.addEventListener("keydown",(event)=>{
           
            switch (event.keyCode){
                case 27:
                    game.togglePause();
                    break;
                case 65:
                    game.player.moveLeft();
                    game.background.moveLeft();
                    break;
                case 68:
                    game.player.moveRight();
                    game.background.moveRight();
                    break;
                case 32:
                    game.player.fire();
                    break;
                case 87:
                    game.player.jump(game.GameHeight);
                    break;
                case 37:
                    game.player.moveLeft();
                    game.background.moveLeft();
                    break;
                case 39:
                    game.player.moveRight();
                    game.background.moveRight();
                    break;
                case 38:
                    game.player.jump(game.GameHeight);
                    break;
                
            }
        });

        document.addEventListener("keyup",(event)=>{
            
            switch (event.keyCode){
                case 65:
                    game.player.stopLeft();
                    game.background.stopLeft();
                    break;

                case 68:                   
                    game.player.stopRight();
                    game.background.stopRight();
                    break;    
                case 37:
                    game.player.stopLeft();
                    game.background.stopLeft();
                    break;

                case 39:                   
                    game.player.stopRight();
                    game.background.stopRight();
                    break;                                   
            }
        });      

        document.addEventListener("click",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleClick(mouseX,mouseY);
        });

        document.addEventListener("mousemove",(event)=>{
            let mouseX=event.clientX;
            let mouseY=event.clientY;
            game.toggleButtons(mouseX,mouseY);
            game.settings.moveScrolls(mouseX,mouseY,game);
        });
        
        
        document.addEventListener("mousedown",(event)=>{
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            game.settings.toggleScroll(mouseX,mouseY,true);
        });
        document.addEventListener("mouseup",(event)=>{
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            game.settings.toggleScroll(mouseX,mouseY,false);
        });
        
    }
}