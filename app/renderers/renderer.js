// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {
  ipcRenderer
} = require('electron')


// You can use console.log(notification); to see more available properties
onload = () => {

  const webview = document.getElementById('designer');

  $.material.init()

  loadPage('main');

  $(document).on('click', '#Create', () => {
    loadPage('takeNote');
  });

  $(document).on('click', '#Notes', () => {
    loadPage('main');
  });

  $(document).on('click', '#EditNotes', () => {
    loadPage('editNote');
  });





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



var loadPage = (page) => {
  $.ajax({
    url: "views/" + page + '.html',
    type: 'GET',
    tryCount: 0,
    retryLimit: 3,
    data: {},
    async: true,
    beforeSend: function() {
      //$('.container-fluid').html("<h1>loading...</h1>");
      //$('#contentCenter').html(loading('table',0));
      // $("#loading-table").show();
    },
    error: function(xhr, textStatus, errorThrown) {
      this.tryCount++;
      if (textStatus != 'abort') {
        if (this.tryCount <= this.retryLimit) {
          console.log(textStatus + ' ' + errorThrown);
          $.ajax(this);
          return;
        }
      }
      return;
    },
    complete: function() {},
    success: function(data) {
      $("#mainContent").html(data);
    }
  });
}
