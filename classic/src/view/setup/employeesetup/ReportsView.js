/**
 * The file ReportsView is responsible for the view of the Reports view in the 'DDO.view.setup.employeesetup.EmployeeView'.
 * @extends {Ext.panel.Panel}
 * @alias 'widget.reportsview'.
 * ViewModel : 'DDO.model.setup.employeesetup.ReportViewModel'
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeTabController'. 
 */
Ext.define('DDO.view.setup.employeesetup.ReportsView',{
	extend:'Ext.panel.Panel',
    xtype:'reportsview',
    requires:[
        'DDO.view.setup.employeesetup.ReportsGrid',
        'DDO.model.setup.employeesetup.ReportViewModel'
    ],
    viewModel : {
        type : 'reportviewmodel'
    },
    cls : 'reportsview',
    layout:'fit',
	dockedItems : [{
        xtype:'form',
        reference : 'reportsForm',
        layout:{
            type:'hbox'
        },
        items:[{
            xtype:'tbfill'
        },{
        xtype: 'combobox',
        cls: 'reportview-filters',
        name:'empstatus',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.STATUS,
        reference: 'groupby',
        width: Constants.ViewportWidth*0.11,
        allowBlank : false,
        valueField: 'name',
        displayField: 'name',
        editable: false,
        value : 'All',
        enableKeyEvents : true,
        bind: {
            store: '{workStatusStore}'
        }
        
    },{
        xtype: 'daterangefield',
        fieldLabel: '',
        width: '29%',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.DATERANGE,
        margin: 0,
        padding: '10 0 0 0',
        maxDate:new Date(),
        name : 'daterange',
        cls : 'reportview-filters daterange-filter',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -3,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listeners: {
            change: 'onDateRangeChange'
        }
    },{
        xtype : 'textfield',
        name : 'grey_hr_id',
        emptyText : LabelsTitles.EMPSETUP.EMPTAB.REPORTS.GREYTHRID,
        cls : 'reportview-filters',
        width:Constants.ViewportWidth*0.11,        
        allowBlank : false,
        enableKeyEvents : true      
    },{
        xtype: 'button',
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.APPLY,
        name : 'apply',
        margin:"0 5",
        reference:"applybtn",
        listeners: {
            click: 'onApplyBtnClick'
        }
    },{
        xtype: 'button',
        text:LabelsTitles.EMPSETUP.EMPTAB.REPORTS.CLEAR,
        reference:"clearbtn",
        margin:"0 5",
        listeners: {
            click: 'onClearBtnClick'
        }
    },{
        xtype: 'button',
        iconCls: 'x-fa fa-file-excel-o',
        ui: 'plain',
        tooltip: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.EXCELDOWNLOAD,
        margin:'5px',
        cls:'excelbutton-cls',
        listeners: {
            click: 'onDownloadBtnClick'
        }
    }]
    }],
    items:[{
        xtype: 'reportsgrid',
        reference: 'reportsgrid',
        bind: {
          store : '{reports}'
        }
    }]
});