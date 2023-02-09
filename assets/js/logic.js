// the api key
const APIkey = "074b0008c9908e74560eb4ed254c480c";

// get user country search item
function userCountrySearch (search = 'London') {
    return search;
}

// render the icon associated with this weather condition
async function renderWeatherIcon(iconCode, iconTag) {
    let src = "http://openweathermap.org/img/w/" + iconCode + ".png";
    iconTag.attr('src', src);
}


// get the weather condition of the city from the openweather api
async function getWeaterData() {
    let res = await $.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}`)
    res = await $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&units=metric&appid=${APIkey}`)
    return res;
}

async function extractTodayAndFiveDayData() {
    let now = moment();
    const data = await getWeaterData();
    console.log(data)
    const relevantData = [];
    let currentDataDate = data.list[0].dt_txt.split(" ")[0];
    let counter = 1;
    for (let i = 0; i < data.list.length; i++) {
        if (counter == 7) break;
        if (now.format('YYYY-MM-DD') === currentDataDate) {
            const thisItem = data.list[i];
            thisItem.dt_txt = now.format('DD/MM/YYYY')
            relevantData.push(thisItem);
            now = moment().add(counter, 'days');
            console.log(currentDataDate);
            counter++;
        }
        currentDataDate = data.list[i].dt_txt.split(" ")[0];
    }
    return relevantData
}

function updateDOMForcastsWithRelData(relData) {
    // get today DOM objects
    let todaydd = $('#today .dd')
    let todayicon = $('#today .wicon')
    let todaytp = $('#today .tp')
    let todaywd = $('#today .wd')
    let todayhd = $('#today .hd')

    // update today DOM objects with relevant today data
    todaydd.text(`${userCountrySearch()} (${relData[0].dt_txt})`);
    todaytp.text(`Temp: ${relData[0].main.temp}\u00B0C`);
    todaywd.text(`Wind: ${relData[0].wind.speed} KPH`);
    todayhd.text(`Humidity: ${relData[0].main.humidity}%`);
    renderWeatherIcon(relData[0].weather[0].icon, todayicon);

    // update 5 forecast information
    for (let i = 0; i < relData.length - 1; i++) {
        todaydd = $('.future')[i].children[0];
        todaydd.textContent = `${relData[i + 1].dt_txt}`;
        todayicon = $(`.wicon${i}`);
        renderWeatherIcon(relData[i + 1].weather[0].icon, todayicon);
        todaytp = $('.future')[i].children[2];
        todaytp.textContent = `Temp: ${relData[i + 1].main.temp}\u00B0C`;
        todaywd =  $('.future')[i].children[3];
        todaywd.textContent = `Wind: ${relData[i + 1].wind.speed} KPH`;
        todayhd =  $('.future')[i].children[4];
        todayhd.textContent = `Humidity: ${relData[i + 1].main.humidity}%`;
    }
    
    console.log($('.future')[0].children[0])
    console.log('good')
}

extractTodayAndFiveDayData().then((res) => {
    console.log(res);
    updateDOMForcastsWithRelData(res);
});