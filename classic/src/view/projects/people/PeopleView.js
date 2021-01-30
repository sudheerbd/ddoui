/**
 * The file PeopleView is the view file of the projects in the 'DDO.view.projects.ProjectsTabsDetailsView'.
 * @extends {Ext.container.Container}.
 * @alias widget.peopleview.
 * ViewModel : 'DDO.view.projects.people.PeopleViewModel'.
 * ViewController : 'DDO.view.projects.people.PeopleViewController'.
 */
Ext.define('DDO.view.projects.people.PeopleView', {
    extend: 'Ext.container.Container',
    alias: 'widget.peopleview',
    requires: [
        'DDO.view.projects.people.PeopleForm',
        'DDO.view.projects.people.PeopleDataView',
        'DDO.view.projects.people.PeopleViewController',
        'DDO.view.projects.people.PeopleViewModel'
    ],
    cls:'people-ct-cls',
    width: '100%',
    controller: 'peopleviewcontroller',
    viewModel: {
        type: 'peopleviewmodel'
    },
    padding:'0 21', 
    items: [{
        xtype:'peopleform'
    },{
        xtype:'peopledataview'        
    }]    
});