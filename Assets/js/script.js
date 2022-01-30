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

// target uv index

const uvIndex = $("#uvIndex");


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

                    // if statements for uv index class

                    if (data.current.uvi <= 2) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-success");
                    }

                    if (data.current.uvi > 3 && data.current.uvi <= 5) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-warning");
                    }

                    if (data.current.uvi > 5 && data.current.uvi <= 7) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-warning-strong");
                    }

                    if (data.current.uvi > 7 && data.current.uvi <= 10) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-danger");
                    }

                    if (data.current.uvi > 10) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-danger-strong");
                    }

                    // convert temp to farenheit 
                    const tempFOne = parseInt((data.daily[1].temp.day) - 273.15) * 9 / 5 + 32;

                    // five day forecast
                    const fiveDayTempOne = $("#fiveDayTempOne");
                    fiveDayTempOne.html(`${tempFOne}°F`);
                    fiveDayTempOne.className = "text-dark";

                    const tempFTwo = parseInt((data.daily[2].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempTwo = $("#fiveDayTempTwo");
                    fiveDayTempTwo.html(`${tempFTwo}°F`);
                    fiveDayTempTwo.className = "text-dark";

                    const tempFThree = parseInt((data.daily[3].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempThree = $("#fiveDayTempThree");
                    fiveDayTempThree.html(`${tempFThree}°F`);
                    fiveDayTempThree.className = "text-dark";

                    const tempFFour = parseInt((data.daily[4].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFour = $("#fiveDayTempFour");
                    fiveDayTempFour.html(`${tempFFour}°F`);
                    fiveDayTempFour.className = "text-dark";

                    const tempFFive = parseInt((data.daily[5].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFive = $("#fiveDayTempFive");
                    fiveDayTempFive.html(`${tempFFive}°F`);
                    fiveDayTempFive.className = "text-dark";

                });
        });
};

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

            // convert temperature from kelvins to farenheit
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
                    console.log(data);
                    currentUvIndex = $("#currentUvIndexDescrip");
                    currentUvIndex.html(`${data.current.uvi}`);
                    currentUvIndex.className = "text-dark";

                    // if statements for uv index class 
                    if (data.current.uvi <= 2) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-success");
                    }

                    if (data.current.uvi > 3 && data.current.uvi <= 5) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-warning");
                    }

                    if (data.current.uvi > 5 && data.current.uvi <= 7) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-warning-strong");
                    }

                    if (data.current.uvi > 7 && data.current.uvi <= 10) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-danger");
                    }

                    if (data.current.uvi > 10) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-danger-strong");
                    }

                    // convert temp to farenheit 
                    const tempFOne = parseInt((data.daily[1].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempOne = $("#fiveDayTempOne");

                    // five day forecast
                    fiveDayTempOne.html(`${tempFOne}°F, ${data.daily[1].weather[0].description}`);
                    fiveDayTempOne.className = "text-dark";

                    const tempFTwo = parseInt((data.daily[2].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempTwo = $("#fiveDayTempTwo");
                    fiveDayTempTwo.html(`${tempFTwo}°F, ${data.daily[2].weather[0].description}`);
                    fiveDayTempTwo.className = "text-dark";

                    const tempFThree = parseInt((data.daily[3].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempThree = $("#fiveDayTempThree");
                    fiveDayTempThree.html(`${tempFThree}°F, ${data.daily[3].weather[0].description}`);
                    fiveDayTempThree.className = "text-dark";

                    const tempFFour = parseInt((data.daily[4].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFour = $("#fiveDayTempFour");
                    fiveDayTempFour.html(`${tempFFour}°F, ${data.daily[4].weather[0].description}`);
                    fiveDayTempFour.className = "text-dark";

                    const tempFFive = parseInt((data.daily[5].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFive = $("#fiveDayTempFive");
                    fiveDayTempFive.html(`${tempFFive}°F, ${data.daily[5].weather[0].description}`);
                    fiveDayTempFive.className = "text-dark";
                });
        });
});