
// gunna test hartford for now
let input = "";




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
    container.innerHTML = `<div>${temp}</div>`;

    console.log(code);

    if (code == 0 || code == 1) {
        let element = document.getElementById("sunny");
        element.style.display = "flex";
    }
    else if (code == 2 || code == 3 || code == 45 || code == 48) {
        let element = document.getElementById("cloudy");
        element.style.display = "flex";
    }
    else {
        let element = document.getElementById("rainy");
        element.style.display = "flex";
    }
}


const digits = document.querySelectorAll(".digit");
const typingResult = document.querySelector("#typingResult");
let buttonArr = [];
let selectedFloorList = [];
const maxFloor = 20;
for (const digit of digits) {
    digit.addEventListener('click', (e) => {
        buttonArr.push(digit.innerHTML);
        console.log(buttonArr);
        typingResult.innerHTML = buttonArr.join('');
    })
}
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener('click', (e) => {
    buttonArr.pop();
    typingResult.innerHTML = buttonArr.join('');
})
const submitButton = document.querySelector("#submit");
const floorList = document.querySelector('#floorList');
submitButton.addEventListener('click', (e) => {
    const selectedFloor = parseInt(buttonArr.join(''));
    if (selectedFloor <= maxFloor && !selectedFloorList.includes(selectedFloor)) {
        const circle = document.createElement('div');
        circle.classList.add("selectedFloor");
        circle.addEventListener('click', (e) => {
            circle.remove();
        })
        const textDiv = document.createElement('div');
        textDiv.innerHTML = selectedFloor;
        circle.appendChild(textDiv);
        floorList.appendChild(circle);
        buttonArr = [];
        selectedFloorList.push(selectedFloor);
        typingResult.innerHTML = buttonArr.join('');
    } else {
        console.log("Bad");
        submitButton.classList.add('invalid');
        buttonArr = [];
        typingResult.innerHTML = buttonArr.join('');
        setTimeout(function () {
            submitButton.classList.remove('invalid');
            submitButton.classList.add('remove-invalid');
        }, 1000);
        setTimeout(function () {
            submitButton.classList.remove('remove-invalid');
        }, 750);
    }
});


const floorHeaders = document.querySelectorAll('.floorHeader');
for (const header of floorHeaders) {
    header.addEventListener('click', (e) => {
        const menu = document.querySelector(`#menu-${header.id[7]}`)
        if (menu.style.maxHeight === "0px" || !menu.style.maxHeight) {
            menu.style.maxHeight = menu.scrollHeight + "px";
        } else {
            menu.style.maxHeight = "0px";
        }
    })
}
