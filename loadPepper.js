var loadPepper = {
  a: 1,
  b: 2,
  load: (app, path) => {
    let pluginName
    switch (process.platform) {
      case 'win32':
        pluginName = 'pepflashplayer.dll'
        break
      case 'darwin':
        pluginName = 'PepperFlashPlayer.plugin'
        break
      case 'linux':
        pluginName = 'libpepflashplayer.so'
        break
    }
    app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname + '/PepperFlash/', pluginName))

    // Optional: Specify flash version, for example, v17.0.0.169
    app.commandLine.appendSwitch('ppapi-flash-version', '22.0.0.209')
  }
}
module.exports = loadPepper;
