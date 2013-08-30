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

  function percentDoneRenderer(value, metaData, record) {
    var tpl = '\
<div class="x-progress x-progress-default x-border-box">\
  <div class="x-progress-bar x-progress-bar-default" style="width: {1}%">\
    <div class="x-progress-text" style="width: 100%">\
      <div>{0}</div>\
    </div>\
  </div>\
  <div class="x-progress-text x-progress-text-back" style="width: 100%">{0}</div>\
</div>';

    value = (value*100).toFixed(2);
    var text = record.getHumanStatus() + ' ' + value + ' %';

    return Ext.String.format(tpl, text, value);
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
