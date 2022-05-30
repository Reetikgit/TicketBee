const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const date = urlParams.get('date');

let origin,destination;

let data = JSON.parse(window.localStorage.getItem("bus_list"))

data.map(async (d) => {
    let objData = d.data;
    if(d._id == id){
        let ac = "No"
        if(objData.ac){
            ac="Yes"
        }
        origin=objData.origin;
        destination=objData.destination
        document.getElementById("list").innerHTML+=`
        <div class="px-3 py-3 tic-div border-bottom d-flex">
               <img src="./../img/listing/BMTC-web.jpg" class="img-fluid border rounded p-1 shape-img mr-3">
               <div class="w-100">
                  <h6 class="my-1 l-hght-18 font-weight-bold">`+objData.bus_name+`</h6>
                  <div class="start-rating f-10">
                     <i class="icofont-star text-danger"></i>
                     <i class="icofont-star text-danger"></i>
                     <i class="icofont-star text-danger"></i>
                     <i class="icofont-star text-danger"></i>
                     <i class="icofont-star text-muted"></i>
                     <span class="text-dark">4.0</span>
                     <div class="d-flex mt-2">
                        <p class="m-0"><i class="icofont-google-map mr-1 text-danger"></i><span class="small">`+objData.origin+` To `+objData.destination+`</span></p>
                        <p class="small ml-auto mb-0"><i class="icofont-bus mr-1 text-danger"></i>`+objData.fare+` Rs</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="bg-white p-3">
               <div class="row mx-0 mb-3">
                  <div class="col-6 p-0">
                     <small class="text-muted mb-1 f-10 pr-1">Seat Available</small>
                     <p class="small mb-0 l-hght-14">Yes</p>
                  </div>
                  <div class="col-6 p-0">
                     <small class="text-muted mb-1 f-10 pr-1">AC</small>
                     <p class="small mb-0 l-hght-14">`+ac+`</p>
                  </div>
               </div>
               <div class="row mx-0 mb-3">
                  <div class="col-6 p-0">
                     <small class="text-muted mb-1 f-10 pr-1">Total Stops</small>
                     <p class="small mb-0 l-hght-14">10</p>
                  </div>
                  <div class="col-6 p-0">
                     <small class="text-muted mb-1 f-10 pr-1">Safety Features</small>
                     <p class="small mb-0 l-hght-14"> Sanitized, Masks</p>
                  </div>
               </div>
             
            </div>
        `

    }
})
document.getElementById("book_seat").addEventListener("click",function(){
    window.location="./../select_seat/select_seat.html?id="+id+"&date="+date+""
})
document.getElementById("step_back").addEventListener("click", function () {
    window.location ="./../listing/listing.html?origin="+ origin +"&destination="+ destination+"&date="+date+"";
  });