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
              hideEmptyLabel: true
            },
            {
              xtype: 'spinnerfield',
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
              hideEmptyLabel: true
            },
            {
              xtype: 'spinnerfield',
              fieldLabel: 'Limit upload speed (kB/s)',
              style: 'margin-left: 5px',
              labelWidth: 160,
              width: 240
            }
          ]
        },
        {
          xtype: 'combobox',
          fieldLabel: 'Torrent priority',
          store: ['High', 'Normal', 'Low'],
          labelWidth: 178,
          width: 258
        }
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
              fieldLabel: 'Ratio',
              store: ['Use global settings', 'Seed regardless of ratio', 'Stop seeding at ratio:'],
              labelWidth: 50,
              width: 250
            },
            {
              xtype: 'spinnerfield',
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
              fieldLabel: 'Idle',
              store: ['Use global settings', 'Seed regardless of activity', 'Stop seeding if idle for N minutes:'],
              labelWidth: 50,
              width: 250
            },
            {
              xtype: 'spinnerfield',
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
          anchor: '100%',
          fieldLabel: 'Maximum peers',
          width: 180,
          name: 'peersLimit',
          step: 1
        }
      ]
    }
  ]


});
