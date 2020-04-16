const cestGmtShift = 2;

const cestToLocal = (timeString) => {
  const fullStringGmtWrong = `17 Apr 2020 ${timeString}:00 GMT`;
  const dateLocalWrong = new Date(fullStringGmtWrong);
  dateLocalWrong.setHours(dateLocalWrong.getHours() - cestGmtShift);
  const correctedTime = dateLocalWrong;
  return correctedTime;
};

const formatTime = (dateObj) => {
  const hh = `${dateObj.getHours()}`;
  const mm = `${dateObj.getMinutes()}`;
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
};

const parseTime = (timeString) => {
  const dateStr = `17 Apr 2020 ${timeString}:00`;
  return new Date(dateStr);
};

const localTimeOf = (str) => {
  try {
    return formatTime(cestToLocal(str));
  } catch (err) {
    console.error(err);
    return '??:??';
  }
};

const minutesFrom = (localTimeStart) => {
  const startTimeObj = parseTime(localTimeStart);
  const startMinutes = startTimeObj.getHours() * 60 + startTimeObj.getMinutes();
  return (timeString) => {
    const timeStr = localTimeOf(timeString);
    const timeObj = parseTime(timeStr);
    const totalMinutes = timeObj.getHours() * 60 + timeObj.getMinutes();
    const minFrom = totalMinutes - startMinutes;
    console.log(
      'minutesFrom -> totalMinutes - startMinutes',
      totalMinutes,
      startMinutes
    );
    return minFrom;
  };
};

window.cestToLocal = cestToLocal;

const cestStartTime = '13:00';
var startTime = localTimeOf(cestStartTime);
window.startTime = startTime;
var endTime = localTimeOf('21:30');

window.log = () => {
  console.log('startTime', startTime);
  console.log('endTime', endTime);
};

var trackStepInMin = 5;
var pxPerMinute = 50 / trackStepInMin;
var startTimeInMin = timeToMinutes(startTime);
var endTimeInMin = timeToMinutes(endTime);
var confDurationInMin = endTimeInMin - startTimeInMin;
var confDurationInHours = confDurationInMin / 60;
var timelineWidth = confDurationInMin * pxPerMinute;

var timeline = document.getElementById('js-timeline');
var trackItems = document.getElementsByClassName('js-time');
var qaItems = document.getElementsByClassName('js-qa-item');
var currentTimeElem = document.getElementById('js-current-time');
var trackHead = document.getElementById('js-track-head');
var trackCurrentTime = document.getElementById('js-current-time-track');
var splittedStartTime = startTime.split(':');
var trackLines = '';

function timeToMinutes(time) {
  var hm = time;
  var a = hm.split(':');
  var minutes = +a[0] * 60 + +a[1];
  return minutes;
}

function leadingZero(n) {
  if (n < 10 && n >= 0) return '0' + n;
  else return n;
}

function getTime() {
  var currentDate = new Date();
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  currentHours = leadingZero(currentHours);
  currentMinutes = leadingZero(currentMinutes);
  document.getElementById('js-current-time').innerHTML =
    currentHours + ':' + currentMinutes;
  return currentHours + ':' + currentMinutes;
}

function setTimeLinePosition(tm) {
  var minutes = timeToMinutes(tm);
  var minutesUpdated;
  minutesUpdated = minutes - startTimeInMin;
  trackCurrentTime.style.left = minutesUpdated * pxPerMinute + 26 + 'px';

  // hide if conference ended
  if (minutes > timeToMinutes(endTime)) {
    trackCurrentTime.style.display = 'none';
  }
}

const renderTimeTick = ({ hh, mm }) => {
  return `<div class="time-track__head-item">${hh}:${mm}</div>`;
};

function createHeadTimeline() {
  if (!currentTimeElem) {
    return;
  }
  // Create head timeline
  const timeTicksList = new Array(Math.ceil(confDurationInMin / 5) + 1).fill(0);

  const ticks = [];
  const startTimeObj = parseTime(startTime);
  timeTicksList.forEach(() => {
    const timeStr = formatTime(startTimeObj);
    const [hh, mm] = timeStr.split(':');
    const newTick = renderTimeTick({ hh, mm });
    ticks.push(newTick);
    startTimeObj.setMinutes(startTimeObj.getMinutes() + 5);
  });

  trackHead.innerHTML = ticks.join('\n');
  timeline.style.width = timelineWidth + 52 + 'px';

  // Set width of QAs
  // for(var i=0; i< qaItems.length; i++) {
  // 	var qaItemDutaion = parseInt(qaItems[i].dataset.qaDuration);
  //   var qaItemWidth = qaItemDutaion * pxPerMinute;
  //   qaItems[i].style.width = qaItemWidth + 'px';
  // }
}

function putEventsToTimeline() {
  // Set width and position of talks
  // for (var i = 0; i < trackItems.length; i++) {
  //   var minutes;
  //   var duration;
  //   var minutesUpdated;
  //   var itemPosLeft;
  //   var itemWidth;
  //   minutes = timeToMinutes(trackItems[i].dataset.time);
  //   duration = trackItems[i].dataset.duration;
  //   minutesUpdated = minutes - startTimeInMin;
  //   itemPosLeft = minutesUpdated * pxPerMinute + 26 + 'px';
  //   itemWidth = duration * pxPerMinute - 1 + 'px';
  //   // trackItems[i].style.width = itemWidth;
  //   // trackItems[i].style.left = itemPosLeft;
  // }

  const shiftInPx = (minutes) => {
    const px = `${minutes * pxPerMinute}px`;
    return px;
  };

  const culcMinutes = minutesFrom(startTime);

  const cestObj = parseTime(cestStartTime);
  const cestStartMinutes = cestObj.getHours() * 60 + cestObj.getMinutes();
  console.log('putEventsToTimeline -> cestStartMinutes', cestStartMinutes);

  [...trackItems].forEach((event) => {
    // const timeObj = parseTime(event.dataset.time);
    // const minutes = culcMinutes(timeStr);
    // console.log('putEventsToTimeline -> minutes', minutes);

    const eventObj = parseTime(event.dataset.time);
    const eventMinutes = eventObj.getHours() * 60 + eventObj.getMinutes();
    console.log('putEventsToTimeline -> eventMinutes', eventMinutes);
    const minutes = eventMinutes - cestStartMinutes;

    event.style.left = shiftInPx(minutes);
    const duration = event.dataset.duration;
    event.style.width = `${duration * pxPerMinute - 1}px`;
  });
}

function LiveTimeLine() {
  const updateTime = () => {
    const currentTime = getTime();
    setTimeLinePosition(currentTime);
  };
  updateTime();
  setInterval(updateTime, 5000);
}

createHeadTimeline();
putEventsToTimeline();
LiveTimeLine();
