/**
 * This file is responsible for the FinancialYearStore which is used in the AllocationSheetContainer.
 */
Ext.define('DDO.store.setup.financialyear.FinancialYearStore', {
    extend: 'Ext.data.Store',

    alias: 'store.financialyearstore',

    requires: [
        'DDO.model.setup.financialyear.FinancialYearModel'
    ],

    model: 'DDO.model.setup.financialyear.FinancialYearModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.financialyear.READ,
            update: Api.URL.financialyear.UPDATE,
            create: Api.URL.financialyear.CREATE,
            delete: Api.URL.financialyear.DELETE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        }
    },
    filters: [{
        property: 'ddo_dup_financialyear_id',
        value: true
    }]

});

