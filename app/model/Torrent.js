(function() {
  var TR_STATUS_STOPPED        = 0; /* Torrent is stopped */
  var TR_STATUS_CHECK_WAIT     = 1; /* Queued to check files */
  var TR_STATUS_CHECK          = 2; /* Checking files */
  var TR_STATUS_DOWNLOAD_WAIT  = 3; /* Queued to download */
  var TR_STATUS_DOWNLOAD       = 4; /* Downloading */
  var TR_STATUS_SEED_WAIT      = 5; /* Queued to seed */
  var TR_STATUS_SEED           = 6; /* Seeding */
  
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
    },

    getHumanStatus: function() {
      switch (this.get('status')) {
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
  });
})();
