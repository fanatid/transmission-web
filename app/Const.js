Ext.define('TrWeb.Const', {});

var TR_STATUS_STOPPED        = 0; /* Torrent is stopped */
var TR_STATUS_CHECK_WAIT     = 1; /* Queued to check files */
var TR_STATUS_CHECK          = 2; /* Checking files */
var TR_STATUS_DOWNLOAD_WAIT  = 3; /* Queued to download */
var TR_STATUS_DOWNLOAD       = 4; /* Downloading */
var TR_STATUS_SEED_WAIT      = 5; /* Queued to seed */
var TR_STATUS_SEED           = 6; /* Seeding */
