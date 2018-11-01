'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
const os = require('os')
const path = require('path')
const PDFWindow = require('electron-pdf-window')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1145,
    title: '二维码生成工具',
    // titleBarStyle: 'hiddenInset'
    // frame: false
    frame: false,
    backgroundColor: '#fff', // '#3f3c37',
    center: true,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    titleBarStyle: 'hidden',
    maximizable: false
    // webPreferences: {
    //   backgroundThrottling: false
    // }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('printTox', event => {
  console.log('printTox')
  mainWindow.webContents.print({ silent: false, printBackground: false })
})

ipcMain.on('printToPdf', (event, rowWidth) => {
  console.log('printToPdf')
  console.log(rowWidth)
  const pdfPath = path.join(os.tmpdir(), 'printxx.pdf')
  // const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  mainWindow.webContents.printToPDF(
    {
      pageSize: 'A4',
      printSelectionOnly: false,
      printBackground: true,
      landscape: false
    },
    (error, data) => {
      if (error) throw error
      fs.writeFile(pdfPath, data, error => {
        if (error) throw error
        // shell.openExternal(`file://${pdfPath}`)
        // event.sender.send('wrote-pdf', pdfPath)
        const win = new PDFWindow({
          width: 1000,
          height: 600,
          // frame: false,
          title: 'xxxx'
        })
        win.loadURL(pdfPath)
      })
    }
  )

  // console.log('printEnd.................')
  // mainWindow.webContents.send('printEnd')
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
