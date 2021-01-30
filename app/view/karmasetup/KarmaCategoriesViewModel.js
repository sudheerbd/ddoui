/**
 * The file KarmaCategoriesViewModel is the view model for DDO.view.karmasetup.KarmaCategories.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.karmacategoriesviewmodel'.
 */
Ext.define('DDO.view.karmasetup.KarmaCategoriesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmacategoriesviewmodel',
     data:{
		karmarulesavebutton:true,
        gridCheckBox : false,
        ruletypeHidden : true,
        search:true
	}
});
