const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'src', 'icons', 'favicon.png'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
        },
    });

    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    win.removeMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
