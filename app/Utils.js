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

      percentDoneRenderer: function(value) {
        value = (value*100).toFixed(2);
        var text = value + ' %';

        return TrWeb.Utils.cellProgressBarRenderer(text, value);
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
      },

      calcRatio: function(first, second, fixedSize) {
        var ratio = first/second;
        return (ratio === Infinity ? '∞' : ratio.toFixed(fixedSize ? fixedSize : 2))
      },

      secondsToHuman: function(seconds) {
        if (seconds < 61)
          return seconds + ' seconds';

        var minutes = Math.floor(seconds / 60);
        if (minutes < 61)
          return minutes + ' minutes, ' + (seconds % 60) + ' seconds';

        var hours = Math.floor(minutes / 60);
        if (hours < 24)
          return hours + ' hours, ' + (minutes % 60) + ' minutes';

        var days = Math.floor(hours / 24);
        if (days < 30)
          return days + ' days, ' + (hours % 24) + ' hours';

        return days + ' days'
      }
    }
  });
})();
