Ext.define('DDO.view.employeereportview.EmployeeReportFormFilter', {
    extend: 'Ext.window.Window',
    cls: 'employeereportform-cls',
    xtype:'window-form',
    requires: [
        // 'DDO.ux.window.FormPanel',
        'DDO.view.employeereportview.EmployeeReporFormController',
        'DDO.view.employeereportview.EmployeeReportFormViewModel'
    ],
    controller: 'employeereportformcontroller',
    title: 'Choose Fields To Filter Results',
    viewModel: {
        type: 'employeereportformviewmodel'
    },
    bodyPadding: "5 5 0",
    width:450,
    height:250,
    // height:300,

  layout:'fit',

    items: [{
     xtype:'container',
     layout:'hbox',
     cls:'containerone-cls',
     items:[
        {
            xtype : 'form',
            items: [{
                xtype: 'datefield',
                emptyText:'From Joining Date',
                value:'datefield',
                name:'from_joining_date'
            }, {
                xtype: 'combobox',
                emptyText:'Designation',
                store: 'setup.SetupDesignationComboStore',
                name:'designation',
                typeAhead: true,
                displayField: 'name',
                valueField: 'ddo_designation_id',
            },{
                xtype: 'combobox',
                name:'isbillable',
                typeAhead: true,
                emptyText:'is Billable',
                bind:{
                    store: '{jobTypeStore}',
                },
                valueField: 'name',
                displayField: 'name',
            },{
                xtype: 'combobox',
                name:'skills',
                emptyText:'Primary Skills',
                typeAhead: true,
                store: 'skillslist.ProfileSkillsComboStore',
                valueField: 'ddo_skills_id',
                displayField: 'name',
            }]
        },{
            xtype:'form',
            reference:'downfilterform',
            items: [{
                xtype: 'datefield',
                emptyText:'To Joining Date',
                name:'to_joining_date'
            }, {
                xtype: 'combobox',
                emptyText:'Reporting To',
                name:'reportingto',
                store: 'setup.employeesetup.ReportingStore',
                valueField: 'empid',
                typeAhead: true,
                displayField: 'empname'
            },{
                xtype: 'combobox',
                emptyText:'status',
                typeAhead: true,
                store: 'setup.employeesetup.StatusStore',
                valueField: 'name',
                name:'status',
                displayField: 'name'
            },{
                xtype: 'combobox',
                emptyText:'Technologies',
                typeAhead: true,
                store: 'skillslist.ProfileSkillsComboStore',
                displayField:'name',
                name:'technologies'
            }]
        }]
    },{
        xtype:'container',
        layout:'vbox',
        align:'center',
        cls:'containertwo-cls',
        defaults:{
            width : 350,
            margin: '0 10 0 10',
            // padding: 10,
            },
        items:[{
                xtype: 'multislider',
                reference:'experienceSlider',
                values: [0,30],
                label:'Experience',
                minValue:0,
                maxValue: 30,
                increment :2,
                cls:'experienceslider-cls'
        },{
            xtype:'label',
            text:'Experience(IN YEARS)',
            cls:'experience-cls'
        },{
            xtype: 'component',
            autoEl: {tag: 'hr'},
            cls:'hr-cls'
        }]
    }],
    bbar:[{
     xtype:'button',
     text: 'Reset',
     cls :'employeeresetbtn-cls',
     iconCls : 'resetbtn-cls',
     handler:'onResetFilters'
    },{
        xtype:'tbfill'
    },{
        xtype:'button',
        text: 'Apply',
        cls:'employeeapplybtn-cls',
        iconCls:'applybtn-cls',
        listeners:{
            click : 'onApplyBtn',        
        }
    }],
    // buttons: [{
    //     text: 'Reset',
    //     cls :'employeeresetbtn-cls',
    //     iconCls : 'resetbtn-cls',
    // }, {
    //     xtype:'tbfill'
    // },{
    //     text: 'Apply',
    //     cls:'employeeapplybtn-cls',
    //     iconCls:'applybtn-cls',
    //     listeners:{
    //         click : 'onApplyBtn',        
    //     }
    // }]
  
});