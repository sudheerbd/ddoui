/**
 *   This file is responsible for Utilisation View.
 *   @extends {Ext.panel.Panel}
 *   @alias widget.utilisationview
 *   ViewController :'DDO.view.setup.employeesetup.EmployeeTabController'.
 *   ViewController :'DDO.view.setup.employeesetup.EmployeeTabViewModel'.
 */
Ext.define('DDO.view.setup.employeesetup.UtilisationView', {
    extend: 'Ext.panel.Panel',
    xtype: 'utilisationview',
    requires: ['DDO.view.setup.employeesetup.UtilGrid'],
    layout: 'fit',
    dockedItems: [{
        xtype: 'container',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-file-excel-o',
            ui: 'plain',
            tooltip: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.DWLDEXCEL,
            margin: '10px',
            cls: 'excelbutton-cls',
            listeners: {
                click: 'onDownloadExcelBtnClick'
            }
        }, {
            xtype: 'combobox',
            cls: 'utilisation-groupby-cls',
            name: 'filterBy',
            emptyCls: 'utilisation-groupby-empty-cls',
            emptyText: LabelsTitles.EMPSETUP.EMPTAB.UTILIZATION.EMPTYTEXT,
            reference: 'groupby',
            width: Constants.ViewportWidth * 0.10,
            listConfig: {
                cls: 'utilisation-list-cls'
            },
            displayField: 'group_name',
            valueField: 'group_value',
            value: 0,
            editable: false,
            bind: {
                store: '{utilcombostore}'
            },
            listeners: {
                select: 'onFilterItemSelect'
            }
        }]
    }],
    items: [{
        xtype: 'utilgrid',
        name: 'utilgrid'
    }]
});