const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
  isMaximized: (callback) => ipcRenderer.on("window-isMaximized", callback),
  unmaximize: () => ipcRenderer.send("window-unmaximize"),
});
