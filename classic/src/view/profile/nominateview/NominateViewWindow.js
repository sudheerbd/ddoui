 /**
 * This view is responsible for displaying Nominate other form in nominate other window.
 * @class 'DDO.view.profile.nominateview.NominateViewWindow'
 * @extends 'Ext.window.Window'
 * @alias 'nominateviewwindow'
 * @ViewModel 'DDO.view.profile.nominateview.NominateViewWindowModel'
 * @Controller 'DDO.view.profile.nominateview.NominateViewWindowController'
 */
Ext.define('DDO.view.profile.nominateview.NominateViewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.nominateviewwindow',

    reference: 'nominateviewwindow',

    requires: [
        'DDO.view.nominate.nominateothers.NominateOthersViewForm',
        'DDO.view.profile.nominateview.NominateViewWindowModel',
        'DDO.view.profile.nominateview.NominateViewWindowController'
    ],

    layout: {
        type: 'fit'
    },
    constrain : true,
    controller: 'nominateviewwindowcontroller',

    viewModel: {
        type: 'nominateviewwindowmodel'
    },

    resizable: false,
    modal: true,
    closable: true,

    bind: {
        title: '{nominateTitle} <span class="nom-name-cls">{profileName}</span>'
    },

    cls: 'ddo-rating-window',
    height: Constants.ViewportHeight * 0.80,
    width: Constants.ViewportWidth * 0.523,
    items: [{
        // xtype: 'nominateviewform',
        xtype: 'nominateothersviewform',
        reference: 'nominateviewform'
    }],
    listeners: {
        /* resize window to center while resizing */

        resize: function(win, width, height, eOpts) {
            win.center();
        },
        beforeclose : 'windowBeforeClose'
    },
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getStore('karmasetup.KarmaStore').load();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    }
});
