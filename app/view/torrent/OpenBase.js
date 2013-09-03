Ext.define('TrWeb.view.torrent.OpenBase', {
  extend: 'Ext.window.Window',

  titleAlign: 'center',
  bodyStyle: 'padding-left: 10px',
  closable: true,
  height: 160,
  width: 600,
  layout: 'vbox',
  commonItems: [
    {
      xtype: 'textfield',
      fieldLabel: 'Destination',
      labelWidth: 70,
      name: 'dest',
      width: 570,
      style: { 'margin-top': '5px' }
    },
    {
      xtype: 'checkboxfield',
      hideLabel: true,
      boxLabel: 'Start when added',
      name: 'start',
      width: 570,
      style: { 'margin-top': '5px', 'margin-left': '10px' }
    }
  ],

  constructor: function(args) {
    var me = this;

    me.buttons = [
      { text: 'Cancel', handler: function() { me.close(); } },
      { text: 'Add', handler: function() { me.addTorrent(); } }
    ];

    me.__defineGetter__('application', function() {
      return args.application;
    });

    me.callParent(arguments);
  },

  initComponent: function() {
    var me = this;
    me.callParent(arguments);

    me.down('textfield[name=dest]').setRawValue(
      me.application.getController('Preferences').get('download-dir'));
    me.down('checkboxfield[name=start]').setRawValue(
      me.application.getController('Preferences').get('start-added-torrents'));
  },

  addTorrentCallback: function(response) {
    var config = {
      buttons: Ext.Msg.OK
    };

    if (response.result == 'success') {
      if (response.arguments['torrent-added']) {
        config.title = 'Success';
        config.msg = 'Torrent was added';
        config.icon = Ext.MessageBox.INFO;
      }
      else if (response.arguments['torrent-duplicate']) {
        config.title = 'Error';
        config.msg = 'Duplicated torrent';
        config.icon = Ext.MessageBox.ERROR;
      }
    } else {
      config.title = 'Error';
      config.msg = response.result;
      config.icon = Ext.MessageBox.ERROR;
    }

    Ext.Msg.show(config);
  }
});
