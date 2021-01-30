/**
 * The file HelpMenuView is the panel data of the Help View.
 * @extends {Ext.panel.Panel}
 * @alias 'widget.helpmenuview'.
 * ViewModel : 'DDO.view.help.HelpMenuViewModel'.
 * ViewController : 'DDO.view.help.HelpMenuViewController'.
 */
Ext.define('DDO.view.help.HelpMenuView', {
    extend: 'Ext.container.Container',
    alias: 'widget.helpmenuview',

    requires: [
        'DDO.view.help.HelpMenuViewModel',
        'DDO.view.help.HelpMenuViewController'
    ],

    margin: '0 0 0 0',

    cls: 'help-panel-cls',

    controller: 'helpmenuviewcontroller',
    viewModel: {
        type: 'helpmenuviewmodel'
    },
    items:[
      {
        xtype: 'toolbar',
        // dock :'top',
        cls: 'help-toolbar-cls',
        width: '100%',
        height: 50,
        html:  LabelsTitles.HELP.HELPTOOLBAR
      },{
          xtype:'panel',
          title: LabelsTitles.HELP.HELPTITLE,
          width : '100%',
          bind: {
            html: '{htmlText}'
        },
    
      }
    ],
  
   

    listeners: {
        render: 'OnHelpRender'
    }
});
