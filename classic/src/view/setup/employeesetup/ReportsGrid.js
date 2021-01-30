/**
 * The file ReportsGrid is the grid view of the 'DDO.view.setup.employeesetup.ReportsView'.
 * @extends {Ext.grid.Panel}
 * @alias 'widget.reportsgrid'.
 * ViewModel : 'DDO.model.setup.employeesetup.ReportViewModel'
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeTabController'. 
 */
Ext.define('DDO.view.setup.employeesetup.ReportsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.reportsgrid',

    cls: 'karmalist-cls',

    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],

    height: Constants.ViewportHeight *0.78,
    width: '100%',

    viewConfig: {
        loadMask: false
    },

    columnLines: true,
    rowLines: true,

    margin: '0 0 0 10',
    padding: '0 10 0 0',
    emptyText:'<div class = "ddo-adv-karma-search-empty">No Data Found</div>',    
    columns: [{
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.FIRSTNAME,
        dataIndex: 'basic.firstname',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.LASTNAME,
        dataIndex: 'basic.lastname'
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.EMAIL,
        dataIndex: 'basic.email',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.DEPARTMENT,
        dataIndex: 'workdetails.departmentname',
        filter: {
            type: 'string'
        }
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.DESIGNATION,
        dataIndex: 'workdetails.designationname',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.REPORTINGTO,
        dataIndex: 'workdetails.reportingname',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.JOINEDDATE,
        dataIndex: 'workdetails.joiningdate',
        xtype: 'datecolumn',
        format: 'd-M-Y'
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.CONFIRMEDDATE,
        dataIndex: 'workdetails.confirmdate',
        xtype: 'datecolumn',
        format: 'd-M-Y'
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.SEPARATEDDATE,
        dataIndex: 'workdetails.separateddate',
        xtype: 'datecolumn',
        format: 'd-M-Y'
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.REPORTS.EMPLOYEESTATUS,
        dataIndex: 'workdetails.empstatus'
    },{
        text:  LabelsTitles.EMPSETUP.EMPTAB.REPORTS.GREYTHRID,
        dataIndex: 'workdetails.grey_hr_id'
    }]
});