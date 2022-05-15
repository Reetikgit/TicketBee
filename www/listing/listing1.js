const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const origin = urlParams.get('origin');
const destination = urlParams.get('destination');
const date = urlParams.get('date');

console.log(origin,destination,date)
document.getElementById("origin_1").innerHTML=origin
document.getElementById("destination_1").innerHTML=destination
let data = JSON.parse(window.localStorage.getItem("bus_list"))
console.log(data)

data.map(async (d) => {
    let objData = d.data;
    console.log(objData.destination ,destination)
    if(objData.origin.toLowerCase() ==origin.toLowerCase() && objData.destination.toLowerCase() ==destination.toLowerCase()){
        let ac = "No"
        if(objData.ac){
            ac="Yes"
        }
        document.getElementById("list").innerHTML+=`
        <a onclick=goToBus("")  class="text-dark col-6 px-0">
          <div
            class="list_item_gird m-0 bg-white shadow-sm listing-item border-bottom border-right"
          >
            <div class="px-3 pt-3 tic-div">
              <div class="list-item-img">
                <img src="./../img/listing/BMTC-web.jpg" class="img-fluid" />
              </div>
              <p class="mb-0 l-hght-10">`+objData.bus_name+`</p>
              <div class="start-rating small">
                <i class="icofont-star text-danger"></i>
                <i class="icofont-star text-danger"></i>
                <i class="icofont-star text-danger"></i>
                <i class="icofont-star text-danger"></i>
                <i class="icofont-star text-muted"></i>
                <span class="text-dark">4.0</span>
              </div>
            </div>
            <div class="p-3 d-flex">
              <div class="bus_details w-100">
                <div class="d-flex">
                  <p>
                    <i class="icofont-wind mr-2 text-danger"></i
                    ><span class="small">AC : `+ac+`</span>
                  </p>
                  <p class="small ml-auto">
                    <i class="icofont-bus mr-2 text-danger"></i>2/1
                  </p>
                </div>
                <div class="d-flex l-hght-10">
                  <span
                    class="icofont-clock-time small mr-2 text-danger"
                  ></span>
                  <div>
                    <small class="text-muted mb-2 d-block">Journey Start</small>
                    <p class="small">`+objData.time+`</p>
                  </div>
                </div>
                <div class="d-flex l-hght-10">
                  <span
                    class="icofont-google-map small mr-2 text-danger"
                  ></span>
                  <div>
                    <small class="text-muted mb-2 d-block">From - To</small>
                    <p class="small mb-1">`+objData.origin+` To `+objData.destination+` </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
        `

    }else{
     
    }
})
