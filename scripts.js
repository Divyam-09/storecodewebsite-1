function getCityDetails() {
    var cityName = document.getElementById('cityName').value;
    var stateName = document.getElementById('stateName').value;
    var country = document.getElementById('country').value;

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (cityName && stateName && country) {
        var apiKey = '1234e2cbf2e2389ffcc523ae6ed699fd';
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayCityDetails(data, stateName, country);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                resultDiv.innerHTML = 'Error fetching weather data. Please try again.';
            });
    } else {
        resultDiv.innerHTML = 'Please fill out all fields.';
    }
}

function displayCityDetails(weatherData, stateName, country) {
    var resultDiv = document.getElementById('result');

    const details = `
        <h2>${weatherData.name}, ${stateName}, ${country}</h2>
        <p>Country Code: ${weatherData.sys.country}</p>
        <p>Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Latitude: ${weatherData.coord.lat}</p>
        <p>Longitude: ${weatherData.coord.lon}</p>
        <p>wind: ${weatherData.wind.speed}</p>
        <img src='http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png'>
    `;

    resultDiv.innerHTML = details;
}

