export class PlayerInfo{
    constructor(game){
     
        
    }

    getSavedPlayer(info,savedPlayer,savedGame){
       
        if(document.cookie.length==0){
            for(var i=0;i<2;i++){
                var res;
                var f = new XMLHttpRequest();
                switch (i){
                    case 0:
                        f.open("GET", "./cookieVariables.txt", false);
                        break;
                    case 1:
                        f.open("GET","./cookieVariables.txt",false);
                        break;
                }
                
                f.onreadystatechange = function (){
                    if(f.readyState === 4 && f.status === 200 )
                    {
                        res = f.responseText;
                        res=res.replace(/(\r\n|\n|\r)/gm,"");
                        res=res.split(";");
                        for(var i=0;i<res.length;i++){
                            res[i]=res[i];
                        }
                    }
                }
                f.send(null);
                switch (i){
                    case 0:
                        info=res;//saves the variables of the player in info¨
                        break;
                    case 1:
                        savedPlayer=res;//saves the data of the player in savedPlayer
                        break;
                }
            }
            for(var i=0;i<info.length;i++){
                    document.cookie = info[i] +"="+ savedPlayer[i] + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
            }

            
            console.log(false);

        }else{
            
            this.updateCookieInfo(info,savedGame);
            
            
        }
       
       
    }
    

    updateCookieInfo(info,savedGame){
        var cookies=document.cookie.split("; ");
        for(var i=0;i<cookies.length;i++){
            var variables = cookies[i].split("=");
            info[i]=variables[0];//updates info so that variables in info are at the same index as the variables in the cookies  
        }   
        
    }

    getCookie(cookieName,info){
        var name=cookieName;
        var c=[];

        for(var i=0;i<info.length;i++){
            if(info[i]==name){
                c[0]=parseInt(i);
            }
        }
        var cookies=document.cookie.split("; ");//splits the cookie in pair variables placed in the array cookies
        var variables=cookies[c[0]].split("=");//splits the pair variables in to the variable and the value that are then placed in c
        c[1]=variables[0];
        c[2]=variables[1];          
        
        return c;//returns the index and the value of the variable name in info
    }

    updateCookies(cookieName,info,value){
        var name=cookieName;
        var c=this.getCookie(name,info);
        document.cookie=info[c[0]]+"="+value+" ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";

        var cookies=document.cookie.split("; ");
        
        for(var i=0;i<cookies.length;i++){
            var variables = cookies[i].split("=");
            info[i]=variables[0];//updates info so that variables in info are at the same index as the variables in the cookies
            
        }
        console.log(document.cookie);
    }
}
