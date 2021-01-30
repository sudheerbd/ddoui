Ext.define('DDO.view.dashboardview.KarmaScoreDashboardView', {
    extend: 'Ext.container.Container',

    xtype: 'karmadashboard',

    // cls: 'walletview-cls',

    requires: [
        'DDO.view.dashboardview.KarmaDashboard',
       'DDO.view.dashboardview.KarmaScoreDashboardViewModel',
         'DDO.view.dashboardview.KarmaScoreDashboardController',
        'DDO.view.karmasetup.toolbar.RuleToolbar'
       ],

       viewModel: {
        type: "karmascoredashboardviewmodel",
      },
      controller: "karmascoredashboardcontroller",
      padding:'36px 0px 0px 0px',
    // initComponent: function() {
    //     this.callParent(arguments);
    //     var walletEmpComboStore = Ext.getStore('karmasetup.wallet.EmployeeComboStore');
    //     if (!walletEmpComboStore.isLoaded()) {
    //         walletEmpComboStore.load();
    //     }
    // },
    items: [{
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype:"button",
            iconCls: "x-fa fa-refresh",
            handler: "onRefreshBtntClick",
            width: '5%',
            // height: '20%',
            margin: '0px 0px 0px 20px',
            tooltip : 'Refresh Button'
            
        },{
            xtype: 'tbspacer',
            width: Constants.ViewportWidth * 0.015,
        },{
            xtype: 'combobox',
            name: 'fimancialYear',
            cls: 'karmapoints-num-cls',
            emptyText: 'Financial Year',
            reference: 'financilaYearRef',
            forceSelection: true,
            displayField: 'name',
            valueField: 'ddo_fyear_id',
            width : 200,
            store: 'setup.financialyear.FinancialYearStore',
            // store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
            listeners : {
                select : 'onChangeFinancialYear'
            }
        }]
    // },{
    //     xtype:"button",
    //     iconCls: "x-fa fa-refresh",
    //     handler: "onRefreshBtntClick",
    //     width: '5%',
    //     height: '20%',
    //     margin: '0px 0px 0px 20px',
    //     tooltip : 'Refresh Button'
        
    // },{
    //     xtype: 'combobox',
    //     name: 'frequency',
    //     cls: 'karmapoints-num-cls',
    //     emptyText: 'Financial Year',
    //     forceSelection: true,
    //     displayField: 'name',
    //     valueField: 'ddo_fyear_id',
    //     width : 120,
    //     store: 'setup.financialyear.FinancialYearStore',
    //     // store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
    //     listeners : {
    //         change : 'onComboCheckFre'
    //     }
    },{
        xtype:'karmadashboardview',
        reference: 'karmaDashboardRef',
        height:' 80%'
    }]
});