Ext.define('TalentAcquisition.view.jobeducation.JobEducationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobeducationcontroller',
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
    onFormSaveClick: function() {
     var view = this.getView(),
         form = view.down('form'),
         values = form.getValues(),
         grid = view.down('grid'),
         store = grid.getStore(),
         record;
         values.name = values.name.trim();
         if (!Ext.isEmpty(store)) {
                 if (Ext.isEmpty(values.ddo_jobeducation_id)) {
                     for (var i = 0; i < store.data.length; i++) {
                         if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                             Ext.toast('record already exits', false, 't');
                             break;
                         } else {
                             params = {
                                name:values.name,
                                description:values.description,
                                ddo_jobeducation_id:values.ddo_jobeducation_id
                            };
                             form.reset();
                             Ext.Ajax.request({
                                 url: '/jobeducation',
                                 method: Ext.isEmpty(values.ddo_jobeducation_id)?'POST':'PUT',
                                 params: params,
                                 success: function(resp, b) {
                                     grid.getStore().reload();
                                     Ext.getBody().unmask();
                                     var data = Ext.decode(resp.responseText);
                                     Ext.toast(data.message, false, 't');

                                 },
                                 failure: function(resp, b) {
                                     Ext.getBody().unmask();
                                     var data = Ext.decode(resp.responseText);
                                     Ext.toast(data.message, false, 't');

                                 }
                             });
                            break;
                         }
                     }
                 } else if (!Ext.isEmpty(values.ddo_jobeducation_id)) {
                     params = {
                        name:values.name,
                        description:values.description,
                        ddo_jobeducation_id:values.ddo_jobeducation_id
                    };
                     form.reset();
                     Ext.Ajax.request({
                         url: '/jobeducation',
                         method: Ext.isEmpty(values.ddo_jobeducation_id)?'POST':'PUT',
                         params: params,
                         success: function(resp, b) {
                             grid.getStore().reload();
                             Ext.getBody().unmask();
                             var data = Ext.decode(resp.responseText);
                             Ext.toast(data.message, false, 't');
                         },
                         failure: function(resp, b) {
                             Ext.getBody().unmask();
                             var data = Ext.decode(resp.responseText);
                             Ext.toast(data.message, false, 't');
                         }
                     });
                }
            }
     /*params = {
         name:values.name,
         description:values.description,
         ddo_jobeducation_id:values.ddo_jobeducation_id,
     };
     form.reset();
     Ext.Ajax.request({
         url: '/jobeducation',
         method: Ext.isEmpty(values.ddo_jobeducation_id)?'POST':'PUT',
         params: params,
         success: function(resp, b) {
             grid.getStore().reload();
             Ext.getBody().unmask();
             var data = Ext.decode(resp.responseText);
             Ext.toast(data.message, false, 't');

         },
         failure: function(resp, b) {
             Ext.getBody().unmask();
             var data = Ext.decode(resp.responseText);
             Ext.toast(data.message, false, 't');

         }
     });*/
    }
});
