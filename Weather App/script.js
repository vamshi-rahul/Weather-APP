document.getElementById('searchButton').addEventListener('click', function(){
    //Get the input from the user input feild:
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;
    if(!location){
        alert('Please enter a valid location');
        return;
    }
    //Declare your API keys & Endpoints.
    const api_key = 'dbad6deacef72af0ca745beb8dcd85f5';
    const CurrentWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;
    const ForecastWeatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}&units=metric`;
    //Now lets fetch the DATA from our API Endpoints:

    //lets get our current weather data:
    fetch(CurrentWeatherEndpoint)
        .then(response => response.json())
        .then(currentData => {
            //extract the current weather data from .json() file:
            const temperature = currentData.main.temp;
            const description = currentData.weather[0].description;
            const city = currentData.name;
            const country = currentData.sys.country;
            
            //Display the current weather on our page:
            const weatherSection = document.querySelector('.weather');
            weatherSection.innerHTML =`
            <h2>Current Weather in ${city}, ${country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Conditions: ${description}</p>
        `;
        })
        .catch(error =>{
            console.error('Error fetching current weather', error);
            alert('current weather not found. Please check the location.');
        });
    //Now lets get the forecast data:
    fetch(ForecastWeatherEndpoint)
        .then(response => response.json())
        .then(forecastData =>{
            //extract the hourly forecast data from the .json() file:
            const forecast = forecastData.list;

            //Now lets display the forecast data:
            const ForecastSection = document.querySelector('.forecast');
            ForecastSection.innerHTML = '<h2>Hourly Forecast</h2>';

            forecast.forEach(hourData => {
                const hour = hourData.dt_txt;
                const temperature = hourData.main.temp;
                const description = hourData.weather[0].description;

                //Create an element to display the data since it is in array format:
                const hourElement = document.createElement('p');
                hourElement.textContent = `${hour}: ${temperature}°C, ${description}`;
                //Now append the  hourly forecast
                ForecastSection.appendChild(hourElement);
            });
        })
        .catch(error => {
            console.error('Error fetching hourly data',error);
            alert('Forecast data not found, Please check the location.');
        });
});
