Ext.define('TrWeb.view.details.StatusTab', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.statustab',

  title: 'Status',

  initComponent: function() {
    this.callParent(arguments);

    this.on('updatetorrent', this.onUpdateTorrent);
    this.on('stop',          this.onStop);
  },

  onUpdateTorrent: function(me, torrent) {

  },

  onStop: function(me) {

  }
});
