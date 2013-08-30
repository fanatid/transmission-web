Ext.define('TrWeb.controller.Torrents', {
  extend: 'Ext.app.Controller',

  stores: [
    'Torrents'
  ],

  models: [
    'Torrent'
  ],

  views: [
    'TorrentGrid'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() {
      return args.application;
    });

    me.__defineGetter__('selectedTorrents', function() {
      return me.application.torrentgrid.getSelectionModel().getSelection();
    })

    me.__defineGetter__('selectedTorrentsIds', function() {
      var ids = []
      Ext.each(me.selectedTorrents, function(record) {
        ids.push(record.get('id'));
      });
      return ids;
    });

    args.application.on('start',  me.onStart,  me);
    args.application.on('stop',   me.onStop,   me);
    args.application.on('update', me.onUpdate, me);

    me.callParent(arguments);
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
      'uploadedEver'
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

      me.application.getController('MainMenu').torrentMenuSetActive(this.selectedTorrents);
    }, me);
  }
});
