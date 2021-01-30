Ext.define('DDO.store.projects.MOMGridStore', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.momgridstore',

    requires: [
        'DDO.model.projects.MOMGridModel'
    ],

    model: 'DDO.model.projects.MOMGridModel',

    //autoLoad: true,
    autoLoad:false,
    data : [{
      "sr_no":"",
      "assigned_to":"",
      "action_item":"",
      "due_date":"",
      "status":""
    }]
    /*proxy: {
        type: 'ajax',
        url: 'resources/data/momgrid.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }*/
});