Ext.define('DDO.view.profile.nominate.NominateFormModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nominateformmodel',

    data: {
        ratingName: 'Activity',
        bgImg: null,
        karmapointsColor: '#FAB82E',
        rewardpointsColor: 'black',
        nominateTitle: LabelsTitles.nominateTitle,
        profileName: null,
        activity: null,
        comments: null,
        nominateName: null

    },
    formulas: {
        value: function(get) {
            var activity = get('activity'),
                comments = get('comments');

            if (activity && comments) {
                if (comments.length >= 140) {
                    return true;
                }
            } else {
                return false;
            }
        }
    },

    stores: {
        ratingstore: {
            type: 'nominatenamesstore'
        }
    }
});