(function() {
  function progressRenderer(value, metaData, record) {
    value = record.get('bytesCompleted')/record.get('size');
    return TrWeb.Utils.percentDoneRenderer(value);
  }

  Ext.define('TrWeb.view.details.FilesTab', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.filestab',

    title: 'Files',
    disableSelection: true,
    useArrows: true,
    rootVisible: false,
    //store: 'Files',
    columns: [
      { text: 'Filename', dataIndex: 'text',     flex: 5 },
      { text: 'Size',     dataIndex: 'size',     flex: 1, renderer: TrWeb.Utils.sizeToHuman },
      { text: 'Progress', dataIndex: 'size',     flex: 2, renderer: progressRenderer },
      { text: 'Priority', dataIndex: 'priority', flex: 1 }
    ],

    initComponent: function() {
      var me = this;

      me.callParent(arguments);
      me.setRootNode(Ext.data.NodeInterface.create({}));
      me.getRootNode().data.size = 0;
      me.getRootNode().data.bytesCompleted = 0;

      var _active = false;
      var getFilesList = function(torrentId, remote) {
        remote.torrentGet([torrentId], ['id', 'files', 'fileStats'], function(torrents) {
          if (_active && torrents.length == 1 && torrents[0].id == torrentId && torrents[0].files.length == torrents[0].fileStats.length)
            me.updateTab(torrents[0]);
          else
            me.clearTab();
        });
      }

      me.on({
        start: function(me, torrent, remote) {
          _active = true;
          getFilesList(torrent.get('id'), remote);
        },
        update: function(me, torrent, remote) {
          getFilesList(torrent.get('id'), remote);
        },
        stop: function(me, torrent) {
          _active = false;
          me.clearTab();
        }
      });
    },

    updateRecord: function(data) {
      var node;
      var parentNode = this.getRootNode();

      for (var i = 0; i != data.nameKeys.length; ++i) {
        parentNode.data.size += data.size;
        parentNode.data.bytesCompleted += data.bytesCompleted
        node = parentNode.findChild('text', data.nameKeys[i]);
        if (node == null) {
          node = parentNode.appendChild({
            text: data.nameKeys[i],
            expanded: true,
            leaf: i == data.nameKeys.length-1
          })
        }
        parentNode = node;
      }

      node.data.size = data.size;
      node.data.bytesCompleted = data.bytesCompleted;
      node.data.priority = data.priority;
    },

    updateTab: function(torrent) {
      for (var i = 0; i != torrent.files.length; ++i)
        this.updateRecord({
          'nameKeys': torrent.files[i].name.split('/'),
          'size': torrent.files[i].length,
          'bytesCompleted': torrent.files[i].bytesCompleted,
          'priority': torrent.fileStats[i].priority
        });
      this.getRootNode().expand();
    },

    clearTab: function() {
      var root = this.getRootNode();
      root.size = 0;
      root.bytesCompleted = 0;
      root.removeAll();
    }
  });
})();
