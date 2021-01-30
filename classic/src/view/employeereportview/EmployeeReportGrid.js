Ext.define('DDO.view.employeereportview.EmployeeReportGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.employeereportgrid',
  cls: 'employeereportgrid-cls',
  margin: '50 0 0 30',
  height:520,
  width:'100% !important',
  requires: [
    'Ext.grid.filters.Filters',
    'Ext.grid.plugin.Exporter'
  ],
  hiddenColumns : null,
tbar:[{
  xtype: 'label',
  text : 'Filter Results'   
},{
  xtype: 'button',
  iconCls: 'icon-add',
  listeners:{
    click:"onFilterResult"
  }
},{ 
  xtype:'tbspacer',

 }, { 
  xtype: 'tbseparator' ,
  style:{
    height:'35px !important',
  },
  cls:'filtertbspace-cls'
},{
  xtype: 'textfield',
  emptyText: 'Type here to Search...',
  cls: 'employeereporttxtfield-cls',
  width: '190px',
  triggers: {
    clear: {
      cls: Ext.baseCSSPrefix + 'fa fa-close',
      hidden: true,
      handler: "onClearIcon"
    },
    search: {
      cls: Ext.baseCSSPrefix + 'fa fa-search'
    }
  },
  listeners: {
    change: "onSearchEmployee",
  }
},{ 
  xtype:'tbspacer',
 },
{ 
  xtype: 'tbseparator',
  style:{
    height:'35px !important',
  },
  cls:'searchemptb-cls'
},{
  //xtype:'button',
  arrowVisible: false,
  iconCls : 'employeefilter-cls',
  cls:'employeecolumnfilter-cls',
  // listeners:{
  //   click:"onCheckBox"
  // },
  menu: {
    bodyPadding: '0 0 10 0',
    title: 'Choose Fields To Filter Results',
    cls:'checkboxmenu-cls',
    // modal:true,
    items: [{
        xtype: 'checkboxgroup',
      
        defaults: {
            fontSize: 14,
            margin: '0 -25 0',
            checked: true,
           // cls: 'addcolomns-each-item'
        },
        columns: 1,
        items: [
          { boxLabel: 'Designation', name: 'designation', inputValue: '2',checked: CheckBoxValues.columnValues.designation },
          { boxLabel: 'Primary Skills', name: 'primaryskills', inputValue: '3', checked: CheckBoxValues.columnValues.primaryskills},
          { boxLabel: 'E-mail', name: 'email', inputValue: '4',checked:  CheckBoxValues.columnValues.email },
          { boxLabel: 'Phone Number', name: 'phoneno', inputValue: '5' ,checked:  CheckBoxValues.columnValues.phoneno},
          { boxLabel: 'Reporintg To', name: 'reportingto', inputValue: '6' ,checked:  CheckBoxValues.columnValues.reportingto},
          { boxLabel: 'Status', name: 'status', inputValue: '7' ,checked:  CheckBoxValues.columnValues.status},
          { boxLabel: 'isBillable', name: 'isbillable', inputValue: '8',checked:  CheckBoxValues.columnValues.isbillable },
          { boxLabel: 'Technologies', name: 'technologies', inputValue: '9',checked:  CheckBoxValues.columnValues.technologies },
          { boxLabel: 'Joining Date', name: 'joiningdate', inputValue: '10' ,checked:  CheckBoxValues.columnValues.joiningdate},
          { boxLabel: 'Experience', name: 'experience', inputValue: '11',checked:  CheckBoxValues.columnValues.experience}
      ]
    }, {
      xtype: 'component',
      autoEl: {tag: 'hr'},
      cls:'showcolumnhr-cls'
    },
    {
      xtype:'button',
      text:'show column',
      reference:'showColumn',
      cls:'showcolumn-cls',
      iconCls:'showiconcolumn-cls',
      handler:'onColumnApply'
  }]
}
},{
  xtype: 'button',
  text: 'Download',
  iconCls:'employeereportdownloadbtn-cls',
  cls:'employeedownloadbtn-cls',
  style:'margin-left: 480px;',
  listeners: {
    click: 'onDownloadExcelBtnClick'
  }
}
],



  // maxWidth:1000,
  plugins: [
    {
      ptype: 'gridexporter',
      pluginId: 'exporter'
    }
  ],
  bind: {
    store: '{employestore}'
  },
  // features: [{
  //   ftype: 'grouping'
  // }],
  columns: [
    {
          // text: LabelsTitles.EMPLOYEEREPORT.EMPID,
          text: 'Employee ID',
          dataIndex: 'empcode',
          width:120,
          locked:true
          // flex: 1
        },
    
    {
      text: LabelsTitles.EMPLOYEEREPORT.EMPLOYEENAME,
      dataIndex: 'fullname',
      filter: {
        type: 'string'
      },
      width:220,
      locked : true
    },
    {
      text: LabelsTitles.EMPLOYEEREPORT.DESIGNATION,
      dataIndex: 'designationname',
      filter: {
        type: 'string'
      },
      width:150
      // flex: 1
    },
    {
      text: LabelsTitles.EMPLOYEEREPORT.PRIMARYSKILLS,
      dataIndex: 'primaryskill',
      filter: {
        type: 'string'
      },
      width:150
      // flex: 1
    }, {
      text: LabelsTitles.EMPLOYEEREPORT.EMAIL,
      dataIndex: 'email',
      filter: {
        type: 'string'
      },
      width:200
      // flex: 2
    },
    {
      text: LabelsTitles.EMPLOYEEREPORT.PHONENUMBER,
      dataIndex: 'phoneno',
      width:110
      // flex: 1
    },
    {
      text: LabelsTitles.EMPLOYEEREPORT.REPORTINGTO,
      dataIndex: 'reportingname',
      filter: {
        type: 'string'
      },
      width:150
      // flex: 1
    }, {
      text: LabelsTitles.EMPLOYEEREPORT.EMPSTATUS,
      dataIndex: 'empstatus',
      filter: {
        type: 'string'
      },
      width:110
      // flex: 1
    },{
      text:LabelsTitles.EMPLOYEEREPORT.BILLABLE,
      dataIndex : 'isbillable',
      filter: {
        type: 'string'
      },
      width:115
      // flex:1
    }, {
      text:LabelsTitles.EMPLOYEEREPORT.EMPSKILLS,
      dataIndex : 'technologies',
      width:150
      // flex:2
    },{
      text: 'Joining Date',
      dataIndex: 'joiningdate',
      width:110
      // flex: 1,
    },
    {
      text:LabelsTitles.EMPLOYEEREPORT.EMPEXPERIENCE,
      dataIndex:'empexperience',
      width:150
      // flex:1,
    }
  ],
  bbar:[
    {
      xtype: 'button',
      text: 'Download',
      style:'background-color:steelblue',
      iconCls:'employeereportdownloadbtnbottom-cls',
      cls:'downloadbtnbottom-cls',
      listeners: {
        click: 'onDownloadExcelBtnClick'
      }
    }
  ]
});