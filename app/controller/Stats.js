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

    me.__defineGetter__('application', function() {
      return args.application;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);
  },

  onApplicationStart: function() {
    this.getStatsBar().fireEventArgs('clear', [this.getStatsBar()]);
    this.getStatsWin().fireEventArgs('clear', [this.getStatsWin()]);
  },

  onApplicationStop: function() {
    this.getStatsBar().fireEventArgs('clear', [this.getStatsBar()]);
    this.getStatsWin().fireEventArgs('clear', [this.getStatsWin()]);
  },

  onApplicationUpdate: function() {
    var me = this;

    me.application.remote.sessionStats(function(stats) {
      me.getStatsBar().fireEventArgs('update', [me.getStatsBar(), stats]);
      me.getStatsWin().fireEventArgs('update', [me.getStatsWin(), stats]);
    });
  }
});
