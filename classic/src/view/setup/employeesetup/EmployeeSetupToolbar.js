/**
 * The file EmployeeSetupToolbar is the view file of the employee list.
 * @extends {Ext.toolbar.Toolbar}
 * @alias 'widget.employeesetuptoolbar'.
 * ViewModel : 'DDO.view.setup.employeesetup.EmployeeSetupViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeSetupViewController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeSetupToolbar', {
  extend: 'Ext.toolbar.Toolbar',

  alias: 'widget.employeesetuptoolbar',

  cls: 'rule-tb-cls',

  items: [{
    xtype: 'tbfill'
  },
    {
      xtype: 'textfield',
      cls: 'karma-search-cls',
      emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.SEARCHTEXT,
      width: Constants.ViewportWidth * 0.184,
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
        change: "onEmployeeSearch",
      }
    }, {
      xtype: 'button',
      text: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDNEWBTN,
      iconCls: 'rule-plus',
      margin: 0,
      cls: 'rule-add-btn',
      hidden: false,
      reference: 'addNewEmp',
      listeners: {
        click: 'onAddNewClick'
      }
    }, {
      xtype: 'tbspacer',
      width: 5
    },{
      xtype: 'button',
      // iconCls: 'x-fa fa-file-excel-o',
      html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
      ui: 'plain',
      tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
      listeners: {
        click: 'onDownloadExcelBtnClick'
      }
    }]
});
