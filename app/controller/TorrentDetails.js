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
      _torrent = torrent;
    });
    me.__defineGetter__('torrent', function() {
      return _torrent;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);
  },

  onLaunch: function(application) {
    this.on('start',  this.onStart,  this);
    this.on('stop',   this.onStop,   this);
    this.on('update', this.onUpdate, this);

    application.torrentgrid.on('selectionchange', this.onTorrentSelect, this);

    application.torrentdetails.on('tabchange', this.onTabChange, this);
  },

  onApplicationStart: function() {
    if (this.torrent)
      this.fireEvent('start')
  },

  onStart: function() {
    this.application.torrentdetails.enable();
    this.fireEvent('update');
  },

  onApplicationStop: function() {
    this.torrent = null;
    this.fireEvent('stop');
  },

  onStop: function() {
    this.application.torrentdetails.disable();
    Ext.each(Ext.ComponentQuery.query('torrentdetails panel'), function(tab) {
      tab.fireEvent('stop');
    });
  },

  onApplicationUpdate: function() {
    if (this.torrent)
      this.fireEvent('update');
  },

  onUpdate: function() {
    var activeTab = this.application.torrentdetails.getActiveTab();
    activeTab.fireEventArgs('update', [ this.application.remote, this.torrent ]);
  },

  onTorrentSelect: function(grid, selected) {
    if (selected.length == 1) {
      this.torrent = selected[0];
      this.fireEvent('start');
    } else{
      this.torrent = null;
      this.fireEvent('stop');
    }
  },

  onTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    this.fireEvent('update');
    oldCard.fireEvent('stop');
  }
});
