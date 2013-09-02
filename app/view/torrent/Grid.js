(function() {
  function percentDoneRenderer(value, metaData, record) {
    value = (value*100).toFixed(2);
    var text = record.getHumanStatus() + ' ' + value + ' %';

    return TrWeb.Utils.cellProgressBarRenderer(text, value);
  }

  function ETARenderer(value) {
    if (value == -1)
      return '∞';
    if (value == -2)
      return 'Unknow';
    if (value < 90)
      return value.toString() + 's';
    if (value < 5460) {
      m = Math.floor(value / 60);
      s = value % 60;
      return m.toString() + 'm and ' + s.toString() + 's';
    }
    if (value < 133200) {
      h = Math.floor(value / (60 * 60));
      m = Math.floor((value % (60 * 60)) / 60);
      return h.toString() + ' hours and ' + m.toString() + 'm';
    }
    d = Math.floor(value / (24 * 60 * 60));
    h = Math.floor((value % (24 * 60 * 60)) / (60 * 60));
    return d.toString() + ' days and ' + h.toString() + ' hours';
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
        { text: 'ETA',        dataIndex: 'eta',          renderer: ETARenderer },
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
