const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const origin = urlParams.get('origin');
const destination = urlParams.get('destination');
const date = urlParams.get('date');

console.log(origin,destination,date)

let data = JSON.parse(window.localStorage.getItem("bus_list"))
document.getElementById("list").innerHTML=""
data.data.map(async (d) => {
    let objData = d.data;
    if(objData.origin ==origin && objData.destination ==destination){
        document.getElementById("list").innerHTML+=""

    }
})
