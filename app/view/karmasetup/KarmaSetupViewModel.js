/**
 * This is viewmodel file for 'DDO.view.karmasetup.KarmaSetupView'
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.karmasetupview'
 */
Ext.define('DDO.view.karmasetup.KarmaSetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmasetupview',
    requires: [
        'DDO.model.karmasetup.KarmaProgress'
    ],

    data:{
    	uploadBtnVisible:false,
    	saveBtnVisible:true,
    	activeItemIndex:0
    },
    stores: {
        karmaProgressStore : {
            autoLoad:true,
            model: 'DDO.model.karmasetup.KarmaProgress',
            proxy: {
                type: 'ajax',
                url: 'resources/data/karmasetup/progress.json',
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
        }
    }
});
