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
      { name: 'uploadedEver', type: 'int' },
      { name: 'downloadDir',  type: 'string' },

      { name: 'haveValid',      type: 'int' },
      { name: 'sizeWhenDone',   type: 'int' },
      { name: 'pieceCount',     type: 'int' },
      { name: 'pieceSize',      type: 'int' },
      { name: 'downloadedEver', type: 'int' },
      { name: 'corruptEver',    type: 'int' },
      { name: 'uploadedEver',   type: 'int' },
      { name: 'startDate',      type: 'int' },
      { name: 'activityDate',   type: 'int' },
      { name: 'hashString',     type: 'string' },
      { name: 'isPrivate',      type: 'boolean' },
      { name: 'creator',        type: 'string' },
      { name: 'dateCreated',    type: 'int' }
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
    },

    getHumanEta: function() {
      var value = this.get('eta');

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
  });
})();
