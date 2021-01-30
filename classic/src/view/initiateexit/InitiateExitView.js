/**
 * This view is responsible for Initiate exit process for already existing employee.
 * @class DDO.view.initiateexit.InitiateExitView,
 * @extends Ext.container.Container
 * @alias widget.initiateexitview
 * @viewModel : 'DDO.view.initiateexit.InitiateExitViewModel'
 * @controller : 'DDO.view.initiateexit.InitiateExitController'
 */
Ext.define('DDO.view.initiateexit.InitiateExitView', {
  extend: 'Ext.container.Container',
  alias: 'widget.initiateexitview',
  requires: [
    'DDO.view.initiateexit.InitiateExitForm',
    'DDO.view.initiateexit.InitiateExitViewModel',
    'DDO.view.initiateexit.InitiateExitController'
  ],

  cls: 'initiateView-cls',
  margin: '0 0 0 250',
  viewModel: {
    type: 'initiateexitviewmodel'
  },
  controller: 'initiateexitcontroller',
  layout: {
    type: 'hbox',
    align: 'center'
  },
  items: [
    {
      xtype: "initiateexitform"
    }
  ]
});



