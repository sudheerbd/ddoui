/**
 * This view is responsible for displaying all feed's image and it's related operations.
 * @class 'DDO.view.feeds.FeedsIndividualImages'
 * @extends 'Ext.window.Window'
 * @alias 'widget.feedsindividualimages'
 * @ViewModel 'DDO.view.feeds.FeedsIndividualImagesViewModel'
 * @Controller 'DDO.view.feeds.FeedsIndividualImagesController'
 */
Ext.define('DDO.view.feeds.FeedsIndividualImages', {
	extend: 'Ext.window.Window',
	alias: 'widget.feedsindividualimages',
	autoShow: true,
	requires: [
		'DDO.ux.Carousel',
		'DDO.view.feeds.FeedsIndividualImagesController',
		'DDO.view.feeds.FeedsIndividualImagesViewModel'
	],
	controller: 'feedsindividualimagescontroller',
	viewModel: {
		type: 'feedsindividualimagesviewmodel'
	},
	cls: 'feed-each-img-cls',
	resizable: false,
	modal: true,
	header: false,

	initComponent: function() {
		this.items = [{
			xtype: 'button',
			text: 'X',
			tooltip: LabelsTitles.HOME.FEEDS.CLOSE,
			cls: 'feed-win-close-btn',
			handler: function(btn) {
				btn.up('window').close();
			}
		}, {
			xtype: 'carousel',
			store: this.carouselStore,
			carouselData: this.carouselData
		}];
		this.callParent(arguments);
		var controller = this.getController();
		Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
	},
	destroy: function() {
		var controller = this.getController();
		Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
	},
	listeners: {
		//Window position center when image size change.
		resize: function(vp, width, height) {
			var me = this;
			var winWidth = me.getWidth();
			var winHeight = me.getHeight();
			var newWidth = width;
			var newHeight = height;
			var screenHeight = Ext.Element.getViewportHeight();
			var screenWidth = Ext.Element.getViewportWidth();
			var left = (screenWidth / 2) - (newWidth / 2);
			var top = (screenHeight / 2) - (newHeight / 2);
			me.setPosition(left, top);
		}
	}
});