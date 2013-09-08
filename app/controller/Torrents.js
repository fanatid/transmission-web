Ext.define('TrWeb.controller.Torrents', {
  extend: 'Ext.app.Controller',

  stores: [
    'Torrents'
  ],

  models: [
    'Torrent'
  ],

  views: [
    'torrent.Grid',
    'torrent.Open',
    'torrent.OpenUrl',
    'torrent.SetLocation'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() { return args.application; });

    me.callParent(arguments);

    me.on({
      start:  me.onStart,
      update: me.onUpdate,
      stop:   me.onStop
    });
  },

  onStart: function(me) {
    me.updateTorrentsList();
  },

  onUpdate: function(me) {
    me.updateTorrentsList();
  },

  onStop: function(me) {
    me.getStore('Torrents').removeAll();
  },

  updateTorrentsList: function() {
    var me = this;
    var fields = [
      'id',
      'name',
      'totalSize',
      'status',
      'percentDone',
      'rateDownload',
      'rateUpload',
      'eta',
      'uploadedEver',
      'downloadDir',

      'sizeWhenDone',
      'haveValid',
      'pieceCount',
      'pieceSize',
      'downloadedEver',
      'corruptEver',
      'uploadedEver',
      'startDate',
      'activityDate',
      'hashString',
      'isPrivate',
      'creator',
      'dateCreated'
    ];

    me.application.remote.torrentGet(undefined, fields, function(torrents, remove) {
      var store = me.getStore('Torrents');

      var allTorrents = {};
      for (var key in torrents) {
        var torrent = torrents[key];
        allTorrents[torrent.id] = torrent;
      }

      Ext.each(store.data.items, function(record) {
        if ((record.get('id') in allTorrents)) {
          record.beginEdit();
          record.set(allTorrents[record.get('id')]);
          record.endEdit(true);
          delete allTorrents[record.get('id')];
        } else {
          store.remove(record);
        }
      });

      store.add(Object.keys(allTorrents).map(function(key) {
        return allTorrents[key];
      }));

      store.commitChanges();

      store.sort();

      me.application.getController('MainMenu').fileMenuSetActive(store.data.items);
      me.application.getController('MainMenu').torrentMenuSetActive(me.getSelectedTorrents());

      me.application.getController('TorrentDetails').fireEventArgs('updatetorrent', [me.application.getController('TorrentDetails')]);
    }, me);
  },

  getTorrentsIds: function() {
    return Ext.Array.map(this.getStore('Torrents').data.items, function(torrent) {
      return torrent.getId();
    });
  },

  getSelectedTorrents: function() {
    return this.application.torrentgrid.getSelectionModel().getSelection();
  },

  getSelectedTorrentsIds: function() {
    return Ext.Array.map(this.getSelectedTorrents(), function(torrent) {
      return torrent.getId();
    });
  }
});
