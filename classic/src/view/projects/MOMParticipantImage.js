Ext.define('DDO.view.projects.MOMParticipantImage', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.momparticipantimage',

    requires: [
        'DDO.view.projects.MOMMenuParticipantView'
    ],

    cls: 'mom-participant-image-cls',

   
    items: [{
        plain: true,
        xtype: 'mommenuparticipantview'
    }]
});