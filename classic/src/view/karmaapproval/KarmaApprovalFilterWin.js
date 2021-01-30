Ext.define('DDO.view.karmaapproval.KarmaApprovalFilterWin',{
extend:'Ext.window.Window',
alias:'widget.karmaapprovalfilterwindow',
requires:['DDO.view.karmaapproval.KarmaApprovalFilterWinController'],
controller: 'karmaapprovalfilterwincontroller',
// viewModel: {
//     type: 'karmaapprovalfilterwinmodel'
// },
resizable: false,
modal:true,
width: 419,
height: 421,
cls:'karmaapprovalfilterwin-cls',
title : 'Choose fields to filter results',
bbar:[
    {
    xtype:'button',
    text:'Reset',
   iconCls:'reset-approval-icon',
    width:100,
    listeners: {
        click:"onFilterResetClick"
    },
},{
    xtype:'tbfill'
},{
    xtype:'button',
    text:'Apply',
    iconCls : 'accept-approval-icon',
    width:100,
    listeners: {
        click:"onFilterApplyClick"
    },
}],
items:[{
  xtype : 'form',
  reference:'karmaapprovalfilterform',
  cls:'filter-form-cls',
  defaults: {
    margin: '10 10 0 10',
    padding: 10,
    align: 'center'
  },
  items:[{
      xtype : 'container',
      layout : 'hbox',
    margin: '0 10 0 10',
    defaults:{
        width:150
    },
      items:[
        {
            xtype: 'datefield',
            name: 'start_date',
            reference: 'filterstartdate',
            format: 'F,Y',
            emptyText: 'From Date',
        
            cls:'filte-date-field',
            margin: '0 0 0 10',
            labelStyle: "height:25px",
            flex: 1,
            allowPrevMonthCount: 1,
            selectMonth: null,
     
            editable: false,
            enableKeyEvents: true,
            createPicker: function () {
                var me = this,
                    format = Ext.String.format;
                return Ext.create('Ext.picker.Month', {
                    pickerField: me,
                    ownerCt: me.ownerCt,
                    renderTo: document.body,
                    floating: true,
                    cls: 'self-nominate-month-picker',
                    hidden: true,
                    focusOnShow: true,
                    minDate: me.minValue,
                    maxDate: me.maxValue,
                    disabledDatesRE: me.disabledDatesRE,
                    disabledDatesText: me.disabledDatesText,
                    disabledDays: me.disabledDays,
                    disabledDaysText: me.disabledDaysText,
                    format: me.format,
                    showToday: me.showToday,
                    startDay: me.startDay,
                    minText: format(me.minText, me.formatDate(me.minValue)),
                    maxText: format(me.maxText, me.formatDate(me.maxValue)),
                    allowPrevMonthCount: me.allowPrevMonthCount,
                    listeners: {
                        select: 'onDateSelect',
                    
                        OkClick: 'onDateOKClick',
                    
                    },
                    keyNavConfig: {
                        esc: function () {
                            me.collapse();
                        }
                    }
                });
            },
            // listeners: {
            //     collapse: 'onDateFieldCollapse'
            // }
        },
        {
            xtype: 'datefield',
            name: 'end_date',
            reference: 'filterenddate',
            format: 'F,Y',
            emptyText:'To Date',
         
            cls:'filte-date-field',
            margin: '0 0 0 10',
            labelStyle: "height:25px",
            flex: 1,
            allowPrevMonthCount: 1,
            selectMonth: null,
            // cls: 'employeeexitcombo-cls',
            editable: false,
            enableKeyEvents: true,
            createPicker: function () {
                var me = this,
                    format = Ext.String.format;
                return Ext.create('Ext.picker.Month', {
                    pickerField: me,
                    ownerCt: me.ownerCt,
                    renderTo: document.body,
                    floating: true,
                    cls: 'self-nominate-month-picker',
                    hidden: true,
                    focusOnShow: true,
                    minDate: me.minValue,
                    maxDate: me.maxValue,
                    disabledDatesRE: me.disabledDatesRE,
                    disabledDatesText: me.disabledDatesText,
                    disabledDays: me.disabledDays,
                    disabledDaysText: me.disabledDaysText,
                    format: me.format,
                    showToday: me.showToday,
                    startDay: me.startDay,
                    minText: format(me.minText, me.formatDate(me.minValue)),
                    maxText: format(me.maxText, me.formatDate(me.maxValue)),
                    allowPrevMonthCount: me.allowPrevMonthCount,
                    listeners: {
                        select: 'onDateSelect',
                      
                        OkClick: 'onDateOKClick',
                      
                    },
                    keyNavConfig: {
                        esc: function () {
                            me.collapse();
                        }
                    }
                });
            },
            // listeners: {
            //     collapse: 'onDateFieldCollapse'
            // }
        },
      ]
  },{
      xtype : 'container',
      layout : 'hbox',
      align : 'center',
      margin: '0 10 0 10',
      items : [
        {
            xtype: 'combobox',
            name: 'categories',
            editable: false,
            forceSelection: true,
            reference: 'karmacategory',
            cls:'filter-date-field',
          
            flex:1,
            margin: '0 0 0 10',
          
            emptyText: 'Karma Category',
            
            displayField: 'name',
            valueField: 'ddo_karmacategory_id',
            allowBlank:false,
      
            minChars: 3,
            labelSeparator: '',

            autoLoad: true,
            store: "karmasetup.KarmaCategoriesStore",
            // listeners: {
            //     change: 'onCategorySelect'
            // }
        },{
            xtype: 'combobox',
            reference: 'selfnominatekarmacombo',
            name: 'karmacombo',
            cls:'filter-date-field',
            forceSelection: true,
            editable: false,
            margin: '0 0 0 10',
           flex:1,
            emptyText: 'Karma Name',
           
            labelSeparator: '',
           
            store: 'karmasetup.KarmaNominateStore',
            displayField: 'name',
            valueField: 'ddo_karma_id',
            allowBlank: false,
            // listeners: {
            //     change: 'onKarmaComboChange'
            // }
        }
      ]
  },
  {
    xtype : 'container',
    layout : 'vbox',
    align : 'center',
   
    defaults:{
    width : 350,
    margin: '0 10 0 10',
    // padding: 10,
    },
    items: [
        {
        xtype: 'multislider',
        values: [100, 175],
        name:'hrkarma',
        minValue:0,
        maxValue: 175,
        increment :10,
        cls:'approval-slider-cls'
    },{
        xtype:'label',
        text:'Hr Karma Units',
       cls:'approvalfilter-label-cls'
    },{
        xtype: 'multislider',
        values: [100, 175],
        name:'financekarma',
        minValue:0,
        maxValue: 175,
        increment :10,
        cls:'approval-slider-cls'
    },
    {
        xtype:'label',
        text:'Finance Karma Units',
        cls:'approvalfilter-label-cls'
    },
    {
        xtype: 'multislider',
        values: [100, 175],
        name:'karmaunits',
        minValue:0,
        maxValue:175,
        increment:10,
        activeCounter:10,
        cls:'approval-slider-cls'
    },
    {
        xtype:'label',
        text:'Karma Units',
        cls:'approvalfilter-label-cls',
      
    },{
        xtype: 'multislider',
        values: [100, 175],
        name:'derivedkarma',
        minValue:0,
        maxValue:175,
        increment:10,
        activeCounter:10,
        cls:'approval-slider-cls'
    },
    {
        xtype:'label',
        text:'Derived Karma Units',
        cls:'approvalfilter-label-cls',
      
    }
]
  }
]
}]
});