var buttonList = document.querySelectorAll(".orderbutton");
buttonList.forEach(b => b.addEventListener("click", orderButtonClicked));

function orderButtonClicked(e){
	console.log("click");
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
