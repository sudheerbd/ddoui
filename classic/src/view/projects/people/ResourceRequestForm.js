/**
 * The file ResourceRequestForm is the form panel which contains combobox and resource button on the Project Request view.
 * @extends {Ext.form.Panel}
 * @alias 'widget.resourcerequestform'.
 * ViewModel : 'DDO.view.projects.people.ResourceRequestViewModel'.
 * ViewController : 'DDO.view.projects.people.ResourceRequestController'.
 */
Ext.define('DDO.view.projects.people.ResourceRequestForm', {
  extend: 'Ext.form.Panel',

  alias: 'widget.resourcerequestform',

  requires: [
    'Ext.toolbar.Spacer'
  ],
  initComponent: function() {
    this.callParent(arguments);
    var projectRequestVM = this.up('projectrequest').getViewModel();
    var projectListStore = projectRequestVM.getStore('projectListStore');
    if (!projectListStore.isLoaded()) {
      projectListStore.load();
    }
  },
  bind: {
    hidden: '{searchForm}'
  },
  defaults: {
    padding: '0 0 20 20'
  },
  cls: 'group-form-cls',

  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      cls: 'choose-project-main',

      items: [{
        xtype: 'combobox',
        emptyText: LabelsTitles.RESOURCEREQUEST.EMPTYSEARCH,
        allowBlank: false,
        editable: true,
        name: 'choose_project',
        labelAlign: 'top',
        reference: 'projectselect',
        queryMode: 'local',
        forceSelection: true,
        bind: {
          store: '{projectListStore}',
          value: '{employeeData.project_id}'
        },
        displayField: 'name',
        valueField: 'ddo_project_id',
        cls: 'choose-project-cls',
        listeners: {
          select: 'onSelectProject',
          beforequery: 'onEmployeeComboSearch'
        }
      },
        {
          xtype: 'button',
          text: LabelsTitles.RESOURCEREQUEST.RESOURCE,
          reference: 'add_to_project',
          iconCls: 'x-fa fa-plus-circle',
          cls: 'addpeople-cls',
          disabled: true,
          listeners: {
            click: 'onClickButtonResource'
          }
        }]
    }
  ]
});