(function() {
  function percentDoneRenderer(value, metaData, record) {
    value = (value*100).toFixed(2);
    var text = record.getHumanStatus() + ' ' + value + ' %';

    return TrWeb.Utils.cellProgressBarRenderer(text, value);
  }

  function EtaRenderer(value, metaData, record) {
    return record.getHumanEta();
  }

  Ext.define('TrWeb.view.torrent.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.torrentgrid',

    store: 'Torrents',

    header: false,
    columns: {
      items: [
        { text: 'id',         dataIndex: 'id', hidden: true },
        { text: 'Name',       dataIndex: 'name', flex: 8 },
        { text: 'Size',       dataIndex: 'totalSize',    renderer: TrWeb.Utils.sizeToHuman },
        { text: 'Progress',   dataIndex: 'percentDone',  renderer: percentDoneRenderer, flex: 2 },
        { text: 'Down Speed', dataIndex: 'rateDownload', renderer: TrWeb.Utils.speedToHuman },
        { text: 'Up Speed',   dataIndex: 'rateUpload',   renderer: TrWeb.Utils.speedToHuman },
        { text: 'ETA',        dataIndex: 'eta',          renderer: EtaRenderer },
        { text: 'Uploaded',   dataIndex: 'uploadedEver', renderer: TrWeb.Utils.sizeToHuman }
      ],
      defaults: {
        flex: 1
      }
    },
    viewConfig: {
      stripeRows: true
    },
    selModel: {
      mode: 'MULTI'
    }
  });
})();
