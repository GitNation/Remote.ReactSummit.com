
var links = [
  'https://meet.google.com/udy-jnrt-ymf',
  'https://meet.google.com/uvn-ztci-bbt',
  'https://meet.google.com/gpq-opbx-amb'
];

openRandomRoom = function() {
  var randIdx = Math.random() * links.length;
  randIdx = parseInt(randIdx, 10);
  var link = links[randIdx];
  window.open(link);
};
