window.addEventListener('load', () => {
    let long;
    let lat;

    const locationTimezone = document.querySelector(".location-timezone");
    const temperatureIcon = document.querySelector(".temperature-icon");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const temperatureDegreeUnit = document.querySelector(".temperature-degree-unit");
    const temperatureSection = document.querySelector(".temperature-section");
    const temperatureDescription = document.querySelector(".temperature-description");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.weather.gov/points/${lat},${long}`;

            fetch(api)
                .then(response => { return response.json(); })
                .then(getForcastUrl => {
                    var location = getForcastUrl.properties.relativeLocation.properties;
                    console.log(location);
                    locationTimezone.textContent = location.city + ', ' + location.state;

                    fetch(getForcastUrl.properties.forecast)
                        .then(forcastresponse => { return forcastresponse.json(); })
                        .then(forcast => {
                            console.log(forcast.properties.periods[0]);
                            const { name, temperature, temperatureUnit, detailedForecast, icon } = forcast.properties.periods[0];

                            // Set DOM Elements from the API
                            temperatureDegree.textContent = temperature;
                            temperatureDegreeUnit.textContent = temperatureUnit;
                            temperatureDescription.textContent = name + ' will be ' + detailedForecast;
                            temperatureIcon.src = icon;

                            // Toggle temperature to Celsius/Fahrenheit
                            let convertToCelsius = Math.floor((temperature - 32) * (5 / 9));
                            temperatureSection.addEventListener('click', () => {
                                if (temperatureDegreeUnit.textContent === 'F') {
                                    temperatureDegreeUnit.textContent = "C";
                                    temperatureDegree.textContent = convertToCelsius;
                                } else {
                                    temperatureDegreeUnit.textContent = "F";
                                    temperatureDegree.textContent = temperature;
                                }
                            });
                        });
                });
        });
    }
});