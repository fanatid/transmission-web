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

    this.on('updatetorrent', this.onUpdateTorrent);
    this.on('stop',          this.onStop);
  },

  onUpdateTorrent: function(me, torrent) {
    var done = torrent.get('percentDone');
    me.down('progressbar').updateProgress(
      done, torrent.getHumanStatus() + ' ' + (done*100).toFixed(2) + ' %');
  },

  onStop: function(me) {
    me.down('progressbar').updateProgress(0, '');
    me.down('progressbar').updateText('');
  }
});
