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
                xtype: 'numberfield',
                name: 'downloadLimit',
                fieldLabel: 'Limit download speed (kB/s)',
                style: 'margin-left: 5px',
                labelWidth: 160,
                width: 240,
                minValue: 0
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
                xtype: 'numberfield',
                name: 'uploadLimit',
                fieldLabel: 'Limit upload speed (kB/s)',
                style: 'margin-left: 5px',
                labelWidth: 160,
                width: 240,
                minValue: 0
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
                width: 335,
                listeners: {
                  change: function(me, newValue, oldValue, eOpts) {
                    var spin = me.up('panel').down('floatfield[name=seedRatioLimit]');
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
                xtype: 'floatfield',
                name: 'seedRatioLimit',
                hideEmptyLabel: true,
                style: 'margin-left: 5px',
                width: 80,
                hidden: true,
                minValue: 0,
                step: 0.05
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
                width: 335,
                listeners: {
                  change: function(me, newValue, oldValue, eOpts) {
                    var spin = me.up('panel').down('numberfield[name=seedIdleLimit]');
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
                xtype: 'numberfield',
                name: 'seedIdleLimit',
                hideEmptyLabel: true,
                style: 'margin-left: 5px',
                width: 80,
                hidden: true,
                minValue: 0
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
            xtype: 'numberfield',
            name: 'peerLimit',
            anchor: '100%',
            fieldLabel: 'Maximum peers',
            width: 180,
            name: 'peer-limit',
            minValue: 0,
            maxValue: 9999
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

      var preferences = null;
      me.__defineSetter__('preferences', function(obj) { preferences = obj; });

      var OPTIONS_FIELD = [
        'id',
        'honorsSessionLimits', 'downloadLimited', 'downloadLimit', 'uploadLimited', 'uploadLimit', 'bandwidthPriority',
        'seedRatioMode', 'seedRatioLimit', 'seedIdleMode', 'seedIdleLimit',
        'peer-limit'
      ];
      var _active = false;
      var _torrentId = null;
      var _options = null;
      var _remote;
      var getTorrentOptions = function(torrentId, remote) {
        _torrentId = torrentId;
        _options = null;
        _remote = remote;
        remote.torrentGet([torrentId], OPTIONS_FIELD, function(torrents) {
          me.enable();
          if (_active && torrents.length == 1 && torrents[0].id == _torrentId) {
            _options = torrents[0];
            me.updateTab(_options);
          } else {
            me.clearTab(preferences);
          }
        });
      }

      me.down('button[name=actionApply]').setHandler(function() {
        me.disable();
        var args = {
          'honorsSessionLimits': me.down('checkbox[name=honorsSessionLimits]').getValue(),
          'downloadLimited': me.down('checkbox[name=downloadLimited]').getValue(),
          'downloadLimit': parseInt(me.down('numberfield[name=downloadLimit]').getValue()),
          'uploadLimited': me.down('checkbox[name=uploadLimited]').getValue(),
          'uploadLimit': parseInt(me.down('numberfield[name=uploadLimit]').getValue()),

          'seedRatioLimit': parseFloat(me.down('floatfield[name=seedRatioLimit]').getValue()),
          'seedRatioMode': me.down('combobox[name=seedRatioMode]').getValue(),
          'seedIdleLimit': parseInt(me.down('numberfield[name=seedIdleLimit]').getValue()),
          'seedIdleMode': me.down('combobox[name=seedIdleMode]').getValue(),

          'peer-limit': parseInt(me.down('numberfield[name=peer-limit]').getValue())
        };
        _remote.torrentSet([_torrentId], args, function() {
          getTorrentOptions(_torrentId, _remote);
        });
      });
      me.down('button[name=actionCancel]').setHandler(function() { me.updateTab(_options); });

      me.on({
        start: function(me, torrent, remote) {
          _active = true;
          if (torrent.get('id') != _torrentId) {
            me.disable();
            getTorrentOptions(torrent.get('id'), remote);
          }
        },
        update: function(me, torrent, remote) {
          if (torrent.get('id') != _torrentId) {
            me.disable();
            getTorrentOptions(torrent.get('id'), remote);
          }
        },
        stop: function(me) {
          _active = false;
          _torrentId = null;
          _options = null;
          me.clearTab(preferences);
        }
      });
    },

    updateTab: function(options) {
      var me = this;

      me.down('checkbox[name=honorsSessionLimits]').setValue(options['honorsSessionLimits']);
      me.down('checkbox[name=downloadLimited]').setValue(options['downloadLimited']);
      me.down('numberfield[name=downloadLimit]').setValue(options['downloadLimit']);
      me.down('checkbox[name=uploadLimited]').setValue(options['uploadLimited']);
      me.down('numberfield[name=uploadLimit]').setValue(options['uploadLimit']);

      me.down('floatfield[name=seedRatioLimit]').setValue(options['seedRatioLimit']);
      me.down('combobox[name=seedRatioMode]').setValue(options['seedRatioMode']);
      me.down('numberfield[name=seedIdleLimit]').setValue(options['seedIdleLimit']);
      me.down('combobox[name=seedIdleMode]').setValue(options['seedIdleMode']);

      me.down('numberfield[name=peer-limit]').setValue(options['peer-limit']);
    },

    clearTab: function(options) {
      this.updateTab({
        'honorsSessionLimits': true,
        'downloadLimited': false,
        'downloadLimit': options.get('alt-speed-down'),
        'uploadLimited': false,
        'uploadLimit': options.get('alt-speed-up'),

        'seedRatioLimit': options.get('idle-seeding-limit'),
        'seedRatioMode': TR_RATIOLIMIT_GLOBAL,
        'seedIdleLimit': options.get('seedRatioLimit'),
        'seedIdleMode': TR_IDLELIMIT_GLOBAL,

        'peer-limit': options.get('peer-limit-per-torrent')
      })
    }
  });
})();
