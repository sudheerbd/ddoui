/**
 * The file 'DDO.view.setup.employeesetup.EmployeeGroup' is responsible for the view of the Employee Group at the top of the page.
 * @extends {Ext.view.View}
 * @alias 'widget.empgroup'
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeGroup',{
	extend:'Ext.view.View',

	xtype:'empgroup',

    bind : {
        store : '{empGroupStore}'
        },
    cls: 'employee-group-main-wrapper',
    tpl:[
        '<tpl for=".">',
        '<div style="margin-bottom: 10px;background:{color};" class="empgroup-wrapper">',
          '<div class="text-cls">{text}</div>',
          '<br/><div class="number-cls">{count}</div>',
        '</div>',
    '</tpl>'
    ],

    itemSelector:'thumb-wrap'

});