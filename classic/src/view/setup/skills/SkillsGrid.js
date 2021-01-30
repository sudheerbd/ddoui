Ext.define('DDO.view.setup.skills.SkillsGrid',{
    extend : 'Ext.grid.Panel',

    alias:'widget.skillsgrid',

    cls:'karmalist-cls',

    height: Constants.ViewportHeight*0.775,

    width: '100%',

    margin: '0 0 0 10',

    padding:'0px 10px 0px 0px',

    makeDirty:false,
    
    viewConfig:{
        loadMask:true
    },
    store:'skillslist.ProfileSkillsComboStore',
    // autoLoad:true,
     columns:[{
          text:'SkillName',
          dataIndex:'name',
          flex:0.5,
          height:42,
          sortable:true
     }],
     listeners: {
        rowdblclick: 'onGridRowClick'
    }
});