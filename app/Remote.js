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

    this.application.emit('stop', error);
  },

  sendRequest: function(data, callback) {
    var _this = this;

    Ext.Ajax.request({
      url: '../rpc',
      method: 'POST',
      success: callback,
      failure: function(response, options) { _this.ajaxError(response, options) },
      headers: { 'X-Transmission-Session-Id': this.token },
      jsonData: data,
      timeout: 2500
    });
  },

  // 3.3
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

  // 4.7
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
