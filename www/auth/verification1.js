const form = document.querySelector("#verify");
const verify = async (e) => {
  e.preventDefault();
  window.location.reload();
  document.getElementById("preloader").style.display = "block";
};

firebase.auth().onAuthStateChanged(async function (user) {
  document.getElementById("preloader").style.display = "block";
  if (user) {
    if (user.emailVerified == true) {
      let data = {
        emailVerified: user.emailVerified,
      };
      let res = await updateDbDoc({
        collectionName: "users",
        docId: user.uid,
        dataToUpdate: data,
      }).then(function () {
        window.localStorage.setItem("email_verified", "true");
        window.location = "./../home/home.html";
      });
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("btnTxt").innerHTML = "Not Verified";
      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("btnTxt").innerHTML = "Continue";
      }, 2000);
    }
  }
});
document.getElementById("resend").addEventListener("click", function () {
  document.getElementById("preloader").style.display = "block";
  firebase.auth().onAuthStateChanged(async function (user1) {
    if (user1) {
      user1
        .sendEmailVerification()
        .then(async function () {
          // Email sent.

          console.log("email sent");
          document.getElementById("preloader").style.display = "none";
          alert("Email Sent Successfully");
        })
        .catch(function (error) {
          // An error happened.
          alert(error);
          document.getElementById("preloader").style.display = "none";
        });
    }
  });
});

form.addEventListener("submit", verify);
