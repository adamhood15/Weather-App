var goBtn = $('#go-button');
var clearBtn = $('#clear-button')

var prevCities = [];

//Connect the API to retrieve weather data
//Gives latitude and longitude of city based on zip code
function geoApiCall(cityZip) {

    latLon = [];
    geoLocationUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + cityZip + '&appid=a0334750ce53b3a2b2d0193e97ee40fc'

fetch (geoLocationUrl) 
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        var lat = data.lat
        var lon = data.lon
        weatherApiCall(lat, lon);
    })

}

function weatherApiCall(lat, lon) {
weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=a0334750ce53b3a2b2d0193e97ee40fc&units=imperial'


fetch (weatherUrl) 
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        console.log(data.list);
    })

}

function citySearch (event) {

    searchInput = $('#city-search').val();

    geoApiCall(searchInput);

}
//Need to add api link when finished.
// function createCityBtn() {

//     for (i = 0; i < prevCities.length; i++) {

//         var cityBtnSection = $('#saved-cities');
//         var cityBtn = $("<button></button>").text(prevCities[i]);
        
//         cityBtn.addClass('bg-gray-200 border-2 border-grey-300 rounded m-2 p-1 city');

//     }

//     cityBtnSection.append(cityBtn);

// }

function clearCities() {

    $('.city').remove();

}
//Go button will initiate the API call

//The API call will automatically update the City name, icon, and weather forecast for all weather cards

//A new city button will display at the top so that you can click and view the previous cities you have viewed

//Add event listener for buttons
goBtn.on('click', citySearch);
clearBtn.on('click', clearCities);