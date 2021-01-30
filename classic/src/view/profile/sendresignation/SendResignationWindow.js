 /**
 * This view is responsible for displaying Send resignation view and reletated scope of activity.
 * @class 'DDO.view.profile.sendresignation.SendResignationWindow'
 * @extends 'Ext.window.Window'
 * @alias 'view.sendresignationwindow'
 * @Controller 'DDO.view.profile.sendresignation.SendResignationWindowController'
 */
Ext.define('DDO.view.profile.sendresignation.SendResignationWindow', {
  extend: 'Ext.window.Window',
  alias:'view.sendresignationwindow',
  requires: [
    'DDO.view.profile.sendresignation.SendResignationWindowController'
  ],
  xtype: 'resignationwindow',
  height: Constants.ViewportHeight * 0.465,
  width: Constants.ViewportWidth * 0.293,
  resizable: true,
  modal: true,
  controller: 'resignationwindowcontroller',
  items: [{
    xtype: 'form',
    reference: 'resignationform',
    bodyPadding: 15,
    bbar: {
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      padding: '10 3 20 3',
      items: [{
        xtype: 'button',
        text: LabelsTitles.PROFILE.OK,
        handler: 'Onresignationok',
        cls: 'send-resignation',
        formBind: true
      }, {
        xtype: 'button',
        text: LabelsTitles.PROFILE.CANCEL,
        handler: 'Onresignationcancel',
        cls: 'send-resignation',

      }]
    },
    items: [{
      xtype: 'fieldcontainer',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'right'
      },
      scrollable: true,
      items: [{
        xtype: 'textarea',
        enforceMaxLength: true,
        allowBlank: false,
        maxLength: 600,
        name: 'reason',
        emptyText: LabelsTitles.PROFILE.WRITESOMETHING,
        fieldLabel: LabelsTitles.PROFILE.REASON,
        labelSeparator: ':',
        labelAlign: "top",
        cls: 'user-profile-sendresignation-txtfield-cls '
      }]
    }]
  }]
});