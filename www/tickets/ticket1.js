let data = JSON.parse(window.localStorage.getItem("tickets"));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pnr = urlParams.get("pnr");
console.log(pnr)
console.log(data)
let id;
let date;
data.map(async (d) => {
  let objData = d.data;
  console.log(objData.booking_data);
  let ticket_data = objData.booking_data;
 
  for (let i in ticket_data) {
    if (ticket_data[i].pnr == pnr) {
        id=ticket_data[i].bus_id
        date=ticket_data[i].date
      document.getElementById("list").innerHTML +=
        `
        <div class="your-ticket p-3">
        <h5 class="mb-3 font-weight-bold text-dark" id="bus_name">`+ticket_data[i].bus_name+`</h5>
        <p class="text-success mb-3 font-weight-bold">COMPLETED</p>
        <div
          class="bg-white border border-warning rounded-1 shadow-sm p-3 mb-3"
        >
          <div class="row mx-0 mb-3">
            <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">GOING FROM</small>
              <p class="small mb-0 l-hght-14" id="origin">`+ticket_data[i].origin+`</p>
            </div>
            <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">GOING TO</small>
              <p class="small mb-0 l-hght-14" id="destination">`+ticket_data[i].destination+`</p>
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">DATE OF JOURNEY</small>
              <p class="small mb-0 l-hght-14" id="date">`+ticket_data[i].date+`</p>
            </div>
            <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">YOU RATED</small>
              <p class="small mb-0 l-hght-14">
                <span class="icofont-star text-warning"></span> 3.5
              </p>
            </div>
          </div>
        </div>

        <div
          class="list_item d-flex col-12 m-0 p-3 bg-white shadow-sm rounded-1 shadow-sm mb-3"
          id="track"
        >
          <div class="d-flex mb-auto" >
            <span class="icofont-location-pin h4" ></span>
          </div>
          <div class="d-flex w-100">
            <div class="bus_details w-100 pl-3">
              <p class="mb-2 l-hght-18 font-weight-bold">
                Track your BMTC
              </p>
              <div class="d-flex align-items-center mt-2">
                <small class="text-muted mb-0 pr-1"
                  > <br />
                </small>
              </div>
            </div>
          </div>
        </div>
        <div
          class="list_item d-flex col-12 m-0 p-3 bg-white shadow-sm rounded-1 shadow-sm"
        >
          <div class="d-flex mb-auto">
            <img src="./../img/qr-code.png" class="img-fluid TicketBee-qr" />
          </div>
          <div class="d-flex w-100">
            <div class="bus_details w-100 pl-3">
              <p class="mb-2 l-hght-18 font-weight-bold">More info.</p>
              <div class="l-hght-10 d-flex align-items-center my-2">
                <small class="text-muted mb-0 pr-1">Passenger</small>
                <p class="small mb-0 ml-auto l-hght-14" id="u_name">`+ticket_data[i].name+`</p>
              </div>
              <div class="l-hght-10 d-flex align-items-center my-2">
                <small class="text-muted mb-0 pr-1">Ticket Number</small>
                <p class="small mb-0 ml-auto l-hght-14" id="ticket_no">`+ticket_data[i].ticket_num+`</p>
              </div>
              <div class="l-hght-10 d-flex align-items-center my-2">
                <small class="text-muted mb-0 pr-1">PNR Number</small>
                <p class="small mb-0 ml-auto l-hght-14" id="pnr">`+ticket_data[i].pnr+`</p>
              </div>
              <div class="l-hght-10 d-flex align-items-center mt-3">
                <p class="mb-0 pr-1 font-weight-bold">Amount Paid</p>
                <p
                  class="mb-0 ml-auto l-hght-14 text-danger font-weight-bold"
                  id="fare"
                >`+ticket_data[i].fare+` Rs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
});
function goTo(pnr) {
  window.location = "./ticket.html?pnr=" + pnr + "";
}

document.getElementById("track").addEventListener("click",function(){
    window.location="./../bus_details/bus_details.html?id="+id+"&date="+date+""
})