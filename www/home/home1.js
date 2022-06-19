firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
  } else {
    window.location = "./../auth/get_started.html";
  }
});
document.getElementById("preloader").style.display = "block";
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
  document.getElementById("preloader").style.display = "none";
  let Dbdata2 = await getDbCollData("buses");
  let Dbdata3 = await getDbCollData("tickets");
  window.localStorage.setItem("bus_list", JSON.stringify(Dbdata2.data));
  window.localStorage.setItem("tickets", JSON.stringify(Dbdata3.data));
};
const linearRegression = async (e) => {
  let Dbdata = await getDbCollData("ML_DATA");
  Dbdata.data.map(async (d) => {
    
    if (d._id == window.localStorage.getItem("user")) {

      let objData = d.data;
      if(Object.keys(objData).length>0){
        const duplicateIds = objData.data
        .map((v) => v.id)
        .filter((v, i, vIds) => vIds.indexOf(v) !== i);
      const duplicates = objData.data.filter((obj) =>
        duplicateIds.includes(obj.id)
      );
      console.log(duplicates);
      let counts = {};
      duplicates.forEach((x) => {
        console.log(x)
        counts[x.id] = (counts[x.id] || 0) + 1;
      });
      console.log(counts)
      let k = Object.keys(counts)
      let isMl=0;
      for(let j in k){
      
        let key = (k[j])
        console.log(key)
        if(counts[key]>=3){
          isMl++;
          let key_src= key.split("**")[0]
          let key_dest= key.split("**")[1]
          document.getElementById("suggestions").innerHTML+= `
          <div class="col-5">
            <div class="card card-block card-1" onclick=searchBus("`+key_src.replace(/\s+/g,'*').trim()+`","`+key_dest.replace(/\s+/g,'*').trim()+`")>
              <span style="color: green;font-weight: bolder;margin:5%;"> BMTC</span>
              <span style="margin-left: 4%;font-weight: 600;">`+key_src+` - `+key_dest+`</span>
            </div>
          </div>
          `
        }
      }
      if(isMl==0){
        document.getElementById("ML_PART").display="hidden"
      } 
      }
     
      
    }

    //$("#destination :selected").remove()
  });
  document.getElementById("preloader").style.display = "none";
  let Dbdata2 = await getDbCollData("buses");
  let Dbdata3 = await getDbCollData("tickets");
  window.localStorage.setItem("bus_list", JSON.stringify(Dbdata2.data));
  window.localStorage.setItem("tickets", JSON.stringify(Dbdata3.data));
};
setTimeout(function () {
  displayplaces();
  linearRegression();
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
  let origin = document.getElementById("origin").value;
  let destination = document.getElementById("destination").value;
  let date = document.getElementById("dates").value;
  let ml_Data = [];
  let ml_data = JSON.parse(window.localStorage.getItem("ML_DATA"));
  console.log(ml_data);
  if (ml_data != null)
    ml_data.map(async (d) => {
      if (d._id == window.localStorage.getItem("user")) {
        let objData2 = d.data;

        for (let i in objData2.data) {
          ml_Data.push(objData2.data[i]);
        }
      }
    });
  console.log(ml_Data);
  let data = {
    origin: origin,
    destination: destination,
    date: date,
    id: origin + "**" + destination,
  };
  ml_Data.push(data);
  let res = await setDbData({
    collectionName: "ML_DATA",
    docId: window.localStorage.getItem("user"),
    dataToUpdate: { data: ml_Data },
  });
  let Dbdata3 = await getDbCollData("ML_DATA");

  window.localStorage.setItem("ML_DATA", JSON.stringify(Dbdata3.data));
  window.open(
    "./../listing/listing.html?origin=" +
      origin +
      "&destination=" +
      destination +
      "&date=" +
      date
  );
};
form.addEventListener("submit", search);
function searchBus(src,dest){
  let source=(src.replace('*',' ').trim())
  let destination=(dest.replace('*',' ').trim())
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  let date= year+"-"+month+"-"+day;
  window.open(
    "./../listing/listing.html?origin=" +
      source +
      "&destination=" +
      destination +
      "&date=" +
      date
  );
}
