/**
 * The file ExternalUploadForm is responsible for uploading the image of the project in the Projects View.
 * @extends {Ext.window.Window}.
 * @alias widget.externaluploadform.
 */
Ext.define('DDO.view.projects.ExternalUploadForm', {
	extend: 'Ext.window.Window',

	xtype: 'externaluploadform',

	requires: [
		'DDO.view.projects.ExternalUploadFormController',
		'DDO.view.projects.ExternalUploadFormModel'
	],

	controller: 'externaluploadformcontroller',

	viewModel: {
		type: 'externaluploadformmodel'
	},

	reference: 'externalUploadForm',

	cls: 'external-upload-form-window',

	width: Constants.ViewportWidth*0.22,
	height:Constants.ViewportHeight*0.075,

	resizable: false,
	modal: true,
	header: false,
	hideOnMaskTap: true,

	items: [{
		xtype: 'form',
		items: [{
			xtype: 'filefield',
			opType: 'upload',
			name: 'projectImage',
			accept: 'image',
			buttonOnly: true,
			buttonText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.UPLOADTEXT,
			width: Constants.ViewportWidth*0.11,
			listeners: {
				change: 'onProjectImgChange'
			}
		}]
	}],

	initComponent: function() {
		this.callParent(arguments);
		var controller = this.getController();
		Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
	},

	destroy: function() {
		var controller = this.getController();
		Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
	}
});