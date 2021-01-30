Ext.define('DDO.view.profile.details.AddJobsFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.addjobsformviewmodel',

    data: {
        jobsFormTitle: null
    },

    stores: {
        monthstore: {
            type: 'monthstore'
        }
    }
});