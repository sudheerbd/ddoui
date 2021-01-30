/**
 * This view is responsible for all karma related action like category, rules, rating, access and karma.
 * @class 'DDO.view.karmasetup.KarmaSetupView',
 * @extends {Ext.container.Container}
 * @alias 'widget.karmasetupview'
 * @viewmodel: 'DDO.view.karmasetup.KarmaSetupViewModel'
 * @controller: 'DDO.view.karmasetup.KarmaSetupViewController'
 */
Ext.define('DDO.view.karmasetup.KarmaSetupView', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmasetupview',

    cls: 'karmasetupview-cls',

    width: '100%',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    requires: [
        'DDO.view.karmasetup.KarmaSetupViewController',
        'DDO.view.karmasetup.KarmaSetupViewModel',
        'DDO.view.karmasetup.KarmaDataviewCards',
        'DDO.view.karmasetup.KarmaSetupProgressBar'
    ],

    controller: 'karmasetupview',
    viewModel: {
        type: 'karmasetupview'
    },
    items: [{
        xtype: 'karmasetupprogressbar',
        margin: '20 0 20 120'
    }, {
        xtype: 'karmadataviewcards'
    }]
});