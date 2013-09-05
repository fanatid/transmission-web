Ext.define('TrWeb.controller.Stats', {
  extend: 'Ext.app.Controller',

  refs: [
    {
      ref: 'statsBar',
      selector: 'statsbar'
    },
    {
      ref: 'infoType',
      selector: 'statsbar button[cls~=info-type]'
    },
    {
      ref: 'statsWin',
      selector: 'statswin'
    }
  ],

  views: [
    'stats.Toolbar',
    'stats.Window'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() { return args.application; });

    me.callParent(arguments);

    me.on({
      start:  me.onStart,
      update: me.onUpdate,
      stop:   me.onStop
    });
  },

  onStart: function(me) {
    me.getStatsBar().fireEventArgs('clear', [me.getStatsBar()]);
    me.getStatsWin().fireEventArgs('clear', [me.getStatsWin()]);
  },

  onStop: function(me) {
    me.getStatsBar().fireEventArgs('clear', [me.getStatsBar()]);
    me.getStatsWin().fireEventArgs('clear', [me.getStatsWin()]);
  },

  onUpdate: function(me) {
    me.application.remote.sessionStats(function(stats) {
      me.getStatsBar().fireEventArgs('update', [me.getStatsBar(), stats]);
      me.getStatsWin().fireEventArgs('update', [me.getStatsWin(), stats]);
    });
  }
});
