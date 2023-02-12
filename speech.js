const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


const vocab = ["elevate", "1", "2", "3", "4", "5", "6", "7", "8", '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
const numberLookup = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: '14',
    15: '15',
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    19: '19',
    19: '19',
    20: '20',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',
    eleven: '11',
    twelve: '12',
    thirteen: '13',
    fourteen: '14',
    fifteen: '15',
    sixteen: '16',
    seventeen: '17',
    eighteen: '18',
    nineteen: '19',
    twenty: '20',
    too: '2',
    for: '4',
    to: '2'
}


const grammar = `#JSGF V1.0; grammar vocab; public <voc> = ${vocab.join(' | ')};`
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();

const mic = document.querySelector("#micButton");
let muted = false;
mic.addEventListener('click', (e) => {
    console.log('muted');
    mic.classList.toggle("muted");
    if (muted) {
        recognition.start();
    } else {
        recognition.stop();
    }
})

recognition.onresult = (event) => {
    let command = event.results[event.results.length - 1][0].transcript;
    command = command.toLowerCase().trim();
    let words = command.split(' ');
    if (words[0] === 'elevator') {
        if (numberLookup.hasOwnProperty(words[1])) {
            const num = numberLookup[words[1]];
            const selectedFloor = parseInt(num);
            if (selectedFloor <= maxFloor && !selectedFloorList.includes(selectedFloor)) {
                const circle = document.createElement('div');
                circle.classList.add("selectedFloor");
                circle.addEventListener('click', (e) => {
                    circle.classList.add('delete-animation')
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
            }
        }
    }
}



