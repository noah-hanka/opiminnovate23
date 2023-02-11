const digits = document.querySelectorAll(".digit");
const typingResult = document.querySelector("#typingResult");
let floorArr = [];
for (const digit of digits) {
    digit.addEventListener('click', (e) => {
        floorArr.push(digit.innerHTML);
        console.log(floorArr);
        typingResult.innerHTML = floorArr.join('');
    })
}
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener('click', (e) => {
    floorArr.pop();
    typingResult.innerHTML = floorArr.join('');
})