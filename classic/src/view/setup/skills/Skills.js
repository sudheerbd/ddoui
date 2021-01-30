Ext.define('DDO.view.setup.skills.Skills',{

extend : 'Ext.container.Container',

alias : 'widget.skillsview',

cls:'skillsview-cls',

requires:[
    'DDO.view.setup.department.DepartmentToolbar',
    'DDO.view.setup.skills.SkillsGrid',
    'DDO.view.setup.skills.SkillsViewController',
    'DDO.view.setup.skills.SkillsWindow'],

    controller : "skillsviewcontroller",
    initComponent:function(){
        this.callParent(arguments);
          var store = Ext.getStore('skillslist.ProfileSkillsComboStore');
          if(!store.isLoaded()){
            store.load();
        }
    },
items:[{
    xtype: 'container',
    width:'100%',
    height:'100%',
    layout: 'vbox',
    pack: 'center',
    items:[
        {
            xtype: 'departmenttoolbar',
            cls: 'wallet-toolbar-cls',
            width: '100%',
            height: Constants.ViewportHeight*0.11,
            html: '<h3>Skills</h3>'
        },
        {
            xtype: 'textfield',
            emptyText: 'Search by skill name',
            width: '25%',
            margin: '0px 0px 10px 15px',
            height:'50%',
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
            change: "onSearchSkills",
            }
        }
    ]
},
{
    xtype:'skillsgrid'
}]
});