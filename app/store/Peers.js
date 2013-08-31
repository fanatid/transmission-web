Ext.define('TrWeb.store.Peers', {
  extend: 'Ext.data.Store',
  model: 'TrWeb.model.Peer',

  sorters: [{
    property: 'progress',
    direction: 'DESC'
  }]
});
