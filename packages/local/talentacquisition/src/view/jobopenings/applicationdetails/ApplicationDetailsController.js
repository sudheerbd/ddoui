Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationdetailscontroller',
    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){
        var view = this.getView(),
            collapsiblecontainer = view.down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]'),
            form = view.down('form').getForm();
        form.reset();
        form.setValues(record.data);
        collapsiblecontainer.setFbButtonHide(false);
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    },
    onBackButtonClick: function(){
        this.getView().up('jobopenings-card').setActiveItem(0);
    },
    onViewCVBtnClick: function(btn) {
        var me = this,
            view = me.getView(),
            cvpath = view.lookupReference('cvpath').getValue(),
             downloadablePath = window.location.origin +'/'+ cvpath;
        if(Ext.isEmpty(cvpath)){
            Ext.toast('CV does not exits', false, 't');
        }else{
            window.open(downloadablePath);
        }
    }
});
