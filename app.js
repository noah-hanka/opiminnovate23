
// gunna test hartford for now
let input = "";

let name = document.querySelector('.name');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');



// works somewhat

async function getData() {
    let data;

    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&temperature_unit=fahrenheit');
        data = await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    return data;
}



(async () => {
    const data = await getData();
    // Use the data here

    console.log(data);
    let mytemp = data.current_weather.temperature;
    let myweather = data.current_weather.weathercode;
    displayWeather(mytemp, myweather)

})();


function displayWeather(temp, code) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<div>${temp} ${code}</div>`;
}
