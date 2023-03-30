var goBtn = $('#go-button');
var clearBtn = $('#clear-button');
var todayWeather = $('#city-card-0');
var weatherCards = [$('#city-card-1'), $('#city-card-2'), $('#city-card-3'), $('#city-card-4'), $('#city-card-5')];

var prevCities = [];
var fiveDays = [];
var temp = [];
var weather = [];
var wind = [];


//Sets the date for each weather card
document.addEventListener("DOMContentLoaded", function() {

    var currentDay = dayjs().format('MMMM DD, YYYY');

    //Manipulates the date to add one day for each card
    for (i=0; i < 5; i++) {
    fiveDays.push(dayjs().add(i, 'day').format('MMMM DD, YYYY'));
    }
    //Displays the date on the card
    $('#date-0').text(currentDay)
    $('#date-1').text(fiveDays[0])
    $('#date-2').text(fiveDays[1])
    $('#date-3').text(fiveDays[2])
    $('#date-4').text(fiveDays[3])
    $('#date-5').text(fiveDays[4])

  });

//Gives latitude and longitude of city based on zip code
function geoApiCall(cityZip) {
    //API URL
    geoLocationUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + cityZip + '&appid=a0334750ce53b3a2b2d0193e97ee40fc'

    fetch (geoLocationUrl) 
        .then (function (response) {
            return response.json();
        })
        //Stores the latitude and longitude and then passes it to the weather api call
        .then (function (data) {
            var lat = data.lat
            var lon = data.lon
            weatherApiCall(lat, lon);
        })

}
//Uses latitude and longitude parameters from geo call to find weather data for that city
function weatherApiCall(lat, lon) {

    weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=a0334750ce53b3a2b2d0193e97ee40fc&units=imperial'

    fetch (weatherUrl) 
        .then (function (response) {
            return response.json();
        })
        //Grabs the weather data and store them in variables
        .then (function (data) {
            console.log(data);
            console.log(data.list);
            var cityName = data.city.name;

            //Pushes the temp, weather description and wind to an array so that we can loop through it later
            for (i = 0; i < 40; i += 8) {
                temp.push(Math.round(data.list[i].main.temp) + '\u00B0 Farenheit');
                weather.push(data.list[i].weather[0].description);
                wind.push('Wind: ' + Math.round(data.list[i].wind.speed) + 'MPH');
            }

            //passes the data to the display weather function
            displayWeather(cityName, temp, weather, wind);
        })

}

// for (i=0; i < )

function displayWeather(cityName, temp, weather, wind) {

    //Today's forecast must be separate from the loop since there are two cards with the same information
    todayWeather.children('.city-name').text(cityName);
    todayWeather.children('.weather-info').children('.temp').text(temp[0]);
    todayWeather.children('.weather-info').children('.forecast').text(weather[0]);
    todayWeather.children('.weather-info').children('.wind').text(wind[0]);
    

    //Loop for the 5 day forecast
    for (i=0; i < weatherCards.length; i++) {
        weatherCards[i].children('.city-name').text(cityName);
        weatherCards[i].children('.weather-info').children('.temp').text(temp[i]);
        weatherCards[i].children('.weather-info').children('.forecast').text(weather[i]);
        weatherCards[i].children('.weather-info').children('.wind').text(wind[i]);
    }


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