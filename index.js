const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, "src", "icons", "favicon.png"),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    win.removeMenu();

    // Uncomment to open DevTools for debugging
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS re-create window if none are open
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    // Quit on all platforms except macOS
    if (process.platform !== 'darwin') app.quit();
});
