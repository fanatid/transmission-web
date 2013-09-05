Ext.define('TrWeb.view.details.DetailsPanel', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.torrentdetails',

  activeTab: 3,
  disabled: true,
  items: [
    { xtype: 'statustab' },
    { xtype: 'filestab' },
    //{ xtype: 'trackerstab' },
    { xtype: 'peerstab' },
    { xtype: 'optionstab' }
  ]
});
