Ext.define('ACCTRL.view.AccessAppHeader', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.accessappheader',
    cls: 'access-app-header-cls',
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('karmasetup.wallet.EmployeeComboStore');

        if (!store.isLoaded()) {
            store.load();
        }
    },
    items:[{
        xtype: 'combobox',
        name: 'searchCombo',
        cls: 'all-apps-search-field-cls',
        //cls: 'all-apps-tag-field-cls',
        width: '40%',
        store: 'karmasetup.wallet.EmployeeComboStore',
        emptyText: 'Search People',
        displayField: 'empname',
        valueField: 'empid',
        hideTrigger: true,
        //multiSelect: true,
        queryMode: 'local',
        forceSelection: true,
        filterPickList: true,
        listeners: {
            change: 'onSearchPeopleTagSelect',
            beforequery: 'onPeopleTagSearch'
        }
    }, {
        xtype: 'textfield',
        name: 'searchText',
        cls: 'all-apps-search-field-cls',
        hidden: true,
        width: '40%',
        emptyText: 'Search Apps',
        listeners: {
            change: 'onSearchApps'
        }
    }, {
        xtype: 'segmentedbutton',
        allowToggle : false,
        items: [{
            xtype: 'button',
            name: 'searchPeople',
            cls: 'allapps-app-pressed-btn-cls',
            iconCls: 'allapps-people-search-btn-icon',
            handler: 'onSearchPeopleFliter'
        }, {
            xtype: 'button',
            name: 'searchApps',
            cls: 'allapps-app-search-btn-cls',
            iconCls: 'allapps-app-search-btn-icon',
            handler: 'onSearchAppsFliter'
        }]
    }, {
        xtype: 'button',
        cls: 'allapps-search-icon',
        width: 6,
        height: 6
    }, '->']
});