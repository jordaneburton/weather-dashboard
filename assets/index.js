const apiUrl = 'https://api.openweathermap.org';
const apiKey = '0d40257ff07003acbd6df6e687a9f317';
const searchEl = document.querySelector('#search-box');
const searchInputEl = document.querySelector('#search-input');
const currentWeatherEl = document.querySelector('.current-weather');
const weatherHeader = document.querySelector('.weather-header');
const forecastEl = document.querySelector('.forecast-weather');
const forecastHeader = document.querySelector('.forecast-header');
const searchesListEl = document.querySelector('#searchesList');
const noSearchesEl = document.querySelector('#noRecentSearches');
const inputCityEl = document.querySelector('#inputCity');


// FUNCTIONS


// function for fetching coordinates of submitted location
function fetchCoords() {
    const apiEndpointCoords = `${apiUrl}/geo/1.0/direct?q=${searchInputEl.value}&appid=${apiKey}`;  // excluding &limit=${limit}
    
    fetch(apiEndpointCoords) 
        .then(function (response) {
            // check for response.status
            if (!(response.status >= 200 && response.status < 300)) {
                console.log(response.status);
            } else {
                currentWeatherEl.classList.remove('d-none');
                weatherHeader.classList.remove('d-none');
                forecastEl.classList.remove('d-none');
                forecastHeader.classList.remove('d-none');
                
                saveSearches();
                updateSearches();
            }
            return response.json();

        })
        .then(function (data) {
            if (!data.cod) {
                const returnCoords = {
                    lat: data[0].lat, 
                    lon: data[0].lon
                };

                // use latitude and longitude in fetching forecast and current weather
                const fiveDayForecast = fetchForecast(returnCoords);
            }
        })

}

// function that calls the API and fetchs the forecast
function fetchForecast(coords = {}) {

    const apiEndpointWeather = `${apiUrl}/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`; // excluding &exclude=minutely,hourly,daily,alerts
    fetch(apiEndpointWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // create and append current weather card
            dataWeather = {};
            dataWeather.date = dayjs.unix(data.current.dt).format('MM/DD/YYYY');
            const currentIconCode = data.current.weather[0].icon;
            dataWeather.iconLink = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
            dataWeather.iconLabel = data.current.weather[0].description;
            dataWeather.temp = data.current.temp;
            dataWeather.wind = data.current.wind_speed;
            dataWeather.humidity = data.current.humidity;

            currentWeatherEl.removeChild(currentWeatherEl.lastChild);
            createCurrentWeatherCard(dataWeather);

            // form each day's forecast and add it to a forecast array
            const returnForecast = [];
            for (let i=1; i < 7; i++) {
                const dataForecast = {};
                dataForecast.date = dayjs.unix(data.daily[i].dt).format('MM/DD/YYYY');
                const iconCode = data.daily[i].weather[0].icon;
                dataForecast.iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                dataForecast.iconLabel = data.daily[i].weather[0].description;
                dataForecast.temp = data.daily[i].temp.day;
                dataForecast.wind = data.daily[i].wind_speed;
                dataForecast.humidity = data.daily[i].humidity;
                returnForecast.push(dataForecast);
            }

            // remove any displayed forecast cards
            while (forecastEl.firstChild) {
                forecastEl.removeChild(forecastEl.lastChild);
            }
            // iterate through array and append forecast cards to forecast section
            for (day of returnForecast) {
                createForecastCard(day);
            }
        })

}

// function for creating our forecast cards
function createForecastCard(forecast = {}) {
    /* forecast {  
        date:
        iconLink:       PARAMETER OBJECT STRUCTURE
        temp:
        wind:
        humidity:
    } */

    // Create card container and card body
    const card = document.createElement('div');
    card.classList.add('card', 'col-6', 'col-md-4', 'col-lg-3', 'my-1', 'my-md-2','mx-md-2', 'bg-dark-primary')
    
    const cardBody = document.createElement('div')
    card.append(cardBody);
    cardBody.classList.add('card-body');
    
    // add date as header to card
    const cardHeader = document.createElement('h5');
    cardBody.append(cardHeader);
    // add icon to header
    const icon = document.createElement('img');
    icon.src = forecast.iconLink;
    icon.ariaLabel = forecast.iconLabel;
    cardHeader.innerHTML = forecast.date;
    cardHeader.appendChild(icon);
    cardHeader.classList.add('card-title', 'mb-3');

    // add list of temp, wind, and humidity
    const weatherAttr = document.createElement('ul');
    cardBody.append(weatherAttr);
    weatherAttr.classList.add('list-unstyled', 'card-text');

    const temp = document.createElement('li');
    temp.classList.add('temp');
    temp.textContent = `Temp: ${forecast.temp} °F`;

    const wind = document.createElement('li');
    wind.classList.add('wind');
    wind.textContent = `Wind: ${forecast.wind} MPH`;

    const humidity = document.createElement('li');
    humidity.classList.add('humidity');
    humidity.textContent = `Humidity: ${forecast.humidity} %`;

    weatherAttr.appendChild(temp);
    weatherAttr.appendChild(wind);
    weatherAttr.appendChild(humidity);

    // append the card to the forecast section
    forecastEl.append(card);  
}

// function for creating our current weather card (very similar to previous function)
function createCurrentWeatherCard(forecast = {}) {
    // Almost identical to create forecast function but different bootstrap styling

    // Create card container and card body
    inputCityEl.textContent = pascalCase(searchInputEl.value);

    const card = document.createElement('div');
    card.classList.add('card', 'col-12', 'col-md-9', 'col-lg-6', 'my-1', 'my-md-2','mx-md-2', 'bg-light-primary')
    
    const cardBody = document.createElement('div')
    card.append(cardBody);
    cardBody.classList.add('card-body');
    
    // add date as header to card
    const cardHeader = document.createElement('h5');
    cardBody.append(cardHeader);
    // add icon to header
    const icon = document.createElement('img');
    icon.src = forecast.iconLink;
    icon.ariaLabel = forecast.iconLabel;
    cardHeader.innerHTML = forecast.date;
    cardHeader.appendChild(icon);
    cardHeader.classList.add('card-title', 'mb-3', 'fs-3', 'text', 'text-center');

    // add list of temp, wind, and humidity
    const weatherAttr = document.createElement('ul');
    cardBody.append(weatherAttr);
    weatherAttr.classList.add('list-unstyled', 'card-text', 'fs-5', 'text-center');

    const temp = document.createElement('li');
    temp.classList.add('temp');
    temp.textContent = `Temp: ${forecast.temp} °F`;

    const wind = document.createElement('li');
    wind.classList.add('wind');
    wind.textContent = `Wind: ${forecast.wind} MPH`;

    const humidity = document.createElement('li');
    humidity.classList.add('humidity');
    humidity.textContent = `Humidity: ${forecast.humidity} %`;

    weatherAttr.appendChild(temp);
    weatherAttr.appendChild(wind);
    weatherAttr.appendChild(humidity);

    // append the card to the forecast section
    currentWeatherEl.append(card);  
}

// function for saving recent searches to localStorage
function saveSearches() {
    // save an array to 
    const userInput = pascalCase(searchInputEl.value);

    // if array does not exist, make it
    if (localStorage.getItem('recentSearches') === null) {
        localStorage.setItem('recentSearches', JSON.stringify([]));
    }

    const searchesArray = JSON.parse(localStorage.getItem('recentSearches'));

    // check if user input already exists in array
    if (!searchesArray.includes(userInput)) {

        // if the array has 10 searches, remove the earliest search
        if (searchesArray.length == 10) {
            searchesArray.shift();
        }
        searchesArray.push(userInput);
    }

    localStorage.setItem('recentSearches', JSON.stringify(searchesArray));
}

// function for updating our collapse search cards
function updateSearches() {
    if (localStorage.getItem('recentSearches') === null) {
        return;
    }

    const ourSearches = JSON.parse(localStorage.getItem('recentSearches'));
    searchesListEl.innerHTML = '';

    for (localSearch of ourSearches) {
        // create search card and add it to collapse list
        const searchCard = document.createElement('li');
        searchCard.classList.add('list-group-item', 'recent-search-card', 'text-center');
        searchCard.textContent = localSearch;
        searchesListEl.appendChild(searchCard);
    }
}

// handler for recent search listener
function searchFromRecent() {
    searchInputEl.value = this.textContent;
    fetchCoords();
}

// turns a string into PascalCase
function pascalCase(inputStr) {
    inputStr = inputStr.trim();
    
    const inputArr = inputStr.split(' ');
    inputStr = '';
    for (word of inputArr) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        word = word + ' ';
        inputStr = inputStr + word;
    }

    return inputStr.trim();
}


// EVENT LISTENERS


// listener to submit a search via the search button
searchEl.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchCoords();
})

// listener to submit a search via the recent searches
searchesListEl.addEventListener('click', (event) => {
    if (event.target.closest('.recent-search-card')) {
      searchFromRecent.call(event.target, event);
    }
});

// update recent searches when opening page
updateSearches();