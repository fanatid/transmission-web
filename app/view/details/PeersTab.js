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
      { text: 'Progress',           dataIndex: 'progress',     renderer: TrWeb.Utils.percentDoneRenderer },
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
    var me = this;

    me.callParent(arguments);

    var _active = false;
    var getPeersList = function(torrent, remote) {
      remote.torrentGet([torrent.get('id')], ['id', 'peers'], function(torrents) {
        if (_active && torrents.length == 1 && torrents[0].id == torrent.get('id'))
          me.updateTab(torrents[0].peers);
        else
          me.clearTab();
      });
    }

    this.on({
      start: function(me, torrent, remote) {
        _active = true;
        getPeersList(torrent, remote);
      },
      update: function(me, torrent, remote) {
        getPeersList(torrent, remote);
      },
      stop: function(me, torrent) {
        _active = false;
        me.clearTab();
      }
    });
  },

  updateTab: function(peers) {
    var store = this.getStore();
    var allPeers = {};

    for (var index in peers) {
      var peer = peers[index];
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
  },

  clearTab: function() {
    this.getStore().removeAll();
  }
});
