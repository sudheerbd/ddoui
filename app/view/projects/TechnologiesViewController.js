/**
 * The file TechnologiesViewController is the controller for the 'DDO.view.projects.TechnologiesView' and DDO.view.projects.TechnologiesWindow.
 * @extends {Ext.app.ViewController}
 * @alias controller.technologiesviewcontroller.
 */
Ext.define('DDO.view.projects.TechnologiesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.technologiesviewcontroller',
    /**
     * The function onWindowOutsideTap will fired when we chick anywere outside the window in  TechnologiesToolbar.js file.
     * It will close the popup window. 
     * @param {Ext.event.Event} 'event'.
     */
    onWindowOutsideTap: function (event, target) {
        var view = this;
        if (Utility.nominatAlert) {
            Utility.onWindowOutterTap(event, target, view);
        }
    },
    /**
     * The function onAddTechnologyClick will perform  when the 'click' event  is fired from the TechnologiesToolbar.js
     * It will add the Add Technologies window in Technologiesview.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param {object} 'e' .
     * @param {object} 'eOpts' which is the object.
     */
    onAddTechnologyClick: function (btn, e, eopts) {
        try {
            var view = this.getView();
            var technologyWindow = Ext.ComponentQuery.query('technologieswindow')[0] ||
                Ext.create('DDO.view.projects.TechnologiesWindow', {
                    parentViewRef: view,
                });

            technologyWindow.show();
        } catch (err) {
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.TOAST.ADDTECHNOLOGY, err);
        }
    },
    /**
     * The function onTechSubmitClick will perform  when the 'click' event  is fired from the TechnologiesWindow.js
     * It will add the New Technologies  in Technologiesview.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param {object} 'e' .
     * @param {object} 'eOpts' which is the object.
     */
    onTechSubmitClick: function (btn, e, eOpts) {
        try {
            var formValues = btn.up('form').getValues(),
                techDataView = this.getView().parentViewRef.down('technologiesdataview'),
                store = techDataView.getStore('technologiesstore'),
                projectStore = Ext.getStore('projects.ProjectDashboardStore'),
                viewModel = this.getViewModel(),
                record,
                obj = {};
            if (!store.isLoaded()) {
                store.load();
            }
            var parentView = this.getView().parentViewRef.up(),
                projectsView = parentView.up('projectsview'),
                projectViewModel = projectsView.getViewModel(),
                technologyViewModel = this.getViewModel();

            technologyViewModel.set('activeProId', projectViewModel.get('activeProData').project_id);
            obj.projectId = technologyViewModel.get('activeProId');
            obj.name = formValues.technology_name;
            obj.description = formValues.description;
            this.onTechSubmitClickAjax(btn, obj);
        } catch (err) {
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.TOAST.SUBMITTECH, err);
        }
    },
    /**
     * The function onTechSubmitClickAjax is for  ajax call to adding new technology  in Technologiesview.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param {object} 'obj' which is the object .
     */
    onTechSubmitClickAjax: function (btn, obj) {
        var me = this;
        var promiseSubmit = new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: '/projecttechnologies',
                method: 'POST',
                scope: me,
                params: obj,
                success: function (response) {
                    var resolveObj = {};
                    resolveObj.response = response;
                    resolveObj.obj = obj;
                    resolveObj.projectId = obj.projectId;
                    resolve(resolveObj);
                },
                failure: function (resp, b) {
                    reject(resp);
                }
            });
        });
        promiseSubmit.then(function (resolveObj) {
            me.submitFunction(resolveObj);
        }).catch(function (resp) {
            Ext.Msg.alert('failed', Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.ADDING);
            Ext.toast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.ADDING, false, 't');
        });
        btn.up('technologieswindow').close();
        btn.up('form').reset();
    },
    /**
     * This Function will be called when Ajax call is successfull to add the technology.
     * @param {object} 'resolveObj' which is the object .
     */
    submitFunction: function (resolveObj) {
        var data = Ext.decode(resolveObj.response.responseText),
            dataview = this.getView().parentViewRef.down('technologiesdataview');
        dataviewStore = dataview.getStore();
        dataviewStore.getProxy.extraParams = {
            'projectId': resolveObj.projectId
        }
        Ext.apply(dataviewStore.getProxy().extraParams, resolveObj.obj);
        dataviewStore.load();
        dataview.refresh();
        Ext.Msg.alert('success', data.message);
    },
    /**
     * The function onDataItemDeleteClick will perform when the event 'itemclick' event is being fired in the TechnologiesDataView.
     * @param {Ext.view.View} 'view' it contain the main view of TechnologiesDataView.
     * @param {Ext.data.Model} 'record' The selected record.
     * @param {Number} 'index' The index within the store of the selected record
     * @param e - The click event
     * @param eOpts -Object 
     */
    onDataItemDeleteClick: function (view, record, item, index, e, eOpts) {
        try {
            var me = this,
                viewModel = this.getViewModel(),
                rec = viewModel.get('rec'),
                store, projectStore;
            Ext.Msg.confirm("Confirm", "Are you sure you want to delete this Technology?", function (btnText) {
                if (btnText === "no") { //do nothing
                } else if (btnText === "yes") {
                    var techDataView = this.getView().down('technologiesdataview'),
                        store = techDataView.getStore('technologiesstore');
                    if (!store.isLoaded()) {
                        store.load();
                    }
                    projectStore = Ext.getStore('projects.ProjectDashboardStore');
                    var params = {
                        technologyId: record.data.ddo_project_technology_id
                    }
                    store.remove(record);
                    this.onDataItemDeleteClickAjax(params, projectStore);
                }
            }, this);
        } catch (err) {
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.TOAST.DELETETECH, err);
        }
    },
    /**
     * The function onDataItemDeleteClickAjax is for  ajax call to delete the technology in Technologiesview.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param {object} 'obj' which is the object .
     */
    onDataItemDeleteClickAjax: function (params, projectStore) {
        var me = this;
        var promiseDelete = new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: '/projecttechnologies',
                method: 'DELETE',
                scope: me,
                params: params,
                success: function (response) {
                    var resolveObj = {};
                    resolveObj.response = response;
                    resolveObj.projectStore = projectStore;
                    resolve(resolveObj);
                },
                failure: function (resp, b) {
                    reject(resp);
                }
            });
        });
        promiseDelete.then(function (resolveObj) {
            me.deleteFunction(resolveObj);
        }).catch(function (resp) {
            Ext.Msg.alert('failed', Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.DELETE);
            Ext.toast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.DELETE, false, 't');
        });
    },
    /**
     * This Function will be called when Ajax call is successfull to delete the technology.
     * @param {object} 'resolveObj' which is the object .
     */
    deleteFunction: function (resolveObj) {
        var data = Ext.decode(resolveObj.response.responseText),
            msg = Ext.decode(resolveObj.response.responseText).message,
            dataview = this.getView().down('technologiesdataview'),
            dataviewStore = dataview.getStore();
        dataviewStore.load();
        resolveObj.projectStore.load();
        dataview.refresh();
        Ext.Msg.alert('success', msg);
    },
    /**
     * The function onSearchText will perform when the  'keyup' event of the textfield is fired in the  TechnologiesToolbar.js file.
     * It will search the technologies based on entered text.
     * @param {Ext.form.field.File} 'field' which is the form field.
     * @param e - The click event
     * @param eOpts -Object 
     */
    onSearchText: function (field, e, eOpts) {
        try {
            console.log(this);
            var techDataView = this.getView().down('technologiesdataview'),
                store = techDataView.getStore('technologiesstore');
            if (!store.isLoaded()) {
                store.load();
            }
            searchString = field.getValue();
            if (searchString) {
                store.clearFilter(true);
                store.filter({
                    property: 'name',
                    value: searchString,
                    anyMatch: true,
                    caseSensitive: false
                });
            } else if (searchString.length == 0) {
                store.clearFilter(true);
                store.load();
                this.getView().down('technologiesdataview').refresh();
            }
        } catch (err) {
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.TECHNOLOGIES.TOAST.SEARCH, err);
        }
    },
    /**
     * The function setingProjectId will perform when the  'activate' event is fired in the  TechnologiesView.js file.
     * It will set the project id.
     * @param eOpts -Object 
     */
    setingProjectId: function (newActiveIte, eOpts) {
        var technologiesVM = this.getViewModel();
        // this.getViewModel().getStore('technologiesstore');
        // var pro_id = technologiesVM.get('projectId');
        var view = this.getView().down('technologiesdataview');
        var pro_id = newActiveIte.up('projectsview').selectedProjectId;
        var technologiesStore = technologiesVM.getStore('technologiesstore')
        technologiesStore.getProxy().extraParams.projectId = pro_id;

       
        technologiesStore.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    view.getStore().setData(records);
                } else {
                 Ext.Msg.alert('Failed','unable to laod store')         
                       }
            }
        });
    }
});