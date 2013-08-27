Ext.define('TrWeb.controller.Torrents', {
  extend: 'Ext.app.Controller',

  stores: [
    'Torrents'
  ],

  models: [
    'Torrent'
  ],

  views: [
    'torrents.List'
  ],

  constructor: function(args) {
    args.application.addListener('start', this.onStart, this);
    args.application.addListener('stop', this.onStop, this);
    args.application.addListener('update', this.onUpdate, this);

    var _remote;
    this.__defineGetter__('remote', function() {
      return _remote;
    });
    this.__defineSetter__('remote', function(remote) {
        _remote = remote;
    });

    this.callParent(arguments);
  },

  onStart: function() {
  },

  onStop: function() {
    this.getStore('Torrents').removeAll();
  },

  onUpdate: function() {
    this.updateTorrentsList();
  },

  updateTorrentsList: function() {
    var fields = [
      'id',
      'name',
      'totalSize',
      'status',
      'percentDone',
      'rateDownload',
      'rateUpload',
      'eta',
      'uploadedEver'
    ];

    this.remote.torrentGet(undefined, fields, function(torrents, remove) {
      var store = this.getStore('Torrents');

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
    }, this);
  }
});
