var cityName;

// target city name title
var cityNameTitle = $("#cityName");

// target list of saved cities
const savedCities = $(".savedCities")
console.log(savedCities)

// test pulling saved cities name value
const savedCityNames = savedCities[0].innerText;
console.log(savedCityNames);

// target input form
const nameInput = $("#nameInput");
console.log(nameInput);

// target submit button
const submitBtn = $("#submitBtn");


const citySearch = function () {
    cityName = nameInput[0].value;
    cityNameTitle.html(`Weather Today in ${cityName}`);
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=04b3169660f824910039e6e109a3ae5e`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.wind.speed);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            console.log(data.weather[0].description);

            const tempF = parseInt((data.main.temp) - 273.15) * 9 / 5 + 32;
            console.log(tempF);

            // append weather description data
            const currentSky = $("#currentSkyDescrip");
            currentSky.html(`Look out for: ${data.weather[0].description}`);
            currentSky.className = "text-dark";

            // append temperature data
            const currentTemp = $("#currentTempDescrip");
            currentTemp.html(`${tempF}°F`);
            currentTempDescrip.className = "text-dark";

            // append wind speed data
            const currentWind = $("#currentWindDescrip");
            currentWind.html(`${data.wind.speed} mph`);
            currentWindDescrip.className = "text-dark";

            // append humidity data
            const currentHumidity = $("#currentHumidityDescrip");
            currentHumidity.html(`${data.main.humidity}%`);
            currentHumidity.className = "text-dark";

            // append UV data
            const uviApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=04b3169660f824910039e6e109a3ae5e`
            fetch(uviApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    const currentUvIndex = $("#currentUvIndexDescrip");
                    currentUvIndex.html(`${data.current.uvi}`);
                    currentUvIndex.className = "text-dark";

                });
        });
};

// pull 
nameInput.change(function () {
    console.log(nameInput[0].value);
});

submitBtn.on("click", citySearch);

savedCities.on("click", function () {
    let arrayNumber = savedCities.attr("id")
    let i = parseInt(arrayNumber);
    const cityName = savedCities[i].innerText;
    cityNameTitle.html(`Weather Today in ${cityName}`);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=04b3169660f824910039e6e109a3ae5e`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.wind.speed);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            console.log(data.weather[0].description);

            const tempF = parseInt((data.main.temp) - 273.15) * 9 / 5 + 32;
            console.log(tempF);

            // append weather description data
            const currentSky = $("#currentSkyDescrip");
            currentSky.html(`Look out for: ${data.weather[0].description}`);
            currentSkyDescrip.className = "text-dark";

            // append temperature data
            const currentTemp = $("#currentTempDescrip");
            currentTemp.html(`${tempF}°F`);
            currentTemp.className = "text-dark";

            // append wind speed data
            const currentWind = $("#currentWindDescrip");
            currentWind.html(`${data.wind.speed} mph`);
            currentWindDescrip.className = "text-dark";

            // append humidity data
            const currentHumidity = $("#currentHumidityDescrip");
            currentHumidity.html(`${data.main.humidity}%`);
            currentHumidity.className = "text-dark";

            // append UV data
            const uviApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=04b3169660f824910039e6e109a3ae5e`
            fetch(uviApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    currentUvIndex = $("#currentUvIndexDescrip");
                    currentUvIndex.html(`${data.current.uvi}`);
                    currentUvIndex.className = "text-dark";
                });
        });
});