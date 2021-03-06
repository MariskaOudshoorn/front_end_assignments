fetch("/api/attractions")
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		console.log(data);
		getAttractions(data);
	})

function getAttractions(attractions){
	for(var counter of attractions){
		var template = document.getElementById("attraction").content.cloneNode(true);
		template.querySelector(".parkname").innerText = counter.name;
		template.querySelector(".parkdescription").innerText = counter.description;
		template.querySelector(".adultprice").innerHTML = "Adults: <span class='sign'> &euro;</span><span class='price'>" + counter.adultPrice + "</span>";
		template.querySelector(".kidsprice").innerHTML = "Kids: <span class='sign'> &euro;</span><span class='price'>" + counter.kidsPrice + "</span>";
		template.querySelector(".adults").innerText = counter.minimumNumberOfAdults;
		template.querySelector(".child").innerText = counter.minimumNumberOfKids;
		template.querySelector(".percentage").innerText = counter.discount;
		if(counter.available === 0){
			template.querySelector(".orderbutton").disabled = true;
			template.querySelector(".orderbutton").style.backgroundColor ="gray";
		}
		main.appendChild(template);
	}
	var buttonList = document.querySelectorAll(".orderbutton");
	buttonList.forEach(b => b.addEventListener("click", orderButtonClicked));
	var ticketAmountList = document.querySelectorAll(".numberofadults, .numberofkids");
	ticketAmountList.forEach(a => a.addEventListener("keyup", changeTotalDisplay))
}

function changeTotalDisplay(e){	
	const order = e.target.parentNode;
	const adultscat = order.getElementsByClassName("adultprice")[0];
	const kidscat = order.getElementsByClassName("kidsprice")[0];
	var adultPrice = parseInt(adultscat.getElementsByClassName("price")[0].innerText);
	var kidsPrice = parseInt(kidscat.getElementsByClassName("price")[0].innerText);
	var noAdults = order.getElementsByClassName("numberofadults")[0].value;
	noAdults = parseInt(noAdults);
	var noChild = order.getElementsByClassName("numberofkids")[0].value;
	noChild = parseInt(noChild);
	var totalPrice = (adultPrice * noAdults) + (kidsPrice * noChild);
	var minimimAdults = parseInt(order.getElementsByClassName("adults")[0].innerText);
	var minimumKids = parseInt(order.getElementsByClassName("child")[0].innerText);
	var discount = parseInt(order.getElementsByClassName("percentage")[0].innerText);
	if(noAdults >= minimimAdults & noChild >= minimumKids){
		totalPrice -= (totalPrice * (discount / 100));
	}
	var totalClass = order.getElementsByClassName("total")[0];
	var totalPriceElement = totalClass.getElementsByClassName("price")[0];
	totalPriceElement.innerText = totalPrice;
}

function orderButtonClicked(e){
	var attraction
	var noAdults
	var noChildren
	const order = e.target.parentNode;
	const article = order.parentNode;
	attraction = article.getElementsByClassName("parkname")[0].innerText;
	noAdults = article.getElementsByClassName("numberofadults")[0].value;
	noChildren = article.getElementsByClassName("numberofkids")[0].value;
	SaveOrderInShoppingBasket(attraction, noAdults, noChildren);
}

function SaveOrderInShoppingBasket(attraction, noAdults, noChildren){
	var getStorage = localStorage.getItem("event");
	if(!getStorage){
		getStorage = "";
	}
	var order = {parkname: attraction, numberofadults : noAdults, numberofkids : noChildren};
	localStorage.setItem("event", order.parkname + "," + order.numberofadults + "," + order.numberofkids + ":"  + getStorage);
	const basket = document.querySelector(".badge");
	var amountOfItems = parseInt(basket.textContent);
	amountOfItems = amountOfItems + parseInt(noAdults) + parseInt(noChildren);
	basket.textContent = amountOfItems.toString();
}

