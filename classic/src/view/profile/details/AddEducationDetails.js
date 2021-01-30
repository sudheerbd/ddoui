/**
 * The file DDO.view.profile.details.AddEducationDetails is the view file for the form view for add education button in the profiles view.
 * @extends {Ext.form.Panel}.
 * @alias 'widget.educationadddetails'.
 * @model : 'DDO.view.education.EducationFormModel'.
 * @controller : 'DDO.view.education.EducationFormController'.
 */
Ext.define('DDO.view.profile.details.AddEducationDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'educationadddetails',
    requires: [
        'DDO.view.education.EducationFormModel',
        'DDO.view.education.EducationFormController',
        'Ext.form.field.Hidden'
    ],
    viewModel: {
        type: 'educationformmodel'
    },
    controller: 'educationformcontroller',
    cls: 'ddo-addeducation-details',
    /**
     * @property {String} operation
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes the value:
     *      - editform - when the form is to be used for edit
     *      - undefined - when it is add form
     */
    operation: undefined,

    items: [
        {
            xtype: 'hiddenfield',
            name: 'ddo_empeducation_id'
        },
      {
        xtype: 'textfield',
        width: '100%',
        name: 'school',
        enforceMaxLength: true,
        maxLength: 40,
        allowBlank: false,
        cls: 'ddo-adddetail-txtfield',
        emptyText:LabelsTitles.PROFILE.EDUCATION.PROVIDESCHOOL
        }, 
    {
        xtype:'combobox',
        editable:false,
        allowBlank: false,
        name:'courseid',
        //required:true,
        width:'100%',
        emptyText:LabelsTitles.PROFILE.EDUCATION.COURSE ,
        queryMode: 'local',
        valueField: 'courseid',
        reference: 'course',
        displayField: 'course',
        labelSeparator: false,
        cls: 'ddo-education-course-combo',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        },
        store: 'coursestore'
    },{
        xtype: 'container',
        margin: '10 10 10 0',
        layout: {
            type: 'hbox'
        },
        items: [
        {
            name: 'fromdateattended',
            xtype: 'combobox',
            editable: false,
            fieldLabel: 'Start Year',
            emptyText: LabelsTitles.PROFILE.EDUCATION.STARTYEAR,
            queryMode: 'local',
            valueField: 'value',
            reference: 'fromdateattended',
            displayField: 'name',
            labelSeparator: false,
            cls: 'ddo-adddetail-combo',
            required:true,
            allowBlank: false,
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            store: 'comboyearstore',
            listeners:{
                change:'educationFromYear'
            }
        }, {
            name: 'todateattended',
            xtype: 'combobox',
            margin: '0 0 0 10',
            editable: false,
            fieldLabel: 'End Year',
            emptyText: LabelsTitles.PROFILE.EDUCATION.ENDYEAR,
            queryMode: 'local',
            valueField: 'value',
            reference: 'todateattended',
            displayField: 'name',
            labelSeparator: false,
            cls: 'ddo-adddetail-combo',
            required:true,
            allowBlank: false,
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            store: 'comboyearstore',
            listeners:{
                change:'educationToYear'
            }
        }]
    }, {
        xtype: 'htmleditor',
        name: 'description',
        labelSeparator: false,
        fieldLabel: 'Description',
        cls: 'ddo-htmleditor-txt',
        listeners: {
            change: function(editor, newValue, oldValue) {
                Utility.validateDescription(editor, newValue, oldValue);
            }
        }
    }],
    buttons: [{
        text: LabelsTitles.PROFILE.EDUCATION.SAVE,
        formBind: true,
        ui: 'formbutton',
        cls: 'ddo-save-btn',
        handler: 'onSaveBtnClick'
    }, {
        text:LabelsTitles.PROFILE.EDUCATION.CANCEL,
        ui: 'formbutton',
        cls: 'ddo-form-btn-cancel',
        handler: 'onCancelBtnClick'
    }]
});