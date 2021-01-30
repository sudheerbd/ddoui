Ext.define('DDO.view.projectapproval.ProjectRequestController', {
    extend: 'Ext.app.ViewController',


   onKeyupPeopleSearchBy: function(textfield, e, eOpts) {
       var peopleStore, addPeopleView, searchString,
           searchForm, checkbox,
           groupViewModel, storeCount;

       addPeopleView = this.getView();

       peopleStore = Ext.getStore('scoredetails');

       searchString = textfield.getValue();

       if (peopleStore) {
           peopleStore.filter({
               property: 'employee',
               value: searchString,
               anyMatch: true,
               caseSensitive: false
           });
       }

       searchForm = addPeopleView.down("[reference=peopleSearchForm]");

       checkbox = searchForm.down('[name=allRecords]');

       groupViewModel = addPeopleView.getViewModel();

       storeCount = peopleStore.getCount();

       if (checkbox.checked == true) {
           groupViewModel.set('emloyeeSelectedCount', storeCount);
       }

       groupViewModel.set('emloyeeTotalCount', storeCount);
   },
});