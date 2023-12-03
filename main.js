const { app, BrowserWindow, ipcMain } = require('electron');

let autoclickActive = false;
let autoclickInterval;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('start-autoclick', (event) => {
    if (!autoclickActive) {
        autoclickActive = true;
        autoclickInterval = setInterval(() => {
            // Simulation de clic à une position fixe (à adapter selon vos besoins)
            // Vous pouvez utiliser une bibliothèque comme "robotjs" pour des clics plus avancés.
            console.log('Simuler un clic');
        }, 1000 / 10); // 10 clics par seconde

        event.sender.send('autoclick-status', autoclickActive);
    }
});

ipcMain.on('stop-autoclick', (event) => {
    if (autoclickActive) {
        autoclickActive = false;
        clearInterval(autoclickInterval);

        event.sender.send('autoclick-status', autoclickActive);
    }
});
