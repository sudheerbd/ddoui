Ext.define('ACCTRL.view.allapps.HistoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'accessapphistorygrid',
    requires: [
        'ACCTRL.store.allapps.HistoryGridStore'
    ],
    trackMouseOver: false,
    cls: 'app-history-grid',
    header: false,
    columnLines: true,
    scrollable : true,
    store: {
        type: 'accessapphistorystore'
    },
    viewConfig: {
        loadMask : false,
        stripeRows: false,
        emptyText : '<div style="font-size:20px;text-align:center;vertical-align:middle;">No History To Show</div>'
    },
    columns: [{
        text: 'Date', 
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        align : 'center',
        tpl: '<span class="description"> {created} </span>'
    },  { 
        text: 'User', 
        align : 'center',
        xtype: 'templatecolumn',
        menuDisabled : true,
        flex: 1,
        tpl: [
            '<span class="owner-name-allapps">{appUser.empname}</span>',
            '<span class="owner-details">{appUser.empmailid}</span>'
        ]      
    }, { 
        text: 'Access Period', 
        xtype: 'templatecolumn',
        align: 'center',
        menuDisabled : true,
        flex: 1,
        tpl: [
            '<span class="owner-name-allapps"> {request_start_date} </span>',
            '<span class="owner-details"> to </span>',
            '<span class="owner-name-allapps"> {request_end_date} </span>'
        ]   
    }, { 
        text: 'Status', 
        dataIndex: 'status', 
        sortable : false,
        flex: 1,
        menuDisabled : true,
        align : 'center',
        renderer: function(value){
            if(value == "Pending") {
                return '<span class="pending-txt">Requested</span>'
            } else if (value == "Active"){
                return '<span class="active-txt">Approved</span>' 
            } else if(value == "Rejected"){
                return '<span class="rejected-txt">Rejected</span>'
            } else if (value == "Revoked"){
                return '<span class="revoked-txt">Revoked</span>' 
            }
        }
    }]

});
