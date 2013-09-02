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
          { text: 'Open',        disabled: true, cls: 'open' },
          { text: 'Open URL...', disabled: true, cls: 'open-url' },
          '-',
          { text: 'Start All',   disabled: true, cls: 'start-all' },
          { text: 'Stop All',    disabled: true, cls: 'stop-all' }
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
          { text: 'Select All',   disabled: true, cls: 'select-all' },
          { text: 'Deselect All', disabled: true, cls: 'deselect-all' },
          '-',
          { text: 'Preferences',  disabled: true, cls: 'preferences' }
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
          { text: 'Properties',                 disabled: true, cls: 'properties' },
          '-',
          { text: 'Start',                      disabled: true, cls: 'start' },
          { text: 'Start Now',                  disabled: true, cls: 'start-now' },
          { text: 'Ask Tracker for More Peers', disabled: true, cls: 'ask-tracker' },
          { text: 'Pause',                      disabled: true, cls: 'pause' },
          '-',
          { text: 'Set Location',               disabled: true, cls: 'set-location' },
          { text: 'Verify Local Data',          disabled: true, cls: 'verify-local-data' },
          '-',
          { text: 'Remove',                     disabled: true, cls: 'remove' },
          { text: 'Delete Files and Remove',    disabled: true, cls: 'delete-files-and-remove' }
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
          { text: 'Statistics', disabled: true, cls: 'statistics' },
          { text: 'About',      disabled: true, cls: 'about' }
        ]
      }
    }
  ]
});
