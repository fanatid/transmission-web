Ext.define('TrWeb.view.stats.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.statsbar',

  items: [
    '->',
    {
      xtype: 'label',
      cls: 'down-speed'
    },
    '',
    {
      xtype: 'label',
      cls: 'up-speed'
    },
    '',
    {
      xtype: 'button',
      cls: 'info-type',
      menu: {
        plain: true,
        defaults: {
          group: 'statsToolbarInfoType'
        },
        items: [
          { xtype: 'menucheckitem', text: 'Total Ratio',      cls: 'total-ratio', checked: true },
          { xtype: 'menucheckitem', text: 'Session Ratio',    cls: 'session-ratio' },
          { xtype: 'menucheckitem', text: 'Total Transfer',   cls: 'total-transfer' },
          { xtype: 'menucheckitem', text: 'Session Transfer', cls: 'session-transfer' }
        ]
      }
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
      clear:  me.onClear
    });

    Ext.each(me.query('button[cls~=info-type] menucheckitem'), function(item) {
      item.on('checkchange', me.updateInfoTypeLabel, me);
    });
  },

  onUpdate: function(me, stats) {
    me.stats = stats;
    me.updateSpeedLabels();
    me.updateInfoTypeLabel();
  },

  onClear: function(me) {
    me.fireEventArgs('update', [me, undefined]);
  },

  updateSpeedLabels: function() {
    if (!this.stats) {
      this.down('label[cls~=down-speed]').setText('');
      this.down('label[cls~=up-speed]').setText('');
    } else {
      this.down('label[cls~=down-speed]').setText(TrWeb.Utils.speedToHuman(this.stats.downloadSpeed) + ' ▼');
      this.down('label[cls~=up-speed]').setText(TrWeb.Utils.speedToHuman(this.stats.uploadSpeed) + ' ▲');
    }
  },

  updateInfoTypeLabel: function() {
    if (!this.stats) {
      this.down('button[cls~=info-type]').setText('');
      return;
    }
    var data, st, ratio, text;
    data = this.down('button[cls~=info-type] menucheckitem[checked=true]').text;
    if (data)
      st = /total/i.test(data) ? this.stats['cumulative-stats'] : this.stats['current-stats'];
    if (st) {
      if (/ratio/i.test(data)) {
        text = 'Ratio: ' + TrWeb.Utils.calcRatio(st.uploadedBytes, st.downloadedBytes)
      } else {
        text = 'Down: ' + TrWeb.Utils.sizeToHuman(st.downloadedBytes) + ', Up: ' + TrWeb.Utils.sizeToHuman(st.uploadedBytes);
      }
    }
    if (text)
      this.down('button[cls~=info-type]').setText(text);
  }
});
