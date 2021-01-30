Ext.define('DDO.view.karmareport.KarmaReportWin', {
  extend: 'Ext.window.Window',
  alias: 'widget.karmareportwin',
  requires: ['DDO.view.karmareport.KarmaReportWindowVM',
             'DDO.view.karmareport.KarmaReportWindowController'],
  viewModel:{
    type:'karmareportwindowvm'
  },
  controller:'karmareportwindowcontroller',
  fixed: true,
  closable:false,
  header:false,
  resizable: false,
  height: Constants.ViewportHeight * 0.350,
  width: Constants.ViewportWidth * 0.33,
  cls: 'karmareportwin-cls',

  items: [
    {
      xtype: 'form',
      defaults: {
      margin: '0 0 0 20',
       padding: 10,
     
      },
     
      items: [
        {
          xtype: 'combobox',
          cls:'karmareportwinformtxt-cls',
          name: LabelsTitles.KARMAREPORT.EMPLOYEE,
          flex: 1,
          labelAlign: "top",
          reference: 'employee',
          queryMode: 'local',
          forceSelection: true,
          bind: {
           store: '{employeedesinationstore}',
            value: '{employee_name}'
          },
         displayField: 'employee_name',
         valueField: 'employee_id',
         fieldLabel: 'Employee',
        
    
        },
       
        {
          xtype:'fieldcontainer',
          layout:'hbox',
          //align:'center',
          items:[
            {
              xtype: 'datefield',
              fieldLabel: LabelsTitles.KARMAREPORT.FROM,
              labelAlign: 'top',
              format: 'F,Y',
              reference: 'Fromdate',
              maskRe: /[0-9\-\/]/,
              cls:'karmareportwinformtxtfrom-cls',
              labelWidth: 50,
              selectMonth: null,
             // selectYear: new Date(),
              allowBlank: false,
              name: 'fromdate',
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
                     //scope: me,
              
                     select: 'onDateSelect',
                      monthdblclick: 'onDateOKClick',
                       yeardblclick: 'onDateOKClick',
                       OkClick: 'onDateOKClick',
                       CancelClick: 'onDateCancelClick',
                      // activate: 'onActiveDateField'
                    },
                    keyNavConfig: {
                        esc: function () {
                            me.collapse();
                        }
                    }
                });
            }
            },
            {
              xtype: 'datefield',
              labelWidth: 30,
              fieldLabel: LabelsTitles.KARMAREPORT.TO,
              labelAlign: 'top',
              format: 'F,Y',
              reference: 'Todate',
              maskRe: /[0-9\-\/]/,
              cls: 'karmareportwinformto-cls',
              allowBlank: false,
              name: 'todate',
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
                        monthdblclick: 'onDateOKClick',
                        yeardblclick: 'onDateOKClick',
                        OkClick: 'onDateOKClick',
                        CancelClick: 'onDateCancelClick',
                      //  activate: 'onActiveDateField'
                    },
                    keyNavConfig: {
                        esc: function () {
                            me.collapse();
                        }
                    }
                });
            }
            }
          ],
        }
      
      ],
      buttons: [{
        text: LabelsTitles.KARMAREPORT.SEARCH,
        cls:'karmareportsearchbtn-cls',
       formBind:true,
        handler:'OnclickSubmit',
        margin: '20px 180px 0px 20px'
       
      }],

      listeners:{
        fieldvaliditychange  : 'onFormValid'
      }

    }],
  
    listeners: {
        focusleave: function(cmp) {
          let vm = this.getViewModel();
           isClicked = vm.getData().isSearchClick;
          if(!isClicked){
            vm.set('isSearchClick',false);
            cmp.close();
          }
        }
      },
 })
 
 