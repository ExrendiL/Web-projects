export default class Timer{
    constructor(root){
        console.log(root);
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer-button-control"),
            reset: root.querySelector(".timer-button-reset"),
        };

        this.interval = null;
        this.remainingSeconds = 0;
        this.audio = new Audio('assets/timer.wav');


        this.el.control.addEventListener("click", () => {
            if(this.interval === null){
                this.start();
            }
            else{
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter minutes:"); 

           if(inputMinutes < 60){
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();  
           }
        });
    }

    updateInterfaceTime(){
      const minutes = Math.floor(this.remainingSeconds / 60); 
      const seconds = this.remainingSeconds % 60;

      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls(){
       if(this.interval === null){

        this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
        this.el.control.classList.add("timer-button-start");
        this.el.control.classList.remove("timer-button-stop");
       } 
       else{
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer-button-stop");
        this.el.control.classList.remove("timer-button-start");
       }
    }

    start(){
        if(this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();

        if(this.remainingSeconds === 0){
         this.stop();   
         this.audio.play();
        }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop(){
       clearInterval(this.interval); 

       this.interval = null;
       this.updateInterfaceControls();
    }

    static getHTML(){
        return `
        <div class="contaier-timer">
        <h1>Timer</h1>
        <p class="timer">
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        </p>
        <button type="button" class="timer-button timer-button-control timer-button-start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer-button timer-button-reset">
            <span class="material-icons">timer</span>
        </button>
    </div>
    `;
    }
}

new Timer(document.querySelector('.container-timer'));

window.onload = function(){
    let minutes = 0;
    let seconds = 0;
    let tens = 0;
    let appendMinutes = document.querySelector('#minutes');
    let appendSeconds = document.querySelector('#seconds');
    let appendTens = document.querySelector('#tens');
    let startBtn = document.querySelector('#start');
    let stopBtn = document.querySelector('#stop');
    let resetBtn = document.querySelector('#reset');
    let Interval;

    const startTimer = () =>{
        tens++;
        if(tens <= 9){
            appendTens.innerHTML = '0' + tens;
        }

        if(tens > 9){
            appendTens.innerHTML = tens;
        }

        if(tens > 99){
            seconds++;
            appendSeconds.innerHTML = '0' + seconds;
            tens = 0;
            appendTens.innerHTML = '0' + 0;
        }

        if(seconds > 9){
            appendSeconds.innerHTML = seconds;
        }

        if(seconds > 59){
            minutes++;
            appendMinutes.innerHTML = '0' + minutes;
            seconds = 0;
            appendSeconds.innerHTML = '0' + 0;
        }
    };

    startBtn.onclick = () => {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    };

    stopBtn.onclick = () => {
        clearInterval(Interval);
    };

    resetBtn.onclick = () => {
        clearInterval(Interval);
        tens = '00';
        seconds = '00';
        minutes = '00';
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
    };
};