/*
 * This view for showing user timeline data by extending custom timeline class.In this class you can configurable
 * grid features.
 *
 */

Ext.define('DDO.view.profile.timeline.UserTimeline', {
    extend: 'DDO.ux.Timeline',

    requires: [
        'DDO.view.profile.timeline.UserTimelineModel',
        'DDO.view.profile.timeline.UserTimelineController'
    ],
    xtype: 'usertimeline',
    viewModel: {
        type: 'usertimelinemodel'
    },
    controller: 'usertimelinecontroller',

    cls: 'timeline-items-wrap',
    store: {
        type: 'usertimeline'
    },
    hideHeaders: true,
    deferEmptyText:false
});
