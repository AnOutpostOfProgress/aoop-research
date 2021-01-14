const beep01 = document.getElementById("beep01");
const beep02 = document.getElementById("beep02");
const buttons = document.querySelectorAll('.button');

buttons.forEach(item =>{
  item.addEventListener('click', event =>{
    
    item.classList.toggle('active');
    beep01.play();
    
    let display = document.querySelector("#" + CSS.escape(item.id) + " span");
    let timer = display.textContent; 
    let btnValue = timer;
    let seconds;

    --timer;
    
    setInterval(function () {
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = seconds;

      if (--timer < 0) {
          clearAllIntervals();
          beep02.play();
          display.textContent = btnValue;
          item.classList.toggle("active");
      }
    }, 1000);
    
  })
});


function clearAllIntervals(){                                           
  for (let i = 1; i < 999; i++){
    window.clearInterval(i);
  }
}


