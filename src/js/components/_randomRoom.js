
var links = [
  'https://gitnation.zoom.us/j/99638466090?pwd=UnlZSzBzZmFTZlFSTWZzRVhxY0tUZz09',
  'https://gitnation.zoom.us/j/93913206572?pwd=K0lVdm9sTWlEeVlCWlU5cit4akxjZz09',
  'https://gitnation.zoom.us/j/97047254192?pwd=aHhlOFNRcWtqM0VobWh5Q20yOFU3QT09'
];

openRandomRoom = function() {
  var randIdx = Math.random() * links.length;
  randIdx = parseInt(randIdx, 10);
  var link = links[randIdx];
  window.open(link);
};
