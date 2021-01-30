Ext.define('DDO.view.employeereportview.EmployeeCheckBox', {
    extend: 'Ext.window.Window',
    cls: 'employeerecheckbox-cls',
    alias:'widget.employeecheckbox',
    requires: [
        // 'DDO.ux.window.FormPanel',
        'DDO.view.employeereportview.EmployeeReporFormController',
        'DDO.util.CheckBoxColumns'
        // 'DDO.view.employeereportview.EmployeeReportFormViewModel'
    ],
    controller: 'employeereportformcontroller',
    title: 'Choose Fields To Filter Results',
    // viewModel: {
    //     type: 'employeereportformviewmodel'
    // },
    bodyPadding: "5 5 0",
    width:280,
    height:300,
    // height:300,

    layout: 'hbox',
    scrollable:true,

    items: [{
        xtype : 'form',
        reference:'checkBoxform',
        items: [{
            xtype: 'checkboxgroup',
            // Arrange checkboxes into two columns, distributed vertically
            columns: 1,
            // vertical: true,
            items: [
                { boxLabel: 'Designation', name: 'designation', inputValue: '2',checked: CheckBoxValues.columnValues.designation },
                { boxLabel: 'Primary Skills', name: 'primaryskills', inputValue: '3', checked: CheckBoxValues.columnValues.primaryskills},
                { boxLabel: 'E-mail', name: 'email', inputValue: '4',checked:  CheckBoxValues.columnValues.email },
                { boxLabel: 'Phone Number', name: 'phoneno', inputValue: '5' ,checked:  CheckBoxValues.columnValues.phoneno},
                { boxLabel: 'Reporintg To', name: 'reportingto', inputValue: '6' ,checked:  CheckBoxValues.columnValues.reportingto},
                { boxLabel: 'Status', name: 'status', inputValue: '7' ,checked:  CheckBoxValues.columnValues.status},
                { boxLabel: 'isBillable', name: 'isbillable', inputValue: '8',checked:  CheckBoxValues.columnValues.isbillable },
                { boxLabel: 'Technologies', name: 'technologies', inputValue: '9',checked:  CheckBoxValues.columnValues.technologies },
                { boxLabel: 'Joining Date', name: 'joiningdate', inputValue: '10' ,checked:  CheckBoxValues.columnValues.joiningdate},
                { boxLabel: 'Experience', name: 'experience', inputValue: '11',checked:  CheckBoxValues.columnValues.experience}
            ]
        },{
            xtype: 'component',
            autoEl: {tag: 'hr'}
        }],
        bbar:[{
            xtype:'button',
            text:'show column',
            reference:'showColumn',
            cls:'showcolumn-cls',
            iconCls:'showiconcolumn-cls',
            handler:'onColumnApply'
        }]  
    }]

});