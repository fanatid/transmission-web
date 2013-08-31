(function() {
  var cellProgressBarRendererTpl = '\
<div class="x-progress x-progress-default x-border-box">\
  <div class="x-progress-bar x-progress-bar-default" style="width: {1}%"></div>\
  <div class="x-progress-text" style="width: 100%">{0}</div>\
  <div class="x-progress-text x-progress-text-back" style="width: 100%">{0}</div>\
</div>';

  Ext.define('TrWeb.Utils', {
    statics: {
      booleanRenderer: function(value) {
        return (value ? '✓' : '✕')
      },

      cellProgressBarRenderer: function(text, value) {
        return Ext.String.format(cellProgressBarRendererTpl, text, value);
      },

      sizeToHuman: function(value) {
        if (value < 1024)
          return (value).toFixed(2).toString() + ' B';
        value = value / 1024;
        if (value < 1024)
          return (value).toFixed(2).toString() + ' KiB';
        value = value / 1024;
        if (value < 1024)
          return (value).toFixed(2).toString() + ' MiB';
        value = value / 1024;
        return (value).toFixed(2).toString() + ' GiB';
      },

      speedToHuman: function(value) {
        return TrWeb.Utils.sizeToHuman(value) + '/s';
      }
    }
  });
})();
