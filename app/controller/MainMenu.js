Ext.define('TrWeb.controller.MainMenu', {
  extend: 'Ext.app.Controller',

  views: [
    'MainMenu'
  ],

  constructor: function(args) {
    args.application.addListener('start', this.onStart, this);
    args.application.addListener('stop', this.onStop, this)

    this.callParent(arguments);
  },

  onStart: function() {
  },

  onStop: function() {
  }
});
