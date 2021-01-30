Ext.define('DDO.view.karmareport.KarmaReportForm', {
  extend: 'Ext.container.Container',
  alias: 'widget.karmareportform',
  requires: [

  ],
  margin: '36 0 0 5',
  height: 70,
  // cls:'karmareportform-cls',
  layout: 'hbox',
  items: [
    {
      xtype: 'textfield',
      emptyText: LabelsTitles.KARMAREPORT.SEARCHEMPLOYEE,
      //  cls:'karmareporttxtfield-cls',
      width: Constants.ViewportWidth * 0.365,
      enableKeyEvents: true,
      triggers: {
        clear: {
          cls: Ext.baseCSSPrefix + 'fa fa-close',
          hidden: true,
          handler: "onClearIcon"
        },
        search: {
          cls: Ext.baseCSSPrefix + 'fa fa-search'
        }
      },
      listeners: {
        change: "onSearchEmployee",
      }
    },
    {
      xtype: 'button',
      cls: 'karmareportbtn-cls',
      iconCls: 'x-fa fa-angle-down',
      listeners: {
        click: 'onclickbtnkarmareport'
      }
    },
    {
      xtype: 'button',
      text: LabelsTitles.KARMAREPORT.CLEARFILTER,
      cls: 'karmareportclearbtn-cls',
      listeners: {
        click: 'onClearFilterBtnClick'
      }
    },
    {
      xtype: 'button',
      text: LabelsTitles.KARMAREPORT.DOWNLOAD,
      cls: 'karmareportdownloadbtn-cls',
      listeners: {
        click: 'onDownloadExcelBtnClick'
      }
    }
  ]
});