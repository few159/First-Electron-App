const { app, BrowserWindow } = require('electron')
const path = require('path')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        //This is for MacOs since when you 'close' all windows of an application, it just standsby
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.addListener('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})