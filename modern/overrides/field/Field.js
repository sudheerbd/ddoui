Ext.define('DDO.overrides.field.Field', {
    override: 'Ext.field.Field',

    initialize: function() {
        var field = this,
            requiredXtypes = [
                'textfield',
                'numberfield',                
                'textareafield',
                'selectfield',
                'datepickerfield'
            ],
            onBlur = function() {
                if (field.getRequired && field.getRequired() &&
                    (field.getCls().indexOf('ddo-field-starred') === -1)) {                    
                    if((field.xtype === 'selectfield' || field.xtype === 'datepickerfield' || field.xtype === 'textfield' || field.xtype === 'textareafield' || field.xtype === 'numberfield') && !field.getValue()) {
                        field.addCls('ddo-field-starred');
                    } else {
                        field.removeCls('ddo-field-starred');
                    }
                }
            },
            onChange = function() {
                if (field.getRequired && field.getRequired() &&
                    (field.getCls().indexOf('ddo-field-starred') !== -1)) {
                    field.removeCls('ddo-field-starred');
                }
            };
                    
        if (requiredXtypes.indexOf(field.xtype) !== -1) {
            if(field.xtype === 'selectfield' || field.xtype == 'datepickerfield') {
                field.on('focus', onBlur);
                field.on('change', onChange);                
            } else {
                field.on('blur', onBlur);
            }
        }


        field.callParent();
    }
});
