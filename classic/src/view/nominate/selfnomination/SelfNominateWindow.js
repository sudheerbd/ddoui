/**
*   This file is responsible for SelfNominateWindow.
*   ViewModel :  'DDO.view.nominate.SelfNominateWindowModel'
*   ViewController : 'DDO.view.nominate.SelfNominateWindowController'.
*/
Ext.define('DDO.view.nominate.selfnomination.SelfNominateWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.selfnominatewindow',
  reference: 'selfnominateWindow',
  closable: true,
  constrain: true,
  requires: [
    'DDO.view.nominate.selfnomination.SelfNominateViewGrid',
    'DDO.view.nominate.SelfNominateWindowModel',
    'DDO.view.nominate.SelfNominateWindowController',
    'DDO.view.nominate.selfnomination.SelfNominationPage'
  ],
  cls: 'ddoRatingSelfwindow',
  controller: 'selfnominatewindowcontroller',
  viewModel: {
    type: 'selfnominatewindowmodel'
  },
  header: true,
  title: LabelsTitles.NOMINATION.SELFNOMINATE,
  resizable: false,
  layout: 'fit',
  maxHeight: Constants.ViewportHeight * 0.83,
  scrollable: true,
  modal: true,
  width: Constants.ViewportWidth * 0.57,
  items: [{
    // xtype: 'tabpanel',
    cls: 'wallethistorytab-cls',
    tabBar: {
      layout: {
        pack: 'center'
      },
      flex:1
    },
    items: [{
      // title: LabelsTitles.NOMINATION.SELFNOMINATE,
      xtype: 'selfnominationpage',
      name: 'selfnominationpage',
    // },
    // {
      // title: LabelsTitles.NOMINATION.SENTBACKNOMINATION,
      // xtype: 'nominateothersviewform',
      // xtype: 'selfnominateviewgrid',
      // bind: {
      //   store: '{sentBackNominationsStore}'
      // },
      // listeners: {
      //   rowclick: 'onSentbackGridRowClick'
      // }
    //   listeners: {
    //             click: 'onNominateBtnClick'
    //         }
    }
],
    // listeners: {
    //   tabchange: 'onSelfNominationTabChange'
    // }
  }],
  bbar: {
    cls: 'nom-toolbar-cls',
    height: 60,
    items: [{
      xtype: 'tbfill'
    }, {
      xtype: 'button',
      reference: 'Approval',
      width: '150px',
      text: LabelsTitles.NOMINATION.SENDAPPROVAL,
      cls: 'approval',
      reference: 'approval',
      margin: "0 30 0 0",
      bind: {
        disabled: '{selfNomSubBtn}',
        hidden: '{selfNomSubBtnHide}'
      },
      listeners: {
        click: 'onApprovalBtn'
      }
    }]
  },
  listeners: {
    resize: function (win, width, height, eOpts) {
      win.center();
    },
    // focusleave: function( comp, event, eOpts ){
    //   debugger;
    //   if(event.fromComponent.reference == this.reference){
    //     comp.close();
    //   }
    // },
    close: 'onNominateWindowClose',
    beforeclose: 'windowBeforeClose'
  },
  initComponent: function () {
    this.callParent(arguments);
    var controller = this.getController();
    Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    var empStore = Ext.getStore('projects.EmpNamesStore');
    if (empStore && !empStore.isLoaded()) {
      empStore.sort('user_full_name', 'ASC');
      empStore.load();
    }
  },
  destroy: function () {
    var controller = this.getController();
    Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
  }
});