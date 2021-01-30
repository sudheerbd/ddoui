Ext.define('DDO.view.karmasetup.karma.KarmaWindowViewsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.karmawindowviewsmodel',

    data: {
        checkComboDisplay: true,
        karmaID: null,
        isRuleBased: null,
        isRatingBased: null,
        saveBtn: true,
        timelineValue: null,
        isChangedTimeLine: false,
        autoapproval : null,
        autoapprovalState:false
    }
});
