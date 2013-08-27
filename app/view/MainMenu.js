Ext.define('TrWeb.view.MainMenu', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.mainmenu',

  items: [
    {
      text: 'File',
      menu: {
        xtype: 'menu',
        plain: true,
        items: [
          { text: 'Open', disabled: true },
          { text: 'Open URL...', disabled: true },
          { text: 'New...', disabled: true },
          '-',
          { text: 'Start All', disabled: true },
          { text: 'Stop All', disabled: true },
          '-',
          { text: 'Quit', disabled: true }
        ]
      }
    },
    {
      text: 'Edit',
      menu: {}
    },
    {
      text: 'Torrent',
      menu: {}
    },
    {
      text: 'View',
      menu: {}
    },
    '->',
    {
      text: 'Help',
      menu: {}
    }
  ]
});
