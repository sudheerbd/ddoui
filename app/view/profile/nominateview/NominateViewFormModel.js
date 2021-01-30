Ext.define('DDO.view.profile.nominateview.NominateViewFormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.nominateviewformmodel',
     requires:['DDO.model.profile.SentBackNominationModel'],
    data: {
        categoryName:null,
        category:null,
        karmascore:5,
        ratingView: true,
        ruleView: true,
        minChars: 20,
        karmaId: null,
        ratingId: null,
        ruleId: null,
        points: 0,
        areaTxt: true,
        categoryComboValue: null,
        karmaComboValue: null,
        iconSelection: null,
        karmaUnits: null,
        nomSubBtn: true,
        nomBtn: false,
        projectId: null,
        profileEmpId: null,
        profileNominationType : true,
        tagId:null,
        karmaComboSelectedText:null,
        scoreText:"For Each Member",
        selfNomSubBtn : true,
        addButton : true,
        sentBackNomCount: 0,
        action:false,
        selfNomSubBtnHide:false
    },
    stores:{
        sentBackNominationsStore:{
            model:'DDO.model.profile.SentBackNominationModel',
			proxy:{
				type:'ajax',
				url:Api.URL.karmaapproval.SENDBACK,
				 reader: {
					type: 'json',
					rootProperty: "data"
				}
			},
                 autoLoad:true,
                 listeners: {
                    load: function( v, records,){
                     
                        var viewGrid = Ext.ComponentQuery.query('selfnominateviewgrid')[1];
                        if(!Ext.isEmpty(viewGrid)){
                            viewGrid.setTitle('Sent Back Nominations(' + this.getCount() + ')');
                        }
                    }
                }
                
        }
      

    }
});