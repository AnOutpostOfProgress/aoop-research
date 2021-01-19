const noSleep = new NoSleep();

document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  noSleep.enable();
}, false);

const btnPlay = document.getElementById('btn-play');
const btnArith = document.querySelectorAll('.btn-arith');

let timerIsRunning = false;
let timerInstance, pauseInstance;

const beep01 = document.getElementById("beep01");
const beep02 = document.getElementById("beep02");


btnPlay.addEventListener('click', event =>{

  document.getElementById('triangle').classList.toggle('displayNone');
  document.getElementById('square').classList.toggle('displayNone');

  btnArith.forEach(item =>{
    item.classList.toggle('hidden');
  });

  timerIsRunning ? stopTimer() : startTimer();

}); 


btnArith.forEach(item =>{
  item.addEventListener('click', event =>{

    const counter = item.parentNode.children[2]; //access to corresponding counter-element
    const arithVal = parseInt(item.getAttribute('data-arith'));
   
    let dataCounter = parseInt(counter.getAttribute('data-counter')) + arithVal;

    if(dataCounter > 0){
      counter.setAttribute('data-counter', dataCounter);
      counter.innerHTML = dataCounter;
    }

  })
})


function startTimer(){

  timerIsRunning = true;
  
  const timer = document.getElementById('timer');
  const pause = document.getElementById('pause');

  let timerVal = document.getElementById('timerVal');
  let pauseVal = document.getElementById('pauseVal');
  let repVal = document.getElementById('repVal');

  if(parseInt(repVal.innerHTML)!=0){
    
    timer.classList.toggle('active');
    document.querySelector('#timer object').classList.replace('greenIcon', 'whiteIcon');
    beep01.play();

    timerInstance = setInterval( () =>{
      
      timerVal.innerHTML = parseInt(timerVal.innerHTML) - 1;

      if (parseInt(timerVal.innerHTML)==0){

        window.clearInterval(timerInstance);
        repVal.innerHTML = parseInt(repVal.innerHTML) - 1;
        timerVal.innerHTML = timerVal.getAttribute('data-counter');
        timer.classList.toggle('active');
        document.querySelector('#timer object').classList.replace('whiteIcon', 'greenIcon');
        beep02.play();

        if(parseInt(repVal.innerHTML)!=0){
          
          pause.classList.toggle('active');
          document.querySelector('#pause object').classList.replace('greenIcon', 'whiteIcon');
          
          pauseInstance = setInterval( () =>{
            
            pauseVal.innerHTML = parseInt(pauseVal.innerHTML) - 1;
            
            if (parseInt(pauseVal.innerHTML)==0){
              window.clearInterval(pauseInstance);
              pauseVal.innerHTML = pauseVal.getAttribute('data-counter');
              pause.classList.toggle('active');
              document.querySelector('#pause object').classList.replace('whiteIcon', 'greenIcon');

              if(parseInt(repVal.innerHTML)!=0){
                startTimer();
              }
            }
          },1000)

        }else{
          stopTimer();
          //setTimeout(beep02.play(),1000); //optional final finish sound
        }
      }


    },1000);
  }
}


function stopTimer(){

  window.clearInterval(timerInstance);
  window.clearInterval(pauseInstance);

  timerIsRunning = false;

  document.getElementById('timerVal').innerHTML = document.getElementById('timerVal').getAttribute('data-counter');
  document.getElementById('pauseVal').innerHTML = document.getElementById('pauseVal').getAttribute('data-counter');
  document.getElementById('repVal').innerHTML = document.getElementById('repVal').getAttribute('data-counter');
  
  document.getElementById('timer').classList.remove('active');
  document.getElementById('pause').classList.remove('active');
  document.getElementById('triangle').classList.remove('displayNone');
  document.getElementById('square').classList.add('displayNone');

  document.querySelector('#timer object').classList.add('greenIcon');
  document.querySelector('#timer object').classList.remove('whiteIcon');
  document.querySelector('#pause object').classList.add('greenIcon');
  document.querySelector('#pause object').classList.remove('whiteIcon');

  btnArith.forEach(item =>{
    item.classList.remove('hidden');
  });
  
}


