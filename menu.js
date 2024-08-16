const { Menu, shell, ipcMain } = require('electron');

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
})

const menu = Menu.buildFromTemplate(template);

module.exports = menu;