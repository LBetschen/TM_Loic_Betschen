export class PlayerProgress {
    constructor(game) {
        
        this.newPlayerProgress=[
            0,
            1,false,1,false,
            3,
            0,0,0,0,0,0,
            1,0,1,1,1,1,
            0,0,0,0,0,0,
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level1
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level2
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level3
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level4
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level5
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//level6
            [1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1]
            

        ];

        this.newPlayerVariables=[
            "name",
            "musicVolume","musicMuted","soundVolume","soundMuted",
            "playerLives",
            "level1finished","level2finished","level3finished","level4finished","level5finished","level6finished",
            "level1locked","level2locked","level3locked","level4locked","level5locked","level6locked",
            "level1score","level2score","level3score","level4score","level5score","level6score",
            "level1coins" ,
            "level1Checkpoints",
            "level1Enemies",
            "level1Hearts",
            "level2coins" ,
            "level2Checkpoints",
            "level2Enemies",
            "level2Hearts",
            "level3coins" ,
            "level3Checkpoints",
            "level3Enemies",
            "level3Hearts",
            "level4coins" ,
            "level4Checkpoints",
            "level4Enemies",
            "level4Hearts",
            "level5coins" ,
            "level5Checkpoints",
            "level5Enemies",
            "level5Hearts",
            "level6coins" ,
            "level6Checkpoints",
            "level6Enemies",
            "level6Hearts"

        ];

        this.playerVariables= new Array();
        this.playerProgress= new Array();

    }

    getSavedPlayer(game) {

        if (document.cookie.length == 0 ) {
            game.savedGame = true;
            
            for (var i = 0; i < this.newPlayerVariables.length; i++) { 
                    document.cookie = this.newPlayerVariables[i] + "=" +this.newPlayerProgress[i] + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
            }
            this.updatePlayerVariables();
        } else {
            game.savedGame = true;
            this.updatePlayerVariables();
        }
    }


    updatePlayerVariables() {
        var cookies = document.cookie.split("; ");
        
        for (var i = 0; i < cookies.length; i++) {
            var variables = cookies[i].split("=");
            this.playerVariables[i] = variables[0];//updates this.newPlayerVariables so that variables in this.newPlayerVariables are at the same index as the variables in the cookies
            this.playerProgress[i] = variables[1];
        }
    }

    getCookie(cookieName,newCookie) {
        var name = cookieName;
        var index = new Array();
        if(newCookie==false){
            for (var i = 0; i < this.playerVariables.length; i++) {
                if (this.playerVariables[i] == name) {
                    index[0] = i;
                }
            }
            var cookies = document.cookie.split("; ");//splits the cookie in pair variables placed in the array cookies
            var variables = cookies[index[0]].split("=");//splits the pair variables in to the variable and the value that are then placed in c
            index[1] = variables[0];
            index[2] = variables[1];
        }else{
            for (var i = 0; i < this.newPlayerVariables.length; i++) {
                if (this.newPlayerVariables[i] == name) {
                    index[0] = i;
                }
            }
            index[1]=this.newPlayerVariables[index[0]];
            index[2]=this.newPlayerProgress[index[0]];
        }
        return index;//returns the index and the value of the variable name in this.newPlayerVariables
    }
    
    

    changeCookie(cookieName, value) {
        var name = cookieName;
        var c = this.getCookie(name, false);
        document.cookie = this.playerVariables[c[0]] + "=" + value + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
        this.updatePlayerVariables();
        
    }
}
