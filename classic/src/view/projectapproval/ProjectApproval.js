/**
 *   This file  is responsible for ProjectApproval.
 *   @extends {Ext.grid.Panel}
 *   @alias widget.projectapproval
 *   ViewModel :'DDO.view.projectapproval.ProjectApprovalViewModel',
 *   ViewController :'DDO.view.projectapproval.ProjectApprovalController'.
 */
Ext.define('DDO.view.projectapproval.ProjectApproval', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.button.Button',
        'DDO.view.projectapproval.ProjectApprovalController',
        'DDO.view.projectapproval.ProjectApprovalViewModel',
        'DDO.view.projectapproval.ProjectApprovalRejectReasonWindow'
    ],
    initComponent:function(){
       this.callParent(arguments);
       var projectApprovalVM = this.getViewModel();
       var projectApprovalStore = projectApprovalVM.getStore('projectapprovalstore');
       if(!projectApprovalStore.isLoaded()){
           projectApprovalStore.load();
       }
    },
    viewModel: {
        type: 'projectapprovalviewmodel'
    },
    alias: 'widget.projectapproval',
    controller: 'projectapprovalcontroller',
    reference: 'projectapprovalview',
    bind : {
       store :'{projectapprovalstore}' 
    },
    padding: '5 0 0 5',
    margin: '27px 0px 0px 0px',
    cls: 'projectapproval-cls',
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.NODATAFOUND,
    columns: [{
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.NAME,
        dataIndex: 'employeename',
        flex: 1,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.EMPREQ,
        dataIndex: 'reportingmanagername',
        flex: 1,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.ALLOCATIONPER,
        dataIndex: 'allocpercent',
        flex: 1,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.PROJECT,
        dataIndex: 'projectname',
        flex: 1,
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.FORMDATE,
        dataIndex: 'startdate',
        flex: 1,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.TODATE,
        dataIndex: 'enddate',
        flex: 1,
        menuDisabled: true
    },
    //  {
    //     text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.APPROVE,
    //     flex: 1,
    //     xtype: 'widgetcolumn',
    //     cls: 'approve-header-cls',
    //     menuDisabled: true,
    //     widget: {
    //         xtype: 'button',
    //         text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.ACCEPT,
    //         cls: 'acceptbutton',
    //         handler: 'onAcceptBtnClick'
    //         // iconCls:'x-fa fa-check',
    //         // handler:'onAcceptBtnClick',
    //         // cls:'accept-icon-cls',
    //     },
    //     renderer: function (value, meta, record) {
    //         meta.tdCls += 'approve-cell-css';
    //         return value;
    //     }
    // }, {
    //     text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.REJECT,
    //     flex: 1,
    //     xtype: 'widgetcolumn',
    //     cls: 'approve-header-cls',
    //     menuDisabled: true,
    //     widget: {
    //         xtype: 'button',
    //         text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.REJECT,
    //         cls: 'rejectbutton',
    //         handler: 'onRejectBtnClick'
    //     //  iconCls:'x-fa fa-times',
    //     // handler:'onRejectBtnClick',
    //     // cls: 'reject-icon-cls',
    //     },
    //     renderer: function (value, meta, record) {
    //         meta.tdCls += 'approve-cell-css';
    //         return value;
    //     }
    // }
    {
        xtype:'actioncolumn',
        header:'Actions',
        reference:'action',
        flex: 1,
        align: 'center',
        sortable:false,
        menuDisabled:true,
        layout:'hbox',
        align:'center',
        items:[{
            iconCls:'x-fa fa-check',
            handler:'onAcceptBtnClick',
            cls:'accept-icon-cls',
             renderer: function (value, meta, record) {
            meta.tdCls += 'approve-cell-css';
            return value;
        }
        },
    {
        xtype:'tbspacer'
    },{
        iconCls:'x-fa fa-times',
        handler:'onRejectBtnClick',
        cls: 'reject-icon-cls',
        renderer: function (value, meta, record) {
            meta.tdCls += 'approve-cell-css';
            return value;
        }
    }]
    }
],
});