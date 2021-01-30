/**
 * This file is responsible for grid view of the AllocationSheetContainer.
 * ViewModel : 'DDO.view.allocationsheet.AllocationSheetModel'.
 * ViewController : 'DDO.view.allocationsheet.AllocationSheetController'.
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationSheet', {
    extend: 'Ext.grid.Panel',
    xtype:'allocationsheet',
    requires: [
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.Exporter'
    ],
    loadMask: true,
    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],
    scrollable:true,
emptyText:"No Data Found",
    features: [{
        ftype: 'grouping'
    }],
    headerBorders: false,
    cls: 'ddo-dashboard-grid',
   
    columns: [{
        text:LabelsTitles.SNO,
        xtype: 'rownumberer',
        align: 'left',
        flex:1
    }, {
        text: LabelsTitles.EMPLOYEENAME,
        dataIndex: 'fullName',
        //:1.5,
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPLOYEEID,
        dataIndex: "employee_code",
        //:1.5,
        filter: {
            type: 'string'
        }
    },{
        text: LabelsTitles.DESIGNATION,
        dataIndex: 'designationname',
        //:1.5,
        filter: {
            type: 'string'
        }
    },{
        text: LabelsTitles.PROJECTNAME,
        dataIndex: 'project',
        //:1,
        filter: {
            type: 'string'
        }
    },{
        text:'Supervisor Name',
        dataIndex:'reportingto',
        //:1.5
    }, {
        text:LabelsTitles.ALLOCATIONFACTOR,
        dataIndex: 'allocation_factor',
        //:1
    },{
        text:LabelsTitles.FINANCIALYEAR,
        dataIndex: 'yearname',
        //:1
    },{
        text:LabelsTitles.JOININGDATE,
        dataIndex: 'joiningdate',
        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
        //:1
    
    },{
        text:LabelsTitles.MONTH,
        dataIndex: 'monthname',
        //:1
    
    },{
        text : LabelsTitles.SKILL,
        dataIndex : 'technologies',
        // :1
    },{
        text : LabelsTitles.EXPERIENCE ,
        dataIndex:'experience',
        // : 1,
        // renderer : function(value){
   
        // }
    },{
        text : LabelsTitles.BILLABLE,
        dataIndex:'isbillable',
        // : 1,
        renderer : function(value){
            if(value != null){
                if(value == 'Y'){
                    return 'Billable'
                }else if(value == 'N'){
                    return 'Non Billable'
                }
            }else {
                return null;
            }
        }
    }]

   
});