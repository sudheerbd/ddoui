Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobinterviewstatuscontroller',
    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
            if(!Ext.isEmpty(eastpanel)){
                eastpanel.toggleCollapse();
            }
    },
    onWindowOutsideTap:function(){

    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    }, 
    onFormSaveClick:function(){
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if(!Ext.isEmpty(store) ){
            record = store.findExact('name',values.name);
            if(record == -1){
                record = store.findExact('name',values.name.toUpperCase());
                if(record == -1){
                    record = store.findExact('name',values.name.toLowerCase());
                }
            }
            if(record!= -1 && Ext.isEmpty(values.ddo_jobinterviewstatus_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }else if(record!= -1 && !Ext.isEmpty(values.ddo_jobinterviewstatus_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }
        }

        params = {
            name:values.name,
            description:values.description,
            ddo_jobinterviewstatus_id:values.ddo_jobinterviewstatus_id,
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobinterviewstatus',
            method: Ext.isEmpty(values.ddo_jobinterviewstatus_id)?'POST':'PUT',
            params: params,            
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
    }
});
