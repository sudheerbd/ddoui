/**
 *   This file is responsible for Grid View of DDO.view.setup.employeesetup.UtilisationView .
 *   @extends {Ext.grid.Panel}
 *   @alias utilgrid
 *   ViewController : DDO.view.setup.employeesetup.EmployeeTabController.
 */

Ext.define('DDO.view.setup.employeesetup.UtilGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'utilgrid',
    cls: 'karmalist-cls',
    width: '100%',
    columnLines: true,
    rowLines: true,
    margin: '0 0 0 10',
    padding: '0 10 0 0',
    groupedText: 'Project Name',
    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: Ext.create('Ext.XTemplate',
        '{name} <div class ="resource-count">Head Count: ',
        '<span>{[this.formatHeadName(values)]}</span> </div>',
            ' <div class ="resource-count">Resource Count: ',
            '<span>{[this.formatResource(values)]}</span> </div>',
            ' <div class ="resource-count">Shadow Count: ',
            '<span>{[this.formatShadowName(values)]}</span> </div>',
             {
                formatResource: function (values) {
                    var totalnumber = 0;
                    for(i=0;i<values.children.length;i++){
                       if(values.rows[i].data.isshadow==='N'){
                           var allocationPercent = values.rows[i].data.allocpercent,
                           calculatedAllocation = (allocationPercent/100);
                           totalnumber=totalnumber+calculatedAllocation
                       }
                       
                    }
                    return totalnumber;
                },
                formatHeadName:function(values){
                    return values.children.length;
                },
                formatShadowName:function(values) {
                    var i;
                    var count =0;
                    for(i=0;i<values.children.length;i++){
                       if(values.rows[i].data.isshadow==='Y'){
                           count=count+1;
                       }                
                    }
                    return count;
                }
            }
        ),
        enableGroupingMenu: false
    }],
    bind: {
        store: '{utilgridstore}'
    },
    columns: [{
            text: DDO.util.LabelsTitles.SNO,
            xtype: 'rownumberer',
            align: 'center',
            width: Constants.ViewportWidth * 0.044,
        },
        {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.NAME,
            flex: 1.5,
            dataIndex: 'ddo_employee_name',
            filter: {
                type: 'string'
            }
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.DESIGNATION,
            flex: 1.5,
            dataIndex: 'designationname',
            filter: {
                type: 'string'
            }
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.PRIMARY,
            flex: 1.5,
            dataIndex: 'primary_skill',
            type: 'string'
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.PROJECTROLE,
            flex: 1.5,
            dataIndex: 'projectrole',
            type: 'string'
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.SUPERVISOR,
            flex: 1.5,
            dataIndex: 'supervisorname',
            type: 'string'
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.STARTDATE,
            width: Constants.ViewportWidth * 0.103,
            dataIndex: 'startdate',
            xtype: 'datecolumn',
            format: 'd-M-Y'
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.ENDDATE,
            width: Constants.ViewportWidth * 0.103,
            dataIndex: 'enddate',
            xtype: 'datecolumn',
            format: 'd-M-Y'
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.ALLOCATION,
            width: Constants.ViewportWidth * 0.073,
            dataIndex: 'allocpercent',
            filter: {
                type: 'string'
            }
        }, {
            text: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.PROJECTNAME,
            width: 100,
            dataIndex: 'name',
            hidden: true,
            filter: {
                type: 'string'
            }
        }
    ],
    viewConfig: {
        getRowClass: function (record, rowIndex, rowParams, store) {
            if (record.data.isshadow == 'Y') {
                return 'shadowrec-cls';
            }
        }
    }
});