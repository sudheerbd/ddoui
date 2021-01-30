Ext.define('DDO.overrides.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    year: function (value, field) {
        var currentYear = Ext.Date.format(new Date(), 'Y');
        if (value <= currentYear) {
            return true;
        } else {
            return false;
        }
    },
    yearText: 'Year cannot be greater than the current year' //error message
});