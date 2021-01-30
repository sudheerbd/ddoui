/**
 * The file OrgChartViewModel is the View Model for DDO.view.organization.OrgChart
 * @extends {Ext.app.ViewModel}
 * @alias viewmodel.orgchartviewmodel.
 */
Ext.define('DDO.view.organization.OrgChartViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.orgchartviewmodel',

	data: {
		locName: null,
		locBtnText: '',
		rootAccessName: {},
		employee_name: null,
		childAnimate: false,
		childAccessName: {},
		department_name: null,
		department_code: null,
		rootLimitAccess: false,
		childEmptyAccess: false
	}
});