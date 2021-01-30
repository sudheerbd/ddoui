Ext.define('DDO.view.jobopenings.JobOpeningsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.jobopeningswindow',

    reference: 'jobopeningswindow',

    requires: [
        'DDO.view.jobopenings.JobOpeningsForm',
        'DDO.view.jobopenings.JobOpeningsViewModel'
    ],

    viewModel: {
        type: 'jobopeningsviewmodel'
    },

    scrollable: 'y',

    layout: 'anchor',

    defaults: {
        anchor: '100%'
    },

    modal: true,
    height: 590,
    width: 810,

    cls: 'ddo-jo-window',

    bind: {
        title: '{jobCode}'
    },

    items: [{
        xtype: 'jobopeningsform',
        reference: 'jobopeningsform'
    }]
});