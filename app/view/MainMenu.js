Ext.define('TrWeb.view.MainMenu', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.mainmenu',

  items: [
    {
      text: 'File',
      menu: {
        xtype: 'menu',
        id: 'mainmenu-file',
        plain: true,
        items: [
          { text: 'Open',        disabled: true },
          { text: 'Open URL...', disabled: true },
          '-',
          { text: 'Start All',   disabled: true },
          { text: 'Stop All',    disabled: true },
        ]
      }
    },
    {
      text: 'Edit',
      menu: {
        xtype: 'menu',
        id: 'mainmenu-edit',
        plain: true,
        items: [
          { text: 'Select All',   disabled: true },
          { text: 'Deselect All', disabled: true },
          '-',
          { text: 'Preferences',  disabled: true }
        ]
      }
    },
    {
      text: 'Torrent',
      menu: {
        xtype: 'menu',
        id: 'mainmenu-torrent',
        plain: true,
        items: [
          { text: 'Properties',              disabled: true, cls: 'properties' },
          '-',
          { text: 'Start',                   disabled: true, cls: 'start' },
          { text: 'Start Now',               disabled: true, cls: 'start-now' },
          { text: 'Pause',                   disabled: true, cls: 'pause' },
          '-',
          { text: 'Set Location',            disabled: true, cls: 'set-location' },
          { text: 'Verify Local Data',       disabled: true, cls: 'verify-local-data' },
          '-',
          { text: 'Remove',                  disabled: true, cls: 'remove' },
          { text: 'Delete Files and Remove', disabled: true, cls: 'delete-files-and-remove' },
        ]
      }
    },
    {
      text: 'View',
      id: 'mainmenu-view',
      menu: {}
    },
    '->',
    {
      text: 'Help',
      menu: {
        xtype: 'menu',
        id: 'mainmenu-help',
        plain: true,
        items: [
          { text: 'Statistics', disabled: true },
          { text: 'About',      disabled: true }
        ]
      }
    }
  ]
});
