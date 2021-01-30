Ext.define('DDO.view.skills.SkillsChartViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.skillschartviewmodel',

	requires: [
		'DDO.model.skills.Skills'
	],

	stores: {

		skillsChartStore: {
			model: 'DDO.model.skills.Skills',
			groupField: 'skills', //to group the skills data
			autoLoad: true,
			listeners: {
				load: 'onLoadingColumnChart' // when store loads, load event is called
			}
		}
	}
});

