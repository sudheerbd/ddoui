/**
 * This is controller for view 'DDO.view.feeds.likes.FeedsLikeWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.feedslikewindowcontroller'
 */
Ext.define('DDO.view.feeds.likes.FeedsLikeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedslikewindowcontroller',

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
    },

    /**
     * This handler will close window on focus leave.
     * @param {view} Object, reference of view
     * @param {record} Object, reference of selected record.
     * @param {item} Object, reference of items object.
     * @param {index} Number, index of item. 
     * @param {eOpts} Object, Event Object
     */
    onHeaderItemClick: function(view, record, item, index, e, eOpts) {
        try {
            var likesStore = view.getStore(),
                viewModel = view.up().getViewModel(),
                userLikesStore = Ext.getStore('userlikesstore');
            likesStore.each(function(record) {
                record.data.active = false;
            });
            record.data.active = true;
            view.refresh();
            userLikesStore.clearFilter(true);
            if (!(record.data.reaction === "All")) {
                viewModel.set('likeIconsVisible', false);
                userLikesStore.filterBy(function(rec) {
                    if (rec.data.like_value == record.data.value) {
                        return true;
                    }

                });
            } else {
                viewModel.set('likeIconsVisible', true);
                userLikesStore.filterBy(function(rec) {
                    return true;
                });
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.HITEM, err);
        }
    }
});