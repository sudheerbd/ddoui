Ext.define('DDO.model.profile.ProjectHistoryModel', {
    extend: 'Ext.data.Model',
    xtype: 'projecthistorymodel',
    fields: [
        {
            name: 'startdate',
        },{
            name: 'enddate'
        },{
            name: 'projectname'
        },{
            name: 'empname',
        },{
            name: 'reqtoname'
        }
    ]
});