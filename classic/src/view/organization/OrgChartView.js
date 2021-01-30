/**
 * The file OrgChartView is responsible for view of the records in the organization chart.
 * @extends {Ext.view.View}
 * @alias 'widget.orgchartview'.
 */
Ext.define('DDO.view.organization.OrgChartView', {
	extend: 'Ext.view.View',
	alias: 'widget.orgchartview',

	store: 'orgchartstore',

	scrollable: true,

	loadMask: false,

	cls: 'org-chart-child-view noscrollbar',

	initComponent: function() {
		this.callParent(arguments);
		(this.getTpl() || this.tpl).view = this;
		this.getStore().load();
	},

	tpl: [
	'<div class="ddo-root-orgchart-div">',
		//It executes only when there is no user image at root node location
		'<tpl if="this.getRootItemsInfo(values, true)">',
			'<div style="text-align:center;position:relative" width="100%">',
				'<img class="rootImg-cls" src="resources/images/loginheader/engageheader_logo.png">',
				'<p class="badge-text-root badge-text-comon">{[this.sumInternalrootCount(values)]}</p>',
			'</div>',
		'</tpl>',

		//It executes only when there exits an user image at root node location
		'<tpl if="!this.getRootItemsInfo(values, true)">',
			'<div class="org-profileView-cls ddo-data-subchild-item">',
				'<div class="org-profile-img-wrap org-profile-img-wrap-div">',
					'<img class="profileImg-cls" org-emp-code="{[this.getRootItemsInfo(values.employee_code, false, 0, 0)]}" ',
					'src="{[this.getRootItemsInfo(values.user_profile_pic_url, false, 0, 5, 4)]}" onerror='+Utility.defaultUserImg+'>',
					'</div>',
					'<div class="badge-text-root-thirdtree badge-text-comon">',
					'<tpl if="this.getArrayObjValue(0,7) &gt;= 1">',
					'<div>{[this.getArrayObjValue(0,7)]}</div>',
					'</tpl>',
					'</div>',
					'<div>',
					'</div><div class="org-name-wrapper">',
					'<span class="org-emp-name-cls" org-emp-id="{[this.getRootItemsInfo(values.employee_code, false, 0, 0)]}" ',
					'<tpl if="this.getRootItemsInfo(values.employee_name, false, 0, 2, undefined, undefined, 18)">',
						'data-qtip="{[this.getRootItemsInfo(values.employee_name, false, 0, 2)]}"',
					'</tpl>',
					'>{[this.getRootItemsInfo(values.employee_name, false, 0, 2)]}</span>',
					'<br>',
					'<span class="org-emp-designation-cls" ',
					'<tpl if="this.getRootItemsInfo(values.employee_designation, false, 0, 3, undefined, undefined, 21)">',
						'data-qtip="{[this.getRootItemsInfo(values.employee_designation, false, 0, 3)]}"',
					'</tpl>',
					'>{[this.getRootItemsInfo(values.employee_designation, false, 0, 3)]}</span>',
				'</div>',
			'</div>',

		'</tpl>',

		//It executes only if there is no data in child nodes
		'<tpl if="this.enableEmptyChildView(values)">',
			'<div class="ddo-root-orgchart-div">',
				//It executes only if there is no data in child's wrack
				'<span class="ddo-empty-child-rec">No Data Available</span>',
			'</div>',
     	'</tpl>',

		//It executes only when node is not selected or not at all filtered from emp_name combo 
		'<tpl if="this.getChildItemsInfo(values, true)">',
			'<tpl for=".">',
				'<div class="org-profileView-cls ddo-data-subchild-item {[this.getChildAnimated(values)]}">',
					'<div class="org-profile-img-wrap org-profile-img-wrap-div">',
						'<img class="profileImg-cls" org-emp-code="{employee_code}" ',
						'src="{[this.getSubChildItemsInfo(values, true)]}" onerror='+Utility.defaultUserImg+'>',
							'</div>',
							'<div class="badge-text-second-node badge-text-comon">',
							'<tpl if="testCount &gt;= 1">',
							'<div>{testCount}</div>',
							'</tpl>',
							'</div>',
							'<div>',
					'</div><div class="org-name-wrapper">',
						'<span class="org-emp-name-cls" org-emp-id="{employee_code}" ',
						'<tpl if="this.getSubChildItemsInfo(values.employee_name, undefined, undefined, undefined, undefined, true, 18)">',
							'data-qtip="{employee_name}"',
						'</tpl>',
						'>{employee_name}</span>',
						'<br>',
						'<span class="org-emp-designation-cls" ',
						'<tpl if="this.getSubChildItemsInfo(values.employee_designation, undefined, undefined, undefined, undefined, true, 21)">',
							'data-qtip="{employee_designation}"',
						'</tpl>',
						'>{employee_designation}</span>',
					'</div>',
				'</div>',

			'</tpl>',

		'</tpl>',

	'</div>',

	'<div class="ddo-root-orgchart-div">',
		//It executes only when node is selected and to shwo only selected user profile node
		'<tpl if="!this.getChildItemsInfo(values, true)">',
			'<div class="org-profileView-cls ddo-data-subchild-item ddo-firstchild">',
				'<div class="org-profile-img-wrap org-profile-img-wrap-div">',
					'<img class="profileImg-cls ddo-profile-img-highlight" org-emp-code="{employee_code}" ',
					'src="{[this.getChildItemsInfo(values, false, 1, 5, 4)]}" onerror='+Utility.defaultUserImg+'>',
						'</div>',
						'<div class="badge-text-second-node badge-text-comon">',
						'<tpl if="this.getArrayObjValue(1,7) &gt;= 1">',
					'<div>{[this.getArrayObjValue(1,7)]}</div>',
					'</tpl>',
						'</div>',
						'<div>',
				'</div><div class="org-name-wrapper">',
					'<span class="org-emp-name-cls" org-emp-id="{[this.getChildItemsInfo(values.employee_code, false, 1, 0)]}" ',
					'<tpl if="this.getChildItemsInfo(values.employee_name, false, 1, 2, undefined, undefined, 18)">',
						'data-qtip="{[this.getChildItemsInfo(values.employee_name, false, 1, 2)]}"',
					'</tpl>',
					'>{[this.getChildItemsInfo(values.employee_name, false, 1, 2)]}</span>',
					'<br>',
					'<span class="org-emp-designation-cls" ',
					'<tpl if="this.getChildItemsInfo(values.employee_designation, false, 1, 3, undefined, undefined, 21)">',
						'data-qtip="{[this.getChildItemsInfo(values.employee_designation, false, 1, 3)]}"',
					'</tpl>',
					'>{[this.getChildItemsInfo(values.employee_designation, false, 1, 3)]}</span>',
				'</div>',
			'</div>',
		'</tpl>',
	'</div>',
	'<div class="ddo-root-orgchart-div">',
		//It executes only when sub-child's exists for a single selected child node
		'<tpl if="this.getRootItemsInfo(values)">',
			'<tpl for=".">',
			'<div class="org-profileView-cls ddo-data-subchild-item ddo-lastchild">',
					'<div class="org-profile-img-wrap ddo-lastchild-image-wrap">',
						'<img class="profileImg-cls org-child-profileImage-cls" org-emp-code="{employee_code}" ',
						'src="{[this.getSubChildItemsInfo(values, true)]}" onerror='+Utility.defaultUserImg+'>',
							'</div>',
							'<div class="badge-text badge-text-comon">',
							'<tpl if="testCount &gt;= 1"><div>{testCount}</div></tpl>',
							'</div>',
							'<div>',
					'</div><div class="org-name-wrapper">',
						'<span class="org-emp-name-cls" org-emp-id="{employee_code}" ',
						'<tpl if="this.getSubChildItemsInfo(values.employee_name, undefined, undefined, undefined, undefined, true, 18)">',
							'data-qtip="{employee_name}"',
						'</tpl>',
						'>{employee_name}</span>',
						'<br>',
						'<span class="org-emp-designation-cls" ',
						'<tpl if="this.getSubChildItemsInfo(values.employee_designation, undefined, undefined, undefined, undefined, true, 21)">',
							'data-qtip="{employee_designation}"',
						'</tpl>',
						'>{employee_designation}</span>',
					'</div>',
				'</div>',
			'</tpl>',
		'</tpl>',
	'</div>',
	'<div class="ddo-root-orgchart-div">',
		//It executes only if there is no data in sub-child's
		'<tpl if="this.enableEmptyView(values)">',
			'<span class="ddo-empty-child-rec">No Data Available</span>',
		'</tpl>',
	'</div>',
		{	
			//Common useful variable function
			getCommonRefs: function() {
				var orgChart = this.view.up('orgchart'),
					orgChartViewModel = orgChart.getViewModel(),
					obj = { };
				obj = {
					orgChart: orgChart,
					viewModel: orgChartViewModel,
					rootLimitAccess: orgChartViewModel.get('rootLimitAccess'),
					childAccessName: orgChartViewModel.get('childAccessName'),
					rootAccessName: orgChartViewModel.get('rootAccessName'),
					childAnimate: orgChartViewModel.get('childAnimate')
				};			
				return obj;	
			},
			//To get the value for root or child object values by providing,
			//array[rootIndex] or array[childIndex]
			getArrayObjValue: function (accessIndex, valueIndex) {
				var obj = this.getCommonRefs(),
					access = [], value = [];
				if (Ext.isDefined(accessIndex) && Ext.isDefined(valueIndex)) {
					access = [obj.rootAccessName, obj.childAccessName];
					value = [access[accessIndex].employee_code, access[accessIndex].emp_id, access[accessIndex].employee_name,
					access[accessIndex].employee_designation, access[accessIndex].employee_emailid, access[accessIndex].user_profile_pic_url,
					access[accessIndex].location, access[accessIndex].testCount];
					return value[valueIndex];
				}				
			},
			//will return the access permission for sub-child or root and it's value for root node values
			getRootItemsInfo: function(value, rootAccess, rhIndex, rbIndex, arbIndex, locsubstr, strlen, locinitialletter) {
				var obj = this.getCommonRefs(),
					selNode = [ obj.rootAccessName, obj.childAccessName ],
					objValue = this.getArrayObjValue(rhIndex, rbIndex),
					altObjValue = this.getArrayObjValue(rhIndex, arbIndex);
				if (selNode[0].employee_code && selNode[0].testCount || selNode[0].testCount == 0) {
					if (selNode[1].testCount == undefined) {
						selNode[1].testCount = 0;
					}
					selNode[0].testCount = selNode[1].testCount + 1;
				}
			if(rootAccess) {
					// ! Permission to access the default image root or supervisor root values node
					if(!Ext.Object.isEmpty(obj.rootAccessName)) {
						return false;
					}
					return true;
				} else if(value && !rhIndex && !rbIndex) {
					// @ To show the sub-child's only when a node is selected or show an emptyText too
					if(Ext.Object.isEmpty(value)) {
						return false;
					}
					return obj.rootLimitAccess;
				} else if(strlen) {
					// # To show the tooltip when given length exceeds
					if(objValue && (objValue.length > strlen)) {
						return true;
					}
					return false;
				} else if(objValue && !value && !arbIndex && !locsubstr && !locinitialletter) {
					// $ To show the values
					if(!Ext.Object.isEmpty(obj.rootAccessName)) {
						return objValue;
					}
					return value;
				} else if(locsubstr) {
					// % To get location for cls
					if(!Ext.Object.isEmpty(obj.rootAccessName)) {
						return objValue.substr(0,3).toLowerCase();
					}
					return '';
				} else if(locinitialletter) {
					// ^ To fetch the location value and get the initial letter for logo purpose
					if(!Ext.Object.isEmpty(obj.rootAccessName)) {
						return objValue[0];
					}
					return value[0];
				} else if(!value && arbIndex) {
					// & To show the back end image or gravatar image for root node
					if(!Ext.Object.isEmpty(obj.rootAccessName)) {
						return objValue;
					}
					return Utility.imageCheck(value.user_profile_pic_url);
					
				} else {
					// * do nothing
				}
			},

			//To get animated when appeared for child node or nodes
			getChildAnimated: function(values) {
				var obj = this.getCommonRefs(values);
				if(obj.childAnimate) {
					return 'ddo-child-anim';
				}
				return 'ddo-root-child-anim';
			},
			//will return the access permission for sub-child or root and it's value to set root node values
			getChildItemsInfo: function(value, childAccess, rhIndex, rbIndex, arbIndex, locsubstr, strlen, locinitialletter) {
				var obj = this.getCommonRefs(),
					objValue = this.getArrayObjValue(rhIndex, rbIndex),
					altObjValue = this.getArrayObjValue(rhIndex, arbIndex);
					if(childAccess) {
					// ! Permission to access the default values or selected child values node
					if(!Ext.Object.isEmpty(obj.childAccessName)) {
						return false;
					}
					return true;
				} else if(strlen) {
					// @ To show the tooltip when given length exceeds
					objValue = objValue || value;
					if(objValue && (objValue.length > strlen)) {
						return true;
					}
					return false;
				} else if((objValue || value) && !arbIndex && !locsubstr && !locinitialletter) {
					// # To show the values
					if(!Ext.Object.isEmpty(obj.childAccessName)) {
						return objValue;
					}
					return value;
				} else if(locsubstr) {
					// $ To get location for cls
					if(!Ext.Object.isEmpty(obj.childAccessName)) {
						return objValue.substr(0,3).toLowerCase();
					}
					return value.substr(0,3).toLowerCase();
				} else if(locinitialletter) {
					// % To fetch the location value and get the initial letter
					if(!Ext.Object.isEmpty(obj.childAccessName)) {
						return objValue[0];
					}
					return value[0];
				} else if((objValue || value) && arbIndex) {
					// ^ To show the back end image or gravatar image for root node
					if(!Ext.Object.isEmpty(obj.childAccessName)) {
						return objValue;
					}
					return Utility.imageCheck(value.user_profile_pic_url);
				} else {}
			},

			//will return the sub-child root node values
			getSubChildItemsInfo: function(value, proimg, loc, initialloc, loccls, tipaccess, strlen) {
				if(proimg) {
					// ! To show the back end image or gravatar image for root node
					return Utility.imageCheck(value.user_profile_pic_url);
				} else if(loc) {
					// @ To show the location as - logo as Initial Letter || cls for css || value for tooltip
					if(initialloc) {
						return value[0];
					} else if(loccls) {
						return value.substr(0,3).toLowerCase();
					} else {
						return value;
					}
				} else if(tipaccess && strlen) {
					//As per string length tooltip will be visible
					if(value && (value.length > strlen)) {
						return true;
					}
					return false;
				} else {
					// # do nothing
				}
			},

			//To show empty Text when data is null [Permission to access the empty Text div for child nodes]
			enableEmptyChildView: function(values)	 {
				var obj = this.getCommonRefs(values),
					orgChartView = obj.orgChart.lookupReference('orgchartview');
				if(Ext.Object.isEmpty(obj.rootAccessName) && obj.viewModel.get('childEmptyAccess') && Ext.isEmpty(orgChartView.getData())) {
					return true;
				}
				return false;
			},

			//To show empty Text when data is null [Permission to access the empty Text div for sub-child nodes]
			enableEmptyView: function(values) {
				var obj = this.getCommonRefs(values),
					orgChartView = obj.orgChart.lookupReference('orgchartview'),
					orgChartStore = orgChartView.getStore(),
					selecChildRec;
				selecChildRec = orgChartStore.findNode('employee_code', obj.childAccessName.employee_code);
				if(!Ext.Object.isEmpty(obj.childAccessName) && Ext.isEmpty(orgChartView.getData())) {
					return true;
				}
				return false;
			},
			sumInternalrootCount: function (values) {
				var vm = this.view.up('orgchart').getViewModel();

				if (Ext.isDefined(this.getArrayObjValue(1, 7))) {
					totalHeadCount = 0;
					Ext.Array.each(values, function (item) {
						if (item.testCount) {
							totalHeadCount += item.testCount;
						}
					});
					if(vm.get('rootLimitAccess')){
						totalHeadCount=totalHeadCount+1+values.length;
					}
				} else {
					totalHeadCount = vm.get('rootHeadCount');
				}
				return totalHeadCount;
			}
		}
	],
	itemSelector: 'img.profileImg-cls div.badge-text p.badge-text-root div.badge-text-second-node div.badge-text-comon div.badge-text-root-thirdtree',
	listeners: {
		render: 'onOrgChartViewRender',
		beforerefresh:'calcCount'
	}
});