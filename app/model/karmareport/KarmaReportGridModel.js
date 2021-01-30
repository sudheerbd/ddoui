Ext.define('DDO.model.karmareport.KarmaReportGridModel', {
    extend: 'Ext.data.Model',
    alias: 'model.karmareportgridmodel',
    fields:[
    'karma_type','ddo_employee_id','karma_name','potential_per_month',
    'actual_karma','employeename','designation_name',
    'ddo_nomination_date',
    'supervisor_name'
       
    ]


});