Ext.define('TrWeb.FloatField', {
  extend: 'Ext.form.field.Number',
  alias: 'widget.floatfield',

  valueToRaw: function(value) {
    var me = this, decimalSeparator = me.decimalSeparator;
    value = me.parseValue(value);
    value = me.fixPrecision(value);
    value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
    value = isNaN(value) ? '' : value.toFixed(me.decimalPrecision).replace('.', decimalSeparator);
    return value;
  }
});
