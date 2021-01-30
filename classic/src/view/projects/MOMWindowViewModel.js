/**
 * The file MOMViewModel is the ViewModel for 'DDO.view.projects.MOMView'.
 */
Ext.define('DDO.view.projects.MOMWindowViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.momwindowviewmodel',

	data: {
		agenda: null,
		mom_desc: null,
		start_time:null,
		duration:null,
		start_date:null,
		BtnText: '',
		loginEmpId:null,
		isExists:false,

		//nonEditablePermit: false,
		BtnVisible: false,
		title:'',
		groupIds: [],
		isGroupSelected: false,
		selectedEmpCount:1,
		absentEmpCount:0,
		comboTagviewAbse: false,
    },
    formulas: {
		getDurationTextValue: function(get) {
			var text = get('duration');
			if (Ext.isEmpty(text)) {
				return ''
			}else{
				if(text >1){
					return 'Hrs'
				}else{
					return 'Hr'
				}
			}
			
		}
	}
});