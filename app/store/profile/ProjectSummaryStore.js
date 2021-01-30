Ext.define('DDO.store.profile.ProjectSummaryStore', {
    extend: 'Ext.data.Store',

    alias: 'store.projectsummarystore',

    fields: [{
        name: 'project_name'
    }, {
        name: 'project_role_name'
    }, {
        name: 'allocpercent'
    },{
        name: 'startdate'
    },{
        name: 'enddate'
    }],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Api.URL.projectsummarystore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});