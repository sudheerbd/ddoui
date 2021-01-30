/**
 * The file EmployeeSetupWindowViewModel is the viewModel file of the Employee Setup Window.
 * @extends {Ext.app.ViewModel}
 * @alias 'Ext.app.ViewModel'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeSetupWindowViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.employeesetupwindowviewmodel',

	data:{
		joined_date:null,
		confirmed_date:null,
		relieve_date:null,
		ddo_employee_id:"",
		tab1:false,
		tab2:true,
		tab3:true,
		tab4:true,
		tab5:true,
		tab6:true,
		tab7:true,
		istags:false
	}
});