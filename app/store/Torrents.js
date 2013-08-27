Ext.define('TrWeb.store.Torrents', {
  extend: 'Ext.data.Store',
  model: 'TrWeb.model.Torrent',

  fields: [
    { name: 'id',           type: 'int' },
    { name: 'name',         type: 'string' },
    { name: 'totalSize',    type: 'int' },
    { name: 'status' },
    { name: 'percentDone',  type: 'float' },
    { name: 'rateDownload', type: 'int' },
    { name: 'rateUpload',   type: 'int' },
    { name: 'eta',          type: 'int' },
    { name: 'uploadedEver', type: 'int' }
  ],
  sorters: [{
    property: 'name',
    direction: 'ASC'
  }]
});
