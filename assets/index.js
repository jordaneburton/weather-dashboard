const apiUrl = 'https://api.openweathermap.org';
const apiKey = '0d40257ff07003acbd6df6e687a9f317';
const searchEl = document.querySelector('#search-box');
const searchInputEl = document.querySelector('#search-input');

// function for fetching coordinates of submitted location
function fetchCoords() {
    const apiEndpointCoords = `${apiUrl}/geo/1.0/direct?q=${searchInputEl.value}&appid=${apiKey}`;  // excluding &limit=${limit}
    
    fetch(apiEndpointCoords) 
        .then(function (response) {
            console.log(response)

            // check for response.status
            if (!(response.status >= 200 && response.status < 300)) {
                console.log(response.status);
            }
            return response.json();

        })
        .then(function (data) {
            if (!data.cod) {
                // console.log(data[0].lat)
                const returnCoords = {
                    lat: data[0].lat, 
                    lon: data[0].lon
                };

                // use latitude and longitude in fetching forecast and current weather
                fetchForecast(returnCoords);
                fetchCurrentWeather(returnCoords);

            }
        })

}

function fetchCurrentWeather(coords = {}) {
    console.log('fetching current weather ...');

    const apiEndpointWeather = `${apiUrl}/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`; // excluding 
    fetch(apiEndpointWeather)
        .then(function (response) {
            console.log(response)
        })
        // .then(function (data) {

        // })
}

function fetchForecast(coords = {}) {
    console.log('fetching forecast ...');
    console.log({coords});
}













searchEl.addEventListener('submit', (event) => {
    event.preventDefault();

    fetchCoords();
    // fetchForecast(coordinates);
})