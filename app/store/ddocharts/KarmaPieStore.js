Ext.define('DDO.store.ddocharts.KarmaPieStore', {
    extend: 'Ext.data.Store',
    alias: 'store.karmapiestore',
    
    requires: [
        'DDO.model.ddocharts.KarmaPieModel'
    ],
    
    model: 'DDO.model.ddocharts.KarmaPieModel',
    //storeId: 'karmapiestore',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: Api.URL.karmapiestore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
    /*filters: [{
        property: 'empname',
        value: true
        }       
    ]*/

});