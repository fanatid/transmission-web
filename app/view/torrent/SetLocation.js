Ext.define('TrWeb.view.torrent.SetLocation', {
  extend: 'Ext.window.Window',
  alias: 'widget.torrentsetloc',

  title: 'Set Location',
  titleAlign: 'center',
  bodyStyle: 'padding-left: 10px',
  closable: true,
  height: 180,
  width: 400,
  layout: 'vbox',
  items: [
    {
      xtype: 'textfield',
      disabled: true,
      fieldLabel: 'Current path',
      name: 'path-now',
      width: 360,
      style: { 'margin-top': '5px' }
    },
    {
      xtype: 'textfield',
      fieldLabel: 'New path',
      name: 'path-new',
      width: 360,
      style: { 'margin-top': '5px' }
    },
    {
      xtype: 'radiogroup',
      vertical: true,
      columns: 1,
      items: [
        { boxLabel: 'Move from the current folder', name: 'moved', cls: 'moved', checked: true },
        { boxLabel: 'Local data is already there', name: 'moved', cls: 'local' },
      ]
    }
  ],

  constructor: function(args) {
    var me = this;

    me.buttons = [
      { text: 'Cancel', handler: function() { me.close(); } },
      { text: 'Apply', handler: function() { me.moveData(); } }
    ];

    this.__defineGetter__('application', function() {
      return args.application;
    });
    this.__defineGetter__('torrents', function() {
      return args.torrents;
    });

    me.callParent(arguments);
  },

  initComponent: function() {
    var me = this;
    me.callParent(arguments);

    if (me.torrents.length == 0) {
      me.close();
      return;
    }

    if (me.torrents.length == 1) {
      me.down('textfield[name=path-now]').setRawValue(me.torrents[0].get('downloadDir'));
      me.down('textfield[name=path-new]').setRawValue(me.torrents[0].get('downloadDir'));
    } else {
      // need from current preferences
      me.down('textfield[name=path-new]').setRawValue('');
    }
  },

  moveData: function() {
    var me = this;

    me.application.remote.torrentSetLocation(
      Ext.map(me.torrents, function(torrent) { return torrent.getId(); }),
      me.down('textfield[name=path-new]').getRawValue(),
      me.down('radiofield[cls~=moved]').getValue());
    me.hide();
  }
});
