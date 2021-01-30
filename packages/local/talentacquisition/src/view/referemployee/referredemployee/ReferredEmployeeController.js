Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referredemployeecontroller',

    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){

        var view = this.getView(),
            form = view.down('form').getForm(),
            applicationStatus = record.getData().ddo_jobapplicationstatus_id;
            collapsiblecontainer = view.down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]');
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
         this.getView().down('collapsiblecontainer').getViewModel().set('hideBtn', false);
            if(!Ext.isEmpty(eastpanel)){
                eastpanel.toggleCollapse();
            }
        collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(true);
            if(!Ext.isEmpty(applicationStatus)){
                var rejectBtn =  view.down('form').down('button[text=Reject]'),
                    convertBtn =  view.down('form').down('button[text=Convert]');
                if (applicationStatus == 5){
                    Ext.Msg.alert('Info', 'You have already rejected this application');
                   rejectBtn.disable();
                   convertBtn.disable();
                } else {
                   rejectBtn.enable();
                   convertBtn.enable();
                }
            }

    },
    onConvertToApplication: function(){

        var view = this.getView();
        var values = view.down('collapsiblecontainer').down('referredemployeeform').getValues();
        var activeForm = view.setActiveItem(1);        
        values.firstname=values.candidatename;
        values.mobilenumber= values.phone;
        values.ddo_jobapplicationstatus_id='';
        activeForm.getForm().setValues(values);

    },
    eastContainerCollapse: function() {

        var view = this.getView(),
            collapsibleContainer = view.down('collapsiblecontainer');
            collapsibleContainer.down('button[iconCls=rule-plus]').disable();
            eastpanel = collapsibleContainer.down('[name=eastpanel]'); 
        view.down('form').reset();
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    }, 
    onFormSaveClick: function() {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid');
       // values.ddo_jobapplicationstatus_id = 5;
       var dd = Ext.getStore('jobapplicationstatusstore');
       dd.findExact('name','Offer Rejected');
       var kk = dd.findExact('name','Offer Rejected');
       var rec = Ext.getStore('jobapplicationstatusstore').getAt(kk);
       var status_id = rec.data.ddo_jobapplicationstatus_id;
       values.ddo_jobapplicationstatus_id = status_id;
        if(values.ddo_jobopenings_id=='0'){
            values.ddo_jobopenings_id=''
        }
        Ext.Msg.confirm('Info.', 'Are you sure you want to reject this application?',
            function(choice) {
                if (choice === 'yes') {
                    form.reset();
                    Ext.Ajax.request({
                        url: '/employeereferral',
                        method: 'PUT',
                        params: values,
                        success: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            grid.getStore().reload();
                            Ext.getBody().unmask();
                            Ext.toast('The application has been rejected', false, 't');
                            //me.onSetActiveItem(0);
                        },
                        failure: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        }
                    });
                    collapsibleContainer = view.down('collapsiblecontainer');

                    eastpanel = collapsibleContainer.down('[name=eastpanel]');
                    view.down('form').reset();
                    if (!Ext.isEmpty(eastpanel)) {
                        eastpanel.toggleCollapse();
                    }
                }
            });

    }
});