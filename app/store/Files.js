Ext.define('TrWeb.store.Files', {
  extend: 'Ext.data.TreeStore',
  model: 'TrWeb.model.File',

  sorters: [{
    property: 'name',
    direction: 'ASC'
  }]
});
