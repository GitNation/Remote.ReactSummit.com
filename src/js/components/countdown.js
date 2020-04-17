function minutesDiff(m1, m2) {
  const diff = m2 - m1;
  return diff > 0 ? diff : 1440 + diff;
}

const formatTime = (hhNum, mmNum) => {
  const hh = `${hhNum}`;
  const mm = `${mmNum}`;
  const ss = `${60 - new Date().getSeconds()}`;
  return `0:${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`;
};

const timeDiff = (startStr, nowStr) => {
  const startObj = new Date(startStr);
  const nowObj = new Date(nowStr);
  const sHH = startObj.getHours();
  const sMM = startObj.getMinutes();
  const nHH = nowObj.getHours();
  const nMM = nowObj.getMinutes();

  const sTotalMM = sHH * 60 + sMM;
  const nTotalMM = nHH * 60 + nMM;

  const correctedDiffMM = sTotalMM - nTotalMM; // minutesDiff(nTotalMM, sTotalMM);
  const diffHH = Math.floor(correctedDiffMM / 60);
  const deffMMrest = correctedDiffMM - diffHH * 60;
  return { diffHH, diffMM: deffMMrest };
};

export default function countdown() {
  // Set the date we're counting down to
  var utmStart = new Date('Apr 17, 2020 13:00:00 GMT').getTime();

  var leadingZero = function(n) {
    if (n < 10 && n >= 0) return '0' + n;
    else return n;
  };

  var countdownContainer = document.getElementById('countdown');

  if (countdownContainer) {
    // Update the count down every 1 second
    var x = setInterval(function() {
      // Get today's date and time
      var now = new Date().getTime();
      const utmNow = new Date().toUTCString();
      const diffObj = timeDiff(utmStart, utmNow);
      const isLive = diffObj.diffHH < 0;

      const diffStr = formatTime(diffObj.diffHH, diffObj.diffMM);

      // Find the distance between now and the count down date
      // var distance = utmStart - now;

      /*  // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var hours = leadingZero(hours);
      var minutes = leadingZero(minutes);
      var seconds = leadingZero(seconds); */

      // If the count down is over, write some text
      if (isLive) {
        clearInterval(x);
        countdownContainer.innerHTML = '<div class="live">LIVE<div>';
      } else {
        // Output the result in an element with id="demo"
        countdownContainer.innerHTML = diffStr;
      }
    }, 1000);
  }
}
