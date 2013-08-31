(function() {
  function percentDoneRenderer(value, metaData, record) {
    value = (value*100).toFixed(2);
    var text = value + ' %';

    return TrWeb.Utils.cellProgressBarRenderer(text, value);
  }

  Ext.define('TrWeb.view.details.PeersTab', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.peerstab',

    title: 'Peers',
    disableSelection: true,
    store: 'Peers',
    columns: {
      items: [
        { text: 'Encrypted',          dataIndex: 'isEncrypted',  renderer: TrWeb.Utils.booleanRenderer, flex: 0 },
        { text: 'Up Speed',           dataIndex: 'rateToPeer',   renderer: TrWeb.Utils.speedToHuman },
        { text: 'Down Speed',         dataIndex: 'rateToClient', renderer: TrWeb.Utils.speedToHuman },
        { text: 'Progress',           dataIndex: 'progress',     renderer: percentDoneRenderer },
        { text: 'Flags',              dataIndex: 'flagStr' },
        { text: 'Address',            dataIndex: 'address' },
        { text: 'Client',             dataIndex: 'clientName' },
        { text: 'port',               dataIndex: 'port',               hidden: true },
        { text: 'clientIsChoked',     dataIndex: 'clientIsChoked',     hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'clientIsInterested', dataIndex: 'clientIsInterested', hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'isDownloadingFrom',  dataIndex: 'isDownloadingFrom',  hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'isIncoming',         dataIndex: 'isIncoming',         hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'isUploadingTo',      dataIndex: 'isUploadingTo',      hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'isUTP',              dataIndex: 'isUTP',              hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'peerIsChoked',       dataIndex: 'peerIsChoked',       hidden: true, renderer: TrWeb.Utils.booleanRenderer },
        { text: 'peerIsInterested',   dataIndex: 'peerIsInterested',   hidden: true, renderer: TrWeb.Utils.booleanRenderer }
      ],
      defaults: {
        flex: 1
      }
    },

    initComponent: function() {
      this.callParent(arguments);

      this.on('update', this.onUpdate, this);
      this.on('stop',   this.onStop,   this);
    },

    onUpdate: function(remote, torrent) {
      var me = this;

      remote.torrentGet([torrent.get('id')], ['peers'], function(torrents, remove) {
        if (torrents.length != 1) {
          store.removeAll();
          return;
        }

        var store = me.getStore();
        var allPeers = {};

        for (var index in torrents[0].peers) {
          var peer = torrents[0].peers[index];
          peer.id = peer.address + ':' + peer.port;
          allPeers[peer.id] = peer;
        }

        for (var index in store.data.items) {
          var record = store.data.items[index];
          if ((record.get('id') in allPeers)) {
            record.beginEdit();
            record.set(allPeers[record.get('id')]);
            record.endEdit(true);
            delete allPeers[record.get('id')];
          } else {
            store.remove(record);
          }
        }

        store.add(Object.keys(allPeers).map(function(key) {
          return allPeers[key];
        }));

        store.commitChanges();

        store.sort();
      });
    },

    onStop: function() {
      this.getStore().removeAll();
    }
  });
})();
