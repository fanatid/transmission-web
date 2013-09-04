Ext.define('TrWeb.controller.TorrentDetails', {
  extend: 'Ext.app.Controller',

  stores: [
    'Peers'
  ],

  models: [
    'Peer'
  ],

  views: [
    'details.DetailsPanel',
    'details.StatusTab',
    'details.FilesTab',
    'details.TrackersTab',
    'details.PeersTab'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() {
      return args.application;
    });

    var _torrent = null;
    me.__defineSetter__('torrent', function(torrent) {
      var eventName;

      if (torrent)
        eventName = _torrent ? 'update' : 'start';
      else
        eventName = 'stop';

      _torrent = torrent;
      me.fireEventArgs(eventName, [me]);
    });
    me.__defineGetter__('torrent', function() {
      return _torrent;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);

    me.on('start',         me.onStart);
    me.on('stop',          me.onStop);
    me.on('update',        me.onUpdate);
    me.on('updatetorrent', me.onUpdateTorrent)
  },

  onLaunch: function(application) {
    var me = this;

    application.torrentgrid.on('selectionchange', function(grid, selected) {
      me.torrent = selected.length == 1 ? selected[0] : null;
    });

    application.torrentdetails.on('tabchange', function(tabPanel, newCard, oldCard) {
      oldCard.fireEventArgs('stop', [oldCard]);
      me.fireEventArgs('update', [me]);
    });
  },

  onApplicationStart: function() {
    if (this.torrent)
      this.fireEventArgs('start', [this]);
  },

  onStart: function(me) {
    me.application.torrentdetails.enable();
    me.fireEventArgs('update', [me]);
    me.fireEventArgs('updatetorrent', [me]);
  },

  onApplicationStop: function() {
    this.torrent = null;
    this.fireEventArgs('stop', [this]);
  },

  onStop: function(me) {
    me.application.torrentdetails.disable();
    Ext.each(me.application.torrentdetails.query('panel'), function(tab) {
      tab.fireEventArgs('stop', [tab]);
    });
  },

  onApplicationUpdate: function() {
    if (this.torrent)
      this.fireEventArgs('update', [this]);
  },

  onUpdate: function(me) {
    var activeTab = me.application.torrentdetails.getActiveTab();
    activeTab.fireEventArgs('update', [ activeTab, me.torrent, me.application.remote ]);
  },

  onUpdateTorrent: function(me) {
    var activeTab = me.application.torrentdetails.getActiveTab();
    activeTab.fireEventArgs('updatetorrent', [ activeTab, me.torrent ]);
  }
});
