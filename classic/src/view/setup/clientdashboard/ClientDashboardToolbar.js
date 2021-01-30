/**
 * The file DDO.view.setup.department.DepartmentToolbar is responsible for the toolbar of 'DDO.view.setup.department.Department'.
 * @extends {Ext.toolbar.Toolbar}.
 * @alias widget.departmenttoolbar.
 * ViewModel : 'DDO.view.setup.department.DepartmentViewModel'.
 * ViewController : 'DDO.view.setup.department.DepartmentViewController'.
 */
Ext.define('DDO.view.setup.clientdashboard.ClientDashboardToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.clienttoolbar',

    cls: 'rule-tb-cls',

    items: [
    {
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        text: LabelsTitles.EMPSETUP.DEPARTMENT.ADDNEW,
        iconCls: 'rule-plus',
        margin: 0,
        cls: 'rule-add-btn',
        listeners: {
            click: 'onAddNewClick'
        }
    }]
});