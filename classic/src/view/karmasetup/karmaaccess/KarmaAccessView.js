/**
 * The file KarmaAccessView is the view file for karma access card in DDO.view.karmasetup.KarmaDataviewCards.
 * @extends {Ext.container.Container}
 * @alias 'widget.karmaaccessview'.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmaaccessview',
    requires: [
        'DDO.view.karmasetup.toolbar.RuleToolbar',
        'DDO.view.karmasetup.karmaaccess.KarmaAccessViewController',
        'DDO.view.karmasetup.karmaaccess.KarmaAccessViewModel',
        'DDO.view.karmasetup.karmaaccess.KarmaAccessWindowView'
    ],
    controller: 'karmaaccess',
    viewModel: {
        type: 'karmaaccess'
    },
    initComponent: function() {
        this.callParent(arguments);
        var KarmaAccessStore = this.getViewModel().getStore('karmaaccessstore');
        if (!KarmaAccessStore.isLoaded()) {
            KarmaAccessStore.load();
        }
    },
    items: [{
        xtype: 'ruletoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height:Constants.ViewportHeight*0.11
    }, {
        xtype: 'grid',
        cls: 'ddo-grid',
        reference : 'gridview',
        bind:{
            store :'{karmaaccessstore}'
        },
        columns: [
            { 
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.KARMA,
                dataIndex: 'karmaname',
                flex: 1 
            },
            { 
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.ROLES,
                dataIndex: 'rolename',
                flex: 1 
            },
            { 
                text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.EMPLOYEES,
                dataIndex: 'employeename',
                flex: 1 
            }, {
                xtype: 'actioncolumn',
                width:Constants.ViewportWidth*0.037,
                align: 'center',
                items: [{
                    iconCls: 'delete-plus',
                    tooltip:LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMAACCESS.DELTOOLTIP,
                    handler: 'deleteGridrow' 
                }]
            }
        ],
        listeners: {
            itemdblclick: 'itemClick'
        }
    }]
});
