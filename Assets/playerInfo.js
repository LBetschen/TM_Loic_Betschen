export class PlayerInfo {
    constructor(game) {
        
        this.newPlayerProgress=[
            0,
            0,0,0,0,0,0,
            0,0,0,0,0,0,
            [1,1,1,1,1,1,1,1,1]

        ];

        this.newPlayerVariables=[
            "name",
            "level1finished","level2finished","level3finished","level4finished","level5finished","level6finished",
            "level1score","level2score","level3score","level4score","level5score","level6score",
            "level1coins"

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

    getCookie(cookieName) {
        var name = cookieName;
        var index = [];
       
        for (var i = 0; i < this.playerVariables.length; i++) {
            if (this.playerVariables[i] == name) {
                index[0] = i;
            }
        }

        var cookies = document.cookie.split("; ");//splits the cookie in pair variables placed in the array cookies
  
        var variables = cookies[index[0]].split("=");//splits the pair variables in to the variable and the value that are then placed in c
        index[1] = variables[0];
        index[2] = variables[1];

        return index;//returns the index and the value of the variable name in this.newPlayerVariables
    }

    changeCookie(cookieName, game, value) {
        var name = cookieName;
        var c = this.getCookie(name, this.playerVariables);
        document.cookie = this.playerVariables[c[0]] + "=" + value + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";

        var cookies = document.cookie.split("; ");

        for (var i = 0; i < cookies.length; i++) {
            var variables = cookies[i].split("=");
            this.playerVariables[i] = variables[0];//updates this.newPlayerVariables so that variables in this.newPlayerVariables are at the same index as the variables in the cookies

        }
    }
}
