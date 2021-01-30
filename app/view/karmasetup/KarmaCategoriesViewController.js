/**
 * The file KarmaCategoriesViewController is the view controller for DDO.view.karmasetup.KarmaCategories.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.karmacategoriesviewcontroller'.
 */
Ext.define('DDO.view.karmasetup.KarmaCategoriesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmacategoriesviewcontroller',

    /**
    * This is the handler for the click event of the Add categories.
    * It will open the form panel then we can add record.
    * @param {button} - The add button reference.    
    * @param {e} - The click event
    * @param {eOpts} -Object    
    */
    onAddNewClick: function(btn, e, eOpts) {
        try{
            var view = this.getView();
        var ruleWindow = Ext.ComponentQuery.query('rule')[0] || Ext.create('DDO.view.karmasetup.window.RuleWindow',{
            parentViewRef : view
        }),
            form = ruleWindow.down('form');
        var checkBoxItem = ruleWindow.getViewModel();
        checkBoxItem.set('checkBoxHidden', false);
        checkBoxItem.set('ruletypeHidden', true);
        form.reset();
        ruleWindow.setTitle(LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMACATEGORIES.TITLE);
        ruleWindow.show();
        ruleWindow.getViewModel().set('karmarulesavebutton', true);
        ruleWindow.edit = false;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.ADDCLICK, err);
        }
    },
    /**
    * This is the handler for the row double click event for display propmpted data in form.
    * It will open the form panel with selected record data.
    * @param {grid} - The grid list reference.
    * @param {record} - The grid selected record.
    * @param {tr} - The TR element for the cell. 
    * @param {rowIndex} - Number(row index number).   
    * @param {e} - The click event
    * @param {eOpts} -Object    
    */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        try{
            var view = this.getView();
        var ruleWindow = Ext.ComponentQuery.query('rule')[0] || Ext.create('DDO.view.karmasetup.window.RuleWindow',{
            parentViewRef : view
        }),
            form = ruleWindow.down('form');
        var checkBoxItem = ruleWindow.getViewModel();
        checkBoxItem.set('checkBoxHidden', false);
        checkBoxItem.set('ruletypeHidden', true);
        ruleWindow.setTitle(LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMACATEGORIES.TITLE);
        ruleWindow.show();
        form.reset();
        form.loadRecord(record);
        ruleWindow.getViewModel().set('karmarulesavebutton', true);
        ruleWindow.edit = true;
        }catch(err){
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.GRIDROWCLICK, err);
        }
    }
});