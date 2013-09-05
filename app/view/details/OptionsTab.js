(function() {
  var TR_RATIOLIMIT_GLOBAL    = 0;
  var TR_RATIOLIMIT_SINGLE    = 1;
  var TR_RATIOLIMIT_UNLIMITED = 2;

  var TR_RATIOLIMIT_STORE = [
    [TR_RATIOLIMIT_GLOBAL, 'Use global settings'],
    [TR_RATIOLIMIT_UNLIMITED, 'Seed regardless of ratio'],
    [TR_RATIOLIMIT_SINGLE, 'Stop seeding at ratio:']
  ];

  var TR_IDLELIMIT_GLOBAL    = 0;
  var TR_IDLELIMIT_SINGLE    = 1;
  var TR_IDLELIMIT_UNLIMITED = 2;

  var TR_IDLELIMIT_STORE = [
    [TR_IDLELIMIT_GLOBAL, 'Use global settings'],
    [TR_IDLELIMIT_UNLIMITED, 'Seed regardless of activity'],
    [TR_IDLELIMIT_SINGLE, 'Stop seeding if idle for N minutes:']
  ];

  Ext.define('TrWeb.view.details.OptionsTab', {
    extend: 'Ext.form.Panel',
    alias: 'widget.optionstab',

    title: 'Options',
    bodyStyle: 'padding: 5px',
    layout: {
      type: 'hbox',
      align: 'stretch',
    },
    defaultType: 'fieldset',
    defaults: {
      border: false,
      layout: 'anchor'
    },
    items: [
      {
        title: '<b>Speed</b>',
        defaults: {
          anchor: '100%',
          style: 'margin-top: 5px'
        },
        items: [
          {
            xtype: 'checkbox',
            name: 'honorsSessionLimits',
            boxLabel: 'Honor global limits',
            hideEmptyLabel: true
          },
          {
            xtype: 'panel',
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            items: [
              {
                xtype: 'checkbox',
                name: 'downloadLimited',
                hideEmptyLabel: true
              },
              {
                xtype: 'spinnerfield',
                name: 'downloadLimit',
                fieldLabel: 'Limit download speed (kB/s)',
                style: 'margin-left: 5px',
                labelWidth: 160,
                width: 240
              }
            ]
          },
          {
            xtype: 'panel',
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            items: [
              {
                xtype: 'checkbox',
                name: 'uploadLimited',
                hideEmptyLabel: true
              },
              {
                xtype: 'spinnerfield',
                name: 'uploadLimit',
                fieldLabel: 'Limit upload speed (kB/s)',
                style: 'margin-left: 5px',
                labelWidth: 160,
                width: 240
              }
            ]
          }/*,
          {
            xtype: 'combobox',
            fieldLabel: 'Torrent priority',
            store: ['High', 'Normal', 'Low'],
            labelWidth: 178,
            width: 258
          }*/
        ]
      },
      {
        title: '<b>Seeding Limit</b>',
        style: 'padding-left: 15px',
        defaultType: 'panel',
        defaults: {
          anchor: '100%',
          style: 'margin-top: 5px',
          layout: 'hbox',
          frame: false,
          border: false,
          bodyStyle: 'background: transparent'
        },
        items: [
          {
            items: [
              {
                xtype: 'combobox',
                name: 'seedRatioMode',
                fieldLabel: 'Ratio',
                store: TR_RATIOLIMIT_STORE,
                labelWidth: 50,
                width: 250,
                listeners: {
                  change: function(me, newValue, oldValue, eOpts) {
                    var spin = me.up('panel').down('spinnerfield[name=seedRatioLimit]');
                    if (newValue == TR_RATIOLIMIT_SINGLE) {
                      me.setWidth(250);
                      spin.show();
                    } else {
                      spin.hide();
                      me.setWidth(335);
                    }
                  }
                }
              },
              {
                xtype: 'spinnerfield',
                name: 'seedRatioLimit',
                hideEmptyLabel: true,
                style: 'margin-left: 5px',
                width: 80
              }
            ]
          },
          {
            items: [
              {
                xtype: 'combobox',
                name: 'seedIdleMode',
                fieldLabel: 'Idle',
                store: TR_IDLELIMIT_STORE,
                labelWidth: 50,
                width: 250,
                listeners: {
                  change: function(me, newValue, oldValue, eOpts) {
                    var spin = me.up('panel').down('spinnerfield[name=seedIdleLimit]');
                    if (newValue == TR_IDLELIMIT_SINGLE) {
                      me.setWidth(250);
                      spin.show();
                    } else {
                      spin.hide();
                      me.setWidth(335);
                    }
                  }
                }
              },
              {
                xtype: 'spinnerfield',
                name: 'seedIdleLimit',
                hideEmptyLabel: true,
                style: 'margin-left: 5px',
                width: 80
              }
            ]
          }
        ]
      },
      {
        title: '<b>Peer Connections</b>',
        style: 'padding-left: 15px',
        items: [
          {
            xtype: 'spinnerfield',
            name: 'peerLimit',
            anchor: '100%',
            fieldLabel: 'Maximum peers',
            width: 180,
            name: 'peer-limit',
            step: 1
          },
          {
            xtype: 'panel',
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            style: 'margin-top: 70px',
            items: [
              {
                xtype: 'button',
                name: 'actionApply',
                text: 'Apply',
                width: 75,
                style: 'margin-left: 5px'
              },
              {
                xtype: 'button',
                name: 'actionCancel',
                text: 'Cancel',
                width: 75,
                style: 'margin-left: 15px'
              }
            ]
          }
        ]
      }
    ],

    initComponent: function() {
      var me = this;

      me.callParent(arguments);

      var OPTIONS_FIELD = [
        'id',
        'honorsSessionLimits', 'downloadLimited', 'downloadLimit', 'uploadLimited', 'uploadLimit', 'bandwidthPriority',
        'seedRatioMode', 'seedRatioLimit', 'seedIdleMode', 'seedIdleLimit',
        'peer-limit'
      ];
      var _active = false;
      var _torrentId = null;
      var _options = null;
      var getTorrentOptions = function(torrent, remote) {
        _torrentId = torrent.get('id');
        _options = null;
        remote.torrentGet([torrent.get('id')], OPTIONS_FIELD, function(torrents) {
          if (_active && torrents.length == 1 && torrents[0].id == torrent.get('id')) {
            _options = torrents[0];
            me.updateTab(_options);
          } else {
            me.clearTab();
          }
        });
      }

      me.down('button[name=actionApply]').setHandler(function() {
        me.disable();
        // send request
      });
      me.down('button[name=actionCancel]').setHandler(function() { me.updateTab(_options); });

      me.on({
        start: function(me, torrent, remote) {
          me.enable();
          _active = true;
          if (torrent.get('id') != _torrentId)
            getTorrentOptions(torrent, remote);
        },
        update: function(me, torrent, remote) {
          if (torrent.get('id') != _torrentId)
            getTorrentOptions(torrent, remote);
        },
        stop: function(me) {
          _active = false;
          _torrentId = null;
          _options = null;
          me.clearTab();
        }
      });
    },

    updateTab: function(options) {
      console.log(options);
      var me = this;

      me.down('checkbox[name=honorsSessionLimits]').setValue(options['honorsSessionLimits']);
      me.down('checkbox[name=downloadLimited]').setValue(options['downloadLimited']);
      me.down('spinnerfield[name=downloadLimit]').setValue(options['downloadLimit']);
      me.down('checkbox[name=uploadLimited]').setValue(options['uploadLimited']);
      me.down('spinnerfield[name=uploadLimit]').setValue(options['uploadLimit']);

      me.down('spinnerfield[name=seedRatioLimit]').setValue(options['seedRatioLimit']);
      me.down('combobox[name=seedRatioMode]').setValue(options['seedRatioMode']);
      me.down('spinnerfield[name=seedIdleLimit]').setValue(options['seedIdleLimit']);
      me.down('combobox[name=seedIdleMode]').setValue(options['seedIdleMode']);

      me.down('spinnerfield[name=peer-limit]').setValue(options['peer-limit']);
    },

    clearTab: function() {
      var me = this;

      // get and set data from preferences
    }
  });
})();
