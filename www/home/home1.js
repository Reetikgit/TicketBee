firebase.auth().onAuthStateChanged(async function (user) {
     
    if (user) {
   
    
    }else{
        window.location='./../auth/get_started.html'
    }
})