Ext.define('DDO.view.setup.skills.SkillsViewController',{
extend:'Ext.app.ViewController',

alias :'controller.skillsviewcontroller',

onAddNewClick:function(btn,event){
    var view = this.getView();
    var skillswindow = Ext.ComponentQuery.query('skillswindow')[0] ||
        Ext.create('DDO.view.setup.skills.SkillsWindow',{
            parentViewRef : view
        }),
        form = skillswindow.down('form');

    // this.onMakeFormLoadTrue(form);
    form.reset();
    skillswindow.show();
    skillswindow.edit = false;
},
onGridRowClick: function(row, record, tr, rowIndex, e, eOpts){
    var view = this.getView();
    var skillswindow = Ext.ComponentQuery.query('skillswindow')[0] ||
    Ext.create('DDO.view.setup.skills.SkillsWindow',{
        parentViewRef : view
    }),
    form = skillswindow.down('form');
    form.reset();
    form.loadRecord(record);
    skillswindow.show();
    skillswindow.edit = true;
},
onSearchSkills: function (textfield, e, eOpts) {
    var store =this.getView().down('skillsgrid').getStore(),
           // grpView = this.getView().parentViewRef,
           searchString = textfield.getValue();
           if (!store.isLoaded()) {
               store.load();
           }
          if (store) {
           store.filter({
               property: 'name',
               value: searchString,
               anyMatch: true,
               caseSensitive: false
           });
      }
       else if (searchString.length == 0) {
           store.clearFilter(true);
           store.load();
           this.getView().down('skillsgrid').refresh();
       }
 
}
});