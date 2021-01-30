Ext.define('DDO.view.karmaapproval.KarmaRejectForm',{
    extend: 'Ext.form.Panel',

    alias :'widget.karmarejectform',

    width: Constants.ViewportWidth * 0.4,

    // margin: '10 10 10 10',
items:[{
    xtype:'fieldcontainer',
    layout:'vbox',

    items:[{
         xtype: 'fieldcontainer',
        layout: 'hbox',
        // margin : 10,
        items:[{
            xtype:'displayfield',
            fieldLabel:'From  ',
            reference:'employeename',
            cls:'ddo-rejectkarma-cls',
            height:30,
            flex:0.3,
            // labelAlign: 'top'
        },
    {
        xtype:'displayfield',
        fieldLabel:'Month  ',
        reference: 'karmaRejectDate',
        format: 'F,Y',
        cls:'ddo-rejectkarma-cls',
        height:30,
        flex:0.3,
        //  labelAlign: 'top',
    }]
    }],
    items:[{
         xtype:'fieldcontainer',
        layout:'hbox',
       margin:10,
       items:[{
        xtype:'displayfield',
        fieldLabel:'Karma Name',
        // reference:'employeename',
        height:30,
        cls:'ddo-rejectkarma-cls',
        flex:0.3,

        // labelAlign: 'top'
       },{
        xtype:'displayfield',
        fieldLabel:'KarmaPoints',
        // reference: 'karmaRejectDate',
        // format: 'F,Y',
        cls:'ddo-rejectkarma-cls',
        flex:0.3,
        height:30,
        // labelAlign: 'top'
       }]
    }]
}]
});