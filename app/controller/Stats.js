Ext.define('TrWeb.controller.Stats', {
  extend: 'Ext.app.Controller',

  refs: [
    {
      ref: 'labelUpSpeed',
      selector: 'statsbar label[cls~=up-speed]'
    },
    {
      ref: 'labelDownSpeed',
      selector: 'statsbar label[cls~=down-speed]'
    },
    {
      ref: 'infoType',
      selector: 'statsbar button[cls~=info-type]'
    }
  ],

  views: [
    'stats.Toolbar'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() {
      return args.application;
    });
    var _stats;
    me.__defineSetter__('stats', function(stats) {
      _stats = stats;
    })
    me.__defineGetter__('stats', function() {
      return _stats;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);
  },

  onLaunch: function(application) {
    var me = this;

    Ext.each(me.getInfoType().query('menucheckitem'), function(item) {
      item.on('checkchange', me.onInfoTypeChecked, me);
    });
    me.getInfoType().query('menucheckitem[cls~=total-ratio]')[0].setChecked(true);
  },

  onApplicationStart: function() {},

  onApplicationStop: function() {
    this.getLabelDownSpeed().setText('');
    this.getLabelUpSpeed().setText('');
  },

  onApplicationUpdate: function() {
    var me = this;

    me.application.remote.sessionStats(function(stats) {
      me.stats = stats;
      me.updateSpeedLabels();
      me.updateInfoTypeLabel();
    });
  },

  onInfoTypeChecked: function() {
    this.updateInfoTypeLabel();
  },

  updateSpeedLabels: function() {
    if (!this.stats)
      return;
    this.getLabelDownSpeed().setText(TrWeb.Utils.speedToHuman(this.stats.downloadSpeed) + ' ▼');
    this.getLabelUpSpeed().setText(TrWeb.Utils.speedToHuman(this.stats.uploadSpeed) + ' ▲');
  },

  updateInfoTypeLabel: function() {
    if (!this.stats)
      return;
    var data, st, ratio, text;
    data = this.getInfoType().query('menucheckitem[checked=true]')[0].text;
    if (data)
      st = /total/i.test(data) ? this.stats['cumulative-stats'] : this.stats['current-stats'];
    if (st) {
      if (/ratio/i.test(data)) {
        ratio = st.uploadedBytes/st.downloadedBytes;
        text = 'Ratio: ' + (ratio == Infinity ? '∞' : ratio.toFixed(2));
      } else {
        text = 'Down: ' + TrWeb.Utils.sizeToHuman(st.downloadedBytes) + ', Up: ' + TrWeb.Utils.sizeToHuman(st.uploadedBytes);
      }
    }
    if (text)
      this.getInfoType().setText(text);
  }
});
