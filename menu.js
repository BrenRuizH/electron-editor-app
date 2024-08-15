const { Menu, shell } = require('electron');

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
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;