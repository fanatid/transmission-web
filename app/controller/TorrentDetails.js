Ext.define('TrWeb.controller.TorrentDetails', {
  extend: 'Ext.app.Controller',

  views: [
    'details.DetailsPanel',
    'details.StatusTab',
    'details.DetailsTab',
    'details.FilesTab',
    'details.PeersTab',
    'details.OptionsTab'
  ]

});
