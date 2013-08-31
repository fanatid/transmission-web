Ext.define('TrWeb.view.details.DetailsPanel', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.torrentdetails',

  disabled: true,
  items: [
    { xtype: 'filestab' },
    { xtype: 'trackerstab' },
    { xtype: 'peerstab' }
  ]
});
