Ext.define('DDO.store.projects.ProjectDashboardStore', {
    extend: 'Ext.data.Store',

    alias: 'store.projectdashboardstore',

    requires: [
        'DDO.model.projects.ProjectDashboardModel'
    ],

    model: 'DDO.model.projects.ProjectDashboardModel',

    proxy: {
        type: 'ajax',
        url: Api.URL.projectdashboardstore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    sorters: [{
        property: 'forcast_hrs',
        direction: 'DESC'
    }, {
        property: 'people_count',
        direction: 'DESC'
    }]
});