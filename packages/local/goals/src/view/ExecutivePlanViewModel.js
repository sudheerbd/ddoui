/**
 * This is ViewModel for view 'Goals.view.ExecutivePlanView'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.executiveplanview'
 */
Ext.define('Goals.view.ExecutivePlanViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.executiveplanview',

	data: {
		tab2: true,
		tab3: true,
		tab4: true,
		tab5: true,
		tab1: false,
		shareReadOnly: false,
		isUpdateNeed: false,
		ddo_employeegoal_id: null,
		ddo_employeegoal_userid: null,
		empkarmaPoints:null,
		editorOrGridDisable: false,
		GridDisable:false,
		visibilityMode: true,
		BtnvisibilityMode:false,
		EmpVisibilityMode:true,
		BtnText:null,
		doneText:null,
		approveText:null,
		isdoneBtnEnable:false,
		istodoDelete:false,
		MngrVisibilityMode:true,
		dneBtn:true,
		apprvedisabled:true,
		amziconDisabled:true,
		supiconDisabled:true,
		goodiconDisabled:true,
		targetDate:null,
		isManager:false,
		ratingIconsEnable:false,
		readOnlyKarmafield:true,
		selectedKarmapoints:null,
		achievedkarma:null,
		seletcedRatingText:null,
		achievedKarmaPoints:null,
		achievedratingText:"",
		addTaskDisable:false,
		loginEmpId:null
	}
});
	