Ext.define('DDO.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',
    storeId:'Personnel',
    fields: [
        'name', 'email', 'phone'
    ],

    data: { items: [
        { name: '', email: "Jon Pearl", phone: "18 hr" },
        { name: '',     email: "Christine Pizzo",  phone: "12 hr" },
        { name: '',   email: "Alex Leprade",    phone: "1 day" },
        { name: '',   email: "Hannah Cochran",    phone: "1 day" },
        { name: '',   email: "Oren Satken",    phone: "1 day" },
        { name: '',   email: "Deanna Morgan",    phone: "1 day" },
        { name: '',     email: "Luke Skywalker",        phone: "2 hr" }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
