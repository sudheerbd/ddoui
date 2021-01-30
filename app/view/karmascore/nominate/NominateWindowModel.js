/**
 * This is ViewModel for view 'DDO.view.profile.nominate.NominateWindow'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.nominatewindow'
 */
Ext.define('DDO.view.karmascore.nominate.NominateWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nominatewindow',

    requires: [
        'DDO.model.widget.karmascore.KarmaScore'
    ],

    data: {
    },

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