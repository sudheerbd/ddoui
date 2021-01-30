Ext.define('DDO.view.feeds.FeedsMenuImage', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.feedsmenuimage',

    cls: 'profile-menu-cls',

    requires: [
        'DDO.view.feeds.FeedsMenuController',
        'DDO.view.feeds.FeedsMenuModel',
        'DDO.view.feeds.FeedsEditWindow'
    ],

    width: 55,
    // height: 65,

    autoShow: true,

    controller: 'feedsmenucontroller',

    viewModel: {
        type: "feedsmenumodel"
    },

    items: [{
        text: 'Edit',
        cls: 'profile-menu-edit-cls',
        listeners: {
            click: 'onEditClick'
        }
    }, {
        text: 'Delete',
        cls: 'profile-menu-delete-cls',
        listeners: {
            click: 'onDeleteClick'
        }
    }]
});