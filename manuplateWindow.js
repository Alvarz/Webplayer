window.onload = () => {

  const BrowserWindow = require('electron').remote.getCurrentWindow()

  const m_notificationsMod = require("./notificationsMod");

  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.1.0.min.js";
  script.onload = script.onreadystatechange = () => {

    $(document).ready(() => {

      var iframe = document.getElementById('app-player');
      $(iframe).ready(() => {

        setTimeout(() => {
          var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

          $(innerDoc).on("click", "#play-pause", () => {

            var btn = innerDoc.getElementById("play-pause");
            var Songelem = innerDoc.getElementById("track-name");
            var song = Songelem.querySelector("a").innerHTML;

            var artistElem = innerDoc.getElementById("track-artist");
            var artist = artistElem.querySelector("a").innerHTML;

            var action = (!$(btn).hasClass("playing")) ? "Now Playing" : "Pause";
            var title = action + " " + song;
            var body = action + " " + song + " by " + artist;
            m_notificationsMod.load(BrowserWindow, title, body);

          });
        }, 5000);
      });
    });
  };
  document.body.appendChild(script);
};
