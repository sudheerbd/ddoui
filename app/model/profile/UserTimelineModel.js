Ext.define('DDO.model.profile.UserTimelineModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'searchkey'
    }, {
        name: 'achievement',
        convert: function(value, record) {
            var searchkey = record.data.searchkey;
            if (searchkey === 'directorpick') {
                return 'premium-badge';
            } else if (searchkey === null) {
                return 'trophy-shape';
            } else {
                // do nothing
            }
        }

    }, {
        name: 'activity_title'
    }, {
        name: 'activity_description'
    }, {
        name: 'activity_on'
    },{
        name:'nominated_by'
    }]
});