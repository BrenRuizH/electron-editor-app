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
            },
            {
                role: 'toggledevtools'
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;