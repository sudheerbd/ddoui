Ext.define('DDO.view.finance.FinanceView', {
    extend: 'Ext.grid.Panel',
    requires:['DDO.view.finance.FinanceKarmaWindow',
      'DDO.view.finance.FinanceWindowController',
      'DDO.view.finance.FinanceViewModel'],
      alias: 'widget.financeview',

    width: '100%',
    height:500,
   padding: '5 0 0 5',
    margin: '27px 0px 0px 0px',
    cls: 'ddo-approval-cls',
    viewModel:{
     type:'financeviewmodel'
    },
    controller:'financewindowcontroller',
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.EMPTYTEXT,
    bind:{
      store:'{financereviewstore}'
    },
    scrollable:true,

     columns: [{
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.FORM,
        dataIndex: 'fromname',
        flex: 0.6,
        sortable: false,
        align: 'center',
        menuDisabled: true
    },
    {
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.SUBMITEDDATE,
        dataIndex: 'submiteddate',
        flex: 0.6,
        sortable: false,
        align: 'center',
        menuDisabled: true,
    },
     {
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMAUNITS,
        dataIndex: 'karmaunits',
        align: 'center',
        flex: 0.6,
        sortable: false,
        menuDisabled: true
    },
     {
        text:LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.DERIVEDPOINTS,
        dataIndex: 'derived_karma_points',
        align: 'center',
        flex: 0.5,
        sortable: false,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMACAT,
        dataIndex: 'karmacategory_name',
        flex: 0.5,
        align: 'center',
        sortable: false,
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMA,
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
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.MONATH,
        dataIndex: 'nominate_month',
        flex: 0.5,
        sortable: false,
        align: 'center',
        menuDisabled: true
    }, {
        text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.COMMENTS,
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
        items:[{
            iconCls:'x-fa fa-arrow-right',
            handler:'onAcceptBtnClick',
            cls:'accept-icon-cls'

        }]
    }
],
   
});