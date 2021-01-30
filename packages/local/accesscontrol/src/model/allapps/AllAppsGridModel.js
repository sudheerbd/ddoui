Ext.define('ACCTRL.model.allapps.AllAppsGridModel', {
    extend: 'Ext.data.Model',

    fields: [
        'appid',
        'ownerid',
        'applogopath', 
        'appname', 
        'appOwner', 
        'activeusers', 
        'accessallowedusers', 
        'description',
        'statusId',
        'status',
        'created'
    ]
});
