# Weather-Dashboard
A weather dashboard that dynamically updates using JavaScript and the OpenWeather API, and styled using Bootstrap!
[Click Here](https://jordaneburton.github.io/weather-dashboard/) to check out the page!

![weather-dashboard-mobile](https://github.com/jordaneburton/weather-dashboard/assets/60330301/4fcfafd5-db26-48d7-ba73-ba8011e0245f)

## Description

For this project, I had to create a weather dashboard application from scratch. There were 4 main requirements to this assignment: allow the user to search for a city's forecast, save the user's most recent searches, display the current weather forecast for the searched city, and display the forecasts for the next five days. In order to get the forecast, I used an API made by OpenWeather that allows me to get various information on the weather for a specified city.

In order to query the API, we prompt the user to fill a form element with a city name. When the user hits the submit button next to the prompt, we call the API using the given input value. If the API does not return meaningful information, the page will not update at all. This is to discourage the user from inputting non-existent cities. Once the API sends back valid weather data, we store the user's input in localStorage and display it in a collapse menu. This collapse menu can be opened via the search icon in the top right corner of the webpage. When the user clicks the search icon, the collapse menu is opened and the user is able to click the different search results to get the forecast of those cities without directly typing into the input form.

For the forecast, we display the info using the card class in Bootstrap. For each day's forecast we display the date and an icon of the weather as the title of the card. Under the date we also show the temperature, wind speed, and humidity in imperial units. On the webpage we divide the forecasts into two sections: the Current Weather and the 6-Day Forecast. The two sections are built very similar, the main difference being the sizing of the forecast cards as well as the amount. The Current Weather section only houses one larger card while the 6-Day Forecast section houses six smaller cards. The styling is also different, with the Current Weather being lighter and more vibrant than the 6-Day Forecast.

Here is a link to the deployed project: [https://jordaneburton.github.io/weather-dashboard/]

![weather-dashboard](https://github.com/jordaneburton/weather-dashboard/assets/60330301/833996bb-cfbe-475f-b700-4d9d7b60505b) 

### Dependencies

* An up-to-date browser

## Authors

Jordan Burton 
[@jordaneburton](https://github.com/jordaneburton)

## Acknowledgments

Thank you to [OpenWeather](https://openweathermap.org/api) for their API!
