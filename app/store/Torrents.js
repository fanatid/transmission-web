Ext.define('TrWeb.store.Torrents', {
  extend: 'Ext.data.Store',
  model: 'TrWeb.model.Torrent',

  sorters: [{
    property: 'name',
    direction: 'ASC'
  }]
});
