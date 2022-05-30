firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // User is signed in.
    let Dbdata = await getDbData({
      collectionName: "users",
      docId: user.uid,
    });
    let data = Dbdata.data;

    if (data.emailVerified == true) {
      window.localStorage.setItem("user", user.uid);
      window.location = "./../home/home.html";
    } else {
      user
        .sendEmailVerification()
        .then(async function () {
          window.location = "./../auth/verification.html";
        })
        .catch(function (error) {
          alert(error);
        });
    }
    //  window.location = "./../employee/employee.html";
  } else {
    // User is signed out.
    // setTimeout(function () {
    //   document.getElementById("verifying").style.display = "none";
    // }, 300);
  }
});

const form = document.querySelector("#login");
const verify = async (e) => {
  document.getElementById("preloader").style.display = "block";
  e.preventDefault();
  let email = form["email"].value;
  let password = form["password"].value;
  let res = await login({ email: email, password: password });
  if (res.user) {
    if (email.includes("@driver.com")) {
      window.localStorage.setItem("user", email);
      window.localStorage.setItem("uid", res.user_data.user.uid );
      window.location="./../driver/driver.html"
    } else {
      window.localStorage.setItem("email", email);
      let uid = res.user_data.user.uid;
      let Dbdata = await getDbData({
        collectionName: "users",
        docId: uid,
      });
      let data = Dbdata.data;
      if (data.emailVerified == true) {
        window.localStorage.setItem("user", user.uid);
        document.getElementById("preloader").style.display = "none";
        window.location = "./../home/home.html";
      } else {
        document.getElementById("preloader").style.display = "none";
        firebase.auth().onAuthStateChanged(async function (user2) {
          if (user2) {
            user2
              .sendEmailVerification()
              .then(async function () {
                window.location = "./../auth/verification.html";
              })
              .catch(function (error) {
                alert(error);
              });
          }
        });
      }
    }
  } else {
    //User not found
    document.getElementById("preloader").style.display = "none";
    alert("Invalid Email ID or Password");
  }
};
form.addEventListener("submit", verify);
// setTimeout(function(){
//     document.getElementById("verifying").style.display = "block";
// },500)
