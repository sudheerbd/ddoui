Ext.define('TalentAcquisition.view.jobopenings.JobOpeningsMain', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobopenings-main',

    requires: [
        'TalentAcquisition.view.jobopenings.openings.JobOpenings',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails'

    ],

    layout: {
        type: 'fit'
    },
    requires: [

    ],

    //controller: 'executiveplanview',
    viewModel: {
        //type: 'executiveplanview'
    },

    items: [ {
        xtype: 'tabpanel',
        cls: 'goalstab-cls',
        items: [ {
                xtype: "jobopeningsview",
                title: "Job Openings"
            }, {
                title: "Application Details",
                xtype:"applicationdetailsview"
            }]
    }]
});