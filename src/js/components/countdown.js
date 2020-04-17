export default function countdown() {

  // Set the date we're counting down to
  var countDownDate = new Date('Apr 17, 2020 11:00:00').getTime();

  var leadingZero = function(n) {
    if (n < 10 && n >= 0)
      return '0' + n;
    else
      return n;
  };

  var countdownContainer = document.getElementById('countdown');

  if (countdownContainer) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var hours = leadingZero(hours);
      var minutes = leadingZero(minutes);
      var seconds = leadingZero(seconds);
        
      // Output the result in an element with id="demo"
      countdownContainer.innerHTML = days + ':' + hours + ':'
      + minutes + ':' + seconds;
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById('countdown').innerHTML = '<div class="live">LIVE<div>';
      }
    }, 1000);
  }
}
