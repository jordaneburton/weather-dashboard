const apiUrl = 'https://api.openweathermap.org';
const apiKey = '0d40257ff07003acbd6df6e687a9f317';
const searchEl = document.querySelector('#search-box');
const searchInputEl = document.querySelector('#search-input');
const forecastEl = document.querySelector('.forecast-weather')

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

    const apiEndpointWeather = `${apiUrl}/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`; // excluding &exclude=minutely,hourly,daily,alerts
    fetch(apiEndpointWeather)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            console.log('current');
            console.log(dayjs.unix(data.current.dt).format('MM/DD/YYYY'))

            console.log('daily');
            console.log(dayjs.unix(data.daily[1].dt).format('MM/DD/YYYY'))
        })
}

function fetchForecast(coords = {}) {
    console.log('fetching forecast ...');
    console.log({coords});
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
    console.log('this happened');

    // Create card container and card body
    const card = document.createElement('div');
    card.classList.add('card', 'col-6', 'col-md-3', 'col-lg-2', 'mx-md-2', 'bg-dark-primary')
    
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


createForecastCard({date: 'Card title', iconLink: 'https://openweathermap.org/img/wn/10d@2x.png'});