Ext.define('DDO.view.hr.HrView', {
    extend: 'Ext.grid.Panel',
    requires:['DDO.view.hr.HrKarmaWindow',
        'DDO.view.hr.HrWindowController',
        'DDO.view.hr.HrViewModel'],
    alias: 'widget.hrview',
    width:'100%',
    height:500,
    padding: '5 0 0 5',
    margin: '27px 0px 0px 0px',
    cls: 'ddo-approval-cls',
    viewModel:{
      type:'hrviewmodel'
    },
    controller:'hrwindowcontroller',
    bind:{
        store:'{hrreviewstore}'
      },
      scrollable:true,
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.HR.EMPTYTEXT,
    columns: [{
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.FORM,
        dataIndex: 'fromname',
        flex: 0.6,
        sortable: false,
        align: 'center',
        menuDisabled: true
    },
    {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.SUBMITEDDATE,
        dataIndex: 'submiteddate',
        flex: 0.6,
        sortable: false,
        align: 'center',
        menuDisabled: true,
    },
     {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMAUNITS,
        dataIndex: 'karmaunits',
        align: 'center',
        flex: 0.6,
        sortable: false,
        menuDisabled: true
    },
     {
        text:LabelsTitles.EXECUTIVEDASHBOARD.HR.DERIVEDPOINTS,
        dataIndex: 'derived_karma_points',
        align: 'center',
        flex: 0.5,
        sortable: false,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMACAT,
        dataIndex: 'karmacategory_name',
        flex: 0.5,
        align: 'center',
        sortable: false,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMA,
        dataIndex: 'karma_name',
        flex: 0.6,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        renderer:function(data,record){
            if(data){
                var limitedChar=  data.substr(0, 14);
                var  elipsis="...";
                return limitedChar + elipsis;
            } else{
                return null;
            }
        }
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.MONATH,
        dataIndex: 'nominate_month',
        flex: 0.5,
        sortable: false,
        align: 'center',
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.HR.COMMENTS,
        dataIndex: 'comments',
        align: 'center',
        flex: 1,
        sortable: false,
        menuDisabled: true,
        renderer:function(data,record){
          //  debugger;
            if(data){
                var limitedChar=  data.substr(0, 14);
                var  elipsis="...";
                return limitedChar + elipsis;
            } else{
                return null;
            }
        }
    },
     
    {
        xtype:'actioncolumn',
        header:'Review Karma Points',
        reference:'action',
        flex: 0.7,
        align: 'center',
        sortable:false,
        menuDisabled:true,
        layout:'hbox',
        align:'center',
        items:[
            {
            iconCls:'x-fa fa-arrow-right',
            handler:'onAcceptBtnClick',
            cls:'accept-icon-cls'

        },
]
    }
],
});