var notificationsMod = {
  a: 1,
  b: 2,
  load: (mainWindow) => {
    return mainWindow.webContents.executeJavaScript(`
    var notification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet',
      title: "Hello",
      icon: 'C:/images/icon.png',
      // To prevent sound
      //silent:true,
    });

    notification.addEventListener("click", function() {
      console.log("Clicked");
    }, false);

    notification.addEventListener("show", function() {
      console.log("Shown :3");
    }, false);

    notification.addEventListener("error", function(e) {
      console.log("Error :c");
    }, false);

    notification.addEventListener("close", function() {
      console.log("Closed");
    }, false);

    `);

  }
}
module.exports = notificationsMod;
