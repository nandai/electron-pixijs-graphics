/**
 * (C) 2016 printf.jp
 */

/// <reference path='../../typings/tsd.d.ts' />;

import electron = require('electron');

/**
 * main
 */
function main()
{
    const app = electron.app;
    app.on('ready', () =>
    {
        const options : Electron.BrowserWindowOptions =
        {
            title: 'Graphics',
            width:  800,
            height: 600,
//          backgroundColor: '#000',    // backgroundColorを設定しても、起動時にどうしても一瞬白く表示される
//          show: false,
        };

        let wnd = new electron.BrowserWindow(options);
        const url = `file://${__dirname}/../../index.html`;

        wnd.loadURL(url);
        wnd.on('closed', () => wnd = null);

        // メニュー設定
        const menuItems : Electron.MenuItemOptions[] =
        [
            {
                label: 'File(&F)',
                submenu:
                [
                    {label:'Exit(&X)', click:app.quit}
                ]
            },

            {
                label: 'Dev(&D)',
                submenu:
                [
                    {
                        label: 'Reload(&R)',
                        accelerator: 'CmdOrCtrl+R',
                        click: function() {wnd.webContents.reload();}
                    },
                    {
                        label: 'Toggle Developer Tools(&T)',
                        accelerator: 'Alt+CmdOrCtrl+I',
                        click: function() {wnd.webContents.toggleDevTools();}
                    },
                ]
            }
        ];
        const menu = electron.Menu.buildFromTemplate(menuItems);
        electron.Menu.setApplicationMenu(menu);
    });

    app.on('window-all-closed', () =>
    {
        if (process.platform != 'darwin')
            app.quit();
    });
}

main();
