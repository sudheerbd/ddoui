/**
 * The file PeopleForm is the form file of the people view in the 'DDO.view.projects.people.PeopleView'.
 * @extends {Ext.container.Container}.
 * @alias widget.peopleform.
 * ViewModel : 'DDO.view.projects.people.PeopleViewModel'.
 * ViewController : 'DDO.view.projects.people.PeopleViewController'.
 */
Ext.define('DDO.view.projects.people.PeopleForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.peopleform',
    layout: {
        type: 'hbox',
        align: 'center'
    },
    cls: 'people-form-cls',
    margin: '0 10 0 0',
    defaults: {
        margin: 5
    },
    width: Constants.ViewportWidth * 0.59,
    items: [{
        xtype: 'checkbox',
        reference: 'resourceCheckbox',
        fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PEOPLE.RESOURCE ,
        cls:'resource-check-cls',
        listeners:{
            change: 'resourcesUnChecked',
            afterrender: 'resourcesChecked'
        }
    } ,{
        xtype: 'button',
        text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PEOPLE.ADDPEOPLE ,
        hidden:true,
        bind: {
            // hidden: '{projectNewResources}'
        },
        cls: 'projects-add-btn',
        listeners: {
            click: 'onClickAddPeopleBtn'
        }
    }, {
        xtype: 'button',
        cls: 'total-btn-cls',
        reference: 'peoplebutton',
        width: Constants.ViewportWidth * 0.074,
        bind: {
            text: 'Total: {totalPeople}'
        }
    }, {
        xtype: 'textfield',
        reference: 'searchpeople',
        enableKeyEvents: true,
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PEOPLE.SEARCHPPL,
        cls: 'ddo-people-text ',
        name: 'taskname',
        enforceMaxLength: true,
        width: Constants.ViewportWidth * 0.22,
        maxLength: 400,
        listeners: {
            change:'onKeyupPeopleSearch'
        }
    }, {
        xtype: 'button',
        width: Constants.ViewportWidth * 0.008,
        height: Constants.ViewportHeight * 0.02,
        cls: 'people-search-icon-field'
    }]
});
