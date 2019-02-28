const express = require('express');
const app = express();
/** Host alle bestanden in de client folder als static resources */
app.use(express.static('client'));

app.use(express.json());

const attractions = [
    { 
        name: "De Efteling",
        description: "The Dutch fairy tale themed park. In high demand!",
        adultPrice: 32,
        kidsPrice: 32,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 1,
        discount: 15,
        available: 1,
        location: { lon: 5.043689, lat: 51.649718, },
    },

    { 
        name: "Madurodam",
        description: "The Netherlands smallest theme park.",
        adultPrice: 25,
        kidsPrice: 20,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 2,
        discount: 25,
        available: 5,
        location: { lat: 52.0994779, lon: 4.299619900000039 },
    },

    { 
        name: "Toverland",
        description: "Experience magic and wonder.",
        adultPrice: 30,
        kidsPrice: 30,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 2,
        discount: 33,
        available: 3,
        location: { lat: 52.0994779, lon: 4.299619900000039 },
    },

    { 
        name: "Walibi Holland",
        description: "Need an Adrenaline Rush?",
        adultPrice: 37,
        kidsPrice: 37,
        minimumNumberOfAdults: 4,
        minimumNumberOfKids: 0,
        discount: 10,
        available: 20,
        location: { lon: 5.766986, lat: 52.438554, },
    },
    
    { 
        name: "Duinrell",
        description: "From the Kikkerbaan to the Tikibad.",
        adultPrice: 22,
        kidsPrice: 19,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 3,
        discount: 7,
        available: 20,
        location: { lon: 4.383922, lat: 52.147433, },
    }, 

    { 
        name: "Slagharen",
        description: "Fun for the whole family in a true western style.",
        adultPrice: 28,
        kidsPrice: 20,
        minimumNumberOfAdults: 2,
        minimumNumberOfKids: 2,
        discount: 50,
        available: 2,
        location: { lat: 52.6249522, lon: 6.563149500000009 },
    }, 

    { 
        name: "Drievliet",
        description: "Come and experience our wonderful attractions.",
        adultPrice: 26,
        kidsPrice: 24,
        minimumNumberOfAdults: 1,
        minimumNumberOfKids: 2,
        discount: 25,
        available: 0,
        location: { lon: 4.352633, lat: 52.052608, },
    }, 
]

var boughtTickets = [];

app.get("/api/attractions", (request, response) => {
    console.log("Api call received for /attractions");
    response.json(attractions)
})

app.post("/api/tickets", (request, response) => {
    console.log("Api call received for /placeorder");
    response.json(attractions)
})

app.post("/api/placeorder", (request, response) => {
    console.log("Api call received for /placeorder");
    console.log(request.body);
    buyTickets(request.body);
    response.sendStatus(200);
});

app.get("/api/myorders", (request, response) => {
    console.log("Api call received for /myorders");
    response.sendStatus(200);
});

app.get("/api/admin/edit", (request, response) => {
    console.log("Api call received for /admin/edit");
    response.sendStatus(200);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));

function buyTickets(eventlist){
    console.log(eventlist);
    for(var event = 0; event < eventlist.length; event++){
        eventlist[event] = eventlist[event].toLowerCase();
        var index = attractions.findIndex(x => x.name.toLowerCase() === eventlist[event]);
        attractions[index].available = attractions[index].available - 1;
    }
}