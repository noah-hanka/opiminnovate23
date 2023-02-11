



function getGeolocation() {
    return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                console.log("Latitude: " + lat + "\nLongitude: " + lng);
                resolve({ lat: lat, lng: lng });
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}



async function getData(latitude, longitude) {
    let data;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`);
        data = await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    return data;
}


getGeolocation()
    .then(
        (coords) => {
            return getData(coords['lat'], coords['lng']);
        })
    .then(
        (data) => {
            let mytemp = data.current_weather.temperature;
            let myweather = data.current_weather.weathercode;
            displayWeather(mytemp, myweather)
        }
    )


function displayWeather(temp, code) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<div>${temp}°F</div>`;

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
function submitAction() {
    const selectedFloor = parseInt(buttonArr.join(''));
    if (selectedFloor <= maxFloor && !selectedFloorList.includes(selectedFloor)) {
        const circle = document.createElement('div');
        circle.classList.add("selectedFloor");
        circle.addEventListener('click', (e) => {
            circle.classList.add('delete-animation')
            selectedFloorList.splice(selectedFloorList.indexOf(circle.childNodes[0].innerHTML), 1);
            setTimeout(() => {
                circle.remove();
            }, 1000)
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
}
submitButton.addEventListener('click', submitAction);


const floorHeaders = document.querySelectorAll('.floorHeader');
for (const header of floorHeaders) {
    header.addEventListener('click', (e) => {
        const num = header.id[7];
        const menu = document.querySelector(`#menu-${num}`)
        if (menu.style.maxHeight === "0px" || !menu.style.maxHeight) {
            menu.style.maxHeight = menu.scrollHeight + "px";
        } else {
            menu.style.maxHeight = "0px";
        }
    })
}



// image carousel
const carousel = document.querySelector("#carousel");
const images = carousel.querySelectorAll("img");
let index = 0;

function changeImage() {
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("prev", "active", "next");
    }
    images[index].classList.add("active");
    if (index === 0) {
        images[images.length - 1].classList.add("prev");
    } else {
        images[index - 1].classList.add("prev");
    }
    if (index === images.length - 1) {
        images[0].classList.add("next");
    } else {
        images[index + 1].classList.add("next");
    }
    index = (index + 1) % images.length;
}

setInterval(changeImage, 3000); // Change image every 3 seconds


