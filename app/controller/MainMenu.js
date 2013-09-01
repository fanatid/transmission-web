Ext.define('TrWeb.controller.MainMenu', {
  extend: 'Ext.app.Controller',

  views: [
    'MainMenu'
  ],

  constructor: function(args) {
    this.__defineGetter__('application', function() {
      return args.application;
    });

    args.application.on('start', this.onApplicationStart, this);
    args.application.on('stop',  this.onApplicationStop,  this);

    this.callParent(arguments);
  },

  onLaunch: function(application) {
    var me = this;

    application.torrentgrid.on('selectionchange', function(grid, selected) {
      me.torrentMenuSetActive(selected);
    });
  },

  onApplicationStart: function() {
    var items = new Array().concat(
      Ext.ComponentQuery.query("#mainmenu-file > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-edit > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-view > menuitem"),
      Ext.ComponentQuery.query("#mainmenu-help > menuitem"));

    Ext.each(items, function(item) {
      item.enable();
    })
  },

  onApplicationStop: function() {
    var items = Ext.ComponentQuery.query("mainmenu > menuitem");

    Ext.each(items, function(item) {
      item.disable();
    });
  },

  init: function() {
    this.control({
      '#mainmenu-file > [text="Open"]':         { click: this.onFileOpenClick },
      '#mainmenu-file > [text="Open URL..."]':  { click: this.onFileOpenUrlClick },
      '#mainmenu-file > [text="Start All"]':    { click: this.onFileStartAllClick },
      '#mainmenu-file > [text="Stop All"]':     { click: this.onFileStopAllClick },

      '#mainmenu-edit > [text="Select All"]':   { click: this.onEditSelectAllClick },
      '#mainmenu-edit > [text="Deselect All"]': { click: this.onEditDeselectAllClick },
      '#mainmenu-edit > [text="Preferences"]':  { click: this.onEditPreferencesClick },

      '#mainmenu-torrent > [text="Start"]':     { click: this.onTorrentStartClick },
      '#mainmenu-torrent > [text="Start Now"]': { click: this.onTorrentStartNowClick },
      '#mainmenu-torrent > [text="Pause"]':     { click: this.onTorrentPauseClick },

      '#mainmenu-help > [text="Statistics"]':   { click: this.onHelpStatisticsClick },
      '#mainmenu-help > [text="About"]':        { click: this.onHelpAboutClick }
    });
  },

  // file menu
  onFileOpenClick: function() {
    Ext.Msg.show({ msg: 'in todo list...', buttons: Ext.Msg.OK });
  },

  onFileOpenUrlClick: function() {
    Ext.Msg.show({ msg: 'in todo list...', buttons: Ext.Msg.OK });
  },

  onFileStartAllClick: function() {
    this.application.remote.torrentStart(
      this.application.getController('Torrents').getTorrentsIds);
  },

  onFileStopAllClick: function() {
    this.application.remote.torrentStop(
      this.application.getController('Torrents').getTorrentsIds);
  },

  // edit menu
  onEditSelectAllClick: function() {
    this.application.torrentgrid.getSelectionModel().selectAll();
  },

  onEditDeselectAllClick: function() {
    this.application.torrentgrid.getSelectionModel().deselectAll();
  },

  onEditPreferencesClick: function() {
    Ext.Msg.show({ msg: 'in todo list...', buttons: Ext.Msg.OK });
  },

  // torrent menu
  onTorrentStartClick: function() {
    this.application.remote.torrentStart(
      this.application.getController('Torrents').getSelectedTorrentsIds);
  },

  onTorrentStartNowClick: function() {
    this.application.remote.torrentStartNow(
      this.application.getController('Torrents').getSelectedTorrentsIds);
  },

  onTorrentPauseClick: function() {
    this.application.remote.torrentStop(
      this.application.getController('Torrents').getSelectedTorrentsIds);
  },

  // view menu

  // help menu
  onHelpStatisticsClick: function() {
    Ext.Msg.show({ msg: 'in todo list...', buttons: Ext.Msg.OK });
  },

  onHelpAboutClick: function() {
    window.open('https://github.com/fanatid/transmission-web');
  },

  fileMenuSetActive: function(records) {
    var startAll = Ext.ComponentQuery.query('#mainmenu-file > menuitem[text="Start All"]')[0];
    var stopAll  = Ext.ComponentQuery.query('#mainmenu-file > menuitem[text="Stop All"]')[0];

    if (records.length == 0) {
      Ext.each([startAll, stopAll], function(item) { item.disable(); });
      return;
    }

    var active = 0, stopped = 0;
    Ext.each(records, function(record) {
      if (record.isActive())
        ++active;
      else
        ++stopped;
    });

    Ext.each([startAll, stopAll], function(item) { item.enable(); });
    if (active > 0 && stopped == 0)
      startAll.disable();
    if (active == 0 && stopped > 0)
      stopAll.disable();
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
