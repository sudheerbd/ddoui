// /**
//  * The file MomComponentCreateWindowViewModel is the ViewModel for DDO.view.mom.MomComponentCreateWindow.
//  */
// Ext.define('DDO.view.mom.MomComponentCreateWindowViewModel', {
// 	extend: 'Ext.app.ViewModel',

// 	alias: 'viewmodel.momcomponentcreatewindowviewmodel',

// 	data: {
// 		agenda: null,
// 		mom_desc: null,
// 		start_time:null,
// 		duration:null,
// 		start_date:null,
// 		BtnText: '',
// 		loginEmpId:null,
// 		//nonEditablePermit: false,
// 		BtnVisible: false,
// 		title:'',
// 		isExists:false
//     },
//     formulas: {
// 		getDurationTextValue: function(get) {
// 			var text = get('duration');
// 			if (Ext.isEmpty(text)) {
// 				return ''
// 			}else{
// 				if(text >1){
// 					return 'Hrs'
// 				}else{
// 					return 'Hr'
// 				}
// 			}
			
// 		}
// 	}
// });