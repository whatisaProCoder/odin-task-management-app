const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        titleBarOverlay: "hidden",
        icon: path.join(__dirname, 'src', 'icons', 'favicon.png'),
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.loadFile(path.join(__dirname, 'dist', 'index.html'));

    attachTitlebarToWindow(mainWindow);

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
