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
          { xtype: 'menucheckitem', text: 'Total Ratio',      cls: 'total-ratio' },
          { xtype: 'menucheckitem', text: 'Session Ratio',    cls: 'session-ratio' },
          { xtype: 'menucheckitem', text: 'Total Transfer',   cls: 'total-transfer' },
          { xtype: 'menucheckitem', text: 'Session Transfer', cls: 'session-transfer' }
        ]
      }
    }
  ]
});
