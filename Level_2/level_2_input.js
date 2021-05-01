export class Level2Input{
    constructor(game){  
        document.addEventListener("keydown",(event)=>{
            switch (event.keyCode){
                case 27:
                    game.togglePause();
                    break;
            }
        });

        document.addEventListener("click",(event)=>{
                
        });

        document.addEventListener("mouseover",(event)=>{

        });
        
        document.addEventListener("mouseout",(event)=>{

        });
        
    }
}