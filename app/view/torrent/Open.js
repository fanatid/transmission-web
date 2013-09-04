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
        reader.onload = function(e) {
          var contents = e.target.result;
          var key = "base64,"
          var index = contents.indexOf(key);
          if (index > -1)
            me.metainfo = contents.substring(index + key.length);
          else
            me.metainfo = undefined;
        };
        reader.readAsDataURL(evt.target.files[0]);
      }, false);
    });
  },

  addTorrent: function() {
    var me = this;

    me.application.remote.torrentAdd({
      'metainfo': me.metainfo,
      'download-dir': me.down('textfield[name=dest]').getRawValue(),
      'paused': !me.down('checkboxfield[name=start]').getRawValue()
    }, me.addTorrentCallback, me);
    me.close();
  }
});
