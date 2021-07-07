export class Input {
    constructor(game) {

        document.addEventListener("click", (event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            game.toggleClick(mouseX, mouseY);
        });

        document.addEventListener("mousemove", (event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            game.toggleButtons(mouseX, mouseY);
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
