Ext.define('ACCTRL.view.myapps.MyAppsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'myappsgrid',
    requires: [
        'ACCTRL.store.myapps.MyAppsGridStore',
        'ACCTRL.view.myapps.MyAppsController'
    ],
    controller: 'myappscontroller',
    trackMouseOver: false,
    cls: 'myapps-grid',
    initComponent: function () {
        this.callParent(arguments);
        var myAppStore = Ext.getStore('myappsgridstore');
        myAppStore.getProxy().setUrl('/useraccessapp');
        myAppStore.load();
    },
    header: false,
    columnLines: true,
    scrollable : true,
    store: {
        type: 'myappsgridstore'
    },
    viewConfig: {
        loadMask : false,
        stripeRows: false,
        emptyText : '<div style="font-size:20px;text-align:center;vertical-align:middle;">No Apps To Show</div>'
    },
    columns: [{ 
        text: 'App', 
        align : 'center',
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        //width: 200,
        tpl: [
            '<div class="myappsgrid-cell">',
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
        text: 'Owner', 
        align : 'center',
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        //width: 250,
        tpl: [
            '<span class="owner-name-myapps">{appOwner.empname}</span>',
            '<span class="owner-details-myapps">{appOwner.empmailid}</span>',
            '<br/><span class="owner-details-myapps">{appOwner.phone}</span>'
        ]
    }, { 
        text: 'Access Period', 
        xtype: 'templatecolumn',
        align: 'center',
        menuDisabled : true,
        //flex: 1,
        width: 150,
        tpl: [
            '<span class="owner-name-myapps"> {fromdate} </span>',
            '<span class="owner-details-myapps">'+"to"+'</span>',
            '<span class="owner-name-myapps"> {enddate} </span>'
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
        dataIndex: 'status', 
        menuDisabled : true,
        flex: 1,
        align : 'center',
        renderer: function(value){
            if (value == "Active"){
                return '<span class="approved-txt">Approved</span>' 
            } else if (value == "Rejected"){
                return '<span class="rejected-txt">'+value+'</span>' 
            } else if (value == "Pending"){
                return '<span class="pending-txt">'+value+'</span>' 
            } else if (value == "Revoked"){
                return '<span class="revoked-txt">Revoked</span>' 
            }
        }
    }]
});