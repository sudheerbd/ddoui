/**
 * The file ProfileSkillsForm is the form view file to add the skills in the user profile.
 * @extends {Ext.form.Panel}.
 * @alias 'widget.profileskillsform'
 * @controller DDO.view.skillslist.ProfileSkillsController
 */
Ext.define('DDO.view.profile.details.ProfileSkillsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.profileskillsform',

    reference: 'profileskillsform',
    viewModel: {
        type: "profileskills",
      },

    scrollable: 'y',
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },

    defaults: {
        border: false,
        xtype: 'panel'
    },


    items: [{
        xtype: 'container',
        layout: 'hbox',
        padding:20,
        items: [{
            xtype: 'combo',
            fieldLabel: LabelsTitles.PROFILE.PROFILESKILLS.COMBOLABEL,
            name: 'skillid',
            labelSeparator: '',
            allowBlank: false,
            editable: true,
            queryMode: 'local',
            forceSelection: true,
            reference: 'skillidRef',
            bind: {
                store: '{profileskillscombo}',
                value: '{skillId}'
            },
            typeAhead:true,
            minChars:1,
            width: '40%',
            cls: 'md-combo-cls',
            valueField: 'ddo_skills_id',
            displayField: 'name',
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            listeners: {
                change: 'onSkillsComboChange'
            }
        }, {
            xtype: 'combo',
            fieldLabel: LabelsTitles.PROFILE.PROFILESKILLS.RATINGLABEL,
            name: 'rating',
            allowBlank: false,
            editable:false,
            forceSelection: true,
            reference: 'ratingRef',
            // margin: '10 0',
            labelSeparator: '',
            store: ['1', '2', '3', '4', '5'],
            width: '40%',
            cls: 'md-combo-cls',
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            bind: {
                value: 'rating'
            }
        },
    {
        xtype:'checkbox',
        name : 'primarycheck',
        reference : 'primarycheck',
        inputValue : 'Y',
        boxLabel : 'primary',
        labelAlign : 'top',
        width:'30%',
        cls : 'rule-check-cls',
        bind: {
            value: '{isPrimaryChecked}'
        },
        listeners : {
           change : 'onSkillCheckChange'
        }
    }]
    }, {
        xtype: 'toolbar',
        cls: 'skill-form-toolbar',
        dock: 'bottom',
        items: [
            '->', {
                xtype: 'button',
                ui: 'formbutton',
                text: 'Save',
                formBind: true,
                cls: 'ddo-save-btn',
                handler: 'onSaveClick'
            }, {
                xtype: 'button',
                ui: 'formbutton',
                cls: 'ddo-form-btn-cancel',
                text: 'Cancel',
                handler: 'onCancelClick'
            }
        ]
    }]
});
