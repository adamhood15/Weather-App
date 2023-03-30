var goBtn = $('#go-button');
var clearBtn = $('#clear-button')

var latLon = [];
var prevCities = [];

//Connect the API to retrieve weather data
function geoApiCall() {
    latLon = [];
    geoLocationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=a0334750ce53b3a2b2d0193e97ee40fc'

fetch (geoLocationUrl) 
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var lat = data[0].lat
        var lon = data[0].lon
        latLon.push(lat);
        latLon.push(lon);
      
        console.log(latLon);
    })

    var latitude = latLon[0];
    var longitude = latLon[1];

    weatherUrl = 'api.openweathermap.org/data/2.5/forecast?lat=29.5636&lon=95.2860&appid=a0334750ce53b3a2b2d0193e97ee40fc'

fetch (weatherUrl) 
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    })
}

function citySearch (event) {

    searchInput = $('#city-search').val();

    geoApiCall();

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