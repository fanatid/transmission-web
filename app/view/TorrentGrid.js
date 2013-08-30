(function() {
  function sizeToHuman(value) {
    if (value < 1024)
      return (value).toFixed(2).toString() + ' B';
    value = value / 1024;
    if (value < 1024)
      return (value).toFixed(2).toString() + ' KiB';
    value = value / 1024;
    if (value < 1024)
      return (value).toFixed(2).toString() + ' MiB';
    value = value / 1024;
    return (value).toFixed(2).toString() + ' GiB';
  }

  function statusRenderer(value) {
    switch (value) {
      case TR_STATUS_STOPPED:
        return 'Stopped';
      case TR_STATUS_CHECK_WAIT:
            return 'Queued to check files';
      case TR_STATUS_CHECK:
        return 'Checking';
      case TR_STATUS_DOWNLOAD_WAIT:
        return 'Queued to download';
      case TR_STATUS_DOWNLOAD:
        return 'Downloading';
      case TR_STATUS_SEED_WAIT:
        return 'Queued to seed';
      case TR_STATUS_SEED:
        return 'Seeding';
      default:
        return 'Unknow status';
    }
  }

  function percentDoneRenderer(value) {
    return (value*100).toFixed(2).toString() + '%';
  }

  function rateDownloadRenderer(value) {
    return sizeToHuman(value) + '/s';
  }

  function rateUploadRenderer(value) {
    return sizeToHuman(value) + '/s';
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

  Ext.define('TrWeb.view.TorrentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.torrentgrid',

    store: 'Torrents',

    header: false,
    columns: {
      items: [
        { text: 'id',         dataIndex: 'id', hidden: true },
        { text: 'Name',       dataIndex: 'name', flex: 8 },
        { text: 'Size',       dataIndex: 'totalSize',    renderer: sizeToHuman },
        { text: 'Status',     dataIndex: 'status',       renderer: statusRenderer },
        { text: 'Progress',   dataIndex: 'percentDone',  renderer: percentDoneRenderer, flex: 2 },
        { text: 'Down Speed', dataIndex: 'rateDownload', renderer: rateDownloadRenderer },
        { text: 'Up Speed',   dataIndex: 'rateUpload',   renderer: rateUploadRenderer },
        { text: 'ETA',        dataIndex: 'eta',          renderer: ETARenderer },
        { text: 'Uploaded',   dataIndex: 'uploadedEver', renderer: sizeToHuman }
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
