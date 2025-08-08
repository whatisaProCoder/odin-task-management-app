const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: "hidden",
        frame: true,
        icon: path.join(__dirname, 'src', 'icons', 'favicon.png'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        },
    });

    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    // Optional: open devtools for debugging
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS, re-create window when dock icon is clicked and no other windows open
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit app when all windows closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
