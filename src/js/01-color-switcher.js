const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

startBtn.addEventListener('click', onClickStart)
stopBtn.addEventListener('click', onClickStop)
let intervalId

stopBtn.setAttribute('disabled', true)

startBtn.style.textTransform = 'uppercase';
stopBtn.style.textTransform = 'uppercase';
startBtn.style.width = "60px";
startBtn.style.height = "30px";
stopBtn.style.width = "60px";
stopBtn.style.height = "30px";

// startBtn.style.transform = `translate(${1000}%, ${1000}%)`;
// stopBtn.style.transform = `translate(${1150}%, ${900}%)`;
// startBtn.style.display = "flex";
// startBtn.style.alignItems = "center";
// startBtn.style.flexWrap = "noWrap";
// startBtn.style.justifyContent = "center";
// stopBtn.style.display = "flex";
// stopBtn.style.alignItems = "center";
// stopBtn.style.justifyContent = "center";
// stopBtn.style.flexWrap = "noWrap";


function onClickStart(){
    stopBtn.removeAttribute('disabled')
    startBtn.setAttribute('disabled', true)

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onClickStop(){
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', true)
    clearInterval(intervalId);
}

function getRandomHexColor(){
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
