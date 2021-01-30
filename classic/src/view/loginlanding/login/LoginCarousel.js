Ext.define('DDO.view.loginlanding.LoginCarousel', {
    extend: 'Ext.container.Container',
    xtype: 'loginCarousel',
    cls:'img-cls',

    requires: [
        // 'DDO.view.loginlanding.Greeting',
        // 'DDO.view.loginlanding.LoginHeader',
        // 'DDO.view.loginlanding.createaccount.CreateAccountWindow'
        'DDO.view.loginlanding.login.LoginCarouselController'
    ],
   controller:'logincarousel',
//    layout:'vbox',
    items:[{
        xtype: 'image',
        src:'../resources/images/Assets for Slider/1.png'
},{
    xtype:'panel',
    layout:{
      type:'vbox',
      pack:'center',
      align:'center'
    },
    reference:'textpanel',
    html:'Track the Karma Score of Employee'
},{
    xtype:'container',
    cls:'circle-icon',
    reference:'iconcontainer',
    layout:'hbox',
    defaults:{
        xtype:'button',
        handler:'onIconClick',
        toggleGroup:'mybutton',
        margin:'0px 0px 0px 10px',
        iconCls:'fa fa-circle-o'
    },
    items:[{
        itemId: 'p1',
        pressed:true
    },{
        itemId: 'p2'
    },{
        itemId: 'p3'
    },{
        itemId: 'p4'
    }]
        
}]
    
});
