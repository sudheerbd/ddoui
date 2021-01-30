Ext.define('DDO.store.loginlanding.Login',{
    extend:'Ext.data.Store',
    requires:[
	   'DDO.model.loginlanding.Login'
    ],
    alias:'store.login',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'login',
            model: 'DDO.model.loginlanding.Login',
            proxy: {
                type: 'ajax',
                url: Api.URL.login.READ,

                 actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty : "data"
                }
            },
            listeners: {
                beforeload: function(store, operation, options) {
                    store.getProxy().extraParams = {
                        "email" : operation.email
                    };
                }
            }
        }, cfg)]);
    }
});


