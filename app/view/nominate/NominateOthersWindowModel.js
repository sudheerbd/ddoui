/**
 * The file NominateOthersWindowModel is the viewModel for the 'DDO.view.nominate.nominateothers.NominateOthersWindow'
 */
Ext.define('DDO.view.nominate.NominateOthersWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nominateotherswindowmodel',

    requires: [
        'DDO.model.widget.karmascore.KarmaScore'
    ],

    data: {},

    stores: {
        allkarmascores: {
            type: 'scoredetails',
            proxy: {
                extraParams: {
                    all: true
                }
            },
            autoLoad: true
        }
    }
});