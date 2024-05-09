
        let UserCreds = JSON.parse(sessionStorage.getItem("user-cred"));
        let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    
        let MsgHead = document.getElementById("msg");
        let GreetHead = document.getElementById("greet");
        let signoutButton = document.getElementById("signOutButton");
       
        let signOut = () =>{
            sessionStorage.removeItem("user-cred");
            sessionStorage.removeItem("user-info");
            sessionStorage.clear();
            window.location.href = "Ranking";
        }

        let CheckCred = () =>{
            if(!sessionStorage.getItem("user-creds"))
                window.location.href = "login"
            else{
                GreetHead.innerText = 'welcome '+UserCreds.firstname; 
            }

        }

        window.addEventListener("load",CheckCred);
        signoutButton.addEventListener("click",signOut);
