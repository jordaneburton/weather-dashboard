const apiUrl = 'https://api.openweathermap.org';
const apiKey = '0d40257ff07003acbd6df6e687a9f317';
const searchEl = document.querySelector('#search-box');
const searchInputEl = document.querySelector('#search-input');

function fetchCoords() {
    console.log('fetching coordinates ...');
    const apiEndpointCoords = `${apiUrl}/geo/1.0/direct?q=${searchInputEl.value}&appid=${apiKey}`;  // excluding &limit=${limit}
    fetch(apiEndpointCoords) 
        .then(function (response) {
            console.log(response)
        })
}

function fetchCurrentWeather(coords = {}) {
    console.log('fetching current weather ...');
    console.log({coords});
    const apiEndpointWeather = `${apiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`; // excluding &exclude=${part}
    fetch(apiEndpointWeather) // excluding &limit=${limit}
        .then(function (response) {
            console.log(response)
        })
}

function fetchForecast(coords = {}) {
    console.log('fetching forecast ...');
    console.log({coords});
}













searchEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log({event});
    console.log(searchInputEl.value)
    fetchCoords();
})