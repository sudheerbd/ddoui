Ext.define('DDO.view.widget.karmascore.KarmaScoreViewModel', {
    extend: 'DDO.view.widget.karmascore.KarmaScoreModel',
    alias: 'viewmodel.karmascoreview',

    requires: [
        'DDO.model.widget.karmascore.KarmaScore'
    ],

    // data: {
    //     title: 'Karma Score',
    //     detailIconCls: 'x-fa fa-external-link-square'
    // },

    stores: {
        scoredetails: {
            type: 'scoredetails',
            autoLoad: true,

            proxy: {
                extraParams: {
       
            limit: 200
                }
            }
        }
    }
});
