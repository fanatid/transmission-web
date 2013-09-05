Ext.define('TrWeb.view.stats.Window', {
  extend: 'Ext.window.Window',
  alias: 'widget.statswin',

  title: 'Statistics',
  titleAlign: 'center',
  bodyStyle: 'padding-left: 10px',
  closeAction: 'hide',
  closable: true,
  height: 300,
  width: 270,
  layout: 'vbox',
  defaults: {
    frame: false,
    border: false,
    bodyStyle: 'background:transparent;',
    layout: 'hbox',
    style: { 'padding-left': '20px', 'padding-top': '0.5em' },
    xtype: 'panel'
  },
  items: [
    {
      xtype: 'label',
      text: 'Current Session',
      style: { 'font-weight': 'bold', 'padding-top': '1em' }
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Uploaded:' },
        { text: '', cls: 'inf session-uploaded', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Downloaded:' },
        { text: '', cls: 'inf session-downloaded', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Ratio:' },
        { text: '', cls: 'inf session-ratio', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Duration:' },
        { text: '', cls: 'inf session-duration', style: 'padding-left: 10px;' }
      ]
    },

    {
      xtype: 'label',
      text: 'Total',
      style: { 'font-weight': 'bold', 'padding-top': '1em' }
    },
    {
      defaults: { xtype: 'label' },
      items: [ { text: '', cls: 'inf total-started' } ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Uploaded:' },
        { text: '', cls: 'inf total-uploaded', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
    items: [
        { text: 'Downloaded:' },
        { text: '', cls: 'inf total-downloaded', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Ratio:' },
        { text: '', cls: 'inf total-ratio', style: 'padding-left: 10px;' }
      ]
    },
    {
      defaults: { xtype: 'label' },
      items: [
        { text: 'Duration:' },
        { text: '', cls: 'inf total-duration', style: 'padding-left: 10px;' }
      ]
    }
  ],

  constructor: function(args) {
    var me = this;

    var _stats;
    me.__defineSetter__('stats', function(stats) { _stats = stats; });
    me.__defineGetter__('stats', function() { return _stats; });

    me.callParent(arguments);

    me.on({
      update: me.onUpdate,
      clear:  me.onClear,
      show:   me.updateWindow
    });
  },

  onUpdate: function(me, stats) {
    me.stats = stats;
    if (me.isVisible())
      me.updateWindow(me);
  },

  onClear: function(me) {
    Ext.each(me.query('label[cls~=inf]'), function(label) {
      label.setText('');
    });
  },

  updateWindow: function(me) {
    if (!me.stats)
      return;

    var curr = me.stats['current-stats'];
    me.down('label[cls~=session-uploaded]').setText(TrWeb.Utils.sizeToHuman(curr.uploadedBytes));
    me.down('label[cls~=session-downloaded]').setText(TrWeb.Utils.sizeToHuman(curr.downloadedBytes));
    me.down('label[cls~=session-ratio]').setText(TrWeb.Utils.calcRatio(curr.uploadedBytes, curr.downloadedBytes));
    me.down('label[cls~=session-duration]').setText(TrWeb.Utils.secondsToHuman(curr.secondsActive));

    var total = me.stats['cumulative-stats'];
    me.down('label[cls~=total-started]').setText('Started ' + total.sessionCount + ' times');
    me.down('label[cls~=total-uploaded]').setText(TrWeb.Utils.sizeToHuman(total.uploadedBytes));
    me.down('label[cls~=total-downloaded]').setText(TrWeb.Utils.sizeToHuman(total.downloadedBytes));
    me.down('label[cls~=total-ratio]').setText(TrWeb.Utils.calcRatio(total.uploadedBytes, total.downloadedBytes));
    me.down('label[cls~=total-duration]').setText(TrWeb.Utils.secondsToHuman(total.secondsActive));
  }
});
