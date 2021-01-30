
Ext.define('DDO.view.profile.provitiontocnfm.ProvitionToCnfm', {
    extend: 'Ext.grid.Panel',
    requires:['DDO.store.profile.ProvitionToCnfmStore',
    'DDO.view.profile.provitiontocnfm.ProvitionToCnfmViewController'
], 
    xtype: 'provitiontocnfmgrid',
    store: {
        type: 'ProvitionToCnfmStore'
    },
    controller:'probationtocnfm',
    emptyText: LabelsTitles.PROFILE.REPORTING.EMPTYTEXT,
    columnLines: true,
    rowLines: true,
    margin: '0 0 0 10',
    padding: '0 10 0 0',
    cls: 'karmalist-cls reporting-view-cls',

    plugins: 'gridfilters',

    height: Constants.ViewportHeight*0.46,
    scrollable:true,
    width: '100%',
    viewConfig: {
        loadMask: false
    },
    columns: [{
         
            xtype: 'rownumberer'
        },{
        text: 'Month',
        dataIndex: 'month',
        flex: 1,
    },{
        text:'Sprint',
        dataIndex: 'sprint', 
        flex: 1
    },{
        xtype:'datecolumn',
        header:'Due Date',
        dataIndex: 'duedate',
        sortable:true,
        flex: 1,
        renderer: function(value){
           return Ext.util.Format.date(value,'d-m-Y')
        }
    },{
        text: 'Duration',
        dataIndex: 'duration',
        flex: 1,
    },{
        text: 'Status',
        flex: 1,
        dataIndex:'status',
        renderer:function(value){
            if(value.trim() == 'Done'){
                return value;
            }else{
                return 'Pending';
            }

        }
    },{
        xtype: "actioncolumn",
        header: 'Action Item',
        reference: "Action",
        align: "center",
        flex: 1,
        items: [
            {
              iconCls: "x-fa fa-arrow-right",
              handler: "onActionIconClick",
              header: "hidden",
              cls: 'btn-icon-cls'
            },
            {
                iconCls:"x-fa fa-download",
                handler:'downloadExcelSheet',
                header :'hidden',
                cls : 'down-icon-cls'
                   // xtype: 'button',
                // html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
                // ui: 'plain',
                // margin:'0 30px 0 15px',
                // tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
                // listeners: {
                //     click: 'onDownloadExcelBtnClick'
                // }
            }]
    }
],
});


