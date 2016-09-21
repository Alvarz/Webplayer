// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {
  ipcRenderer
} = require('electron')

const markdown = require("markdown").markdown;





// You can use console.log(notification); to see more available properties
onload = () => {
  const webview = document.getElementById('designer')

  console.log(markdown.toHTML("Hello *World*!"));
  // const playPause = document.getElementById('play-pause')
  // window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');

  const loadstart = () => {
    console.log("loading...");
  }

  const loadstop = () => {
    console.log("loaded");
    // if (!webview.isDevToolsOpened()) {
    //   webview.openDevTools();
    // }

  }
  if (webview != null) {
    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }


}
