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
    'Ext.window.MessageBox',
    'Ext.util.Point',
    'TrWeb.Const',
    'TrWeb.Remote'
  ],

  controllers: [
    'MainMenu',
    'Torrents'
  ],

  constructor: function() {
    this.events = {};

    var _task = Ext.create('Ext.util.TaskRunner').newTask({
      run: function() {
        this.emit('update');
      },
      interval: 5000,
      scope: this
    });
    this.__defineGetter__('task', function() {
      return _task;
    });

    this.callParent(arguments);
  },

  launch: function() {
    var remote = Ext.create('TrWeb.Remote', { application: this });
    this.getController('Torrents').remote = remote;

    Ext.create('Ext.container.Viewport', {
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        { xtype: 'mainmenu' },
        { xtype: 'torrentslist', flex: 1 }
      ]
    });

    this.addListener('stop',  this.onStop,  this);
    this.addListener('start', this.onStart, this);
    this.emit('start');
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
  },

  addListener: function(event, listener, context) {
    if (!(event in this.events))
      this.events[event] = new Array();

    this.events[event].push({ listener: listener, context: context });
  },

  emit: function(event) {
    var events = this.events[event];
    var args = Array.prototype.slice.call(arguments, 1);
    for (i in events)
      events[i].listener.apply(events[i].context, args);
  }
});
