 /**
 * This is controller for view 'DDO.view.widget.karmascore.KarmaScore'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.karmascore'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmascore',

    /**
     * This method handles the click event of karmascore detail button.
     * Shows a window listing all the karmascores with filtering feature.
     * @param {btn} Object, The detail button reference
     * @param {e} Object, The click event object
     *
     */

     
    onDetailClick: function(btn, e) {
        try {
            Constants.SHOWMASK = true;
            this.redirectTo('karmascore');
        } catch (err) {
            Utility.showToast(Messages.HOME.DETAILCLICK, err);
        }
    },

    /**
     * This method handles the click event on the employee name of
     * karmascore list.
     * @param {karmalist} Object, The reference object of the karamascore list
     * @param {record} Object, The selected record object
     */
    onKarmaItemClick: function(karmalist, record, item, index, e, eOpts) {
        try {
            // redirecting to the selected user's profile
            Ext.getBody().mask('');
            this.redirectTo('profile/' + record.data.c_bpartner_id);
        } catch (err) {
            Utility.showToast(Messages.HOME.KARMAITEMCLICK, err);
        }
    },

    /**
     * This method handles the selection operation of karma score combobox.
     * @param {combo} Object, The reference object of the combobox
     * @param {record} Object, The selected record object
     */
    onComboSelection: function (combo, record) {
        try {
            var me = this;
            var mask = new Ext.LoadMask({
                msg: '',
                target: me.getView().down('karmascorelist')
            });
            mask.show();
            var selectedRecord = record.data.ddo_designation_id != 0 ? record.data.ddo_designation_id : null;
            var store = me.getViewModel().get('scoredetails') || me.getViewModel().getStore('scoredetails');  
            var isFilter = selectedRecord ? true : false;
            if (selectedRecord == -1) {
                selectedRecord = null;
                isFilter = false;
            }
            store.getProxy().extraParams = {
                designation: selectedRecord,
                designationFilter: isFilter
            };
            Ext.Ajax.request({
                url: '/workdetails/selectedDesignation',
                scope: this,
                method: 'PUT',
                params: {
                    selectedDesig: record.data.ddo_designation_id
                },
                success: function (conn, response) {
                    store.load({
                        scope: me,
                        callback: function (records, operation, success) {
                            if(records[0] && records[0].data.potentialkarma){
                                me.getViewModel().set("designationPotential", store.totalCount);
                                mask.hide();
                            }
                            else{
                                me.getViewModel().set("designationPotential", 0);
                                mask.hide();
                            }
                        }
                    });

                },
                failure: function (conn, response) {
                    mask.hide();
                }
            })
        } catch (err) {
            Utility.showToast(Messages.HOME.COMBOSELECTION, err);
        }
    },
    
    /**
     * This method handles the render time operation of score combobox.
     * @param {cmp} Object, The reference object of the combobox.
     */
    onComborender: function (cmp) {
        try {
            var store = Ext.getStore('setup.designation.DesignationStore');
            var designation,
                me = this;
            me.cmp = cmp;
            store.on("load", function (st, records, successful, operation, eOpts) {
                st.add({
                    "acronym": null,
                    "ddo_designation_id": -1,
                    "ddo_dup_designation_id": false,
                    "description": null,
                    "name": "ALL"
                });
                var designationid = Ext.getStore("login").getAt(0).get('designation');
                Ext.Ajax.request({
                    url: '/workdetails/selectedDesignation',
                    scope: this,
                    method: 'GET',
                    success:function(response,err){
                    var responseText= Ext.decode(response.responseText);
                    var selectedDesignation = responseText.data[0].selecteddesignation;
                        if (selectedDesignation == -1) {
                            designation = -1;
                        } else if (selectedDesignation) {
                            designation = selectedDesignation;
                        } else {
                            designation = -1;
                        }
                        selectedRec = st.findRecord('ddo_designation_id', designation);
                        if (!Ext.isEmpty(selectedRec) && selectedRec != -1) {
                            this.cmp.fireEvent('select', this.cmp, selectedRec);
                        }
                        cmp.setValue(designation);

                    },failure:function(){
                        Ext.Msg.alert('Status', 'failed to get the recors');
                    }
                })
            }, me);
            store.load();
        } catch (err) {
            Utility.showToast(Messages.HOME.COMBORENDER, err);
        }
    }
});