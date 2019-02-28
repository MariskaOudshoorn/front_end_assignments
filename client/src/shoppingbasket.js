var nameList = [];
var storage = localStorage.getItem("event");
var multipleParks = storage.split(":");
for(var i =0; i < (multipleParks.length -1); i++){
	var parkInfo = multipleParks[i].split(",");
	var parkname = parkInfo[0];
	var noAdults = parseInt(parkInfo[1]);
	var noKids = parseInt(parkInfo[2]);
	fillTemplate(parkname, noAdults, noKids);
}

function fillTemplate(parkname, noAdults, noKids){
	var template = document.getElementById("ticket").content.cloneNode(true);
	template.querySelector(".eventname").innerText = parkname;
	template.querySelector(".numberofadults").innerText = noAdults;
	template.querySelector(".numberofchildren").innerText = noKids;
	main.insertBefore(template, finalizepaymentbutton);	
}

function parkNameList(){
	for(var i =0; i < (multipleParks.length -1); i++){
		var parkInfo = multipleParks[i].split(",");
		var parkName = parkInfo[0];
		nameList.push(parkName);
	}
}

var finalizeButton = document.querySelector("#finalizepaymentbutton");
parkNameList();
finalizeButton.addEventListener("click", finalizePayment);

function finalizePayment(e){
	fetch("api/placeorder" , {
			method: 'POST',
			body: JSON.stringify(nameList),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(response){
			if(!response.ok){
				throw Error(response.statusText);
			}
			return response;
		}).then(window.location.href = "orderplaced.html")
		.then(localStorage.clear());
		
}

fetch("/api/attractions")
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		console.log(data);
	})
