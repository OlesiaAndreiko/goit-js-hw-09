import { Notify } from 'notiflix/build/notiflix-notify-aio'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const DELAY = 1000;
const startBtn = document.querySelector('button[data-start]');
const refs = {
    dataDays : document.querySelector('span[data-days]'),
    dataHours : document.querySelector('span[data-hours]'),
    dataMinutes : document.querySelector('span[data-minutes]'),
    dataSeconds : document.querySelector('span[data-seconds]'),
}
let remainderTime = 0;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        const selectedDate =  selectedDates[0].getTime();
        const currentTime = options.defaultDate.getTime();

        remainderTime = selectedDate - currentTime;
        // console.log(remainderTime);

        if(remainderTime < 0) {
            Notify.failure('Please choose a date in the future');
            } else {
                startBtn.removeAttribute('disabled');
                   }
    },
};

flatpickr('#datetime-picker', options);
// console.log(selectedDate);

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onClickStart);


function onClickStart() {
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {

        // console.log(convertMs(remainderTime));
        timerUpdete(convertMs(remainderTime));
        remainderTime -= DELAY;
        // перевірка: стр.47 закоментувати, стр.49 розкоментувати
        // remainderTime -= 20000000;

        if(remainderTime - DELAY < 0) {
        stopTimer(remainderTime, DELAY);
        // console.log(remainderTime);
        }
    }, DELAY)
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


function timerUpdete({days, hours, minutes, seconds}) {
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function stopTimer(time, delay) {        
        refs.dataDays.textContent = '00';
        refs.dataHours.textContent = '00';
        refs.dataMinutes.textContent = '00';
        refs.dataSeconds.textContent = '00'; 
        clearInterval(timerId);   
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}
