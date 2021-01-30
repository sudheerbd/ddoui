Ext.define('DDO.view.profile.provitiontocnfm.ProbationToCnfmViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.probationviewmodel',
    requires: ['DDO.model.projects.ProjectDashboardModel'],
    stores:{
        projectnamestore:{
            model : 'DDO.model.projects.ProjectDashboardModel',
            autoLoad : true,
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
        }
    }
})