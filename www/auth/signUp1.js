const form = document.querySelector("#signUp");
const signUp = async (e) => {
  e.preventDefault();
 
  let email = form["email"].value;
  let password = form["password"].value;
  let c_password = form["c_password"].value;
  if (password == c_password) {
    document.getElementById("preloader").style.display="block"
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        firebase.auth().onAuthStateChanged(async function (user) {
          if (user) {
            user
              .sendEmailVerification()
              .then(async function () {
                // Email sent.
                email = user.email;
                emailVerified = user.emailVerified;
                uid = user.uid;  
                let data={
                    email:email,
                    emailVerified:user.emailVerified,
                    uid:user.uid
                }
                let res = await setDbData({
                    collectionName: "users",
                    docId: user.uid,
                    dataToUpdate: data,
                }).then(function(){
                    window.localStorage.setItem("user", user.uid);
                    window.localStorage.setItem("email_verified", "false");
                    window.location="./../auth/verification.html"
                    document.getElementById("preloader").style.display="none"
                });

              })
              .catch(function (error) {
                // An error happened.
                document.getElementById("preloader").style.display="none"
              });
          }
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage)
        document.getElementById("preloader").style.display="none"
      });
  } else {
    alert("Password Missmatched");
  }

};
form.addEventListener("submit", signUp);
