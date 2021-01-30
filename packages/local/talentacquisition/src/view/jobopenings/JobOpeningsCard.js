Ext.define('TalentAcquisition.view.jobopenings.JobOpeningsCard', {
    extend: 'Ext.container.Container',
    requires: [
    'TalentAcquisition.view.jobopenings.openings.JobOpenings',
    'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails'

    ],
    alias: 'widget.jobopenings-card',
    layout: {
        type: 'card',
        activeItem:0
    },
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            items: [{
                xtype: "jobopeningsview"
            },  {
                xtype: 'applicationdetailsview'
            }
            ]
        });
        me.callParent( arguments );
    },
    listeners:{activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('[name=filterColumn]').reset()
        }}
    
});
