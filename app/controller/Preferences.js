Ext.define('TrWeb.controller.Preferences', {
  extend: 'Ext.app.Controller',

  refs: [
    {
      ref: 'prefWin',
      selector: 'prefwin'
    }
  ],

  views: [
    'Preferences'
  ],

  constructor: function(args) {
    var me = this;

    me.__defineGetter__('application', function() { return args.application; });

    var _session = null;
    me.__defineSetter__('session', function(session) { _session = session; });
    me.__defineGetter__('session', function() { return _session; });

    me.callParent(arguments);

    me.on({
      start:  me.onStart,
      stop:   me.onStop
    });
  },

  onStart: function(me) {
    me.preferencesGet();
  },

  onStop: function(me) {
    me.session = null;
  },

  onLaunch: function() {
    var me = this;
    var prefWin = me.getPrefWin();

    prefWin.on({
      show: function() {
        me.preferencesGet();
      },
      apply: function() {
        if (prefWin.isVisible())
          prefWin.disable();
        var session = prefWin.getPreferences(me.session);
        me.application.remote.sessionSet(session, function() {
          prefWin.hide();
        });
      },
      cancel: function() {
        prefWin.hide();
      }
    });
  },

  preferencesGet: function() {
    var me = this;
    var prefWin = me.getPrefWin();

    if (prefWin.isVisible())
      prefWin.disable();

    me.application.remote.sessionGet(function(session) {
      me.session = session || {};
      if (prefWin.isVisible()) {
        prefWin.enable();
        prefWin.setPreferences(me.session);
      }
    });
  },

  get: function(name) {
    return this.session[name];
  }
});
