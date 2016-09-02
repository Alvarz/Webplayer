window.onload = function() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.1.0.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(function() {
      var iframe = document.getElementById('app-player');
      $(iframe).ready(function() {
        setTimeout(function() {

          var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          $(innerDoc).on("click", "#play-pause", function() {
            var Songelem = innerDoc.getElementById("track-name");
            var song = Songelem.querySelector("a").innerHTML;

            var artistElem = innerDoc.getElementById("track-artist");
            var artist = artistElem.querySelector("a").innerHTML;

            if (!$(this).hasClass("playing")) {
              console.log("now playing " + song + " by " + artist);
            } else {
              console.log("pause! " + song + " by " + artist);
            }
          });
        }, 5000);


      });
    });
  };
  document.body.appendChild(script);
};
