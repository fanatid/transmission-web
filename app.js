/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
  name: 'TrWeb',

  requires: [
    'Ext.container.Viewport',
    'Ext.form.Label',
    'Ext.toolbar.TextItem',
    'Ext.window.MessageBox',
    'Ext.util.Point',
    'TrWeb.Remote',
    'TrWeb.Utils'
  ],

  controllers: [
    'MainMenu',
    'Stats',
    'Torrents',
    'TorrentDetails'
  ],

  constructor: function() {
    var me = this;

    var _task = Ext.create('Ext.util.TaskRunner').newTask({
      run:      me.fireEvent,
      scope:    me,
      args:     ['update'],
      interval: 3000
    });
    me.__defineGetter__('task', function() {
      return _task;
    });

    me.callParent(arguments);
  },

  launch: function() {
    var me = this;

    me.remote         = Ext.create('TrWeb.Remote', { application: me });
    me.mainmenu       = Ext.widget('mainmenu');
    me.torrentgrid    = Ext.widget('torrentgrid', { flex: 5 });
    me.torrentdetails = Ext.widget('torrentdetails', { flex: 2 });
    me.statsbar       = Ext.widget('statsbar');
    me.statswin       = Ext.widget('statswin');

    Ext.create('Ext.container.Viewport', {
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        me.mainmenu,
        me.torrentgrid,
        me.torrentdetails,
        me.statsbar
      ]
    });

    me.addListener('start',  me.onStart,  me);
    me.addListener('stop',   me.onStop,   me);
    me.fireEvent('start');
  },

  onStart: function() {
    this.task.start();
  },

  onStop: function(error) {
    this.task.stop();

    var msg = 'The connection to the server has been lost!'
    if (error)
      msg = msg + ' (' + error + ')';

    Ext.Msg.show({
      title: 'Lost Connection',
      msg: msg,
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.ERROR
    });
  }
});
