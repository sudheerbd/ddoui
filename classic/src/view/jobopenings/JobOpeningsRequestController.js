Ext.define('DDO.view.jobopenings.JobOpeningsRequestController',{
	extend:'Ext.app.ViewController',
	alias: 'controller.JobOpeningsRequestController',
	// requires: [
	// 'DDO.view.jobopenings.JobOpeningsRequestComboboxes'
	// ],


	hideCombobox: function( com, e, eOpts ) { //debugger;
		Ext.create('DDO.view.jobopenings.JobOpeningsRequestAddfilterWindow').show();
		// var combo = this.lookupReference('combo1').show();
		// var combo2 = this.lookupReference('combo2').show();
		// var combo3 = this.lookupReference('combo3').show();
		
	},
	getcombovalues: function  ( val, e, eOpts ) {
		//var dateValue = this.lookupReference('filterdate');
	}
});