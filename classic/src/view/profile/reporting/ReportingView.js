/**
 * The file ReportingView is the grid view in the Reporting Manager History tab in the profile.
 * @extends {Ext.grid.Panel}.
 * @alias 'widget.reportingview'
 */
Ext.define('DDO.view.profile.reporting.ReportingView', {
    extend: 'Ext.grid.Panel',
    requires:['DDO.store.reporting.ReportingStore'],
    bind:{
    store:'{reportingManagerStore}',
    },
    xtype: 'reportingview',
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
        text: LabelsTitles.PROFILE.REPORTING.CHANGEDBY,
        dataIndex: 'changedby',
        flex: 0.25,
        height: 42
    },{
        text: LabelsTitles.PROFILE.REPORTING.REPORTINGMANAGER,
        dataIndex: 'repname',
        flex: 0.25
    },{
        text: LabelsTitles.PROFILE.REPORTING.FRMDATE,
        dataIndex: 'from_date',
        flex: 0.25,
        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
    },{
        text: LabelsTitles.PROFILE.REPORTING.TODATE,
        dataIndex: 'to_date',
        flex: 0.25,
        renderer: function(val) {
            if(Ext.isEmpty(val)){
				return '- - -';
			}else{
               return Ext.util.Format.date(val,'Y-m-d H:i:s')
            }
        }

    }],
    listeners:{
        activate:function() {
            var store = this.getStore();
            store.clearFilter();
        }
    }
});