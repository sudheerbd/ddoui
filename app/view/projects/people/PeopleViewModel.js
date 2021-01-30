/**
 * The file PeopleViewModel is the ViewModel for 'DDO.view.projects.people.PeopleView'.
 * @extends {Ext.app.ViewModel}
 * @alias viewmodel.peopleviewmodel.
 */
Ext.define('DDO.view.projects.people.PeopleViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.peopleviewmodel',

	data: {
		totalPeople: null,
        nonEditEmpSelect:null
	},
    stores: {
        peopleData: {
            type: 'peopleviewstore',          
            scope: this,
            listeners: {
                load: 'onPeopleLoad'
            }
        }
    }
});