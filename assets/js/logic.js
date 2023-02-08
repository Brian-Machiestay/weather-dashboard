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
    return res;
}

async function extractTodayAndFiveDayData() {
    let now = moment().format('YYYY-MM-DD')
    const data = await getWeaterData();
    console.log(data)
    const relevantData = [];
    let currentDataDate = data.list[0].dt_txt.split(" ")[0];
    let counter = 1;
    for (let i = 0; i < data.list.length; i++) {
        if (counter == 7) break;
        if (now === currentDataDate) {
            relevantData.push(data.list[i]);
            now = moment().add(counter, 'days').format('YYYY-MM-DD');
            console.log(currentDataDate);
            counter++;
        }
        currentDataDate = data.list[i].dt_txt.split(" ")[0];
    }
    return relevantData
}



extractTodayAndFiveDayData().then((res) => console.log(res));