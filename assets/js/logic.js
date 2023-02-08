// the api key
const APIkey = "074b0008c9908e74560eb4ed254c480c";

// render the icon associated with this weather condition
async function renderWeatherIcon(iconCode, iconTag) {
    let src = "http://openweathermap.org/img/w/" + iconCode + ".png";
    iconTag.attr('src', src);
}


// get the weather condition of the city from the openweather api
async function getWeaterData() {
    let res = await $.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}`)
    res = await $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${APIkey}`)
    console.log(res);
    let cod = res.list[0].weather[0].icon
    renderWeatherIcon(cod, $('#wicon'));
}

getWeaterData();