Ext.define('DDO.store.karmasetup.wallet.EmployeeComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.employeecombostore',

    requires: [
       'DDO.model.karmasetup.wallet.EmployeeCombo'
    ],

    model: 'DDO.model.karmasetup.wallet.EmployeeCombo',

    autoLoad: false,

    method: 'GET',
    
    proxy: {
         type: 'ajax',
         url: Api.URL.employeecombostore.READ,
      
      reader: {
            type: 'json',
            rootProperty: "data"
        }
    }

});