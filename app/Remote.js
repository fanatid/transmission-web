Ext.define('TrWeb.Remote', {
  constructor: function(args) {
    this.__defineGetter__('application', function() {
      return args.application;
    });

    var _token;
    this.__defineGetter__('token', function() {
      return _token;
    });
    this.__defineSetter__('token', function(token) {
        _token = token;
    });

    return this;
  },

  ajaxError: function(response, options) {
    if (response.status === 409) {
      this.token = response.getResponseHeader('X-Transmission-Session-Id');
      options.headers['X-Transmission-Session-Id'] = this.token;
      Ext.Ajax.request(options);
      return;
    }

    var error = response.responseText
          ? response.responseText.trim().replace(/(<([^>]+)>)/ig,"")
          : "";
    if (!error.length)
      error = 'Server not responding';

    this.application.fireEvent('stop', error);
  },

  sendRequest: function(data, callback, context) {
    var _this = this;

    Ext.Ajax.request({
      url: '../rpc',
      method: 'POST',
      success: callback,
      scope: context,
      failure: function(response, options) { _this.ajaxError(response, options) },
      headers: { 'X-Transmission-Session-Id': this.token },
      jsonData: data,
      timeout: 1500
    });
  },

  // 3.1 Torrent Action Requests
  actionRequests: function(method, ids, args, callback, context) {
    if (!args) args = {};
    args['ids'] = ids;
    var data = {
      method: method,
      arguments: args
    };
    this.sendRequest(data, callback, context);
  },

  torrentStart: function(ids, callback, context) {
    this.actionRequests('torrent-start', ids, {}, callback, context);
  },

  torrentStartNow: function(ids, callback, context) {
    this.actionRequests('torrent-start-now', ids, {}, callback, context);
  },

  torrentStop: function(ids, callback, context) {
    this.actionRequests('torrent-stop', ids, {}, callback, context);
  },

  torrentVerify: function(ids, callback, context) {
    this.actionRequests('torrent-verify', ids, {}, callback, context);
  },

  // 3.3 Torrent Accessors
  torrentGet: function(ids, fields, callback, context) {
    var data = {
      method: 'torrent-get',
      arguments: { 'fields': fields }
    };
    if (ids)
      data.arguments.ids = ids;

    this.sendRequest(data, function(response) {
      var args = JSON.parse(response.responseText)['arguments'];
      callback.call(context, args['torrents'], args['removed']);
    });
  },

  // 4.2 Session Statistics
  sessionStats: function(callback, context) {
    var data = { method: 'session-stats' };
    this.sendRequest(data, function(response) {
      var args = JSON.parse(response.responseText)['arguments'];
      callback.call(context, args);
    });
  },

  // 4.7 Free Space
  freeSpace: function(path, callback, context) {
    var data = {
      method: 'free-space',
      arguments: { path: path }
    };

    this.sendRequest(data, function(response) {
      var args = JSON.parse(response.responseText)['arguments'];
      callback.call(context, args['path'], args['size-bytes']);
    });
  }
});
