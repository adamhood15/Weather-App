var goBtn = $('#go-button');
var clearBtn = $('#clear-button')

var prevCities = [];

//Connect the API to retrieve weather data

//Search for a city using the search bar
function citySearch (event) {

    var city = $('#city-search').val().toUpperCase();

    if (localStorage.getItem('city')) {

        prevCities.push(localStorage.getItem('city'));
        localStorage.setItem('city', city);
    
    } else {

        localStorage.setItem('city', city);
        prevCities.push(localStorage.getItem('city'));

    }

    createCityBtn();

}
//NOT FINISHED YET
function createCityBtn() {

    for (i = 0; i < prevCities.length; i++) {

        var cityBtnSection = $('#saved-cities');
        var cityBtn = $("<button></button>").text(prevCities[i]);
        
        cityBtn.addClass('bg-gray-200 border-2 border-grey-300 rounded m-2 p-1 city');

    }

    cityBtnSection.append(cityBtn);

}

function clearCities() {

    $('.city').remove();

}
//Go button will initiate the API call

//The API call will automatically update the City name, icon, and weather forecast for all weather cards

//A new city button will display at the top so that you can click and view the previous cities you have viewed

//Add event listener for buttons
goBtn.on('click', citySearch);
clearBtn.on('click', clearCities);