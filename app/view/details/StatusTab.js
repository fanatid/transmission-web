Ext.define('TrWeb.view.details.StatusTab', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.statustab',

  title: 'Status',
  items: [
    {
      xtype: 'progressbar',
      style: {
        margin: '5px'
      }
    }
  ],

  initComponent: function() {
    this.callParent(arguments);

    this.on({
      start: function(me, torrent) {
        me.updateTab(torrent);
      },
      updatetorrent: function(me, torrent) {
        me.updateTab(torrent);
      },
      stop: function(me, torrent) {
        me.clearTab();
      }
    });
  },

  updateTab: function(torrent) {
    var me = this;

    var done = torrent.get('percentDone');
    me.down('progressbar').updateProgress(
      done, torrent.getHumanStatus() + ' ' + (done*100).toFixed(2) + ' %');
  },

  clearTab: function() {
    var me = this;

    me.down('progressbar').updateProgress(0, '');
    me.down('progressbar').updateText('');
  }
});
