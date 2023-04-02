var goBtn = $('#go-button');
var clearBtn = $('#clear-button');
var todayWeather = $('#city-card-0');
var weatherCards = [$('#city-card-1'), $('#city-card-2'), $('#city-card-3'), $('#city-card-4'), $('#city-card-5')];
var savedCitySection = $('#saved-cities');

var prevCities = [];
var currentCities = [];
var fiveDays = [];
var temp = [];
var weather = [];
var wind = [];
var iconId= [];

//Assigns each weather id code to the specified custom icon in the file
var weatherIconId = {
    200: './assets/weather-icons/animated/thunder.svg', 201: './assets/weather-icons/animated/thunder.svg',
    202: './assets/weather-icons/animated/thunder.svg', 210: './assets/weather-icons/animated/thunder.svg',
    211: './assets/weather-icons/animated/thunder.svg', 212: './assets/weather-icons/animated/thunder.svg',
    221: './assets/weather-icons/animated/thunder.svg', 230: './assets/weather-icons/animated/thunder.svg',
    231: './assets/weather-icons/animated/thunder.svg', 232: './assets/weather-icons/animated/thunder.svg',
    300: './assets/weather-icons/animated/rainy-1.svg', 301: './assets/weather-icons/animated/rainy-1.svg',
    302: './assets/weather-icons/animated/rainy-1.svg', 310: './assets/weather-icons/animated/rainy-1.svg',
    311: './assets/weather-icons/animated/rainy-1.svg', 312: './assets/weather-icons/animated/rainy-1.svg',
    313: './assets/weather-icons/animated/rainy-1.svg', 314: './assets/weather-icons/animated/rainy-1.svg',
    321: './assets/weather-icons/animated/rainy-1.svg', 500: './assets/weather-icons/animated/rainy-6.svg',
    501: './assets/weather-icons/animated/rainy-6.svg', 502: './assets/weather-icons/animated/rainy-6.svg',
    503: './assets/weather-icons/animated/rainy-6.svg', 504: './assets/weather-icons/animated/rainy-6.svg',
    511: './assets/weather-icons/animated/rainy-7.svg', 520: './assets/weather-icons/animated/rainy-7.svg',
    521: './assets/weather-icons/animated/rainy-7.svg', 522: './assets/weather-icons/animated/rainy-7.svg',
    531: './assets/weather-icons/animated/rainy-7.svg', 600: './assets/weather-icons/animated/snowy-1.svg',
    601: './assets/weather-icons/animated/snowy-1.svg', 602: './assets/weather-icons/animated/snowy-1.svg',
    611: './assets/weather-icons/animated/snowy-1.svg', 612: './assets/weather-icons/animated/snowy-1.svg',
    613: './assets/weather-icons/animated/snowy-1.svg', 615: './assets/weather-icons/animated/snowy-1.svg',
    616: './assets/weather-icons/animated/snowy-1.svg', 620: './assets/weather-icons/animated/snowy-1.svg',
    621: './assets/weather-icons/animated/snowy-1.svg', 622: './assets/weather-icons/animated/snowy-1.svg',
    701: './assets/weather-icons/animated/cloudy-day-3.svg', 711: './assets/weather-icons/animated/cloudy-day-3.svg',
    721: './assets/weather-icons/animated/cloudy-day-3.svg', 731: './assets/weather-icons/animated/cloudy-day-3.svg',
    741: './assets/weather-icons/animated/cloudy-day-3.svg', 751: './assets/weather-icons/animated/cloudy-day-3.svg',
    761: './assets/weather-icons/animated/cloudy-day-3.svg', 762: './assets/weather-icons/animated/cloudy-day-3.svg',
    771: './assets/weather-icons/animated/cloudy-day-3.svg', 781: './assets/weather-icons/animated/cloudy-day-3.svg',
    800: './assets/weather-icons/animated/cloudy-day-1.svg', 801: './assets/weather-icons/animated/cloudy-day-1.svg',
    802: './assets/weather-icons/animated/cloudy-day-1.svg', 803: './assets/weather-icons/animated/cloudy-day-1.svg',
    804: './assets/weather-icons/animated/cloudy-day-1.svg',
}



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


    var cityInStorage = JSON.parse(localStorage.getItem('city'));
    var buttonText = localStorage.getItem('button');

    //Checks to see if you clicked a button to search for a city or you used the search bar or if you got to the page for the first time
    if ( jQuery.inArray(buttonText, cityInStorage) !== -1) {

            geoApiCall(localStorage.getItem('button'));

    } else if (!buttonText) {
        geoApiCall('houston');
    }
    else {
        geoApiCall(cityInStorage[cityInStorage.length-1]);
    }


    if (cityInStorage) {

    //Displays the current saved cities from local storage as buttons
    for (i = 0; i < JSON.parse(localStorage.getItem('city')).length; i++) {

        var button = $('<button>' + JSON.parse(localStorage.getItem('city'))[i] + '</button>');
        button.addClass('city-button h-[35px] bg-gray-200 border-solid-black border-2 border-grey-200 rounded-md p-1 px-2 m-2 w-15');
        savedCitySection.append(button);

    };
    //Grabs all city buttons that were rendered on page load
    var cityBtns = $('.city-button')

    //passes the text from the button to the geo api call
    cityBtns.on('click', function (event) {

        localStorage.setItem('button', event.target.textContent);

        citySearch();
    })
    }

  });


//Stores the search value and passes it to the geo api call function
function citySearch (city) {

    if ($('#city-search').val() === '') {

        cityName = localStorage.getItem('button');
        
    } else {
        cityName = $('#city-search').val();
    }

    geoApiCall(cityName);
    storeCities(cityName);
    window.location.reload();
}

//Stores all the search values as cities in local storage so that we can dynamically create city buttons
function storeCities (cityName) {

    var cityNameUpper = cityName.toUpperCase();

    if (localStorage.getItem('city')) {

        var cityStorage = JSON.parse(localStorage.getItem('city'));
        console.log(cityStorage);

        for (i = 0; i < cityStorage.length; i++) {

            prevCities.push(cityStorage[i]);
    
        }

    }

    prevCities.push(cityNameUpper);
    //Removes duplicates from prevCities array
    let sortedPrevCities = [...new Set(prevCities)];
    //sets the value of prevCities to the sorted
    prevCities = sortedPrevCities;
    //Sets city value to the city array
    localStorage.setItem('city', JSON.stringify(prevCities));

}

//Gives latitude and longitude of city based on zip code
function geoApiCall(cityName) {
    //API URL
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=a0334750ce53b3a2b2d0193e97ee40fc'
    

    fetch (url) 
        .then (function (response) {
            return response.json();
        })
        //Stores the latitude and longitude and then passes it to the weather api call
        .then (function (data) {
            var lat = data[0].lat
            var lon = data[0].lon
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
            data.city.name;
            var cityName = data.city.name;

            //Pushes the temp, weather description and wind to an array so that we can loop through it later
            for (i = 0; i < 40; i += 8) {
                temp.push(Math.round(data.list[i].main.temp) + '\u00B0 Farenheit');
                weather.push(data.list[i].weather[0].description);
                wind.push('Wind: ' + Math.round(data.list[i].wind.speed) + 'MPH');
                iconId.push(data.list[i].weather[0].id);
            }

            //passes the data to the display weather function
            displayWeather(cityName, temp, weather, wind, iconId);

        })

}

//Updates the weather name, temp, description, and wind for each card
function displayWeather(cityName, temp, weather, wind, iconId) {

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
        weatherCards[i].children('.city-weather-icon').attr('src', weatherIconId[iconId[i]])
    }

}

function clearCities() {

    $('.city-button').remove();
    localStorage.removeItem('city');

}


//Add event listener for buttons
goBtn.on('click', citySearch);
clearBtn.on('click', clearCities);

