/**
 * This is ViewModel for view 'DDO.view.filter.AddFilter'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.filterwindowviewmodel'
 */
Ext.define('DDO.view.filter.FilterWindowViewModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.filterwindowviewmodel',
	data : {
		apiUrl:null,
		rootProperty:null,
		count: 1,
		author:true,
		type:true,
		date:true,
		gobutton:true,
		norecord:true,
		badgeValue:null,
		posttypeValue:null
	}
});