Ext.define('TrWeb.model.File', {
  extend: 'Ext.data.TreeModel',

  fields: [
    { name: 'name',           type: 'string' },
    { name: 'size',           type: 'int' },
    { name: 'bytesCompleted', type: 'int' },
    { name: 'priority',       type: 'int' }
  ]
});
