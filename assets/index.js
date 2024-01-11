const apiUrl = 'https://api.openweathermap.org';
const apiKey = '0d40257ff07003acbd6df6e687a9f317';
const searchEl = document.querySelector('#search-box');
const searchInputEl = document.querySelector('#search-input');
const currentWeatherEl = document.querySelector('.current-weather');
const weatherHeader = document.querySelector('.weather-header');
const forecastEl = document.querySelector('.forecast-weather');
const forecastHeader = document.querySelector('.forecast-header');

// function for fetching coordinates of submitted location
function fetchCoords() {
    const apiEndpointCoords = `${apiUrl}/geo/1.0/direct?q=${searchInputEl.value}&appid=${apiKey}`;  // excluding &limit=${limit}
    
    fetch(apiEndpointCoords) 
        .then(function (response) {
            console.log(response)

            // check for response.status
            if (!(response.status >= 200 && response.status < 300)) {
                console.log(response.status);
            } else {
                currentWeatherEl.classList.remove('d-none');
                weatherHeader.classList.remove('d-none');
                forecastEl.classList.remove('d-none');
                forecastHeader.classList.remove('d-none');
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
                const fiveDayForecast = fetchForecast(returnCoords);
                const currentWeather = fetchCurrentWeather(returnCoords);
                


            }
        })

}

// function for settin up current weather section
function fetchCurrentWeather(coords = {}) {
    console.log('fetching current weather ...');
    
}

// function that calls the API and fetchs the forecast
function fetchForecast(coords = {}) {
    console.log('fetching forecast ...');
    console.log({coords});

    const apiEndpointWeather = `${apiUrl}/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`; // excluding &exclude=minutely,hourly,daily,alerts
    fetch(apiEndpointWeather)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            // form each day's forecast and add it to a forecast array
            const returnForecast = [];
            for (let i=1; i < 6; i++) {
                const dataForecast = {};
                dataForecast.date = dayjs.unix(data.daily[i].dt).format('MM/DD/YYYY');
                const iconCode = data.daily[i].weather[0].icon;
                dataForecast.iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
                console.log('adding forecast');
                createForecastCard(day);
            }
        })

}

/* <div class="card col-6 col-md-3 col-lg-2 mx-md-2 bg-dark-primary">
    <div class="card-body">
        <h5 id="day1" class="card-title mb-3 text-start">Card title<img src="https://openweathermap.org/img/wn/10d@2x.png"></h5>
            
        <ul class="list-unstyled card-text">
            <li class="temp">Temp: </li>
            <li class="wind">Wind: </li>
            <li class="humidity">Humidity: </li>
        </ul>
    </div>
</div> */

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
    card.classList.add('card', 'col-6', 'col-md-4', 'col-lg-3', 'my-md-2','mx-md-2', 'bg-dark-primary')
    
    const cardBody = document.createElement('div')
    card.append(cardBody);
    cardBody.classList.add('card-body');
    
    // add date as header to card
    const cardHeader = document.createElement('h5');
    cardBody.append(cardHeader);
    // add icon to header
    const icon = document.createElement('img');
    icon.src = forecast.iconLink;
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


// present city name, date, weather icon
// temp, wind speed, humidity 

// to access data
// date - data.daily[0]/current.dt
// icon - data.daily/current.weather[0].icon
// temp - data.daily/current.temp.day/max/min
// wind - data.daily/current.wind_speed
// humidity - data.daily/current.humidity










searchEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log()
    fetchCoords();
    // fetchForecast(coordinates);
})


