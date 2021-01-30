/**
 * The file ProjectRequest is the view file for the Resource Request.
 * @extends {Ext.Container}
 * @alias 'widget.projectrequest'
 * ViewModel : 'DDO.view.projects.people.ResourceRequestViewModel'.
 * ViewController : 'DDO.view.projects.people.ResourceRequestController'.
 */
Ext.define('DDO.view.projectrequest.ProjectRequest', {
  extend: 'Ext.Container',
  requires: [
    'DDO.ux.window.FormPanel',
    'DDO.view.projects.people.ResourceRequestForm',
    'DDO.view.projects.people.ResourceRequestController',
    'DDO.view.projects.people.ResourceRequestViewModel',
    'DDO.view.projects.people.ResourceRequestList',
  ],
  controller: 'resourcerequestcontroller',
  viewModel: {
    type: 'resourcerequestviewmodel'
  },
  cls: 'project-request-form-cls',
  xtype: 'projectrequest',
  items: [{
    xtype: 'form',
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox'
      },
      items: [{
        xtype: 'container',
        flex: 1,
        items: [
          {
            xtype: 'resourcerequestform',
            reference: 'peopleSearchForm'
          },
          {
            xtype: 'resourcerequestlist',
            bind: {
              store: '{allocationProjectStore}'
            },
            reference: 'peoplesearchview',
            height: Constants.ViewportHeight * 0.58,
            scrollable: true
          },
          {
            xtype: 'resourcerequestlist',
            bind: {
              store: '{peopleViewStore}'
            },
            reference: 'peoplesearchviewadv',
            hidden: true,
            height: Constants.ViewportHeight * 0.58,
            scrollable: true
          }
        ]
      }]
    },],

    tbar: [
      {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
          margin: '10 70 10 70'
        },
        items: [
          {
            xtype: 'radiofield',
            boxLabel: LabelsTitles.RESOURCEREQUEST.NEWALLOCATION,
            reference: 'newAllocationRadio',
            inputValue: '1',
            checked: true,
            listeners: {
              change: 'onSelectNewAllocation'

            }
          }, {
            xtype: 'radiofield',
            boxLabel: LabelsTitles.RESOURCEREQUEST.UPDATEALLOCATION,
            reference: 'updateAllocationRadio',
            inputValue: '1',
            listeners: {
              change: 'onClickUpdateAllocation'
            }
          }]
      }
    ],
    bbar: [
      {
        xtype: 'container',
        layout: 'hbox',
        items: [
          {
            xtype: 'button',
            text: 'Request',
            handler: 'onAddToProjectClick',
            disabled: true
          }

        ]
      }

    ],
  }],
});