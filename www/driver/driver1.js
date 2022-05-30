

firebase.auth().onAuthStateChanged(async function (user) {
 
    if (user) {
        console.log(user)
    }else{
        
        window.location="./../auth/login.html"
    }
})
document.getElementById("list").innerHTML += `

<div class="TicketBee-text text-center" style="margin-left:auto;margin-right:Auto">
   <div class="TicketBee-img px-3 pb-1">
      <img src="./../img/driver.png" class="img-fluid mb-1">
   </div>
   <h2 class="mb-3 font-weight-bold text-danger" id="bus_name"></h2>
   <p class="lead small mb-0">Leave sooner, drive slower, live longer</p>

   <a id="drive_now" class="btn btn-warning px-5 TicketBee-btn rounded-1 mt-4">Start Driving</a>
   <a id="stop_now" style="display:none" class="btn btn-danger px-5 TicketBee-btn rounded-1 mt-4">Stop Driving</a>

</div>
`;
setTimeout(async function(){
    let Dbdata = await getDbData({
        collectionName: "drivers",
        docId: window.localStorage.getItem("uid"),
    });
    let data = Dbdata.data;
    document.getElementById("driver_name").innerHTML=" - "+ data.name
    let Dbdata2 = await getDbData({
        collectionName: "buses",
        docId: data.bus_id,
    });
    window.localStorage.setItem("bus_id", data.bus_id)
    let data2 = Dbdata2.data;
    document.getElementById("origin_1").innerHTML=data2.origin
    document.getElementById("destination_1").innerHTML=data2.destination
    
},200)
document.getElementById("logout").addEventListener("click",function(){
    logout();
})
document.getElementById("drive_now").addEventListener("click",function(){

    async function onSuccess(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        // var element = document.getElementById('geolocation');
        // element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
        //                     'Longitude: ' + position.coords.longitude     + '<br />' +
        //                     '<hr />'      + element.innerHTML;

        let data = {
           longitude:position.coords.longitude,
           latitude:position.coords.latitude,
          };
          let res = await updateDbDoc({
            collectionName: "buses",
            docId: window.localStorage.getItem("bus_id"),
            dataToUpdate: data,
          }).then(function () {
            document.getElementById("drive_now").style.display="none"
            document.getElementById("stop_now").style.display="block"
          })
        
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 15000, enableHighAccuracy: true });

})
document.getElementById("stop_now").addEventListener("click",function(){
    async function onSuccess(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        // var element = document.getElementById('geolocation');
        // element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
        //                     'Longitude: ' + position.coords.longitude     + '<br />' +
        //                     '<hr />'      + element.innerHTML;

      
        
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID2 = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    navigator.geolocation.clearWatch(watchID2);

    document.getElementById("drive_now").style.display="block"
    document.getElementById("stop_now").style.display="none"

})