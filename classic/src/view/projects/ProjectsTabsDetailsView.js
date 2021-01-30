/**
 *   This file is responsible for ProjectsTabsDetailsView.
 *   @extends {Ext.container.Container}
 *   @alias widget.projectstabsdetailsview
 */
Ext.define('DDO.view.projects.ProjectsTabsDetailsView', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.projectstabsdetailsview',
    // cls: 'projecttabs-detailview-cls',
    activeTab:null,
    requires: [
        'DDO.view.projects.NotesView',
        'DDO.view.projects.MOMView',
        'DDO.view.projects.people.PeopleView',
        'DDO.view.projects.TechnologiesView',
        'DDO.view.projects.MOMActionItems',
        'DDO.view.projects.ActionItemView'
    ],
    // layout: {
    //     type: 'card'
    height:'100%',
    width:'100%',
    // },
    cls: 'tab-panel-project-view-cls',
 
    items: [{
         title: 'Notes',
        xtype: 'notesview',
        itemId: 'notes',
        tabConfig: {
            listeners: {
                activate: function() {
                    var projectsView = this.up('projectsview');
                    var b = projectsView.down('projectstabsdetailsview').down('notesview').down('notesdataview');
                    var store = b.getStore();
                    store.getProxy().extraParams.projectId = projectsView.selectedProjectId;
                //    var momStore = Ext.getStore('projects.MOMViewStore');
                //    momStore.getProxy().extraParams.projectId = projectsView.selectedProjectId;
                // if(projectsView.selectedProjectId != null){
                //    var params;
                //     params = {
                //         projectId: projectsView.selectedProjectId
                //     };


                store.load({
                    // params: {
                    //     projectId: projectsView.selectedProjectId
                    // },
                    callback: function(records, operation, success) {
                        if (success == true) {
                        
                            b.refresh();
                        }else{
                            Ext.Msg.alert('Failed','Unable to load the mom store');
                        }
                    }
                });
                   
                    // Ext.Ajax.request({
                    //     url: '/projectNote',
                    //     method: 'GET',
                    //     scope: this,
                    //     params: params,
                    //     success: function (response) {
                    //         //debugger
                    //         var data = Ext.decode(response.responseText);
                    //         //   var vm = this.up('projectstabsdetailsview').down('actionitemview').down('momActionItems').getViewModel();
                    //           var noteStore = Ext.getStore('goalNoteStore');
                    //           noteStore.reload();
                    //           Ext.getBody().unmask();
                    //           Utility.showToast("Successfully Fetched");
                    //       },
                    //       failure: function (data) {
                    //           debugger;
                    //         Ext.getBody().unmask();
                    //         Utility.showToast("Something went wrong while fetching the notes", data.message);
                    //       }
                    //     });
                //}
                }
            }
        }
    }, {
        title: 'MoM',
        xtype: 'momview',
        itemId: 'mom',
        tabConfig: {
            listeners: {
                activate: function( eOpts) {
                   var projectsView = this.up('projectsview');
                   var momStore = Ext.getStore('projects.MOMViewStore');
                   momStore.getProxy().extraParams.projectId = projectsView.selectedProjectId;
                //    ctrl.redirectTo('projectdetails/' + window.location.hash.split('/')[1] + "/mom");
                // if(!momStore.isLoaded()){

                   momStore.load({
                    // params: {
                    //     projectId: projectsView.selectedProjectId
                    // },
                    callback: function(records, operation, success) {
                        if (success == true) {
                        // Ext.getStore('projects.MOMViewStore').load({
                        //     params: {
                        //         projectId: projectsView.selectedProjectId
                        //     }
                        // });
                        var momview = Ext.ComponentQuery.query('momcmpview')[0];
                        momview.refresh();
                        }else{
                            Ext.Msg.alert('Failed','Unable to load the mom store');
                        }
                    }
                });
               // }
            }

            }
        }
    },  {
        title: 'Action Items',
        xtype: 'actionitemview',
        itemId: 'action',
        tabConfig: {
            listeners: {
                activate: function() {
                    var projectsView = this.up('projectsview');
                    var store = Ext.getStore('momActionItemsStore');
                    store.getProxy().extraParams.projectId = projectsView.selectedProjectId;
                    Ext.getBody().mask('Loading');
                //    ctrl.redirectTo('projectdetails/' + window.location.hash.split('/')[1] + "/actionitemview");
                   store.load({
                    // params: {
                    //     projectId: projectsView.selectedProjectId
                    // },
                    callback: function(records, operation, success) {
                        if (success == true) {
                        // Ext.getStore('projects.MOMViewStore').load({
                        //     params: {
                        //         projectId: projectsView.selectedProjectId
                        //     }
                        // });

                        var actionItems = Ext.ComponentQuery.query('momActionItems')[0];
                        actionItems.down('grid').getStore().setData(records);
                        actionItems.down('grid').getView().refresh();
                        Ext.getBody().unmask();

                        // actionItems.refresh();
                        }else{
                            Ext.Msg.alert('Failed','Unable to load the mom store');
                            Ext.getBody().unmask();
                        }
                    }
                });
                //    'projectdetails/' + window.location.hash.split('/')[1] + '/' + btn.text.toLowerCase()
                //    Ext.Ajax.request({
                //     url: '/projectmom/getActionItems',
                //     method: 'GET',
                //     scope: this,
                //     success: function (response) {
                //         var data = Ext.decode(response.responseText);
                //           var vm = this.up('projectsview').down('actionitemview').down('momActionItems').getViewModel();
                //           var actionStore = vm.getStore('momActionItemsStore');
                //           actionStore.reload();
                //           Ext.getBody().unmask();
                //           Utility.showToast("Successfully Fetched");
                //       },
                //       failure: function (data) {
                //         Ext.getBody().unmask();
                //         Utility.showToast("Something went wrong while fetching the actionitem", data.message);
                //       }
                //     });
            }
        }
     }
       
    },{
        xtype: 'peopleview',        
        itemId: 'people',
        title: 'People',
        tabConfig: {
            listeners: {
                activate: function() {
                    var projectsView = this.up('projectsview');
                //    var peopleStore = Ext.getStore('peopleviewstore');
                // var peopleview = Ext.ComponentQuery.query('peopleview')[0];
                var peopleview = projectsView.down('projectstabsdetailsview').down('peopleview')

                var peopleStore = peopleview.down('peopledataview').getStore('peopleviewstore');


                //    peopleStore.getProxy().extraParams.projectId = projectsView.selectedProjectId;
                   peopleStore.load({
                    callback: function(records, operation, success) {
                        if (success == true) {
                        // Ext.getStore('projects.MOMViewStore').load({
                        //     params: {
                        //         projectId: projectsView.selectedProjectId
                        //     }
                        // });
                        // var peopleview = Ext.ComponentQuery.query('peopleview')[0];
                        peopleview.down('peopledataview').refresh(); 
                        peopleStore.filterBy(function (record) {
                            if (record.data.status != "Past resources") {
                              return true;
                            }
                          });
                        peopleview.getViewModel().set('totalPeople', peopleStore.getData().items.length);
 

                        }else{
                            Ext.Msg.alert('Failed','Unable to load the people store');
                        }
                    }
                });
                    //peopleviewstore
                    // var ctrl = this.up('projectstabsview').up('projectsview').getController('projectsviewcontroller');
                    // ctrl.redirectTo('projectdetails/' + window.location.hash.split('/')[1] + "/people");
                }
            }
        }
    },{
        xtype: 'technologiesview',
        itemId: 'technologies',
        title: 'Technologies'
        // tabConfig: {
        //     listeners: {
        //         click: function() {
        //             var ctrl = this.up('projectstabsview').up('projectsview').getController('projectsviewcontroller');
        //             ctrl.redirectTo('projectdetails/' + window.location.hash.split('/')[1] + "/technologies");
                 
        //         }
        //     }
        // }
    }]

  
        
});