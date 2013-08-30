Ext.define('TrWeb.controller.MainMenu', {
  extend: 'Ext.app.Controller',

  views: [
    'MainMenu'
  ],

  constructor: function(args) {
    args.application.on('start', this.onStart, this);
    args.application.on('stop',  this.onStop,  this);

    this.__defineGetter__('application', function() {
      return args.application;
    });

    this.callParent(arguments);
  },

  onLaunch: function(application) {
    var me = this;

    application.torrentgrid.on('selectionchange', function(grid, selected, eOpts) {
      me.torrentMenuSetActive(selected);
    });
  },

  onStart: function() {
    var items = new Array().concat(
      Ext.ComponentQuery.query("#mainmenu-file > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-edit > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-view > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-help > menuitem"));

    Ext.each(items, function(item) {
      item.enable();
    })
  },

  onStop: function() {
    var items = Ext.ComponentQuery.query("mainmenu > menuitem");

    Ext.each(items, function(item) {
      item.disable();
    });
  },

  init: function() {
    this.control({
      '#mainmenu-torrent > [text="Start"]':     { click: this.onTorrentStartClick },
      '#mainmenu-torrent > [text="Start Now"]': { click: this.onTorrentStartNowClick },
      '#mainmenu-torrent > [text="Pause"]':     { click: this.onTorrentPauseClick }
    });
  },

  onTorrentStartClick: function(btn, e, eOpts) {
    this.application.remote.torrentStart(
      this.application.getController('Torrents').selectedTorrentsIds);
  },

  onTorrentStartNowClick: function(btn, e, eOpts) {
    this.application.remote.torrentStartNow(
      this.application.getController('Torrents').selectedTorrentsIds);
  },

  onTorrentPauseClick: function(btn, e, eOpts) {
    this.application.remote.torrentStop(
      this.application.getController('Torrents').selectedTorrentsIds);
  },

  torrentMenuSetActive: function(records) {
    if (records.length) {
      Ext.each(Ext.ComponentQuery.query('#mainmenu-torrent > menuitem'), function(item) {
        item.enable();
      });

      var active = 0, stopped = 0;
      Ext.each(records, function(record) {
        if (record.isActive())
          ++active;
        else
          ++stopped;
      });
      if (active > 0 && stopped == 0) {
        Ext.ComponentQuery.query('#mainmenu-torrent > menuitem[text="Start"]')[0].disable();
        Ext.ComponentQuery.query('#mainmenu-torrent > menuitem[text="Start Now"]')[0].disable();
      }
      if (active == 0 && stopped > 0) {
        Ext.ComponentQuery.query('#mainmenu-torrent > menuitem[text="Pause"]')[0].disable();
      }

    } else {
      Ext.each(Ext.ComponentQuery.query('#mainmenu-torrent > menuitem'), function(item) {
        item.disable();
      });
    }
  }
});
