/**
 * This view is responsible for displaying user profile with the details of work.
 * @class 'DDO.view.profile.ProfileUserView'
 * @extends 'Ext.container.Container'
 * @alias 'profileuserview'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.profile.ProfileUserView', {
	extend: 'Ext.container.Container',
	xtype: 'profileuserview',
	reference: 'profileuserview',
	requires: [
		'DDO.view.profile.details.UserDetails',
		'DDO.view.profile.timeline.UserTimeline',
		'DDO.view.profile.reporting.ReportingView',
		'DDO.view.profile.projecthistory.ProjectHistoryView',
		'DDO.view.profile.provitiontocnfm.ProvitionToCnfm'
	],
	layout: {
		type: 'card'
	},
	activeItem: 0,
	items: [
		// {
		// 	xtype: 'provitiontocnfm'	
		// },
		{
		xtype: 'userdetails'
	}, {
		xtype: 'usertimeline'
	},{
		xtype:'reportingview'
	},{
		xtype: 'projecthistoryview'
	},,{
		xtype: 'provitiontocnfmgrid'
	}],
    
    initComponent:function(){
        this.callParent(arguments);
    }
});