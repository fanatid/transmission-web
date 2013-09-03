Ext.define('TrWeb.view.torrent.OpenUrl', {
  extend: 'TrWeb.view.torrent.OpenBase',
  alias: 'widget.torrentopenurl',

  title: 'Open URL',

  constructor: function(args) {
    var me = this;

    me.items = new Array().concat({
      xtype: 'textfield',
      fieldLabel: 'URL',
      labelWidth: 70,
      name: 'url',
      width: 570,
      style: { 'margin-top': '5px' }
    }, me.commonItems);

    me.callParent(arguments);
  },

  addTorrent: function() {
    var me = this;

    me.application.remote.torrentAdd({
      'filename': me.down('textfield[name=url]').getRawValue(),
      'download-dir': me.down('textfield[name=dest]').getRawValue(),
      'paused': !me.down('checkboxfield[name=start]').getRawValue()
    }, me.addTorrentCallback, me);
    me.close();
  }
});
