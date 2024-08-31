const { dialog } = require('electron');
const fs = require('fs');

module.exports.open_file = function(win) {
    const option = {
        title: "Abrir archivo",
        filters: [
            {
                name: "archivo",
                extensions: ['txt']
            }
        ]
    }

    const paths = dialog.showOpenDialogSync(win, option);

    if (paths && paths.length > 0) {
        const content = fs.readFileSync(paths[0]).toString();
        win.webContents.send('file-open', content);
    }
}

module.exports.save_file = function(win, data) {
    const option = {
        title: "Guardar archivo",
        filters: [
            {
                name: "archivo",
                extensions: ['txt']
            }
        ]
    }

    path = dialog.showSaveDialogSync(win, option);

    fs.writeFileSync(path, data);

    
    /* dialog.showSaveDialog(win, option).then(result => {
        console.log(result.canceled);
        console.log(result.filePath);
    }); */

    console.log("Luego del dialogo");
}