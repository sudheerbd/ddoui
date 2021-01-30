/**
 * The file KarmaDataviewCards is the view file for the card layout in the karma set up view.
 * @extends {Ext.container.Container}.
 * @alias 'widget.karmadataviewcards'.
 * @viewmodel 'DDO.view.karmasetup.KarmaDataCardsViewModel'
 */
Ext.define('DDO.view.karmasetup.KarmaDataviewCards', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmadataviewcards',

    width: '100%',
    minWidth: Constants.ViewportWidth * 0.365,

    padding:'0px 21px 0px 10px',

    requires: [
        'DDO.view.karmasetup.wallet.WalletView',
        'DDO.view.karmasetup.KarmaIconView',
        'DDO.view.karmasetup.KarmaRule',
        'DDO.view.karmasetup.KarmaCategories',
        'DDO.view.karmasetup.karma.Karma',
        'DDO.view.karmasetup.karmaaccess.KarmaAccessView',
        'DDO.view.karmasetup.KarmaDataCardsViewModel'
    ],
    viewModel: {
        type: 'karmadatacardsviewmodel'
    },
    layout: {
        type: 'card'
    },

    items: [{
        xtype: 'walletview'
    }, {
        xtype: 'karmaiconview'
    }, {
        xtype: 'karmarule'
    }, {
        xtype: 'karmacategories'
    }, {
        xtype: 'karma'
    }, {
        xtype: 'karmaaccessview'
    }]
});