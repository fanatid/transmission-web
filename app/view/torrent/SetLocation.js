Ext.define('TrWeb.view.torrent.SetLocation', {
  extend: 'Ext.window.Window',
  alias: 'widget.torrentsetloc',

  title: 'Set Location',
  titleAlign: 'center',
  bodyStyle: 'padding-left: 10px',
  closeAction: 'hide',
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
      { text: 'Cancel', handler: function() { me.hide(); } },
      { text: 'Apply', handler: function() { me.moveData(me); } }
    ];

    this.__defineGetter__('application', function() {
      return args.application;
    });
    var _torrent;
    this.__defineSetter__('torrent', function(torrent) {
      _torrent = torrent;
    });
    this.__defineGetter__('torrent', function() {
      return _torrent;
    });

    me.callParent(arguments);

    me.on('show', me.updateWindow);
  },

  updateWindow: function(me) {
    var selected = me.application.getController('Torrents').getSelectedTorrents();
    if (selected.length != 1) {
      me.hide();
      return;
    }

    me.torrent = selected[0];
    me.down('textfield[name=path-now]').setRawValue(me.torrent.get('downloadDir'));
    me.down('textfield[name=path-new]').setRawValue(me.torrent.get('downloadDir'));
    me.down('radiofield[cls~=moved]').setValue(true);
  },

  moveData: function(me) {
    me.application.remote.torrentSetLocation(
      [me.torrent.getId()],
      me.down('textfield[name=path-new]').getRawValue(),
      me.down('radiofield[cls~=moved]').getValue());
    me.hide();
  }
});
