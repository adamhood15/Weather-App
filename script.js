var goBtn = $('#go-button');

var prevCities = [];

//Connect the API to retrieve weather data

//Search for a city using the search bar
function citySearch (event) {

    var city = $('#city-search').val();

    if (localStorage.getItem('city')) {

        prevCities.push(localStorage.getItem('city'));
        localStorage.setItem('city', city);
    
    } else {

        localStorage.setItem('city', city);
        prevCities.push(localStorage.getItem('city'));

    }

}

//Go button will initiate the API call

//The API call will automatically update the City name, icon, and weather forecast for all weather cards

//A new city button will display at the top so that you can click and view the previous cities you have viewed

//Add event listener for buttons
goBtn.on('click', citySearch);