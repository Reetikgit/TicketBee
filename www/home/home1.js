firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
  } else {
    window.location = "./../auth/get_started.html";
  }
});
let places_data;
const displayplaces = async (e) => {
  let Dbdata = await getDbCollData("places");
  places_data = Dbdata;
  Dbdata.data.map(async (d) => {
    let objData = d.data;
    document.getElementById("origin").innerHTML +=
      `
        <option value='` +
      objData.name +
      `' >` +
      objData.name +
      `</option>
            `;
    document.getElementById("destination").innerHTML +=
      `
            <option value='` +
      objData.name +
      `' >` +
      objData.name +
      `</option>
                `;

    //$("#destination :selected").remove()
  });

  let Dbdata2 = await getDbCollData("buses");
  window.localStorage.setItem("bus_list",JSON.stringify(Dbdata2.data))
};
setTimeout(function () {
  displayplaces();
}, 500);
$("#origin").change(function () {
  document.getElementById("destination").innerHTML = "";
  places_data.data.map(async (d) => {
    let objData = d.data;
    document.getElementById("destination").innerHTML +=
      `
    <option value='` +
      objData.name +
      `' >` +
      objData.name +
      `</option>
    `;
  });
  var index = $("#origin")[0].selectedIndex;
  console.log(index);
  $(`#destination option:eq(${index})`).remove();
});
// $("#destination").change(function () {
//     document.getElementById("origin").innerHTML = "";
//     places_data.data.map(async (d) => {
//       let objData = d.data;
//       document.getElementById("origin").innerHTML +=
//         `
//       <option value='` +
//         objData.name +
//         `' >` +
//         objData.name +
//         `</option>
//       `;
//     });
//   var index = $("#destination")[0].selectedIndex;
//   console.log(index);
//   $(`#origin option:eq(${index})`).remove();
// });
const form = document.querySelector("#search");
const search = async (e) => {
    e.preventDefault();
    let origin = document.getElementById("origin").value
    let destination= document.getElementById("destination").value
    let date= document.getElementById("dates").value
    window.open("./../listing/listing.html?origin="+ origin +"&destination="+ destination+"&date="+date);
  };
  form.addEventListener("submit", search);

