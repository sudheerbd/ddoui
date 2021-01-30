Ext.define('DDO.view.employeereportview.EmployeeReportWin', {
  extend: 'Ext.window.Window',
  alias: 'widget.employeereportwin',
  requires:['DDO.view.employeereportview.EmployeeReportWinViewModel',
  'DDO.view.employeereportview.EmployeeReportWinController'],
  resizable: false,
  height: Constants.ViewportHeight*0.47,
  width: Constants.ViewportWidth*0.367,
  viewModel: {
    type: 'employeereportwinviewmodel'
  },
  controller:'employeereportwincontroller',
  cls: 'employeereportwin-cls',
  items: [
    {
      xtype: 'form',
      defaults: {
        margin: '0 0 0 20',
        padding: 10,
        align: 'center'
      },
      items: [{
        xtype: 'container',
        layout: 'hbox',
        align: 'center',
        items: [{
          xtype: 'combo',
          cls: 'employeereportwinformtxtfrom-cls',
          emptyText: 'Select....',
          labelAlign: "top",
          padding: '0 30 0 0',
          //flex: 1,
          name: 'employeename',
          fieldLabel: 'EmployeName',
          allowBlank: true,
          queryMode: 'remote',
          typeAhead: true,
          editable: true,
          bind: {
            store: '{employestore}',
          },
          displayField: 'employee_name',
          valueField: 'employee_id',
          listeners: {
            change: 'onAnyFieldSelected'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenMouseOut: true,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }

              }
            }
          }
        },
          {
            xtype: 'combobox',
            cls: 'employeereportwinformtxt-cls',
            name: 'designation',
            //flex: 1,
            labelAlign: "top",
            fieldLabel: 'Designation',
            allowBlank: true,
            emptyText: 'Select....',
            queryMode: 'local',
            editable: true,
            typeAhead: true,
            bind: {
              store: '{designationstore}',
            },
            displayField: 'name',
            valueField: 'ddo_designation_id',
            listeners: {
              change: 'onAnyFieldSelected'
            },
            triggers: {
              clear: {
                type: 'clear',
                weight: -1,
                hideWhenMouseOut: true,
                hideWhenEmpty: true,
                handler: function(cmp) {
                  if (Ext.isFunction(cmp.clearValue)) {
                    cmp.clearValue();
                  } else {
                    cmp.setValue('');
                  }

                }
              }
            }
          }]
      },
        {
          xtype: 'container',
          layout: 'vbox',
          align: 'center',
          items: [
            {
              xtype: 'combobox',
              cls: 'employeereportwinformtxt-cls',
              name: 'primaryskill',
              // flex: 1,
              labelAlign: "top",
              fieldLabel: 'Primary Skill',
              allowBlank: true,
              emptyText: 'Select....',
              queryMode: 'local',
              editable: true,
              typeAhead: true,
              bind: {
                store: '{primaryskillstore}',
              },
              displayField: 'name',
              valueField: 'ddo_skills_id',
              listeners: {
                change: 'onAnyFieldSelected'
              },
              triggers: {
                clear: {
                  type: 'clear',
                  weight: -1,
                  hideWhenMouseOut: true,
                  hideWhenEmpty: true,
                  handler: function(cmp) {
                    if (Ext.isFunction(cmp.clearValue)) {
                      cmp.clearValue();
                    } else {
                      cmp.setValue('');
                    }
                  }
                }
              }
            }
          ]
        }],
      buttons: [{
        text: 'ApplyFilters',
        cls: 'employeereportsearchbtn-cls',
        handler:'onFiltersButtonClick',
        bind: {
          disabled: '{applybtn}'
        },
      }]
    }],
  
  // listeners: {
  //   focusleave: function(cmp){
  //     cmp.close();
  //   }
  // },
});