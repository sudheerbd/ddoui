/**
 * The file AddEducationDetails is the view file for the add education in the profileview.
 * @extends {Ext.form.Panel}
 * @alias 'widget.addeducationdetails'.
 */
Ext.define('DDO.view.profile.details.AddEducationDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addeducationdetails',

    reference: 'addeducationdetails',

    requries: [
        'DDO.view.profile.details.EducationFormViewController',
        'DDO.view.profile.details.EducationFormViewModel'
    ],

    layout: {
        type: 'vbox'
    },

    scrollable: false,
    cls: 'addeducationdetails-cls',

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },

    controller: 'educationformviewcontroller',

    viewModel: {
        type: 'educationformviewmodel'
    },

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    /**
     * @property {String} operation
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes the value:
     *      - editform - when the form is to be used for edit
     *      - undefined - when it is add form
     */
    operation: undefined,

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-addeducation-toolbar',
        bind: {
            title: '{educationFormTitle}'
        },
        items: [{
            xtype: 'button',
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addeducation-backbtn',
            listeners: {
                tap: 'onBackFormBtnClick'
            }
        }, {
            xtype: 'spacer'
        }, {
            xtype: 'button',
            text: LabelsTitles.PROFILE.ADDEDUCATION.SAVE,
            disabled: true,
            reference: 'savebutton',
            itemId: 'savebutton',
            ui: 'savebutton',
            cls: 'ddo-addeducation-savebtn',
            handler: 'onSaveFormBtnClick'
        }]
    }, {
        xtype: 'container',
        padding: '20px 10px 10px',
        items: [{
            width: '100%',
            required: true,
            name: 'school_college',
            enforceMaxLength: true,
            maxLength: 40,
            allowBlank: false,
            xtype: 'textfield',
            clearIcon: false,
            cls: 'ddo-mobile-textfield-cls',
            placeHolder: 'School/College',
            listeners: {
                keyup: 'onTextEnter'
            }
        }, {
            xtype: 'selectfield',
            required: true,
            placeHolder: 'Degree',
            autoSelect: false,
            editable: false,
            name: 'hr_degrees_id',
            required: true,
            width: '100%',
            emptyText: LabelsTitles.PROFILE.ADDEDUCATION.EMPTYCOURSE,
            queryMode: 'local',
            valueField: 'hr_degrees_id',
            reference: 'course',
            displayField: 'name',
            labelSeparator: false,
            cls: 'ddo-education-course-combo ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
            store: 'coursestore',
            listeners: {
                change: 'onTextEnter'
            }
        }, {
            xtype: 'selectfield',
            required: true,
            placeHolder: 'Year of Passing',
            autoSelect: false,
            reference: 'yearofpassing',
            name: 'year_of_passing',
            editable: false,
            queryMode: 'local',
            valueField: 'value',
            displayField: 'name',
            labelSeparator: false,
            label: 'Year of Passing',
            labelWidth: 150,
            cls: 'ddo-education-course-combo ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
            store: 'comboyearstore',
            listeners: {
                change: 'onTextEnter'
            }
        }, {
            xtype: 'textareafield',
            clearIcon: false,
            name: 'remark',
            labelSeparator: false,
            placeHolder: 'Description',
            cls: 'ddo-mobile-textfield-cls ddo-startdate-datepickerfield',
            listeners: {
                change: function(editor, newValue, oldValue) {
                    Utility.validateDescription(editor, newValue, oldValue);
                }
            }
        }]
    }]
});