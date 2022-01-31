// global city name varaible
var cityName;

// target city name title
var cityNameTitle = $("#cityName");

// cities searched array
let citiesSearched;

// target list of saved cities
const savedCities = $(".savedCities")
console.log(savedCities)

// target input form
const nameInput = $("#nameInput");
console.log(nameInput);

// target submit button
const submitBtn = $("#submitBtn");

// target uv index
const uvIndex = $("#uvIndex");

// target weather icon img element
const weatherIcon = $("#weatherIcon");
console.log(weatherIcon);

// city search history empty array
citiesSearched = [];

// user clicks search
submitBtn.on("click", function () {
    let cityName = nameInput[0].value
    citySearch(cityName);
});

// var cityName = nameInput[0].value

// search function
const citySearch = function (cityName) {

    // add searched city to local storage
    citiesSearched.push(cityName);
    localStorage.setItem("City Search History", citiesSearched);

    // add current date to top of page
    const currentDay = $("#currentDay")
    let currentDayMoment = moment().format("dddd, MMMM Do YYYY");
    currentDay.html(currentDayMoment);

    // append city name to title html
    cityNameTitle.html(`Weather Today in ${cityName}`);
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=04b3169660f824910039e6e109a3ae5e`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // append weather icon
            iconCode = data.weather[0].icon;
            iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`
            weatherIcon.attr("src", iconUrl);

            // append weather description data
            const currentSky = $("#currentSkyDescrip");
            currentSky.html(`Look out for: ${data.weather[0].description}`);
            currentSky.className = "text-dark";

            // append temperature data
            const tempF = parseInt((data.main.temp) - 273.15) * 9 / 5 + 32;
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
                    console.log(data);
                    const currentUvIndex = $("#currentUvIndexDescrip");
                    currentUvIndex.html(`${data.current.uvi}`);
                    currentUvIndex.className = "text-dark";

                    // if statements for uv index class

                    if (data.current.uvi <= 2) {
                        uvIndex.removeClass("bg-primary bg-warning bg-warning-strong bg-danger bg-danger-strong");
                        uvIndex.addClass("bg-success");
                    }

                    if (data.current.uvi > 3 && data.current.uvi <= 5) {
                        uvIndex.removeClass("bg-primary");
                        uvIndex.addClass("bg-warning");
                    }

                    if (data.current.uvi > 5 && data.current.uvi <= 7) {
                        uvIndex.removeClass("bg-primary bg-warning bg-warning-strong bg-danger bg-danger-strong");
                        uvIndex.addClass("bg-warning-strong");
                    }

                    if (data.current.uvi > 7 && data.current.uvi <= 10) {
                        uvIndex.removeClass("bg-primary bg-warning bg-warning-strong bg-danger bg-danger-strong");
                        uvIndex.addClass("bg-danger");
                    }

                    if (data.current.uvi > 10) {
                        uvIndex.removeClass("bg-primary bg-warning bg-warning-strong bg-danger bg-danger-strong");
                        uvIndex.addClass("bg-danger-strong");
                    }

                    // five day forecast
                    const forecastDateOne = new Date(data.daily[1].dt * 1000)
                    const forecastYearOne = forecastDateOne.getFullYear();
                    const forecastMonthOne = forecastDateOne.getMonth() + 1;
                    const forecastDayOne = forecastDateOne.getDate();
                    const dayOneIconCode = data.daily[1].weather[0].icon;
                    const dayOneIconUrl = `https://openweathermap.org/img/wn/${dayOneIconCode}.png`
                    const dateOneIcon = $("#dateOneIcon")
                    dateOneIcon.attr("src", dayOneIconUrl);
                    const dateOne = $("#dateOne");
                    dateOne.html(`${forecastMonthOne}/${forecastDayOne}/${forecastYearOne}`);

                    const tempFOne = parseInt((data.daily[1].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempOne = $("#fiveDayTempOne");
                    const windSpeedOne = data.daily[1].wind_speed
                    const humidityOne = data.daily[1].humidity
                    fiveDayTempOne.html(`${tempFOne}°F, ${data.daily[1].weather[0].description}, winds at ${windSpeedOne} mph, humidity of ${humidityOne}%`);
                    fiveDayTempOne.className = "text-dark";

                    const forecastDateTwo = new Date(data.daily[2].dt * 1000)
                    console.log(forecastDateTwo);
                    const forecastYearTwo = forecastDateTwo.getFullYear();
                    const forecastMonthTwo = forecastDateTwo.getMonth() + 1;
                    const forecastDayTwo = forecastDateTwo.getDate();
                    const dayTwoIconCode = data.daily[2].weather[0].icon;
                    const dayTwoIconUrl = `https://openweathermap.org/img/wn/${dayTwoIconCode}.png`
                    const dateTwoIcon = $("#dateTwoIcon")
                    dateTwoIcon.attr("src", dayTwoIconUrl);
                    const dateTwo = $("#dateTwo");
                    dateTwo.html(`${forecastMonthTwo}/${forecastDayTwo}/${forecastYearTwo}`);

                    const tempFTwo = parseInt((data.daily[2].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempTwo = $("#fiveDayTempTwo");
                    const windSpeedTwo = data.daily[2].wind_speed
                    const humidityTwo = data.daily[2].humidity
                    fiveDayTempTwo.html(`${tempFTwo}°F, ${data.daily[2].weather[0].description}, winds at ${windSpeedTwo} mph, humidity of ${humidityTwo}%`);
                    fiveDayTempTwo.className = "text-dark";

                    const forecastDateThree = new Date(data.daily[3].dt * 1000)
                    console.log(forecastDateThree);
                    const forecastYearThree = forecastDateThree.getFullYear();
                    const forecastMonthThree = forecastDateThree.getMonth() + 1;
                    const forecastDayThree = forecastDateThree.getDate();
                    const dayThreeIconCode = data.daily[3].weather[0].icon;
                    const dayThreeIconUrl = `https://openweathermap.org/img/wn/${dayThreeIconCode}.png`
                    const dateThreeIcon = $("#dateThreeIcon")
                    dateThreeIcon.attr("src", dayThreeIconUrl);
                    const dateThree = $("#dateThree");
                    dateThree.html(`${forecastMonthThree}/${forecastDayThree}/${forecastYearThree}`);

                    const tempFThree = parseInt((data.daily[3].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempThree = $("#fiveDayTempThree");
                    const windSpeedThree = data.daily[3].wind_speed
                    const humidityThree = data.daily[3].humidity
                    fiveDayTempThree.html(`${tempFThree}°F, ${data.daily[3].weather[0].description}, winds at ${windSpeedThree} mph, humidity of ${humidityThree}%`);
                    fiveDayTempThree.className = "text-dark";

                    const forecastDateFour = new Date(data.daily[4].dt * 1000)
                    console.log(forecastDateFour);
                    const forecastYearFour = forecastDateFour.getFullYear();
                    const forecastMonthFour = forecastDateFour.getMonth() + 1;
                    const forecastDayFour = forecastDateFour.getDate();
                    const dayFourIconCode = data.daily[4].weather[0].icon;
                    const dayFourIconUrl = `https://openweathermap.org/img/wn/${dayFourIconCode}.png`
                    const dateFourIcon = $("#dateFourIcon")
                    dateFourIcon.attr("src", dayFourIconUrl);
                    const dateFour = $("#dateFour");
                    dateFour.html(`${forecastMonthFour}/${forecastDayFour}/${forecastYearFour}`);

                    const tempFFour = parseInt((data.daily[4].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFour = $("#fiveDayTempFour");
                    const windSpeedFour = data.daily[4].wind_speed
                    const humidityFour = data.daily[4].humidity
                    fiveDayTempFour.html(`${tempFFour}°F, ${data.daily[4].weather[0].description}, winds at ${windSpeedFour} mph, humidity of ${humidityFour}%`);
                    fiveDayTempFour.className = "text-dark";

                    const forecastDateFive = new Date(data.daily[5].dt * 1000)
                    console.log(forecastDateFive);
                    const forecastYearFive = forecastDateFive.getFullYear();
                    const forecastMonthFive = forecastDateFive.getMonth() + 1;
                    const forecastDayFive = forecastDateFive.getDate();
                    const dayFiveIconCode = data.daily[5].weather[0].icon;
                    const dayFiveIconUrl = `https://openweathermap.org/img/wn/${dayFiveIconCode}.png`
                    const dateFiveIcon = $("#dateFiveIcon")
                    dateFiveIcon.attr("src", dayFiveIconUrl);
                    const dateFive = $("#dateFive");
                    dateFive.html(`${forecastMonthFive}/${forecastDayFive}/${forecastYearFive}`);

                    const tempFFive = parseInt((data.daily[5].temp.day) - 273.15) * 9 / 5 + 32;
                    const fiveDayTempFive = $("#fiveDayTempFive");
                    const windSpeedFive = data.daily[5].wind_speed
                    const humidityFive = data.daily[5].humidity
                    fiveDayTempFive.html(`${tempFFive}°F, ${data.daily[5].weather[0].description}, winds at ${windSpeedFive} mph, humidity of ${humidityFive}%`);
                    fiveDayTempFive.className = "text-dark";

                });
        });
};

const cityHistory = localStorage.getItem("City Search History");
console.log(cityHistory);

const cityHistoryArray = cityHistory.split(",");
console.log(cityHistoryArray);

const savedCityUl = $("#citySearchHistory");

for (i = 0; i < cityHistoryArray.length; i++) {
    const savedCityBtnEl = $("<button>");
    savedCityBtnEl.html(cityHistoryArray[i]);
    const savedCityEl = $("<li>");
    savedCityBtnEl.addClass("bg-primary rounded text-light saved-cities");
    savedCityEl.append(savedCityBtnEl);
    savedCityUl.append(savedCityEl);
}

const savedCityBtn = $(".saved-cities");

savedCityBtn.on("click", function() {
    let cityName = $(this)[0].innerText;
    citySearch(cityName);
});