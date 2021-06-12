export class PlayerInfo{
    constructor(game){
        this.info=game.info;
        this.savedPlayer=game.savedPlayer;
    }

    getSavedPlayer(info,savedPlayer){
        if(document.cookie.length==0){

            var res;
            var f = new XMLHttpRequest();
                
            f.open("GET", "../Assets/playerInfo.txt", false);
            
            f.onreadystatechange = function (){
                if(f.readyState === 4 && f.status === 200 )
                {
                    res = f.responseText;
                    res=res.split(";");
                    for(var i=0;i<res.length;i++){
                        res[i]=res[i];
                    }
                }
            }
            f.send(null);
            info=res;//saves the variables of the player in this.info
            

        for(var i=0;i<this.info.length;i++){
                document.cookie = this.info[i] +"="+ 0 + " ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
        }

        var cookieText= document.cookie;
        var pairVariables = cookieText.split("; ");
        
        for(var i=0;i<pairVariables.length;i++){
            var variable = pairVariables[i].split("=");
            
            savedPlayer.push(variable[1]);//saves the value of the variables of the player in this.savedPlayer

        }
        }else {
            this.updateCookieInfo(info);
        }
       
    }
    

    updateCookieInfo(info){
        var cookies=document.cookie.split("; ");
        
        for(var i=0;i<cookies.length;i++){
            var variable = cookies[i].split("=");
            info[i]=variable[0];//updates info so that variables in info are at the same index as the variables in the cookies
            
        }
        console.log(info);
       
        
        
    }
    getCookie(cookieName,info){
        var name=cookieName;
        var index;

        for(var i=0;i<info.length;i++){
            if(info[i]==name){
                index=parseInt(i);
                return index;//returns the index of the variable name in info
            }
        }
        console.log(index);
        
    }
    updateCookies(cookieName,info,savedPlayer,value){
        var name=cookieName;
        var index=this.getCookie(name,info);
        document.cookie=info[index]+"="+value+" ;expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/";
    
}
}