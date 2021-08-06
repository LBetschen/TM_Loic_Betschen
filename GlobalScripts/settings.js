export class Settings{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.gameState = game.gamestate;
        this.constGamewidth = game.gameWidth;

        this.ratio = this.gameWidth / game.gameWidth;


        this.settingsPage = new Image();
        this.settingsPage.src = document.getElementById("settingsPage").src;
        this.settingsPage.height = this.settingsPage.naturalHeight*1.5 /  this.ratio;
        this.settingsPage.width = this.settingsPage.naturalWidth *1.5/  this.ratio;
        this.settingsPage.position = {
            x: this.gameWidth /2-this.settingsPage.width/2,
            y: this.gameHeight /2-this.settingsPage.height/2
        }
        
        
        this.musicButton = new Image();
        this.musicButton.up = "musicButton";
        this.musicButton.mutedUp = "mutedButton";
        this.musicButton.src = document.getElementById(this.musicButton.up).src;
        this.musicButton.height = this.musicButton.naturalHeight / 2 / this.ratio;
        this.musicButton.width = this.musicButton.naturalWidth / 2 / this.ratio;
        this.musicButton.position = {
            x: this.settingsPage.position.x + this.musicButton.width + 10,
            y: this.settingsPage.position.y +this.musicButton.height*2.05
        }
        this.maxScroll=this.settingsPage.position.x+this.settingsPage.width/1.15;
        this.minScroll=this.settingsPage.position.x+this.settingsPage.width/2.25;
        this.scrollLength=this.maxScroll-this.minScroll;

        
        this.soundButton = new Image();
        this.soundButton.up = "soundButton";
        this.soundButton.mutedUp = "soundMuted";
        this.soundButton.src = document.getElementById(this.soundButton.up).src;
        this.soundButton.height = this.soundButton.naturalHeight / 2 / this.ratio;
        this.soundButton.width = this.soundButton.naturalWidth / 2 / this.ratio;
        this.soundButton.position = {
            x: this.settingsPage.position.x + this.musicButton.width + 10,
            y: this.musicButton.position.y +this.soundButton.height*1.75
        }


        this.saveSettings = new Image();
        this.saveSettings.up = "saveSettings";
        this.saveSettings.down = "saveSettingsDown";
        this.saveSettings.src = document.getElementById(this.saveSettings.up).src;
        this.saveSettings.height = this.saveSettings.naturalHeight / 2 / this.ratio;
        this.saveSettings.width = this.saveSettings.naturalWidth / 2 / this.ratio;
        this.saveSettings.position = {
            x: this.gameWidth /2-this.saveSettings.width/2,
            y: this.gameHeight /1.3
        }


        this.creditsButton = new Image();
        this.creditsButton.up = "creditsButton";
        this.creditsButton.down = "creditsButtonDown";
        this.creditsButton.src = document.getElementById(this.creditsButton.up).src;
        this.creditsButton.height = this.creditsButton.naturalHeight / 2 / this.ratio;
        this.creditsButton.width = this.creditsButton.naturalWidth / 2 / this.ratio;
        this.creditsButton.position = {
            x: this.gameWidth / 2-this.creditsButton.width/2,
            y: this.gameHeight / 1.6
        }

        
        this.musicSwitch = new Image();
        this.musicSwitch.onUp = "switchOn";
        this.musicSwitch.offUp = "switchOff";
        this.musicSwitch.onDown="switchOnDown";
        this.musicSwitch.offDown="switchOffDown";
         
        this.musicSwitch.src = document.getElementById(this.musicSwitch.onUp).src;
        this.musicSwitch.height = this.musicSwitch.naturalHeight / 3 / this.ratio;
        this.musicSwitch.width = this.musicSwitch.naturalWidth / 3 / this.ratio;
        this.musicSwitch.position = {
            x: this.musicButton.position.x+this.gameWidth/15,
            y: this.musicButton.position.y +this.musicButton.height/2-this.musicSwitch.height/2
        }

        
        this.soundSwitch = new Image();
        this.soundSwitch.onUp = "switchOn";
        this.soundSwitch.offUp = "switchOff";
        this.soundSwitch.onDown="switchOnDown";
        this.soundSwitch.offDown="switchOffDown";
        
        this.soundSwitch.src = document.getElementById(this.soundSwitch.onUp).src;
        this.soundSwitch.height = this.soundSwitch.naturalHeight / 3 / this.ratio;
        this.soundSwitch.width = this.soundSwitch.naturalWidth / 3 / this.ratio;
        this.soundSwitch.position = {
            x: this.soundButton.position.x+this.gameWidth/15,
            y: this.soundButton.position.y +this.soundButton.height/2-this.soundSwitch.height/2
        }
        

        this.musicScroll = new Image();
        this.musicScroll.up = "scrollUp";
        this.musicScroll.down = "scrollDown";
        this.musicScroll.src = document.getElementById(this.musicScroll.up).src;
        this.musicScroll.height = this.musicScroll.naturalHeight / 3 / this.ratio;
        this.musicScroll.width = this.musicScroll.naturalWidth / 3 / this.ratio;
        this.musicScroll.drag=false;
        this.musicScroll.onScroll=false;
        
        var c= game.playerProgress.getCookie("musicVolume",false);
        var pos= c[2]*this.scrollLength+this.minScroll+this.musicScroll.width/2;
        var value=this.settingsPage.width/(pos-this.settingsPage.position.x-this.musicScroll.width/2);
        this.musicScroll.value=value;
        this.musicScroll.position = {
            x: this.settingsPage.position.x+this.settingsPage.width/this.musicScroll.value,
            y: this.musicButton.position.y +this.musicButton.height/2-this.musicScroll.height/2
        }
        c=game.playerProgress.getCookie("musicMuted",false);
        
        if(c[2]=="false"){
            game.musicMuted=false;
        }else{
            game.musicMuted=true;
        }
        if(game.musicMuted==false){
            this.musicButton.src=document.getElementById(this.musicButton.up).src;
            this.musicSwitch.src=document.getElementById(this.musicSwitch.onUp).src;
        }else{
            this.musicButton.src=document.getElementById(this.musicButton.mutedUp).src;
            this.musicSwitch.src=document.getElementById(this.musicSwitch.offUp).src;
        }
        

        this.soundScroll = new Image();
        this.soundScroll.up = "scrollUp";
        this.soundScroll.down = "scrollDown";
        this.soundScroll.src = document.getElementById(this.soundScroll.up).src;
        this.soundScroll.height = this.soundScroll.naturalHeight / 3 / this.ratio;
        this.soundScroll.width = this.soundScroll.naturalWidth / 3 / this.ratio
        this.soundScroll.drag=false;
        this.soundScroll.onScroll=false;

        c= game.playerProgress.getCookie("soundVolume",false);
        pos= c[2]*this.scrollLength+this.minScroll+this.soundScroll.width/2;
        value=this.settingsPage.width/(pos-this.settingsPage.position.x-this.soundScroll.width/2);
        this.soundScroll.value=value;
        this.soundScroll.position = {
            x: this.settingsPage.position.x+this.settingsPage.width/this.soundScroll.value,
            y: this.soundButton.position.y +this.soundButton.height/2-this.soundScroll.height/2
        }
        c=game.playerProgress.getCookie("soundMuted",false);
        if(c[2]=="false"){
            game.soundMuted=false;
        }else{
            game.soundMuted=true;
        }
        if(game.soundMuted==false){
            this.soundButton.src=document.getElementById(this.soundButton.up).src;
            this.soundSwitch.src=document.getElementById(this.soundSwitch.onUp).src;
        }else{
            this.soundButton.src=document.getElementById(this.soundButton.mutedUp).src;
            this.soundSwitch.src=document.getElementById(this.soundSwitch.offUp).src;
        }
        


        this.soundVolume=((this.soundScroll.position.x-this.minScroll)/this.scrollLength).toFixed(2);
        this.musicVolume=((this.musicScroll.position.x-this.minScroll)/this.scrollLength).toFixed(2);
        
      
        this.settingButtons=[
            this.soundButton,
            this.musicButton,
            this.saveSettings,
            this.musicSwitch,
            this.soundSwitch,
            this.creditsButton,
            this.musicScroll,
            this.soundScroll
        ]
    }

    update(deltaTime, GameWidth, GameHeight, gameState, game) {
        this.gameHeight = GameHeight;
        this.gameWidth = GameWidth;
        this.ratio = this.constGamewidth / this.gameWidth;
        this.gameState=gameState;

        
     
        this.settingsPage.position = {
            x: this.gameWidth /2-this.settingsPage.width/2,
            y: this.gameHeight /2-this.settingsPage.height/2
        }
        this.musicButton.position = {
            x: this.settingsPage.position.x + this.musicButton.width + 10,
            y: this.settingsPage.position.y +this.musicButton.height*2.05
        }
        this.soundButton.position = {
            x: this.settingsPage.position.x + this.musicButton.width + 10,
            y: this.musicButton.position.y +this.soundButton.height*1.75
        }
        this.saveSettings.position = {
            x: this.gameWidth /2-this.saveSettings.width/2,
            y: this.gameHeight /1.3
        }
        this.creditsButton.position = {
            x: this.gameWidth / 2-this.creditsButton.width/2,
            y: this.gameHeight / 1.6
        }
        this.musicSwitch.position = {
            x: this.musicButton.position.x+this.gameWidth/15,
            y: this.musicButton.position.y +this.musicButton.height/2-this.musicSwitch.height/2
        }
        this.soundSwitch.position = {
            x: this.soundButton.position.x+GameWidth/15,
            y: this.soundButton.position.y +this.soundButton.height/2-this.soundSwitch.height/2
        }
        this.musicScroll.position = {
            x: this.settingsPage.position.x+this.settingsPage.width/this.musicScroll.value,
            y: this.musicButton.position.y +this.musicButton.height/2-this.musicScroll.height/2
        }
        this.soundScroll.position = {
            x: this.settingsPage.position.x+this.settingsPage.width/this.soundScroll.value,
            y: this.soundButton.position.y +this.soundButton.height/2-this.soundScroll.height/2
        }
        

        this.settingsPage.height = this.settingsPage.naturalHeight*1.5 /  this.ratio;
        this.settingsPage.width = this.settingsPage.naturalWidth *1.5/  this.ratio;
        this.musicButton.height = this.musicButton.naturalHeight / 2 / this.ratio;
        this.musicButton.width = this.musicButton.naturalWidth / 2 / this.ratio;
        this.soundButton.height = this.soundButton.naturalHeight / 2 / this.ratio;
        this.soundButton.width = this.soundButton.naturalWidth / 2 / this.ratio;
        this.saveSettings.height = this.saveSettings.naturalHeight / 2 / this.ratio;
        this.saveSettings.width = this.saveSettings.naturalWidth / 2 / this.ratio;
        this.musicSwitch.height = this.musicSwitch.naturalHeight / 3 / this.ratio;
        this.musicSwitch.width = this.musicSwitch.naturalWidth / 3 / this.ratio;
        this.soundSwitch.height = this.soundSwitch.naturalHeight / 3 / this.ratio;
        this.soundSwitch.width = this.soundSwitch.naturalWidth / 3 / this.ratio;
        this.creditsButton.height = this.creditsButton.naturalHeight / 2 / this.ratio;
        this.creditsButton.width = this.creditsButton.naturalWidth / 2 / this.ratio;
        this.musicScroll.height = this.musicScroll.naturalHeight / 3 / this.ratio;
        this.musicScroll.width = this.musicScroll.naturalWidth / 3 / this.ratio;
        this.soundScroll.height = this.soundScroll.naturalHeight / 3 / this.ratio;
        this.soundScroll.width = this.soundScroll.naturalWidth / 3 / this.ratio;
        
        this.maxScroll=this.settingsPage.position.x+this.settingsPage.width/1.15;
        this.minScroll=this.settingsPage.position.x+this.settingsPage.width/2.25;
        this.scrollLength=this.maxScroll-this.minScroll;

        
        this.soundVolume=((this.soundScroll.position.x-this.minScroll)/this.scrollLength).toFixed(2);
        this.musicVolume=((this.musicScroll.position.x-this.minScroll)/this.scrollLength).toFixed(2);
        if(this.musicVolume>1){this.musicVolume=1;}else if(this.musicVolume<0){this.musicVolume=0;}
        if(this.soundVolume>1){this.soundVolume=1;}else if(this.soundVolume<0){this.soundVolume=0;}
        game.playerProgress.changeCookie("soundVolume",this.soundVolume);
        game.playerProgress.changeCookie("musicVolume",this.musicVolume);
        game.audio.volume=this.musicVolume;
        game.playerProgress.changeCookie("musicMuted",game.musicMuted);
        game.playerProgress.changeCookie("soundMuted",game.soundMuted);
        
    }

    draw(ctx, gameState,game,input) {
      
         if (gameState == 2) {

            ctx.drawImage(this.settingsPage,this.settingsPage.position.x,this.settingsPage.position.y,this.settingsPage.width,this.settingsPage.height);
            this.settingButtons.forEach((object) => {
                ctx.drawImage(object, object.position.x, object.position.y, object.width, object.height);
            })
        }
    }

    toggleSettingButtons(game, mouseX, mouseY) {

        for(var i=0;i<this.settingButtons.length;i++){        
            if (mouseX >= this.settingButtons[i].position.x &&
                mouseX <= this.settingButtons[i].position.x + this.settingButtons[i].width &&
                mouseY >= this.settingButtons[i].position.y &&
                mouseY <= this.settingButtons[i].position.y + this.settingButtons[i].height) {
                    switch (i){
                        case 0:                          
                            break;
                        case 1:                       
                            break;
                        case 2:
                            this.saveSettings.src=document.getElementById(this.saveSettings.down).src;
                            break;
                        case 3:
                            if(game.musicMuted ==false){
                                this.musicSwitch.src=document.getElementById(this.musicSwitch.onDown).src;
                            }else{
                                this.musicSwitch.src=document.getElementById(this.musicSwitch.offDown).src;
                            }
                            break;
                        case 4:
                            if(game.soundMuted==false){
                                this.soundSwitch.src=document.getElementById(this.soundSwitch.onDown).src;
                            }else{
                                this.soundSwitch.src=document.getElementById(this.soundSwitch.offDown).src;
                            }
                            break;
                        case 5:
                            this.creditsButton.src=document.getElementById(this.creditsButton.down).src;
                            break;
                        case 6:
                            this.musicScroll.src=document.getElementById(this.musicScroll.down).src;
                            break;
                        case 7:
                            this.soundScroll.src=document.getElementById(this.soundScroll.down).src;
                            break;
                    }               
            } else {
                switch (i){
                    case 0:                       
                        break;
                    case 1:                      
                        break;
                    case 2:
                        this.saveSettings.src=document.getElementById(this.saveSettings.up).src;
                        break;
                    case 3:
                        if(game.musicMuted==false){
                            this.musicSwitch.src=document.getElementById(this.musicSwitch.onUp).src;                         
                        }else{
                            this.musicSwitch.src=document.getElementById(this.musicSwitch.offUp).src;                          
                        }
                        break;
                    case 4:
                        if(game.soundMuted==false){
                            this.soundSwitch.src=document.getElementById(this.soundSwitch.onUp).src;
                        }else{
                            this.soundSwitch.src=document.getElementById(this.soundSwitch.offUp).src;
                        }
                        break;
                    case 5:
                        this.creditsButton.src=document.getElementById(this.creditsButton.up).src;
                        break;
                    case 6:
                        this.musicScroll.src=document.getElementById(this.musicScroll.up).src;
                        break;
                    case 7:
                        this.soundScroll.src=document.getElementById(this.soundScroll.up).src                     
                        break;
                }          
            }
        }
    }

    toggleButtonClick(game,mouseX,mouseY){
        
        
        if(game.gameState==2){
            for(var i =0;i<this.settingButtons.length;i++){
                if (mouseX >= this.settingButtons[i].position.x &&
                    mouseX <= this.settingButtons[i].position.x + this.settingButtons[i].width &&
                    mouseY >= this.settingButtons[i].position.y &&
                    mouseY <= this.settingButtons[i].position.y + this.settingButtons[i].height) {

                    switch (i){
                        case 0: 
                            break;
                        case 1:
                            
                            break;
                        case 2:
                            game.gameState = 0;
                            console.log(game.gameState);
                            break;
                        case 3:
                            if(!game.musicMuted){
                                this.musicSwitch.src=document.getElementById(this.musicSwitch.offDown).src;
                                this.musicButton.src=document.getElementById(this.musicButton.mutedUp).src;
                               
                                game.musicMuted=true;
                                game.audio.muted = true;
                                this.musicScroll.value=2.25;
                            }else{
                                this.musicSwitch.src=document.getElementById(this.musicSwitch.onDown).src;
                                this.musicButton.src=document.getElementById(this.musicButton.up).src;
                                game.musicMuted=false;
                                game.audio.muted = false;
                                this.musicScroll.value=2;
                            }
                            break;
                        case 4:
                            if(!game.soundMuted){
                                this.soundSwitch.src=document.getElementById(this.soundSwitch.offDown).src;
                                this.soundButton.src=document.getElementById(this.soundButton.mutedUp).src;
                                game.soundMuted=true;
                                this.soundScroll.value=2.25;
                            }else{
                                this.soundSwitch.src=document.getElementById(this.soundSwitch.onDown).src;
                                this.soundButton.src=document.getElementById(this.soundButton.up).src;
                                game.soundMuted=false;
                                this.soundScroll.value=2;
                            }
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:         
                            break;
                    }
                }           
            }
        }              
    }
    
    toggleScroll(mouseX,mouseY,click){

        if(!click){
            this.musicScroll.drag=false;
            this.soundScroll.drag=false;
        }else{
            if(mouseX >= this.musicScroll.position.x &&
                mouseX <= this.musicScroll.position.x + this.musicScroll.width &&
                mouseY >= this.musicScroll.position.y &&
                mouseY <= this.musicScroll.position.y + this.musicScroll.height){
                this.musicScroll.drag=true;
            }else{
                this.musicScroll.drag=false;
            }
            if(mouseX >= this.soundScroll.position.x &&
                mouseX <= this.soundScroll.position.x + this.soundScroll.width &&
                mouseY >= this.soundScroll.position.y &&
                mouseY <= this.soundScroll.position.y + this.soundScroll.height){
                    this.soundScroll.drag=true;
            }else{
                this.soundScroll.drag=false;
            }
        }      
    }

    moveScrolls(mouseX,mouseY,game){
    
        if(this.musicScroll.drag==true){
            if(this.musicScroll.position.x>=this.minScroll && this.musicScroll.position.x<=this.maxScroll){
                this.musicSwitch.src=document.getElementById(this.musicSwitch.onUp).src;
                this.musicButton.src=document.getElementById(this.musicButton.up).src;
                game.musicMuted=false;
                game.audio.muted=false
                var value=this.settingsPage.width/(mouseX-this.settingsPage.position.x-this.musicScroll.width/2);
                if(value<1.15){
                    value=1.15;
                }else if(value>2.25){
                    this.musicSwitch.src=document.getElementById(this.musicSwitch.offUp).src;
                    this.musicButton.src=document.getElementById(this.musicButton.mutedUp).src;
                    game.musicMuted=true;
                    game.audio.muted=true;
                    value=2.25;
                }
                this.musicScroll.value=value;
            }
        }

        if(this.soundScroll.drag==true){
            if(this.soundScroll.position.x>=this.minScroll && this.soundScroll.position.x<=this.maxScroll){
                this.soundSwitch.src=document.getElementById(this.soundSwitch.onUp).src;
                this.soundButton.src=document.getElementById(this.soundButton.up).src;
                game.soundMuted=false;
                var value=this.settingsPage.width/(mouseX-this.settingsPage.position.x-this.soundScroll.width/2);
                if(value<1.15){
                    value=1.15;
                }else if(value>2.25){
                    this.soundSwitch.src=document.getElementById(this.soundSwitch.offUp).src;
                    this.soundButton.src=document.getElementById(this.soundButton.mutedUp).src;
                    game.soundMuted=true;
                    value=2.25;
                }
                this.soundScroll.value=value;
            }
        }
    }
}