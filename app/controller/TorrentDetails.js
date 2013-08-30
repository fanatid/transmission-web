Ext.define('TrWeb.controller.TorrentDetails', {
  extend: 'Ext.app.Controller',

  views: [
    'details.DetailsPanel',
    'details.StatusTab',
    'details.DetailsTab',
    'details.FilesTab',
    'details.PeersTab',
    'details.OptionsTab'
  ],

  constructor: function(args) {
    this.__defineGetter__('application', function() {
      return args.application;
    });

    this.callParent(arguments);
  },

  onLaunch: function(application) {
    application.torrentgrid.on('selectionchange', this.onTorrentSelect, this);
    application.torrentdetails.on('tabchange', this.onTabChange, this);
  },

  onTorrentSelect: function(grid, selected, eOpts) {
    if (selected.length == 1) {
      this.application.torrentdetails.enable();
    } else{
      this.application.torrentdetails.disable();
    }
  },

  onTabChange: function(tabPanel, newCard, oldCard, eOpts) {}
});
