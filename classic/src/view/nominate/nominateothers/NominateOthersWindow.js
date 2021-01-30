// /**
//  * The file 'NominateothersWindow' is the window which comes by clicking on the 'Nominate Others' option in the 'Nominate' button.
//  * ViewModel:'DDO.view.profile.nominateview.NominateOthersWindowModel' is the ViewModel of this file.
//  * ViewController:'DDO.view.nominate.NominateOthersWindowController' is the ViewController of this file.
//  */

Ext.define('DDO.view.nominate.nominateothers.NominateOthersWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.nominateotherswindow',
    cls: 'ddo-nomination-window',
    reference: 'nominateWindow',
    constrain: true,

    requires: [
        'DDO.view.nominate.NominateOthersWindowController',
        'DDO.view.nominate.NominateOthersWindowModel',
        'DDO.view.nominate.nominateothers.NominateOthersViewForm'
    ],

    layout: {
        type: 'fit'
    },

    controller: 'nominateotherswindowcontroller',

    viewModel: {
        type: 'nominateotherswindowmodel'
    },

    resizable: false,
    modal: true,
    closable: true,
    
   // bodyPadding: '25 0 30 0',

    cls: 'ddo-rating-window',
    title: 'Nominate Colleagues',
    cls: 'ddo-rating-window',
    height: Constants.ViewportHeight * 0.935,
    width: Constants.ViewportWidth * 0.517,
    items: [{
        xtype: 'nominateothersviewform',
        reference: 'nominateviewform'
    }],
    listeners: {
        /* resize window to center while resizing */

        resize: function (win, width, height, eOpts) {
            win.center();
        },
        resetform: 'onResetValues',
        close: 'onNominateOtherClose',
        beforeclose: 'windowBeforeClose'
    },
    initComponent: function () {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function () {
        var controller = this.getController(),
            empCombo = this.down('combo[reference=employee]');

        if (empCombo) {
            empCombo.clearValue();
        }
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    }
});