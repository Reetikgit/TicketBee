let data = JSON.parse(window.localStorage.getItem("tickets"));
console.log(data.length);
if (data.length == 0) {
  document.getElementById("list").innerHTML = `
   
    <div class="TicketBee-text text-center" style="margin-left:auto;margin-right:auto">
       <div class="TicketBee-img px-3 pb-1">
          <img src="./../img/no-buus.svg" class="img-fluid mb-1">
       </div>
       <h2 class="mb-3 font-weight-bold text-danger">No Tickets Booked</h2>
       <p class="lead small mb-0"></p>
    
  </div>
    `;
}
data.map(async (d) => {
  if (d._id == window.localStorage.getItem("user")) {
    let objData = d.data;

    let reversed_Arr = [];
    console.log(objData.booking_data);
    let ticket_data = objData.booking_data;
    for (let i = ticket_data.length - 1; i >= 0; i--) {
      reversed_Arr.push(ticket_data[i]);
    }
    console.log(reversed_Arr);
    ticket_data = reversed_Arr;

    for (let i in ticket_data) {
      let dob = ticket_data[i].date_of_booking.split(" ");
      document.getElementById("list").innerHTML +=
        `
        <div class="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
        <a onclick=goTo("` +
        ticket_data[i].pnr +
        `")>
           <div class="d-flex align-items-center mb-2">
              <small class="text-muted">Booked on - ` +
        dob[0] +
        " " +
        dob[1] +
        " " +
        dob[2] +
        ` </small>
              <small class="text-success ml-auto f-10">CONFIRMED</small>
           </div>
           <h6 class="mb-3 l-hght-18 font-weight-bold text-dark">` +
        ticket_data[i].bus_name +
        `<span style="font-size:10px;margin-left:2%;color:gray">(`+ticket_data[i].bus_no+`)</span></h6>
        </a>
        <div class="row mx-0 mb-3">
           <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">GOING FROM</small>
              <p class="small mb-0 l-hght-14">` +
        ticket_data[i].origin +
        `</p>
           </div>
           <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">TO</small>
              <p class="small mb-0 l-hght-14">` +
        ticket_data[i].destination +
        `</p>
           </div>
        </div>
        <div class="row mx-0">
           <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">DATE OF JOURNEY</small>
              <p class="small mb-0 l-hght-14">` +
        ticket_data[i].date +
        `</p>
           </div>
           <div class="col-6 p-0">
              <small class="text-muted mb-1 f-10 pr-1">YOU RATED</small>
              <p class="small mb-0 l-hght-14"> <a class="text-success font-weight-bold" href="./../customer-feedback.html">RATE NOW</a></p>
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
