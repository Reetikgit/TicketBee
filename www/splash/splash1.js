setTimeout(function () {
  let user = window.localStorage.getItem("user");
  let email_verified = window.localStorage.getItem("email_verified");
  console.log(user);
  if (user!="") {
    if(email_verified && email_verified=="true"){
        window.location = "./../home/home.html";
    }else if(user==undefined || user == null){
        window.location = "./../information/info.html";
    }else{
        window.location = "./../auth/verification.html";
    }

  } else if (user == null) {
    window.location = "./../information/info.html";
  } else {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        window.localStorage.setItem("user", user.uid);
        window.location = "./../home/home.html";
      } else {
        window.location = "./../auth/get_started.html";
      }
    });
  }
}, 2000);
