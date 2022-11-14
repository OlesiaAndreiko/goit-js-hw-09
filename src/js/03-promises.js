import { Notify } from 'notiflix/build/notiflix-notify-aio'

const form = document.querySelector('.form')
const { 
  delay : firstDelay,
  step : delayStep,
  amount : amountPromise, } = form.elements;

form.addEventListener('submit', onMakePromise)
// console.dir(form)
// console.log(form.elements)

function onMakePromise(evt) {
  evt.preventDefault();

  let delay = Number(firstDelay.value)
  const step = Number(delayStep.value)
  const amount = Number(amountPromise.value)

  for (let i = 1; i <= amount; i+=1) {
  createPromise(i, delay)
  .then(({ position, delay }) => {
    onSucsess(position, delay)
  })
  .catch(({ position, delay }) => {
    onError(position, delay)
  });
  
  delay += step
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({position, delay})
      } else {
        rej({position, delay})
      }
    }, delay)
  })
}  

function onSucsess(position, delay) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError(position, delay) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
