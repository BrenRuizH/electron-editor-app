const { app, Menu, shell, ipcMain, BrowserWindow, globalShortcut, dialog } = require('electron');

const fs = require('fs');
const path = require('path');
const { open_file, save_file } = require("./editor-options");

const template = [
    {
        role: 'help',
        submenu: [
            {
                label: "Sobre nosotros",
                click() {
                    //console.log("Hola Mundo");
                    shell.openExternal("https://www.electronjs.org");
                }
            }
        ]
    },
    {
        label: 'Archivo',
        submenu: [
            {
                label: "Guardar",
                accelerator: "CommandOrControl+Shift+S",
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    win.webContents.send('editor-channel', 'file-save');
                }
            },
            {
                label: "Abrir",
                accelerator: "CommandOrControl+Shift+O",
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    open_file(win);
                }
            }
        ]
    },
    {
        label: 'Estilo y Formato',
        submenu: [
            {
                label: 'Negritas',
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    win.webContents.send('editor-channel', 'style-bold');
                }
            },
            {
                label: 'Italica',
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    win.webContents.send('editor-channel', 'style-italic');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'H1',
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    win.webContents.send('editor-channel', 'style-h1');
                }
            },
            {
                label: 'H2',
                click() {
                    const win = BrowserWindow.getFocusedWindow();
                    win.webContents.send('editor-channel', 'style-h2');
                }
            }
        ]
    }
];

if(process.env.DEBUG) {
    template.push(
        {
            label: 'Debugging',
            submenu: [
                {
                    role: 'toggledevtools'
                },
                {
                    role: 'reload'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        }
    );
}

if(process.platform == 'win32') {
    template.push(
        {
            label: 'Windows',
            submenu: [
                {
                    role: 'toggledevtools'
                },
                {
                    role: 'reload',
                    accelerator: 'Alt+C'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        }
    );
}

ipcMain.on('editor-channel', (event, arg) => {
    console.log("Mensaje recibido del canal 'editor-channel': ", arg);
});

ipcMain.on('file-open', (event, arg) => {
    const win = BrowserWindow.getFocusedWindow();
        open_file(win);
});

ipcMain.on('file-save', (event, arg) => {
    console.log("Mensaje recibido del canal 'file-save': ", arg);

    const win = BrowserWindow.getFocusedWindow();

    save_file(win, arg);
});

app.on('ready', () => {
    console.log("App Lista");
    
    globalShortcut.register('CommandOrControl+Shift+S', () => {
        const win = BrowserWindow.getFocusedWindow();
        win.webContents.send('editor-channel', 'file-save');
    });

    globalShortcut.register('CommandOrControl+Shift+O', () => {
        const win = BrowserWindow.getFocusedWindow();
        open_file(win);
    });
});

const menu = Menu.buildFromTemplate(template);

module.exports = menu;