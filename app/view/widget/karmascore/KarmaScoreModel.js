/**
 * This is ViewModel for view 'DDO.view.widget.karmascore.KarmaScore'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.karmascore'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmascore',

    requires: [
        'DDO.model.widget.karmascore.KarmaScore'
    ],

    data: {
        title: 'Top 10 Scores',
        detailIconCls: 'x-fa fa-external-link-square',
        designationPotential : null
    },

    stores: {
        scoredetails: {
            type: 'scoredetails',
            autoLoad: false,
            proxy: {
                extraParams: { 
                    designationFilter:true,
                    limit: 10
                }
            }
        }
    }
});
