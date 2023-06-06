var countdownTimer = (function(countdownTimer){

    countdownTimer.functions = {
        startCountdownTimer: startCountdownTimer
    }

    return countdownTimer;


    function startCountdownTimer(){
        document.querySelector(document).ready(function(){

            // set the date we're counting down to
            var targetDate = new Date('July 18, 2023').getTime();

            // variables for time units
            var days, hours, minutes, seconds;
             
            // get tag element
            var countdown = document.getElementById('countdown');
             
            // update the tag with id "countdown" every 1 second
            setInterval(function () {
             
                // find the amount of "seconds" between now and target
                var current_date = new Date().getTime();
                var seconds_left = (targetDate - current_date) / 1000;
             
                // do some time calculations
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;
                 
                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;
                 
                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);
                 if(seconds_left < 0){
                 days = 0;
                 hours = 0;
                 minutes = 0;
                 seconds = 0;
                 }
                // format countdown string + set tag value
                countdown.innerHTML = '<span class="days"><b>' 
                + days +  ' </b><span class="black-text">Days</span><b></span> <span class="hours">' 
                + hours + ' </b><span class="black-text">Hours</span><b></span> <span class="minutes">'
                + minutes + ' </b><span class="black-text">Minutes</span><b></span> <span class="seconds">' 
                + seconds + ' </b><span class="black-text">Seconds</span></span>';  
             
            }, 1000);
        });
    }

})(countdownTimer || []);