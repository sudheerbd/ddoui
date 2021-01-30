/**
 * The file EmployeeSetupGrid is the view file of the employee list.
 * @extends {Ext.grid.Panel}
 * @alias 'widget.employeesetupgrid'.
 * ViewModel : 'DDO.view.setup.employeesetup.EmployeeSetupViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeSetupViewController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeSetupGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeesetupgrid',
    
    cls: 'karmalist-cls',
    // plugins: 'gridfilters',
    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],
    width: '100%',
    viewConfig: {
        loadMask: false
    },
    columnLines: true,
    rowLines: true,
    margin: '0 0 0 10',
    padding: '0 10 0 0',

    columns: [{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.FIRSTNAME,
        dataIndex: 'basic.firstname',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.LASTNAME,
        dataIndex: 'basic.lastname',
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMAIL,
        dataIndex: 'basic.email',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.DEPARTMENT,
        dataIndex: 'workdetails.departmentname',
        filter: {
            type: 'string'
        },
        renderer:function(data,record){
           var limitedChar=  data.substr(0, 8);
         var  elipsis="...";
           return limitedChar + elipsis;
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.PRIMARYSKILL,
        dataIndex: 'workdetails.pskill',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.DESIGNATION,
        dataIndex: 'workdetails.designationname',
        filter: {
            type: 'string'
        },
        renderer:function(data,record){
           var limitedChar=  data.substr(0, 10);
         var  elipsis="...";
           return limitedChar + elipsis;
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.REPORTINGTO,
        dataIndex: 'workdetails.reportingname',
        filter: {
            type: 'string'
        },
        renderer:function(data,record){
           var limitedChar=  data.substr(0, 7);
         var  elipsis="...";
           return limitedChar + elipsis;
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.JOININGDATE,
        dataIndex: 'workdetails.joiningdate',
        xtype: 'datecolumn',
        format: 'd-M-Y',
        renderer:function(data,record){
            if(data != null){
            value = Ext.Date.format(new Date(data), 'd-m-Y') ;
            return value;
            }else{
                return null;
            }
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.CONFIRMEDDATE,
        dataIndex: 'workdetails.confirmdate',
        xtype: 'datecolumn',
        format: 'd-M-Y',
        renderer:function(data,record){
            if(data != null){
                value = Ext.Date.format(new Date(data), 'd-m-Y') ;
                return value;
            } else{
                return null;
            }
         }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.SEPARATEDDATE,
        dataIndex: 'workdetails.separateddate',
        xtype: 'datecolumn',
        format: 'd-M-Y',
        renderer:function(data,record){
            if(data != null){
                value = Ext.Date.format(new Date(data), 'd-m-Y') ;
                return value;
            } else{
                return null;
            }
            
         }
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.NOTICEDATE,
        dataIndex: 'workdetails.notice',
        xtype: 'datecolumn',
        format: 'd-M-Y'
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPSTATUS,
        dataIndex: 'workdetails.empstatus',
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.PANNUMBER,
        dataIndex: 'personaldetails.panno'
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.GREYHRID,
        dataIndex: 'workdetails.grey_hr_id'
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONELABEL,
        dataIndex: 'personaldetails.phoneno'
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMERGENCYPHN,
        dataIndex: 'personaldetails.emergencyphoneno'
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.COMMADDRESSES,
        dataIndex: 'commAddress',
        renderer:function(data,record){
            if(data){
                var limitedChar=  data.substr(0, 10);
                var  elipsis="...";
                  return limitedChar + elipsis;
            }else{
                return null;
            }
        }
    },{
        text: LabelsTitles.EMPSETUP.EMPTAB.EMP.PERMADDRESS,
        dataIndex: 'permAddress',
        renderer:function(data,record){
            if(data){
                var limitedChar=  data.substr(0, 8);
                var  elipsis="...";
                return limitedChar + elipsis;
            } else{
                return null;
            }
        }
    }],
    listeners: {
        rowdblclick: 'onGridRowClick',
        rowclick: 'onRowClick'
    }
});