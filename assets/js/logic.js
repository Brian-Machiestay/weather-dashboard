const APIkey = "074b0008c9908e74560eb4ed254c480c";

async function getWeaterData() {
    const res = await $.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}`)
    console.log(res);
}

getWeaterData();