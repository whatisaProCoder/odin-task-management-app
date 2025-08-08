const { Titlebar, Color } = require('custom-electron-titlebar');

new Titlebar({
    backgroundColor: Color.fromHex('#1e1e1e'),
    icon: 'icons/favicon.svg',
    menu: null
});
