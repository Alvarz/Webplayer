// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {
  ipcRenderer
} = require('electron');


const WebTorrent = require('webtorrent');
const client = new WebTorrent({
  tracker: [
    'udp://open.demonii.com:1337/announce',
    'udp://tracker.openbittorrent.com:80',
    'udp://tracker.coppersurfer.tk:6969',
    'udp://glotorrents.pw:6969/announce',
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://torrent.gresille.org:80/announce',
    'udp://p4p.arenabg.com:1337',
    'udp://tracker.leechers-paradise.org:6969'
  ]
});
const fs = require('fs');

// var sintel = 'https://webtorrent.io/torrents/sintel.torrent'

var magnetURI =
  'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

var sintel = 'https://yts.ag/torrent/download/BE046ED20B048C4FB86E15838DD69DADB27C5E8A';


// You can use console.log(notification); to see more available properties
onload = () => {

  var download = sintel;

  var params = {
    path: './download/'
  }
  client.add(download, params, function(torrent) {
    console.log('Client is downloading:', torrent.infoHash)
    console.log('download speed: ' + torrent.downloadSpeed);



    torrent.files.forEach(function(file) {
      // Display the file by appending it to the DOM. Supports video, audio, images, and
      // more. Specify a container element (CSS selector or reference to DOM node).
      file.appendTo('body');


    })
  });

  client.on('torrent', function(torrent) {

    console.log('Established connection');

    torrent.on('done', function() {

      console.log('Finished downloading file');

      torrent.files.forEach(function(file) {
        console.log('seedeing');
        var buf = new Buffer(file);
        client.seed(buf, function(torrent) {
          console.log(torrent);
        });
      })
    })
    torrent.on('download', function(chunksize) {
      // console.log('total downloaded: ' + torrent.downloaded);
      // console.log('download speed: ' + torrent.downloadSpeed);
      console.log('progress: ' + torrent.progress + ' to ' + torrent.downloadSpeed + " speed");

    })
    torrent.on('ready', function() {
      console.log("ready");
      // var file = torrent.files[0]
      //   // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      // file.appendTo('body')
    });
    torrent.on('metadata', function(metadata) {
      console.log(metadata);
    })
    torrent.on('warning', function(warn) {
      console.warn(warn);
    })
    torrent.on('error', function(err) {
      console.error(err);
    })
  })


}
