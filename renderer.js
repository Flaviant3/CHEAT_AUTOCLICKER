const { ipcRenderer } = require('electron')

document.getElementById('startAutoClick').addEventListener('click', () => {
    ipcRenderer.send('start-autoclick')
})

document.getElementById('stopAutoClick').addEventListener('click', () => {
    ipcRenderer.send('stop-autoclick')
})

ipcRenderer.on('autoclick-status', (event, status) => {
    document.getElementById('autoClickStatus').innerText = `État de l'AutoClick : ${status ? 'Démarré' : 'Arrêté'}`
})
