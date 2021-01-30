Ext.define('DDO.store.projects.people.PeopleViewStore', {
    extend: 'Ext.data.Store',

    alias: 'store.peopleviewstore',

    requires: [
        'DDO.model.projects.people.PeopleModel'
    ],

    model: 'DDO.model.projects.people.PeopleModel',

    proxy: {
        type: 'ajax',
        url: Api.URL.peopleviewstore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },

    groupField: 'projectroleid',
    // sorters: [
    //        {
    //            // Sort by first letter of second word of spirit animal, in descending order
    //            sorterFn: function(record1, record2) {
    //                var projectrole = record1.data.projectrole;
    //                return  (projectrole != "Others" ) ? 0 : -1;
    //            },
    //            direction: 'ASC'
    //        }
    //    ],
   /* sorters: [{
        property: "projectroleid",
        direction: "ASC"
    }],*/

    listeners: {
        beforeload: function(store, record, evt) {
            var mainView = Ext.ComponentQuery.query('mainviewport')[0],
            projectsView = Ext.ComponentQuery.query('projectsview')[0],
                peopleProjectId = mainView.getViewModel().get('projectId') 
                   || projectsView.selectedProjectId,

                params = {
                    projectId: peopleProjectId
                };

            store.getProxy().setExtraParams(params);
            Utility.projectPeopleId = peopleProjectId;
        }
    }
});