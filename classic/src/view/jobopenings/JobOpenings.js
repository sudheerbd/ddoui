Ext.define('DDO.view.jobopenings.JobOpenings', {
    extend: 'Ext.grid.Panel',

    requires: [
        'DDO.store.jobopenings.JobOpenings',
        'DDO.view.jobopenings.JobOpeningsWindow',

        'DDO.view.jobopenings.JobOpeningsController',
        'DDO.view.jobopenings.JobOpeningsViewModel'
    ],

    alias: 'widget.jobopenings',

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('jobopenings.JobOpenings');

        if (!store.isLoaded()) {
            store.load();
        }
    },

    controller: 'jobopeningscontroller',

    viewModel: {
        type: 'jobopeningsviewmodel'
    },

    store:'jobopenings.JobOpenings',

    cls: 'ddo-dashboard-grid ddo-jobopenings-grid',

    title: 'Job Profile',

    columns: [{
        text: 'Career Level',
        dataIndex: 'carrer_level',
        flex: 1
    }, {
        text: 'Job Code',
        dataIndex: 'jobcode',
        flex: 1
    }, {
        text: 'Open Positions',
        dataIndex: 'numberofopenpositions',
        flex: 1
    }, {
        text: 'Effective From Date',
        dataIndex: 'effective_fromdate',
        flex: 1
    }, {
        text: 'Expiration Date',
        dataIndex: 'expiration_date',
        flex: 1
    }],

    listeners: {
        rowdblclick: 'jobOpeningsWindow'
    }
});