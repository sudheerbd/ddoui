Ext.define('ACCTRL.view.allapps.AllAppsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allappsgrid',
    requires: [
        'ACCTRL.store.allapps.AllAppsGridStore',
        'ACCTRL.view.allapps.AllAppsGridController'
    ],
    controller: 'allappsgridcontroller',
    initComponent: function () {
        this.callParent(arguments);
        var allAppsStore = Ext.getStore('allappsstore');
        allAppsStore.getProxy().setUrl('/accessapp');
        // allAppsStore.autoLoad = true;
        allAppsStore.load();
    },
    trackMouseOver: false,
    cls: 'app-grid',
    header: false,
    columnLines: true,
    scrollable : true,
    store: {
        type: 'allappsstore'
    },
    viewConfig: {
        loadMask : false,
        stripeRows: false,
        emptyText : '<div style="font-size:20px;text-align:center;vertical-align:middle;">Create/Manage Your Apps/Subscriptions</div>'
    },
    columns: [{ 
        text: 'App', 
        align : 'center',
        xtype: 'templatecolumn',
        flex: 1,
        menuDisabled : true,
        //width: 200,
        tpl: [
            '<div class="allappgrid-cell">',
            '<tpl if="this.imgExistance(values)">',
                '<img class="applogo" src="{[this.applogImageSetting(values)]}"  onerror='+Utility.defaultProjectImg+'>',
                
            '<tpl else>',
                '<div style="background: {[this.nonImgColor(values)]};" class="appgrid-details-dash-non-img-cls">',
                    '<span class="appfirst-letter-cls">{[this.getNonImgFirstLetter(values)]}</span>',
                '</div>',
            '</tpl>',
            '<span class="appnametxt">{appname}</span>',
            '</div>',
            {
               imgExistance: function(values) {
                    if(values && values.applogopath && values.applogopath != "null") {
                        return true;
                    } else {
                        return false;
                    }
                }, 

                applogImageSetting:function(values){
                    if(values && values.applogopath){
                        return Utility.imageCheck(values.applogopath)
                    } else {
                         return Utility.projectImg;
                    }
                },
                nonImgColor: function(values) {
                    if(values){
                        values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
                        return values.color;
                    }
                },
                getNonImgFirstLetter: function(values) {
                    if(values && values.appname){
                        return values.appname[0];
                    }
                }
            }
        ]
    }, { 
        text: 'Owner', 
        align : 'center',
        xtype: 'templatecolumn',
        flex: 1,
        menuDisabled : true,
        //width: 250,
        tpl: [
            '<span class="owner-name-allapps">{appOwner.empname}</span>',
            '<span class="owner-details">{appOwner.empmailid}</span>',
            '<span class="owner-details">{appOwner.phone}</span>'
        ]
    }, { 
        text: 'Active Access Allowed', 
        xtype: 'templatecolumn',
        align: 'center',
        menuDisabled : true,
        //flex: 1,
        width: 150,
        tpl: [
            '<span class="activeAccessAllowed"> {activeusers} / {accessallowedusers} </span>'
        ]   
    }, {
        text: 'Description', 
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        align : 'center',
        tpl: '<span class="description"> {description} </span>'
    }, { 
        text: 'Status', 
        dataIndex: 'status', 
        menuDisabled : true,
        flex: 1,
        //width: 150,
        align : 'center',
        xtype: 'widgetcolumn',
        widget: {
            width: 120,
            xtype: 'button',
            handler: 'onRequestAccessBtnClick'            
        },
        onWidgetAttach: 'widgetAttach'
    }],
    listeners: {
        celldblclick : 'onRecordClick'
    }
});
