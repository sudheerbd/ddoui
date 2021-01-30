Ext.define('DDO.view.setup.employeesetup.WorkExpContainerModel',{
extend:'Ext.app.ViewModel',
alias:'viewmodel.workexpmodel',
data: {
    editing: true,
    nonPersonalAcccess: false
},
stores: {
    jobsdatastore: {
        type: 'jobsstore',
        autoLoad: false
    }
}
});