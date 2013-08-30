Ext.define('TrWeb.view.details.DetailsPanel', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.torrentdetails',

  items: [
    { xtype: 'statustab' },
    { xtype: 'detailstab' },
    { xtype: 'filestab' },
    { xtype: 'peerstab' },
    { xtype: 'optionstab' }
  ]
});
