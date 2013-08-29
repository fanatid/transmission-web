(function() {
  function sortETA(value) {
    return value * -1;
  }

  Ext.define('TrWeb.model.Torrent', {
    extend: 'Ext.data.Model',

    idProperty: 'id',
    fields: [
      { name: 'id',           type: 'int' },
      { name: 'name',         type: 'string' },
      { name: 'totalSize',    type: 'int' },
      { name: 'status',       type: 'int' },
      { name: 'percentDone',  type: 'float' },
      { name: 'rateDownload', type: 'int' },
      { name: 'rateUpload',   type: 'int' },
      { name: 'eta',          type: 'int', sortType: sortETA },
      { name: 'uploadedEver', type: 'int' }
    ],

    isActive: function() {
      return (this.get('status') != TR_STATUS_STOPPED);
    }
  });
})();
