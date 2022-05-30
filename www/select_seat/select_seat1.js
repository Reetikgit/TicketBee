const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const date = urlParams.get("date");
let data = JSON.parse(window.localStorage.getItem("bus_list"));
let u_name;
let fare;
let mobile;
let email;
let address;
let booking_data=[];
let pnr_1;
let ticket_data= JSON.parse(window.localStorage.getItem("tickets"));
ticket_data.map(async (d) => {
    console.log(d._id)
    if(d._id==window.localStorage.getItem("user")){
        let objData2 = d.data;
        console.log(objData2)
        for (let i in objData2.booking_data){
            if(objData2.booking_data[i].user_id == window.localStorage.getItem("user"))
            booking_data.push(objData2.booking_data[i])
        }
    }
   

})
document.getElementById("preloader").style.display = "block";
data.map(async (d) => {
  let objData = d.data;
  if (d._id == id) {
    document.getElementById("otd").innerHTML =
      objData.origin + " To " + objData.destination;
    let get_user_name = await getDbData({
      collectionName: "users",
      docId: window.localStorage.getItem("user"),
    });
    let current_data = get_user_name.data;
    console.log(current_data);
    if(!current_data.name){
        current_data.name=current_data.email
    }
    document.getElementById("user").innerHTML = current_data.name;
    document.getElementById("fare").innerHTML = "Rs " + objData.fare;
    document.getElementById("fare1").innerHTML = objData.fare;
    let ticket_num =
      "T" +
      Math.floor(Math.random() * 1000 + 1) +
      "_" +
      Math.floor(Math.random() * 100 + 1);
    let pnr =
      Math.floor(Math.random() * 100000 + 1) +
      Math.floor(Math.random() * 10000 + 1).toString();
    document.getElementById("ticket_no").innerHTML = ticket_num;
    document.getElementById("pnr").innerHTML = pnr;
    let datas = {
      name: current_data.name,
      bus_name: objData.bus_name,
      date: date,
      bus_id: id,
      user_id: window.localStorage.getItem("user"),
      fare: objData.fare,
      origin: objData.origin,
      destination: objData.destination,
      ticket_num: ticket_num,
      pnr: pnr,
      coupen: "no",
      bus_no:objData.bus_no,
      date_of_booking : new Date().toString()
    };
    booking_data.push(datas)
    
    u_name=current_data.name;
    fare=objData.fare;
    email=current_data.email;
    mobile=current_data.number
    address=current_data.address;
    pnr_1=pnr;
    window.localStorage.setItem("booking_data", JSON.stringify(booking_data));
    document.getElementById("preloader").style.display = "none";
    console.log(booking_data)
   
  }
});
document.getElementById("step_back").addEventListener("click", function () {
  window.location =
    "./../bus_details/bus_details.html?id=" + id + "&date=" + date + "";
});

document.getElementById("paymentclick").addEventListener("click", function () {
  var options = {
    key: "rzp_test_mopXY6bqLYwWov",
    amount:fare*100, // Example: 2000 paise = INR 20
    name: "TicketBee",
    description: "Pay and Book Ticket",
    image: "img/logo.png", // COMPANY LOGO
    handler: async function (response) {
      console.log(response);
      // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
      let res = await  setDbData({
        collectionName: "tickets",
        docId: window.localStorage.getItem("user"),
        dataToUpdate: { booking_data: booking_data }
      });
      let Dbdata3 = await getDbCollData("tickets");
     
      window.localStorage.setItem("tickets",JSON.stringify(Dbdata3.data))
    
      $("#paymentModal").modal("show");
    },
    prefill: {
      name: u_name, // pass customer name
      email: email, // customer email
      contact: mobile, //customer phone no.
    },
    notes: {
      address: address, //customer address
    },
    theme: {
      color: "brown", // screen color
    },
  };
  var propay = new Razorpay(options);
  propay.open();
});
document.getElementById("check_tkt").addEventListener("click", function () {
    document.getElementById("preloader").style.display = "block";
    setTimeout(function(){

        window.location="./../tickets/ticket.html?pnr="+pnr_1+""
    },1000)
    
})