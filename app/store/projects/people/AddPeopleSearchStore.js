Ext.define('DDO.store.projects.people.AddPeopleSearchStore', {
    extend: 'Ext.data.Store',
 
     alias: 'store.addpeoplesearchstore',
     requires:['DDO.model.projects.people.AddPeopleSearchModel'],
     model:'DDO.model.projects.people.AddPeopleSearchModel',
    //  proxy:{
    //      type:'memory',
    //      reader:{
    //          type:'json'
    //      }
    //  }
});