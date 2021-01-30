Ext.define('DDO.view.projects.ActionItemView', {
    extend: 'Ext.container.Container',

    alias: 'widget.actionitemview',
    requires:[
        'DDO.view.projects.MOMActionItems',
        'DDO.view.projects.MomActionItemTool',
        'DDO.view.projects.MOMProject',
        'DDO.view.projects.MomActionBottomPanel'
    ],
    // height: '100%',
    // width: ''
    items: [{
           xtype: 'momactionitemtool'
    },
    {
        xtype: 'momActionItems',
        cls:'actionitem',
        width: '100%'
         
    },
    {
        xtype: 'momactionbottompanel',
        cls:'follow-up-panel'
        // margin: '0px 0px 0px 10px'
        // width: '100%'
         
    }
    
    ]
});