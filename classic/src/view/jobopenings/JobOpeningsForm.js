Ext.define('DDO.view.jobopenings.JobOpeningsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.jobopeningsform',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text'
    ],

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('jobopenings.JobOpenings');

        if (!store.isLoaded()) {
            store.load();
        }
    },

    cls: 'DDO-jobopeningsform-cls',
    margin: '20 20 20 20',

    layout: 'anchor',

    defaults: {
        anchor: '100%',
        editable: false
    },

    defaultType: 'textfield',

    items: [{
        xtype: 'fieldset',
        title: 'Job Summary',
        defaultType: 'textfield',
        layout: 'column',
        defaults: {
            editable: false,
            columnWidth: 0.5,
            margin: '5 0 0 0'
        },
        items: [{
            fieldLabel: 'Department',
            name: 'hr_department_id'
        }, {
            fieldLabel: 'Opening Location',
            name: 'openinglocation'
        }, {
            fieldLabel: 'Designation',
            name: 'hr_designation_id'
        }, {
            fieldLabel: 'Qualification',
            name: 'qualification'
        }, {
            fieldLabel: 'Job Type',
            name: 'wtc_jobtype_id'
        }, {
            fieldLabel: 'Years Of Experience',
            name: 'totalexperience'
        }, {
            fieldLabel: 'Open Positions',
            name: 'numberofopenpositions'
        }]
    }, {
        xtype: 'fieldset',
        title: 'Job Detail',
        layout: 'column',
        defaults: {
            editable: false,
            columnWidth: 1,
            margin: '5 0 0 0'
        },
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Responsibilities',
            name: 'responsibilities'
        }, {
            fieldLabel: 'Primary Skills',
            name: 'primary_skills'
        }, {
            fieldLabel: 'Secondary Skills',
            name: 'secondary_skills'
        }, {
            fieldLabel: 'Effective From Date',
            name: 'effective_fromdate',
            columnWidth: 0.5
        }, {
            fieldLabel: 'Expiration Date',
            name: 'expiration_date',
            columnWidth: 0.5
        }]
    }]
});