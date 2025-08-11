const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const { shell } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 950,
    height: 650,
    minWidth: 400,
    minHeight: 600,
    titleBarStyle: "hidden",
    icon: path.join(__dirname, "src", "icons", "favicon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "dist", "index.html"));

  win.removeMenu();

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Uncomment to open DevTools for debugging
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS re-create window if none are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // Quit on all platforms except macOS
  if (process.platform !== "darwin") app.quit();
});

const { ipcMain } = require("electron");

ipcMain.on("window-minimize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.minimize();
});

ipcMain.on("window-maximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-unmaximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.unmaximize();
});

ipcMain.on("window-close", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});
