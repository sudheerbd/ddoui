/**
 * This Class is used for common toolbar actions throughout the karma setup.
 * @class DDO.view.karmasetup.toolbar.RuleToolbar
 * @extends {Ext.toolbar.Toolbar}
 * @alias widget.ruletoolbar
 */
Ext.define('DDO.view.karmasetup.toolbar.RuleToolbar', {
  extend: 'Ext.toolbar.Toolbar',

  alias: 'widget.ruletoolbar',

  cls: 'rule-tb-cls',

  items: [{
    xtype: 'tbfill'
  }, {
    xtype: 'textfield',
    cls:'karma-search-cls',
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.SEARCH,
    width: Constants.ViewportWidth*0.183,
    bind: {
      hidden: '{search}'
    },
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
      change: "onKarmaSearch"
    }
  }, {
    xtype: 'button',
    text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.WALLET.ADDNEW,
    iconCls: 'rule-plus',
    margin: 0,
    cls: 'rule-add-btn',
    listeners: {
      click: 'onAddNewClick'
    }
  }]
});