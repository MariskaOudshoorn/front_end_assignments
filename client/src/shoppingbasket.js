var storage = localStorage.getItem("event");
var multipleParks = storage.split(":");
for(var i =0; i < (multipleParks.length -1); i++){
	var parkInfo = multipleParks[i].split(",");
	var parkname = parkInfo[0];
	var noAdults = parseInt(parkInfo[1]);
	var noKids = parseInt(parkInfo[2]);
	console.log(parkname);
	console.log(noAdults);
	fillTemplate(parkname, noAdults, noKids);
}

function fillTemplate(parkname, noAdults, noKids){
	var template = document.getElementById("ticket").content.cloneNode(true);
	template.querySelector(".eventname").innerText = parkname;
	template.querySelector(".numberofadults").innerText = noAdults;
	template.querySelector(".numberofchildren").innerText = noKids;
	main.insertBefore(template, finalizepaymentbutton);	
}

var finalizeButton = document.querySelector(".finalizepaymentbutton");
finalizeButton.addEventListener("click", finalizePayment);

function finalizePayment(e){
	fetch(api/placeorder)
		.then(localStorage.clear());
		then(window.location.href = "orderplaced.html");
}