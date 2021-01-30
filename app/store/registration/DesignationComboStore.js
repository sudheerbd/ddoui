Ext.define('DDO.store.registration.DesignationComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.designationcombostore',
    
    requires: [
       'DDO.model.registration.DesignationComboModel'
    ],
    model:'DDO.model.registration.DesignationComboModel',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url:'resources/data/registration/DesignationComboData.json',
        extraParams: {
            all: true
        },
         reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});