/**
 *   This file  is responsible for SearchRoleForm.
 *   @extends {Ext.form.Panel}
 *   @alias widget.searchroleform
 *   ViewModel: 'DDO.view.groups.GroupsWindowViewModel',.
 *   ViewController :'DDO.view.groups.GroupsWindowViewController'.
 */
Ext.define('DDO.view.projects.people.SearchRoleForm', {
  extend: 'Ext.form.Panel',
  alias: 'widget.searchroleform',
  requires: [
    'Ext.toolbar.Spacer'
  ],
  layout: {
    type: 'hbox'
  },
  margin: '20 10 0 30',
  cls: 'group-form-cls',
  items: [{
    xtype: 'tbfill'
  }, {
    xtype: 'textfield',
    reference: 'searchrole',
    enableKeyEvents: true,
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.SRCHROLE,
    cls: 'ddo-role-search-text ',
    name: 'taskname',
    enforceMaxLength: true,
    width: Constants.ViewportWidth * 0.11,
    maxLength: 400,
    listeners: {
      keyup: 'onKeyupRoleSearchBy'
    }
  }, {
    xtype: 'button',
    width: Constants.ViewportWidth * 0.008,
    height: Constants.ViewportHeight * 0.016,
    bind: {
      disabled: '{disableFormFields}'
    },
    cls: 'role-search-icon-field'
  }, {
    xtype: 'button',
    width: Constants.ViewportWidth * 0.008,
    height: Constants.ViewportHeight * 0.016,
    cls: 'clearsearchrole-cls x-fa fa-times',
    bind: {
      hidden: '{getGroupSearchField}',
      disabled: '{disableFormFields}'
    },
    listeners: {
      click: 'onCloseIconClick'
    }
  }]
});