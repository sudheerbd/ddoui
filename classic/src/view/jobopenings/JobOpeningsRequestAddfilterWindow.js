Ext.define('DDO.view.jobopenings.JobOpeningsRequestAddfilterWindow',{
	extend: 'Ext.window.Window',
	requires: ['DDO.view.jobopenings.JobOpeningRequestFilterComboboxes'],
	title: 'Add Filter',
	modal: true,
	height: 300,
	width: 620,
	margin: '5 50 0 0',
	layout: {
		type:'fit'
	},
	closeAction: 'hide',
	resizable: false,
	cls: 'ddo-filter-window',
	title: 'Add Filters',
	initComponent: function() {
	 	var me =this;
	 	me.callParent(arguments);
	 	me.mon(Ext.getBody(), 'click', function(el, e){
	 		me.close(me.closeAction);
	 	}, me, { delegate: '.x-mask' });
	 },
	 items:[{
	 	xtype: 'jobopeningrequestfieltercomboboxes'
	 }]


});