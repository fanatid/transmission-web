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

  refs: [{
    ref: 'torrentsList',
    selector: 'torrentslist'
  }],

  constructor: function(args) {
    var me = this;

    var _remote;
    me.__defineGetter__('remote', function() {
      return _remote;
    });
    me.__defineSetter__('remote', function(remote) {
        _remote = remote;
    });

    me.__defineGetter__('application', function() {
      return args.application;
    });

    me.__defineGetter__('selectedTorrents', function() {
      return me.getTorrentsList().getSelectionModel().getSelection();
    })

    me.__defineGetter__('selectedTorrentsIds', function() {
      var ids = []
      Ext.each(me.selectedTorrents, function(record) {
        ids.push(record.get('id'));
      });
      return ids;
    });

    args.application.addListener('start',  me.onStart,  me);
    args.application.addListener('stop',   me.onStop,   me);
    args.application.addListener('update', me.onUpdate, me);

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

    me.remote.torrentGet(undefined, fields, function(torrents, remove) {
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

      me.selectedTorrentsUpdateMenu();
    }, me);
  },

  init: function() {
    this.control({
      'torrentslist': {
        selectionchange: this.onSelectionChange
      }
    });
  },

  onSelectionChange: function(grid, selected, eOpts) {
    this.selectedTorrentsUpdateMenu();
  },

  selectedTorrentsUpdateMenu: function() {
    this.application.getController('MainMenu').torrentMenuSetActive(this.selectedTorrents);
  },

  selectedTorrentsStart: function() {
    this.remote.torrentStart(this.selectedTorrentsIds);
  },

  selectedTorrentsStartNow: function() {
    this.remote.torrentStartNow(this.selectedTorrentsIds);
  },

  selectedTorrentsPause: function() {
    this.remote.torrentStop(this.selectedTorrentsIds);
  }
});
