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
    'Ext.layout.container.Border',
    'Ext.layout.container.Column',
    'Ext.container.Viewport',
    'Ext.form.FieldSet',
    'Ext.form.field.ComboBox',
    'Ext.form.field.File',
    'Ext.form.field.Radio',
    'Ext.form.Label',
    'Ext.form.RadioGroup',
    'Ext.toolbar.TextItem',
    'Ext.window.MessageBox',
    'Ext.util.Point',
    'TrWeb.FloatField',
    'TrWeb.Remote',
    'TrWeb.Utils'
  ],

  controllers: [
    'MainMenu',
    'Preferences',
    'Stats',
    'Torrents',
    'TorrentDetails'
  ],

  constructor: function() {
    var me = this;

    var _task = Ext.create('Ext.util.TaskRunner').newTask({
      run:      function() { me.fireEventArgs('update', [me]) },
      interval: 3000
    });
    me.__defineGetter__('task', function() { return _task; });

    me.callParent(arguments);
  },

  launch: function() {
    var me = this;

    me.remote         = Ext.create('TrWeb.Remote', { application: me });
    me.mainmenu       = Ext.widget('mainmenu');
    me.torrentgrid    = Ext.widget('torrentgrid');
    me.torrentdetails = Ext.widget('torrentdetails');
    me.statsbar       = Ext.widget('statsbar');
    me.statswin       = Ext.widget('statswin');

    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        layout: 'border',
        border: false,
        tbar: me.mainmenu,
        items: [
          {
            region: 'center',
            layout: 'fit',
            items: [me.torrentgrid]
          },
          {
            region: 'south',
            height: 220,
            minSize: 160,
            split: true,
            collapsible: true,
            layout: 'fit',
            header: false,
            items: [me.torrentdetails]
          }
        ],
        bbar: me.statsbar
      }]
    });

    me.on('start',  me.onStart);
    me.on('update', me.onUpdate);
    me.on('stop',   me.onStop);
    me.fireEventArgs('start', [me]);
  },

  onStart: function(me) {
    me.task.start();

    Ext.each(['MainMenu', 'Stats', 'Torrents'], function(controllerName) {
      var controller = me.getController(controllerName);
      controller.fireEventArgs('start', [controller]);
    });
  },

  onUpdate: function(me) {
    Ext.each(['Torrents', 'Stats', 'TorrentDetails'], function(controllerName) {
      var controller = me.getController(controllerName);
      controller.fireEventArgs('update', [controller]);
    });
  },

  onStop: function(me, error) {
    me.task.stop();

    Ext.each(['MainMenu', 'Stats', 'Torrents', 'TorrentDetails'], function(controllerName) {
      var controller = me.getController(controllerName);
      controller.fireEventArgs('stop', [controller]);
    });

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
