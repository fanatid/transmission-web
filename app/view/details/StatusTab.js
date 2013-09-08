Ext.define('TrWeb.view.details.StatusTab', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.statustab',

  title: 'Status',
  autoScroll: true,
  items: [
    {
      xtype: 'progressbar',
      style: {
        margin: '5px'
      }
    },
    {
      layout: 'column',
      frame: false,
      border: false,
      bodyStyle: 'background: transparent',
      defaultType: 'panel',
      defaults: {
        layout: 'vbox',
        frame: false,
        border: false,
        bodyStyle: 'background: transparent',
        style: 'margin-left: 5px'
      },
      items: [
        {
          width: 350,
          defaultType: 'panel',
          defaults: {
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            style: 'margin-top: 8px'
          },
          items: [
            {
              defaultType: 'label',
              items: [
                { html: '<b>Have:</b> ', width: 90 },
                { cls: 'have' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Size:</b> ', width: 90 },
                { cls: 'size' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Downloaded:</b> ', width: 90 },
                { cls: 'downloaded' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Uploaded:</b> ', width: 90 },
                { cls: 'uploaded' }
              ]
            }
          ]
        },
        {
          width: 350,
          defaultType: 'panel',
          defaults: {
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            style: 'margin-top: 8px'
          },
          items: [
            {
              defaultType: 'label',
              items: [
                { html: '<b>State:</b> ', width: 100 },
                { cls: 'state' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Running time:</b> ', width: 100 },
                { cls: 'running-time' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Remaining time:</b> ', width: 100 },
                { cls: 'remaining-time' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Last activity:</b> ', width: 100 },
                { cls: 'last-activity' }
              ]
            }
          ]
        },
        {
          defaultType: 'panel',
          defaults: {
            layout: 'hbox',
            frame: false,
            border: false,
            bodyStyle: 'background: transparent',
            style: 'margin-top: 8px'
          },
          items: [
            {
              defaultType: 'label',
              items: [
                { html: '<b>Location:</b> ', width: 90 },
                { cls: 'location' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Hash:</b> ', width: 90 },
                { cls: 'hash' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Privacy:</b> ', width: 90 },
                { cls: 'privacy' }
              ]
            },
            {
              defaultType: 'label',
              items: [
                { html: '<b>Origin:</b> ', width: 90 },
                { cls: 'origin' }
              ]
            }
          ]
        }
      ]
    }
  ],

  initComponent: function() {
    this.callParent(arguments);

    this.on({
      start: function(me, torrent) {
        me.updateTab(torrent);
      },
      updatetorrent: function(me, torrent) {
        me.updateTab(torrent);
      },
      stop: function(me, torrent) {
        me.clearTab();
      }
    });
  },

  updateTab: function(torrent) {
    var me = this, done, ratio, text;

    done = torrent.get('percentDone');
    me.down('progressbar').updateProgress(
      done, torrent.getHumanStatus() + ' ' + (done*100).toFixed(2) + ' %');

    me.down('label[cls~=have]').setText(Ext.String.format('{0} ({1}%)',
      TrWeb.Utils.sizeToHuman(torrent.get('haveValid')), (torrent.get('percentDone')*100).toFixed(2)));
    me.down('label[cls~=size]').setText(Ext.String.format('{0} ({1} pieces @ {2})',
      TrWeb.Utils.sizeToHuman(torrent.get('sizeWhenDone')), torrent.get('pieceCount'), TrWeb.Utils.sizeToHuman(torrent.get('pieceSize'))));
    me.down('label[cls~=downloaded]').setText(TrWeb.Utils.sizeToHuman(
      torrent.get('downloadedEver') + torrent.get('corruptEver')));
    if (torrent.get('downloadedEver') == 0)
      ratio = torrent.get('uploadedEver') / torrent.get('haveValid');
    else
      ratio = torrent.get('uploadedEver') / torrent.get('downloadedEver');
    me.down('label[cls~=uploaded]').setText(Ext.String.format('{0} (Ratio: {1})',
      TrWeb.Utils.sizeToHuman(torrent.get('uploadedEver')), ratio.toFixed(2)));

    me.down('label[cls~=state]').setText(torrent.getHumanStatus());
    if (torrent.isActive())
      text = TrWeb.Utils.secondsToHuman(Math.round(new Date().getTime() / 1000) - torrent.get('startDate'));
    else
      text = torrent.getHumanStatus();
    me.down('label[cls~=running-time]').setText(text);
    me.down('label[cls~=remaining-time]').setText(torrent.getHumanEta());
    text = Math.round(new Date().getTime() / 1000) - torrent.get('activityDate');
    if (text < 10)
      text = 'Activity now'
    else
      text = TrWeb.Utils.secondsToHuman(text) + ' ago';
    me.down('label[cls~=last-activity]').setText(text);

    me.down('label[cls~=location]').setText(torrent.get('downloadDir'));
    me.down('label[cls~=hash]').setText(torrent.get('hashString'));
    me.down('label[cls~=privacy]').setText(torrent.get('isPrivate') ? 'Private to this tracker -- DHT and PEX disabled' : 'Public torrent');
    if (torrent.get('creator') && torrent.get('dateCreated') != 0)
      text = Ext.String.format('Created by {0} on {1}', torrent.get('creator'), (new Date(torrent.get('dateCreated')*1000)).toDateString());
    else if (torrent.get('creator') && torrent.get('dateCreated') == 0)
      text = Ext.String.format('Created by {0} on N/A', torrent.get('creator'));
    else if (!torrent.get('creator') && torrent.get('dateCreated') != 0)
      text = Ext.String.format('Created on {1}', (new Date(torrent.get('dateCreated')*1000)).toDateString());
    else
      text = 'Created on N/A';
    me.down('label[cls~=origin]').setText(text);
  },

  clearTab: function() {
    var me = this;

    me.down('progressbar').updateProgress(0, '');
    me.down('progressbar').updateText('');

    Ext.each([
      'have', 'size', 'downloaded', 'uploaded',
      'state', 'running-time', 'remaining-time', 'last-activity',
      'location', 'hash', 'privacy', 'origin'
    ], function(cls) { me.down('label[cls~=' + cls + ']').setText(''); });
  }
});
