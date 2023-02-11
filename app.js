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