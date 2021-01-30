Ext.define('ACCTRL.view.accesscontrol.AccessControlGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'accesscontrolgrid',
    requires: [
        'ACCTRL.store.accesscontrol.AccessControlGridStore',
        'ACCTRL.view.accesscontrol.AccessControlController'
    ],
    controller: 'accesscontrolcontroller',
    trackMouseOver: false,
    initComponent: function () {
        this.callParent(arguments);
        var accessControlStore = Ext.getStore('accesscontrolgridstore');
        accessControlStore.getProxy().setUrl('/appaccessrequest/useraccesscontrol');
        accessControlStore.load();
    },
    cls: 'accesscontrol-grid',
    header: false,
    columnLines: true,
    scrollable : true,
    store: {
        type: 'accesscontrolgridstore'
    },
    viewConfig: {
        loadMask : false,
        stripeRows: false,
        emptyText : '<div style="font-size:20px;text-align:center;vertical-align:middle;">No Request To Show</div>'
    },
    columns: [{ 
        text: 'App', 
        align : 'center',
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        //width: 200,
        tpl: [
            '<div class="accesscontrolgrid-cell">',
            '<tpl if="this.imgExistance(values)">',
                '<img class="applogo" src="{appLogoPath}" />',
                
            '<tpl else>',
                '<div style="background: {[this.nonImgColor(values)]};" class="appgrid-details-dash-non-img-cls">',
                    '<span class="appfirst-letter-cls">{[this.getNonImgFirstLetter(values)]}</span>',
                '</div>',
            '</tpl>',
            '<span class="appnametxt">{appName}</span>',
            '</div>',
            {
               imgExistance: function(values) {
                    if(values && values.appLogoPath && values.appLogoPath != "null") {
                        return true;
                    } else {
                        return false;
                    }
                }, 
                nonImgColor: function(values) {
                    if(values){
                        values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
                        return values.color;
                    }
                },
                getNonImgFirstLetter: function(values) {
                    if(values && values.appName){
                        return values.appName[0];
                    }
                }
            }
        ]
    }, { 
        text: 'User', 
        align : 'center',
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        //width: 250,
        tpl: [
            '<span class="owner-name-accesscontrol">{appUser.empname}</span>',
            '<span class="owner-details-accesscontrol">{appUser.empmailid}</span>',
            '<span class="owner-details-accesscontrol">{appUser.phone}</span>'
        ]
    }, { 
        text: 'Active Period', 
        xtype: 'templatecolumn',
        align: 'center',
        menuDisabled : true,
        //flex: 1,
        width: 150,
        tpl: [
            '<span class="owner-name-accesscontrol"> {fromdate} </span>',
            '<span class="owner-details-accesscontrol"> to </span>',
            '<span class="owner-name-accesscontrol"> {enddate} </span>'
        ]   
    }, {
        text: 'Reason',
        menuDisabled : true,
        flex: 1,
        align : 'center',
        renderer: function(value, metaData , record){
            var status = record.get('status');
            if(status == "Revoked"){
                return '<span class="reason">' + record.get('rejectreason') + '</span>';
            } else {
                return '<span class="reason">' + record.get('requestreason') + '</span>';
            }
        }
    }, { 
        text: 'Status',
        flex: 1,
        menuDisabled : true,
        align : 'center',
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'panel',
            layout: {
                type : 'vbox',
                align: 'middle',
                pack : 'center'
            },
            defaults: {
                xtype: 'button',
                width: 120,
                margin: 10
            }
        },
        onWidgetAttach: 'widgetAttach'
    }]
});
