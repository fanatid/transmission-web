Ext.define('TrWeb.controller.Preferences', {
  extend: 'Ext.app.Controller',

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() {
      return args.application;
    });
    var _session = {};
    me.__defineSetter__('session', function(session) {
      _session = session ? session : {};
    })
    me.__defineGetter__('session', function() {
      return _session;
    });

    args.application.on('start',  me.onApplicationStart,  me);
    args.application.on('stop',   me.onApplicationStop,   me);
    args.application.on('update', me.onApplicationUpdate, me);

    me.callParent(arguments);
  },

  onApplicationStart: function() {
    this.updatePreferences();
  },

  onApplicationStop: function() {
  },

  onApplicationUpdate: function() {
  },

  updatePreferences: function() {
    var me = this;

    this.application.remote.sessionGet(function(session) {
      me.session = session;
    });
  },

  get: function(name) {
    return this.session[name];
  }
});
