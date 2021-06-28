export class PlayerInfo {
    constructor(game) {
        

    }

    getSavedPlayer(game) {


        if (document.cookie.length == 0 || game.savedGame == false) {
            game.savedGame = false;
            


            var variableRes = [];

           fetch("../Assets/cookieVariables.txt").then(Response => Response.text()).then((variables) => {
                variableRes = variables.split(";");
                
            });
            
            for (var i = 0; i < variableRes.length; i++) { 
                variableRes[i] = variableRes[i].replace(/(\r\n|\n|\r)/gm, "");
                game.info[i] = variableRes[i];
            }
            console.log(game.info);
            
            fetch("../Assets/cookieData.txt").then(Response => Response.text()).then((data) => {  
                var dataRes = []; 
                dataRes = data.split(";");
                for (var i = 0; i < dataRes.length; i++) {
                    dataRes[i] = dataRes[i].replace(/(\r\n|\n|\r)/gm, "");
                    game.savedPlayer[i] = dataRes[i];
                 }
            });

            for (var i = 0; i < game.info.length; i++) { 
                    document.cookie = game.info[i] + "=" + game.savedPlayer[i] + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
            }
            console.log(game.info);




        } else {
            game.savedGame = true;
            this.updateCookieInfo(game.info, game.savedPlayer);

        }

    }


    updateCookieInfo(game) {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var variables = cookies[i].split("=");
            game.info[i] = variables[0];//updates game.info so that variables in game.info are at the same index as the variables in the cookies
            game.savedPlayer[i] = variables[1];

        }


    }

    getCookie(cookieName, game) {
        var name = cookieName;
        var index = [];
        //game.info does not work
        console.log(game.info[2]);
        for (var i = 0; i < game.info.length; i++) {
            if (game.info[i] == "name") {
                console.log("yep");
                index[0] = i;
            }
        }

        var cookies = document.cookie.split("; ");//splits the cookie in pair variables placed in the array cookies
        
    console.log(index[0] );
        var variables = cookies[index[0]].split("=");//splits the pair variables in to the variable and the value that are then placed in c
        index[1] = variables[0];
        index[2] = variables[1];

        return index;//returns the index and the value of the variable name in game.info
    }

    changeCookie(cookieName, game, value) {
        var name = cookieName;
        var c = this.getCookie(name, game.info);
        document.cookie = game.info[c[0]] + "=" + value + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";

        var cookies = document.cookie.split("; ");

        for (var i = 0; i < cookies.length; i++) {
            var variables = cookies[i].split("=");
            game.info[i] = variables[0];//updates game.info so that variables in game.info are at the same index as the variables in the cookies

        }

    }
}
