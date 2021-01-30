/**
 * The file 'DDO.view.profile.nominateview.SelfNominateViewFormModel' is the viewModel for the 'DDO.view.nominate.selfnomination.SelfNominateViewForm'
 */
Ext.define('DDO.view.profile.nominateview.SelfNominateViewFormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.selfnominateviewformmodel',
    requires:['DDO.model.profile.SelfNominateModel',
            'DDO.store.profile.SelfNominateStore',
            'DDO.store.loginlanding.Login',
            'DDO.model.karmasetup.SelfkarmaCategoriesModel',
            'DDO.store.karmasetup.SelfKarmaCategoriesStore',
            'DDO.store.karmasetup.KarmaSelfNominateStore'],

    data :{
        loggedInUserFullName : '',
        karmaComboValue: null,
        nomBtn: false
    },

	stores:{
		selfNominate:{
			type:'selfkarmacategoriesstore',
			listeners: {
                beforeload: function(){
                    // // debugger;
                    // var selfStore = Ext.getStore('selfstore');
                 // console.log(selfStore);
                }
            }
	
		},
        selfNominateCombo:{
            type:'karmaselfnominatestore'
        }
	}


});