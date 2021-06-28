import { Input } from "./menu_input.js";
import { Menu } from "./menu.js";
import { PlayerInfo } from "../Assets/playerInfo.js";

const GAMESTATE = {
    RUNNING: 0,
    SETTINGS: 1,
    ABOUT: 2
}

export class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameState = GAMESTATE;

        this.audio = new Audio();//audio for the menu
        this.audio.src = document.getElementById("backgroundSound1").src;
        this.audioMuted = false;

        this.savedPlayer=new Array;//values of the saved player
        this.info=new Array;//variable of the saved player
        this.savedGame = false;//true if there is already a player saved

    }

    start() {
       

    
        this.menu = new Menu(this);
        this.playerInfo = new PlayerInfo(this);
        //this.playerInfo.getSavedPlayer(this);//retrieves the progress of the player or creates cookies to save the players progress
        if (document.cookie.length == 0 || this.savedGame == false) {
            this.savedGame = false;
            


            
           fetch("../Assets/cookieVariables.txt").then(Response => Response.text()).then((variables) => {
               var variableRes = [];
                variableRes = variables.split(";");
                console.log(variables);
                console.log(variableRes);
                for (var i = 0; i < variableRes.length; i++) { 
                    variableRes[i] = variableRes[i].replace(/(\r\n|\n|\r)/gm, "");
                    this.info[i] = variableRes[i];
                }
                console.log(this.info);
                
            });
            
            console.log(this.info);
            
            fetch("../Assets/cookieData.txt").then(Response => Response.text()).then((data) => {  
                var dataRes = []; 
                dataRes = data.split(";");
                for (var i = 0; i < dataRes.length; i++) {
                    dataRes[i] = dataRes[i].replace(/(\r\n|\n|\r)/gm, "");
                    this.savedPlayer[i] = dataRes[i];
                }
            });
            console.log(this.savedPlayer);
            
            for (var i = 0; i < this.info.length; i++) { 
                document.cookie = this.info[i] + "=" + this.savedPlayer[i] + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
            }
            console.log(this.info);
            this.menu.inputValue(this); //there is still a problem with .split()




        } else {
            this.savedGame = true;
            this.playerInfo.updateCookieInfo(this.info, this.savedPlayer);
            this.menu.inputValue(this); //there is still a problem with .split()


        }
        console.log(this.info);
        console.log(this.savedGame);


        new Input(this);

        this.buttons = [this.menu.aboutButton, this.menu.settingsButton];
        this.buttonsDown = [this.menu.aboutButton, this.menu.settingsButton, this.menu.newGameButton, this.menu.resumeGame];

        this.gameState = GAMESTATE.RUNNING;

        this.audio.play();
       
        
     

    }

    update(deltaTime, gameWidth, gameHeight) {
       
        this.menu.update(deltaTime, gameWidth, gameHeight, this.gameState, this.savedGame);
        
        this.audio.play();
        


    }

    draw(ctx) {
       
        this.menu.draw(ctx, this.gameState, this.savedGame);
      
    }



    toggleButtons(mouseX, mouseY) {
        this.buttonsDown.forEach((object) => {
            if (mouseX >= object.position.x &&
                mouseX <= object.position.x + object.width &&
                mouseY >= object.position.y &&
                mouseY <= object.position.y + object.height) {
                object.src = document.getElementById(object.down).src;
            } else {
                object.src = document.getElementById(object.up).src;
            }
        });
        this.menu.toggleVolumeButton(this.audioMuted, mouseX, mouseY);

    }
    toggleClick(mouseX, mouseY) {

        if (mouseX >= this.menu.newGameButton.position.x &&
            mouseX <= this.menu.newGameButton.position.x + this.menu.newGameButton.width &&
            mouseY >= this.menu.newGameButton.position.y &&
            mouseY <= this.menu.newGameButton.position.y + this.menu.newGameButton.height) {


            //this.menu.newGame(this);

            console.log(document.cookie);
            //this.menu.savePlayer(this);


            window.location = "./Map/map.html";



        }

        if (mouseX >= this.menu.resumeGame.position.x &&
            mouseX <= this.menu.resumeGame.position.x + this.menu.resumeGame.width &&
            mouseY >= this.menu.resumeGame.position.y &&
            mouseY <= this.menu.resumeGame.position.y + this.menu.resumeGame.height) {
            if (this.savedGame == true) {

                //this.menu.savePlayer(this);

                window.location = "./Map/map.html";

            }



        }

        for (var i = 0; i < this.buttons.length; i++) {
            if (mouseX >= this.buttons[i].position.x &&
                mouseX <= this.buttons[i].position.x + this.buttons[i].width &&
                mouseY >= this.buttons[i].position.y &&
                mouseY <= this.buttons[i].position.y + this.buttons[i].height) {
                switch (i) {
                    case 0:
                        if (this.gameState != 2) {
                            this.gameState = GAMESTATE.ABOUT;
                        } else {
                            this.gameState = GAMESTATE.RUNNING;
                        }

                        break;
                    case 1:
                        if (this.gameState != 1) {
                            this.gameState = GAMESTATE.SETTINGS;
                        } else {
                            this.gameState = GAMESTATE.RUNNING;
                        }
                        break;
                }
            }
        }

        if (mouseX >= this.menu.volumeButton.position.x &&
            mouseX <= this.menu.volumeButton.position.x + this.menu.volumeButton.width &&
            mouseY >= this.menu.volumeButton.position.y &&
            mouseY <= this.menu.volumeButton.position.y + this.menu.volumeButton.height) {
            if (!this.audioMuted) {
                this.menu.volumeButton.src = document.getElementById("mutedButtonDown").src;
                this.audioMuted = true;
                this.audio.muted = true;
            } else {
                this.menu.volumeButton.src = document.getElementById("volumeButtonDown").src;
                this.audioMuted = false;
                this.audio.muted = false;
            }
        }

    }
}
