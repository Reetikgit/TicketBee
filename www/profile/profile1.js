setTimeout(function () {
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      document.getElementById("email")
        ? (document.getElementById("email").value = user.email)
        : "..";
    } else {
      window.location = "./../auth/get_started.html";
    }
  });
  getData();
}, 500);

const form = document.querySelector("#profile");
const update = async (e) => {
  e.preventDefault();

  let name = form["name"].value;
  let number = form["number"].value;
  let address = form["address"].value;
  let gender = document.getElementById("Male").checked ? "male" : "female";

  document.getElementById("preloader").style.display = "block";

  let data = {
    name: name,
    number: number,
    address: address,
    gender: gender,
  };
  let res = await updateDbDoc({
    collectionName: "users",
    docId: window.localStorage.getItem("user"),
    dataToUpdate: data,
  }).then(function () {
    window.localStorage.setItem("name", name);
    $("#successModal").modal("show");
    getData();
    document.getElementById("preloader").style.display = "none";
  });
};
form.addEventListener("submit", update);
document.getElementById("close").addEventListener("click", function () {
  $("#successModal").modal("hide");
});
async function getData() {
  let Dbdata = await getDbData({
    collectionName: "users",
    docId: window.localStorage.getItem("user"),
  });
  let data = Dbdata.data;

  form["name"].value = data.name ?data.name:"";
  form["number"].value = data.number;
  form["address"].value = data.address ? data.address:"";
  form["email"].value = data.email;
  if (data.gender == "male") {
    document.getElementById("Male").checked = true;
  } else {
    document.getElementById("Female").checked = true;
  }
}
