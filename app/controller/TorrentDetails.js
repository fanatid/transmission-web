Ext.define('TrWeb.controller.TorrentDetails', {
  extend: 'Ext.app.Controller',

  stores: [
    'Files', 'Peers'
  ],

  models: [
    'File', 'Peer'
  ],

  views: [
    'details.DetailsPanel',
    'details.StatusTab',
    'details.FilesTab',
    'details.TrackersTab',
    'details.PeersTab',
    'details.OptionsTab'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() { return args.application; });
    me.__defineGetter__('activeTab', function() {
      return me.application.torrentdetails.getActiveTab();
    });

    var _torrent = null;
    me.__defineSetter__('torrent', function(torrent) { _torrent = torrent; });
    me.__defineGetter__('torrent', function() { return _torrent; });

    me.callParent(arguments);

    me.on({
      start:         me.onStart,
      update:        me.onUpdate,
      updatetorrent: me.onUpdateTorrent,
      stop:          me.onStop
    });
  },

  onLaunch: function(application) {
    var me = this;

    Ext.ComponentQuery.query('torrentdetails optionstab')[0].preferences = application.getController('Preferences');

    application.torrentgrid.on('selectionchange', function(grid, selected) {
      var torrent = selected.length == 1 ? selected[0] : null;
      if (torrent) {
        if (me.torrent) {
          me.torrent = torrent;
          me.fireEventArgs('update', [me]);
          me.fireEventArgs('updatetorrent', [me]);
        } else {
          me.fireEventArgs('start', [me, torrent]);
        }
      } else {
        me.fireEventArgs('stop', [me]);
      }
    });

    application.torrentdetails.on('tabchange', function(tabPanel, newCard, oldCard) {
      oldCard.fireEventArgs('stop', [oldCard]);
      newCard.fireEventArgs('start', [newCard, me.torrent, application.remote]);
    });
  },

  onStart: function(me, torrent) {
    me.torrent = torrent;
    me.application.torrentdetails.enable();
    me.activeTab.fireEventArgs('start', [me.activeTab, torrent, me.application.remote]);
  },

  onStop: function(me) {
    me.torrent = null;
    me.application.torrentdetails.disable();
    me.activeTab.fireEventArgs('stop', [me.activeTab]);
  },

  onUpdate: function(me) {
    if (!me.application.torrentdetails.isDisabled() && me.torrent)
      me.activeTab.fireEventArgs('update', [me.activeTab, me.torrent, me.application.remote]);
  },

  onUpdateTorrent: function(me) {
    if (!me.application.torrentdetails.isDisabled() && me.torrent)
      me.activeTab.fireEventArgs('updatetorrent', [me.activeTab, me.torrent]);
  }
});
