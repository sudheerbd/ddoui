/**
 * This is controller for view 'DDO.view.feeds.FeedsIndividualImages'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.feedsindividualimagescontroller'
 */
Ext.define('DDO.view.feeds.FeedsIndividualImagesController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.feedsindividualimagescontroller',

	/**
     * This handler will close window on focus leave.
     * @param {event} Object, Event Object
     * @param {target} Object, Event Orgin Object
     */
	onWindowOutsideTap: function(event, target) {
		try {
			var view = this;
			Utility.onWindowOutterTap(event, target, view);
		} catch (err) {
			Utility.showToast(Messages.HOME.FEEDOUTSIDE, err);
		}
	}
});