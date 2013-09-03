Ext.define('TrWeb.view.torrent.Open', {
  extend: 'TrWeb.view.torrent.OpenBase',
  alias: 'widget.torrentopen',

  title: 'Open URL',

  constructor: function(args) {
    var me = this;

    me.items = new Array().concat({
      xtype: 'filefield',
      fieldLabel: 'Torrent',
      labelWidth: 70,
      name: 'file',
      width: 570,
      style: { 'margin-top': '5px' }
    }, me.commonItems);

    var _metainfo;
    me.__defineSetter__('metainfo', function(metainfo) {
      _metainfo = metainfo;
    });
    me.__defineGetter__('metainfo', function() {
      return _metainfo;
    });

    me.callParent(arguments);
  },

  initComponent: function() {
    var me = this;
    me.callParent(arguments);

    me.down('filefield[name=file]').on('render', function(filefield, eOpts) {
      var input = document.getElementById(filefield.getEl().dom.id).querySelectorAll('input[name=file]')[0];
      input.addEventListener('change', function(evt) {
        var reader = new FileReader();
        reader.onload = function(e) { me.metainfo = e.target.result; }
        reader.readAsText(evt.target.files[0]);
      }, false);
    });
  },

  addTorrent: function() {
    var me = this;

    me.application.remote.torrentAdd({
      'metainfo': TrWeb.Utils.b64encode(me.metainfo),
      'download-dir': me.down('textfield[name=dest]').getRawValue(),
      'paused': !me.down('checkboxfield[name=start]').getRawValue()
    }, me.addTorrentCallback, me);
    me.close();
  }
});
