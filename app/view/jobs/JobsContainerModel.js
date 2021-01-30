Ext.define('DDO.view.jobs.JobsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobscontainer',

    data: {
        editing: true,
        nonPersonalAcccess: false
    },

    // formulas: {
    //     editable: function(get) {
    //         var nonPersonal = get('nonPersonalAcccess'),
    //             editing = get('editing');
            
    //         // if nonPersonal access then the profile page is not
    //         return (nonPersonal) ? false : !editing;
    //     }
    // },

    stores: {
        jobsdatastore: {
            type: 'jobsstore',
            autoLoad: false
        }
    }

});
