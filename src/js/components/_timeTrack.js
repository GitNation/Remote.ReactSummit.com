
function timeToMinutes(time) {
  var hm = time;
  var a = hm.split(':');
  var minutes = (+a[0]) * 60 + (+a[1]);
  return minutes;
}

var trackItems = document.getElementsByClassName('js-time');

for(var i=0; i< trackItems.length; i++) {
  var minutes;
  var minutesUpdated;

  minutes = timeToMinutes(trackItems[i].dataset.time);

  minutesUpdated = minutes - 840;

  trackItems[i].style.left = (minutesUpdated * 3.33) + 26 + 'px';
}

function leadingZero(n) {
  if (n < 10 && n >= 0)
    return '0' + n;
  else
    return n;
};


var currentTimeElem = document.getElementById('js-current-time');

if (currentTimeElem) {
  var currentTime = getTime();

  setTimeLinePosition();

  function getTime() {
	  var currentDate = new Date();
	  var currentHours = currentDate.getHours();
	  var currentMinutes = currentDate.getMinutes();
	  currentHours = leadingZero(currentHours);
	  currentMinutes = leadingZero(currentMinutes);
	  document.getElementById('js-current-time').innerHTML = currentHours + ':' + currentMinutes;
	  return currentHours + ':' + currentMinutes;
  }

  function setTimeLinePosition() {
	  var minutes = timeToMinutes(currentTime);
	  var minutesUpdated;
	  minutesUpdated = minutes - 840;
	  document.getElementById('js-current-time-track').style.left = (minutesUpdated * 3.33) + 26 + 'px';
  }

  var x = setInterval(function() {
  	currentTime = getTime();
  	getTime();
  	setTimeLinePosition();
  }, 5000);
}
