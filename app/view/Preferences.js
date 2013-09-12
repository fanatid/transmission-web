Ext.define('TrWeb.view.Preferences', {
  extend: 'Ext.window.Window',
  alias: 'widget.prefwin',

  title: 'Preferences',
  titleAlign: 'center',
  closeAction: 'hide',
  closable: true,
  height: 280,
  width: 400,
  defaults: {
    frame: false,
    border: false,
    bodyStyle: 'background: transparent;'
  },
  items: [
    {
      xtype: 'tabpanel',
      height: 215,
      defaults: {
        frame: false,
        border: false,
        bodyStyle: 'background: transparent; padding: 5px;'
      },
      items: [
        {
          title: 'Torrents',
          xtype: 'form',
          layout: 'anchor',
          defaults: {
            anchor: '100%',
            style: 'margin-left: 10px; margin-top: 5px;',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent'
          },
          items: [
            {
              xtype: 'label',
              text: 'Downloading',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Download to',
              name: 'download-dir'
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Start when added',
              name: 'start-added-torrents'
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Append ".part" to incomplete files\' names',
              name: 'rename-partial-files'
            },
            {
              xtype: 'label',
              text: 'Seeding',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'panel',
              layout: 'hbox',
              items: [
                {
                  xtype: 'checkbox',
                  hideEmptyLabel: true,
                  name: 'seedRatioLimited',
                  listeners: {
                    change: function(me, newValue) {
                      var spin = me.up('panel').down('floatfield[name=seedRatioLimit]');
                      if (newValue)
                        spin.enable();
                      else
                        spin.disable();
                    }
                  }
                },
                {
                  xtype: 'floatfield',
                  fieldLabel: 'Stop seeding at ratio',
                  style: 'margin-left: 5px',
                  labelWidth: 160,
                  width: 240,
                  minValue: 0,
                  name: 'seedRatioLimit'
                }
              ]
            },
            {
              xtype: 'panel',
              layout: 'hbox',
              items: [
                {
                  xtype: 'checkbox',
                  hideEmptyLabel: true,
                  name: 'idle-seeding-limit-enabled',
                  listeners: {
                    change: function(me, newValue) {
                      var spin = me.up('panel').down('floatfield[name=idle-seeding-limit]');
                      if (newValue)
                        spin.enable();
                      else
                        spin.disable();
                    }
                  }
                },
                {
                  xtype: 'floatfield',
                  fieldLabel: 'Stop seeding if idle for (min)',
                  style: 'margin-left: 5px',
                  labelWidth: 160,
                  width: 240,
                  minValue: 0,
                  name: 'idle-seeding-limit'
                }
              ]
            }
          ]
        },
        {
          title: 'Speed',
          xtype: 'form',
          layout: 'anchor',
          defaults: {
            anchor: '100%',
            style: 'margin-left: 10px; margin-top: 5px;',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            minValue: 0,
            step: 5
          },
          items: [
            {
              xtype: 'label',
              text: 'Speed limits',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Upload (kB/s)',
              name: 'speed-limit-up'
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Download (kB/s)',
              name: 'speed-limit-down'
            },
            {
              xtype: 'label',
              text: 'Alternative Speed limits',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Upload (kB/s)',
              name: 'alt-speed-down'
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Download (kB/s)',
              name: 'alt-speed-up'
            }
          ]
        },
        {
          title: 'Peers',
          xtype: 'form',
          layout: 'anchor',
          defaults: {
            anchor: '100%',
            style: 'margin-left: 10px; margin-top: 5px;',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            minValue: 0,
            step: 5
          },
          items: [
            {
              xtype: 'label',
              text: 'Connections',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Max peers per torrent',
              labelWidth: 120,
              name: 'peer-limit-per-torrent'
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Max peers overall',
              labelWidth: 120,
              name: 'peer-limit-global'
            },
            {
              xtype: 'label',
              text: 'Options',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Use PEX to find more peers',
              name: 'pex-enabled'
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Use DHT to find more peers',
              name: 'dht-enabled'
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Use LPD to find more peers',
              name: 'lpd-enabled'
            }
          ]
        },
        {
          title: 'Network',
          xtype: 'form',
          layout: 'anchor',
          defaults: {
            anchor: '100%',
            style: 'margin-left: 10px; margin-top: 5px;',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent'
          },
          items: [
            {
              xtype: 'label',
              text: 'Listening Port',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'numberfield',
              fieldLabel: 'Peer listening port',
              labelWidth: 110,
              name: 'peer-port',
              minValue: 0,
              step: 1
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Randomize port on launch',
              name: 'peer-port-random-on-start'
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Use port forwarding from my router',
              name: 'port-forwarding-enabled'
            },
            {
              xtype: 'label',
              text: 'Options',
              style: { 'font-weight': 'bold' }
            },
            {
              xtype: 'checkboxfield',
              hideLabel: true,
              boxLabel: 'Enable μTP for peer communication',
              name: 'utp-enabled'
            }
          ]
        }
      ]
    },
    {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        pack: 'end'
      },
      defaultType: 'button',
      defaults: {
        width: 75,
        style: 'margin-right: 5px'
      },
      items: [
        {
          name: 'actionApply',
          text: 'Apply'
        },
        {
          name: 'actionCancel',
          text: 'Cancel'
        }
      ]
    }
  ],
  preferencesKeys: [
    'download-dir',
    'start-added-torrents',
    'rename-partial-files',
    'seedRatioLimited',
    'seedRatioLimit',
    'idle-seeding-limit-enabled',
    'idle-seeding-limit',

    'speed-limit-up',
    'speed-limit-down',
    'alt-speed-down',
    'alt-speed-up',

    'peer-limit-per-torrent',
    'peer-limit-global',
    'pex-enabled',
    'dht-enabled',
    'lpd-enabled',

    'peer-port',
    'peer-port-random-on-start',
    'port-forwarding-enabled',
    'utp-enabled'
  ],
  preferencesKeysDisabled: [
    'seedRatioLimit',
    'idle-seeding-limit'
  ],

  initComponent: function() {
    var me = this;
    me.callParent(arguments);

    me.down('button[name=actionApply]').on('click', function() {
      me.fireEventArgs('apply', [me]);
    });
    me.down('button[name=actionCancel]').on('click', function() {
      me.fireEventArgs('cancel', [me]);
    });
  },

  setPreferences: function(session) {
    var me = this;

    Ext.each(me.preferencesKeysDisabled, function(key) {
      me.down('field[name=' + key + ']').disable();
    });
    Ext.each(me.preferencesKeys, function(key) {
      me.down('field[name=' + key + ']').setValue(session[key]);
    });
  },

  getPreferences: function(session) {
    var me = this;
    var newSession = Ext.Object.merge({}, session);

    Ext.each(me.preferencesKeys, function(key) {
      newSession[key] = me.down('field[name=' + key + ']').getValue();
    });

    return newSession;
  }
});
