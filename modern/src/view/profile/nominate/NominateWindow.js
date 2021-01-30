Ext.define('DDO.view.profile.nominate.NominateWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nominatewindow',

    fullscreen: true,
    height: '100%',
    width: '100%',

    //margin: '100 0 0 0',
    scrollable: false,

    requires: [
        'DDO.view.profile.nominate.NominateForm',
        'DDO.view.profile.nominate.NominateFormModel',
        'DDO.view.profile.nominate.NominateFormViewController'
    ],


    controller: 'nominateformcontroller',

    viewModel: {
        type: 'nominateformmodel'
    },


    cls: 'ddo-mobile-rating-window',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-nominate-toolbar',
        bind: {
            title: '{nominateTitle} - {profileName}'
        },
        items: [{
            xtype: 'button',
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addjobscontainer-backbtn',
            listeners: {
                tap: 'onRatingFormCancel'
            }
        }]
    }, {
        xtype: 'ratingform'
    }]
});