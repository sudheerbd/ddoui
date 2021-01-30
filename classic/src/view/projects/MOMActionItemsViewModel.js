/**
 * The file MOMViewModel is the ViewModel for 'DDO.view.projects.MOMView'.
 */
Ext.define('DDO.view.projects.MOMActionItemsViewModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.momActionItemViewModel',

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
		history: null,
		
    },
    // formulas: {
	// 	getDurationTextValue: function(get) {
	// 		var text = get('duration');
	// 		if (Ext.isEmpty(text)) {
	// 			return ''
	// 		}else{
	// 			if(text >1){
	// 				return 'Hrs'
	// 			}else{
	// 				return 'Hr'
	// 			}
	// 		}
			
	// 	}
	// }
	
    stores: {
        momActionItemsStore: {
            type: 'momActionItemsStore',
            autoLoad: false
        },
        // profilemonthstore: {
        //     type: 'profilemonthstore'
        // },
        // profileskillscombo: {
        //     type: 'profileskillscombo',
        //     autoLoad: true
        // }
    }
});