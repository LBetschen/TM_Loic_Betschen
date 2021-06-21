export class PlayerInfo{
    constructor(game){
        this.info;
        this.savedPlayer;
        
    }

    getSavedPlayer(info,savedPlayer,savedGame){
        
       
        if(document.cookie.length==0 || savedGame==false){
            savedGame=false;
            
            

                        
                        fetch("../Assets/cookieVariables.txt").then(Response => Response.text()).then((variables) => {
                            fetch("../Assets/cookieData.txt").then(Response => Response.text()).then((data) => {
                                
                                var dataRes=[];
                                var variableRes=[];
                                
                                dataRes=data.split(";");
                                variableRes=variables.split(";");
                                
                                for(var i=0;i<variableRes.length;i++){
                                    dataRes[i]=dataRes[i].replace(/(\r\n|\n|\r)/gm, "");
                                    savedPlayer[i]=dataRes[i];
                                    variableRes[i]=variableRes[i].replace(/(\r\n|\n|\r)/gm, "");
                                    info[i]=variableRes[i];
                                    document.cookie = info[i] +"="+ savedPlayer[i] + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
                                } 
                                
                                this.updateCookieInfo(info,savedPlayer);
                            });
                            
                           
                        });
                        
                    
                     
                        
                    
        }else{
            savedGame=true;
            this.updateCookieInfo(info,savedPlayer);
            console.log(document.cookie);
        }   
       
    }
    

    updateCookieInfo(info,savedPlayer,savedGame){
        var cookies=document.cookie.split("; ");
        for(var i=0;i<cookies.length;i++){
            var variables = cookies[i].split("=");
            info[i]=variables[0];//updates info so that variables in info are at the same index as the variables in the cookies
            savedPlayer[i]=variables[1]; 
             
        }   
        console.log(info);
        
    }

    getCookie(cookieName,info){
        var name=cookieName;
        var index=[];

        for(var i=0;i<info.length;i++){
            if(info[i]==name){
                index[0]=parseInt(i);
            }
        }
        console.log(document.cookie);
        var cookies=document.cookie.split("; ");//splits the cookie in pair variables placed in the array cookies
        console.log(cookies);
        var variables=cookies[index[0]].split("=");//splits the pair variables in to the variable and the value that are then placed in c
        index[1]=variables[0];
        index[2]=variables[1];          
        
        return index;//returns the index and the value of the variable name in info
    }

    changeCookie(cookieName,info,value){
        var name=cookieName;
        var c=this.getCookie(name,info);
        document.cookie=info[c[0]]+"="+value+" ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
        console.log(document.cookie);
        var cookies=document.cookie.split("; ");
        
        for(var i=0;i<cookies.length;i++){
            var variables = cookies[i].split("=");
            info[i]=variables[0];//updates info so that variables in info are at the same index as the variables in the cookies
            
        }
        console.log(document.cookie);
    }
}
