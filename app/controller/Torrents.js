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
    'torrent.OpenUrl',
    'torrent.SetLocation'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() {
      return args.application;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);
  },

  onApplicationStart: function() {
  },

  onApplicationStop: function() {
    this.getStore('Torrents').removeAll();
  },

  onApplicationUpdate: function() {
    this.updateTorrentsList();
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
      'downloadDir'
    ];

    me.application.remote.torrentGet(undefined, fields, function(torrents, remove) {
      var store = me.getStore('Torrents');

      var allTorrents = {};
      for (var key in torrents) {
        var torrent = torrents[key];
        allTorrents[torrent.id] = torrent;
      }

      store.each(function(record) {
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
