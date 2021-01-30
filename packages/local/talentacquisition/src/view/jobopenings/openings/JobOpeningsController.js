Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobopeningscontroller',
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
    onApplicationBtnClick: function(btn, e, eOpts) {
        var record = btn.getWidgetRecord();
        var jobOpeningsMain = this.getView().up('jobopenings-card');            
        var grid = jobOpeningsMain.down('applicationdetailsgrid');
        var collapsiblecontainer = jobOpeningsMain.down('applicationdetailsview').down('collapsiblecontainer');
        var form = this.getView().up('jobopenings-card').down('applicationdetailsform');
            form.reset();
            grid.getStore().removeAll();
            collapsiblecontainer.down('[name=eastpanel]').collapse();
            jobOpeningsMain.down('applicationdetailsview').down('[name=applicationdetailsviewcolps]').getViewModel().set('hideBtn', false);
        Ext.Ajax.request({
                url: '/jobapplication/'+record.get('ddo_jobopenings_id'),
                // url: '/jobapplication/'+ 1,
                method: 'GET',
                success: function(resp, b) {
                    var data = Ext.decode(resp.responseText);
                      grid.getStore().loadData(data.data);
       
                },
                failure: function(resp, b) {
                    var data = Ext.decode(resp.responseText);
                    Ext.getBody().unmask();
                    Ext.toast(data.message, false, 't');
                }
            });       
        jobOpeningsMain.setActiveItem(1);
        collapsiblecontainer.down('button').hide();
        collapsiblecontainer.down('[reference=fbButton]').setHidden(true);
    },
    /*onRecSelect: function(me, record){
        var form = this.getView().up('jobopenings-card').down('applicationdetailsform');
        var grid = this.getView().up('jobopenings-card').down('applicationdetailsgrid');
        grid.getStore().removeAll();
       Ext.Ajax.request({
            url: '/jobapplication/'+record.get('ddo_jobopenings_id'),
            // url: '/jobapplication/'+ 1,
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                  grid.getStore().loadData(data.data);           
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast('Unable to save data',false,'t');
                Ext.toast(data.message, false, 't');

            }
        });
    },*/
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
            grid = view.down('grid');

        params = {
            name:values.name,
            ddo_designation_id:values.ddo_designation_id,
            ddo_jobopenings_id:values.ddo_jobopenings_id,
            ddo_jobeducation_id:values.ddo_jobeducation_id,
            ddo_joblocation_id:values.ddo_joblocation_id,
            ddo_department_id:values.ddo_department_id,
            jobstatus:values.jobstatus,
            openpositions:values.openpositions,
            primaryskills:values.primaryskills,
            responsibilities:values.responsibilities,
            secondaryskills:values.secondaryskills,
            totalexperience:values.totalexperience,
            validfrom:values.validfrom,
            validto:values.validto,
            jobcode:values.jobcode

        };

        Ext.isEmpty(values.ddo_jobopenings_id) ? delete params.ddo_jobopenings_id : console.log("Do nothing");

        form.reset();
        Ext.Ajax.request({
            url: '/jobopenings',
            method: Ext.isEmpty(values.ddo_jobopenings_id)?'POST':'PUT',
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
    },
    onGridDeleteClick: function() {

    	            var view = this.getView(),
    	            grid = view.down('grid'),
                    gridStore = grid.getStore(),
                    rec = gridStore.getAt(rowIndex),//find alt of rowIndex
                    params;

                params = {
                    ddo_jobopenings_id: rec.get('ddo_jobopenings_id')
                };

                Ext.Ajax.request({
                    url: '/jobopenings',
                    method: 'DELETE',
                    params: params,
                    success: function(resp, b) {
                        gridStore.removeAt(rowIndex)
                        gridStore.reload();
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
});
