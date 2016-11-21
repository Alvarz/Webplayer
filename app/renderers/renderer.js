// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {
  ipcRenderer
} = require('electron');


const WebTorrent = require('webtorrent');
const client = new WebTorrent();
const fs = require('fs');

var sintel = 'https://webtorrent.io/torrents/sintel.torrent'

var sintel = '../../torrent/sintel.torrent'
var magnetURI =
  'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

var sintel = 'https://yts.ag/torrent/download/BE046ED20B048C4FB86E15838DD69DADB27C5E8A';


// You can use console.log(notification); to see more available properties
onload = () => {

  var download = sintel
  client.add(download, {
    path: './download/'
  }, function(torrent) {
    console.log('Client is downloading:', torrent.infoHash)

    torrent.files.forEach(function(file) {
      // Display the file by appending it to the DOM. Supports video, audio, images, and
      // more. Specify a container element (CSS selector or reference to DOM node).
      file.appendTo('body');
    })
  });

  client.on('torrent', function(torrent) {
    console.log('Established connection')
    torrent.on('done', function() {
      console.log('Finished downloading file')
      var file = torrent.files[0]
      console.log(file);
      file.appendTo('body', function(err, elem) {
        if (err) throw err // file failed to download or display in the DOM
        console.log('New DOM node with the content', elem)
      })
    })
    torrent.on('download', function(chunksize) {
      // console.log('total downloaded: ' + torrent.downloaded);
      // console.log('download speed: ' + torrent.downloadSpeed);
      console.log('progress: ' + torrent.progress);

    })
    torrent.on('ready', function() {
      console.log("ready");
      var file = torrent.files[0]
        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      file.appendTo('body')
    });
    torrent.on('metadata', function(metadata) {
      console.log(metadata);
    })
    torrent.on('warning', function(err) {
      console.warn(err);
    })
    torrent.on('error', function(err) {
      console.error(err);
    })
  })


}
