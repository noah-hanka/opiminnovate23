const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


const vocab = ["elevate", "floor", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const numbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'])


const grammar = `#JSGF V1.0; grammar vocab; public <vocab> = ${vocab.join(' | ')};`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();

recognition.onresult = (event) => {
    let command = event.results[event.results.length - 1][0].transcript;
    command = command.toLowerCase();
    console.log(command);
    let words = command.split(' ');
    console.log(words);
    if (words[0] === 'elevate') {
        if (numbers.has(words[1])) {
            const selectedFloor = parseInt(words[1]);
            console.log(`floor: ${selectedFloor}`);
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
            }
        }
    }
}
