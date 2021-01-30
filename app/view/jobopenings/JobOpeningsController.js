Ext.define('DDO.view.jobopenings.JobOpeningsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.jobopeningscontroller',

	jobOpeningsWindow: function(view, record, tr, rowIndex, e, eOpt) {
		var jobOpeningsWindow = Ext.create('DDO.view.jobopenings.JobOpeningsWindow');

		jobOpeningsWindow.getViewModel().set('jobCode', record.data.jobcode);

		jobOpeningsWindow.items.items[0].loadRecord(record);
		jobOpeningsWindow.show();
	}
});