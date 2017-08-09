/**
 * (C) 2016-2017 printf.jp
 */
import {app, BrowserWindow, Menu} from 'electron';

/**
 * main
 */
function main()
{
    app.on('ready', () =>
    {
        const options : Electron.BrowserWindowConstructorOptions =
        {
            title: 'Graphics',
            width:  800,
            height: 600,
//          backgroundColor: '#000',    // backgroundColorを設定しても、起動時にどうしても一瞬白く表示される
//          show: false,
        };

        let wnd = new BrowserWindow(options);
        const url = `file://${__dirname}/../../index.html`;

        wnd.loadURL(url);
        wnd.on('closed', () => wnd = null);

        // メニュー設定
        const menuItems : Electron.MenuItemConstructorOptions[] =
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
                        click: () => {wnd.webContents.reload();}
                    },
                    {
                        label: 'Toggle Developer Tools(&T)',
                        accelerator: 'Alt+CmdOrCtrl+I',
                        click: () => {wnd.webContents.toggleDevTools();}
                    },
                ]
            }
        ];
        const menu = Menu.buildFromTemplate(menuItems);
        Menu.setApplicationMenu(menu);
    });

    app.on('window-all-closed', () =>
    {
//      if (process.platform !== 'darwin')
            app.quit();
    });
}

main();
