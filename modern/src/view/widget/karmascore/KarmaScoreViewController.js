Ext.define('DDO.view.widget.karmascore.KarmaScoreViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.karmascoreview',

	onKarmaItemTap: function(view, index, target, record, e, eOpts) {
		var empId = record.data.employee_code,
			profile = Ext.ComponentQuery.query('userprofile')[0],
			headerTitle = Ext.ComponentQuery.query('#headertitle')[0],
			mainViewPort = Ext.ComponentQuery.query('mainviewport')[0],
			loginStore = Ext.getStore('login'),
			loginData = loginStore.getData().items[0].data,
			detailButton, timelineButton, detailstimeline;

		Ext.Viewport.setActiveItem(1);

		detailButton = Ext.ComponentQuery.query('#detailedview')[0];
		detailButton.setDisabled(false);

		detailButton.addCls('ddo-mobile-detailedbutton.x-item-disabled x-item-disabled');

		timelineButton = Ext.ComponentQuery.query('#timelineview')[0];
		timelineButton.setDisabled(false);
		timelineButton.removeCls('ddo-mobile-timelinebutton.x-item-disabled x-item-disabled');

		detailstimeline = Ext.ComponentQuery.query('#detailstimeline')[0];
		detailstimeline.setActiveItem(0);

		headerTitle.setText("Profile");

		mainViewPort.getViewModel().set('profileBtnMobileVisible', true);
		mainViewPort.getViewModel().set('headerTitleCls', 'headerTitleCls');

		Utility.fireOn(profile, 'loadprofiledata', empId);
	}
});