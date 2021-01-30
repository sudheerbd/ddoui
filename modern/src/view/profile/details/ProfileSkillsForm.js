Ext.define('DDO.view.profile.details.ProfileSkillsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.profileskillsform',

    requires: [
        'DDO.view.profile.details.ProfileSkillsFormController',
        'DDO.view.profile.details.ProfileSkillsFormModel'
    ],

    reference: 'profileskillsform',

    controller: 'profileskillsformcontroller',

    viewModel: {
        type: 'profileskillsformmodel'
    },

    scrollable: false,

    layout: {
        type: 'vbox'
    },

    operation: 'addform',

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    cls: 'ddo-skills-form',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-profileskillsform-toolbar',
        items: [{
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addjobscontainer-backbtn',
            handler: 'onCancelTap'
        }, '->', {
            xtype: 'label',
            cls: 'ddo-profileskillsform-addskills',
            html: 'Add Skill'
        }, '->', {
            text: 'Save',
            disabled: true,
            reference: 'savebutton',
            cls: 'ddo-profileskillsform-savebtn',
            handler: 'onSaveTap'
        }]
    }, {
        xtype: 'container',
        padding: '20px 10px 10px',
        items: [{
            xtype: 'selectfield',
            placeHolder: 'Skill',
            autoSelect: false,
            required: true,
            cls: 'ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
            store: 'profileskillscombo',
            name: 'skill',
            value: '',
            valueField: 'skill_id',
            displayField: 'skill_name',
            listeners: {
                change: 'onTextChange'
            }
        }, {
            xtype: 'selectfield',
            required: true,
            placeHolder: 'Rating',
            cls: 'ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
            value: '',
            name: 'Rating',
            options: [{
                text: '1',
                value: '1'
            }, {
                text: '2',
                value: '2'
            }, {
                text: '3',
                value: '3'
            }, {
                text: '4',
                value: '4'
            }, {
                text: '5',
                value: '5'
            }],
            listeners: {
                change: 'onTextChange'
            }
        }, {
            xtype: 'label',
            html: 'Attended Period',
            cls: 'ddo-profileskillsform-datelabel'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'datepickerfield',
                reference: 'startdate',
                required: true,
                itemId: 'startdate',
                cls: 'ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
                width: '47%',
                name: 'startDate',
                placeHolder: 'First used date',
                dateFormat: 'F Y',
                picker: {
                    xtype: 'datepicker',
                    slotOrder: ["month", "year"],
                    value: (new Date()), // use this if you DON'T want/have a value in the actual input
                    yearFrom: (new Date()).getFullYear(),
                    yearTo: 1970
                },
                listeners: {
                    'change': 'onStartDate'
                }

            }, {
                xtype: 'spacer',
                width: '6%',
                cls: 'ddo-date-spacer'
            }, {
                xtype: 'datepickerfield',
                reference: 'enddate',
                required: true,
                itemId: 'enddate',
                cls: 'ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
                width: '47%',
                name: 'endDate',
                placeHolder: 'Last used date',
                dateFormat: 'F Y',
                picker: {
                    xtype: 'datepicker',
                    slotOrder: ["month", "year"],
                    value: (new Date()), // use this if you DON'T want/have a value in the actual input
                    yearFrom: (new Date()).getFullYear(),
                    yearTo: 1970
                },
                listeners: {
                    'change': 'onEndDate'
                }
            }]
        }, {
            xtype: 'textareafield',
            clearIcon: false,
            grow: true,
            required: true,
            name: 'selfcomments',
            placeHolder: 'Self Comments',
            cls: 'ddo-mobile-textfield-cls',
            listeners: {
                keyup: 'onTextChange'
            }
        }, {
            xtype: 'textareafield',
            clearIcon: false,
            placeHolder: 'Certification (Optional)',
            cls: 'ddo-mobile-textfield-cls',
            name: 'certification'
        }]
    }]
});