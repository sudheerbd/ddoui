/**
 * This is controller for view 'DDO.view.filter.FilterWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.filterwindowcontroller'
 */
Ext.define('DDO.view.filter.FilterWindowController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.filterwindowcontroller',

	/**
	 * This handler will initate the add filter operation.
	 * @param {Object} view, Contains reference of view
	 * @param {Object} record, Contains reference of selected record.
	 * @param {Object} item, Contains reference of items of filter window view.
	 * @param {Number} idx, index number
	 * @param {Object} opts, event objects
	 */
	onAddFilterBtnClick: function(view, record, item, idx, evt, opts) {
		try {
			var me, targetDom, targetEl;
			me = this;
			targetDom = evt.getTarget();
			targetEl = Ext.get(targetDom);
			var badgeText = Ext.DomQuery.select("div[class='ddo-filter-badge-value']")[0];
			if (targetEl.hasCls('ddo-addfilter-btn') || targetEl.hasCls('ddo-filter-badge-value')) {
				me.onFilterBtnClick(view, record, item, idx, evt, opts, targetEl,badgeText);
			} else if (targetEl.hasCls('postclearfilter-cls')) {
				me.onFilterCancelClick(view, record, item, idx, evt, opts, targetEl);
			}
		} catch (err) {
			Utility.showToast(Messages.HOME.ADDFILTER, err);
		}
	},

	/**
	 * This handler will initate the filter operation.
	 * @param {Object} view, Contains reference of view
	 * @param {Object} record, Contains reference of selected record.
	 * @param {Object} item, Contains reference of items of filter window view.
	 * @param {Number} idx, index number
	 * @param {Object} opts, event objects
	 */
	onFilterBtnClick: function(view, record, item, idx, evt, opts, targetEl,badgeText) {
		try {
			var filterWindow,
			filterValues = Utility.filterObj,
			author = filterValues.author,
		   postType = filterValues.postType,
		   dateRange = filterValues.dateRange,
		   
		   filterWindow = Ext.ComponentQuery.query("filterwindow")[0] || Ext.create("DDO.view.filter.FilterWindow");
		   var formView=	filterWindow.down("filterform"),
		   btnGrp=formView.down('buttongroup');
		   this.getViewModel().set("gobutton", true);
		   if(badgeText.style.visibility != "hidden" && badgeText.style.visibility != ""){
			   
			   if(author){
				   formView.lookupReference("addFilterCombo").setValue(author);
			   }else{
				   formView.lookupReference("addFilterCombo").reset();
			   }
			   if(postType){
   
			   }else{
				   btnGrp.items.items.forEach(function (rec) {
					   if (rec.hasCls("filterbtn-selected-btn-cls")) {
						   rec.removeCls("filterbtn-selected-btn-cls");
						   rec.addCls("filterwin-btn-cls");
					   }
					   rec.pressed = false;
				   });
			   }if(dateRange){
				   formView.down('[name=dateRange]').setValue(dateRange);
			   }else{
				   formView.down('[name=dateRange]').reset();
			   }
		   }else{
			   formView.reset();
			   
				   btnGrp.items.items.forEach(function (rec) {
					   if (rec.hasCls("filterbtn-selected-btn-cls")) {
						   rec.removeCls("filterbtn-selected-btn-cls");
						   rec.addCls("filterwin-btn-cls");
					   }
					   rec.pressed = false;
				   });
				   formView.lookupReference("applybtn").setDisabled(true);
		   }
		   filterWindow.show();
		} catch (err) {
			Utility.showToast(Messages.HOME.FILTERBTNCLICK, err);
		}
	},

	/**
	 * This handler will initate the add filter operation.
	 * @param {Object} lbl, Contains reference of cancel button
	 * @param {Object} eOpts, event objects.
	 */
	onFilterCancelClick: function(lbl, e, eOpts) {
		try {
			lbl.getEl().on("click", function(labeltxt, e, eOpts) {
				Ext.getBody().mask('');
				
				var badgeText, badgeCancel, feedsStore,
					filterWindow;
					
				badgeText = Ext.DomQuery.select("div[class='ddo-filter-badge-value']")[0];
				//badgeCancel = Ext.DomQuery.select("span[class='ddo-filter-badge-cancel']")[0];
				var badgeCancel = Ext.ComponentQuery.query('addfilter')[0].down('label');
	
				feedsStore = Ext.getStore("feeds");
	
				Utility.filterObj = {};
				Utility.feedsStartValue = 0;
	
				badgeText.style.visibility = "hidden";
				badgeCancel.setHidden(true);
	
				filterWindow = Ext.ComponentQuery.query("filterwindow")[0];
	
				if (filterWindow) {
					filterWindow.destroy();
				}
	
				feedsStore.load({
					callback: function(records, options, success) {
						if (success) {
							Ext.getBody().unmask();
						}
					}
				});
			});
		} catch (err) {
			Utility.showToast(Messages.HOME.FILTERCANCELCLICK, err);
		}
	},

	/**
	 * This handler will fire when value in filter combobox .
	 * @param {Object} combo, Contains reference of combobox
	 * @param {Object} record, Contains reference of selected record.
	 * @param {Object} opts, event objects
	 */
	onAddFilterChange: function(combo, record, eOpts) {
		try {
			var me, filterContainer, filterPanel,
				filterCheckBoxPanel, filterSelectedValue,
				filterSelectedType, existingCmp,
				apiUrl, rootProperty;

			me = this;

			me.getViewModel().set("norecord", true);

			filterContainer = combo.up('toolbar').up('container');

			filterPanel = filterContainer.down('panel[name=filterPanel]');
			filterCheckBoxPanel = filterContainer.down('panel[name=filterCheckBoxPanel]');

			filterSelectedValue = record.get('name');
			filterSelectedType = record.get('type');

			existingCmp = filterPanel.down('[name=' + filterSelectedValue + ']');

			if (existingCmp === null && filterSelectedType === 'combo') {
				me.addCheckBox(filterCheckBoxPanel, filterSelectedValue);

				apiUrl = record.get("apiUrl");
				rootProperty = record.get("rootProperty");

				me.getViewModel().set("apiUrl", apiUrl);
				me.getViewModel().set("rootProperty", rootProperty);

				me.addCombo(filterPanel, filterSelectedValue, record);
			} else if (existingCmp === null && filterSelectedType === "datefield") {
				me.addCheckBox(filterCheckBoxPanel, filterSelectedValue);
				me.addDateField(filterPanel, filterSelectedValue);
			} else {
				Ext.Msg.alert("Warning", 'Already Selected');
			}
		} catch (err) {
			Utility.showToast(Messages.HOME.ADDFILTERCHANGE, err);
		}
	},

	/*Adding the combo box store*/
	addComboStore: function(cmp, eOpts) {
		var me, apiUrl, rootProperty,
			store;

		me = this;

		apiUrl = me.getViewModel().get('apiUrl');
		rootProperty = me.getViewModel().get('rootProperty');

		store = Ext.create('Ext.data.Store', {
			proxy: {
				type: 'ajax',
				url: apiUrl,
				reader: {
					type: 'json',
					rootProperty: rootProperty
				}
			},
			/*Add filter for search*/
			filter: function(filters, value) {
				Ext.data.Store.prototype.filter.apply(this, [
					filters,
					value ? new RegExp(Ext.String.escapeRegex(value), 'i') : value
				]);
			}
		});

		store.load();

		cmp.setStore(store);
	},

	/*Adding combo box on selection of add filter*/
	addCombo: function(filterPanel, filterSelectedValue, record) {
		var comboField = {
			xtype: 'combo',
			fieldLabel: record.get('fieldLabel'),
			name: filterSelectedValue,
			displayField: record.get('displayField'),
			valueField: record.get('valueField'),
			cls: ['ddo-addfilter-combo'],
			labelSeparator: '',
			forceSelection: true,
			queryMode: 'local',
			listConfig: {
				cls: 'ddo-theme-dropdown-combo'
			},
			listeners: {
				afterrender: "addComboStore",
				change: "onComboBoxChange"
			}
		};
		filterPanel.add(comboField);
	},

	/*Adding checkbox field*/
	addCheckBox: function(filterCheckBoxPanel, filterSelectedValue) {
		var checkField = {
			xtype: 'checkboxfield',
			name: filterSelectedValue + 'CheckBox',
			itemId: filterSelectedValue,
			submitValue: false,
			checked: true,
			listeners: {
				change: 'onFilterCheckboxChange'
			}
		};
		filterCheckBoxPanel.add(checkField);
	},

	/*Adding daterange field*/
	addDateField: function(filterPanel, filterSelectedValue) {
		var dateField = {
			xtype: "daterangefield",
			name: filterSelectedValue,
			cls: 'ddo-addfilter-daterangefield',
			listeners: {
				focus: 'onDateRangeFieldChange'
			}
		}
		filterPanel.add(dateField);
	},

	/*Enabled/Disabled the added component when checked/unchecked checkbox*/
	onFilterCheckboxChange: function(cmp, newValue, oldValue, eOpts) {
		var filterContainer, filterPanel,
			cmpName, dependentCmp;

		filterContainer = cmp.up('panel').up('container');
		filterPanel = filterContainer.down('panel[name=filterPanel]');

		cmpName = cmp.itemId;
		dependentCmp = filterPanel.down('[name=' + cmpName + ']');

		if (dependentCmp['xtype'] === "daterangefield" && dependentCmp.disabled) {
			dependentCmp.disabled = false;
			dependentCmp.setStyle("opacity", "1");
		} else if (dependentCmp['xtype'] === "daterangefield" && dependentCmp.disabled === false) {
			dependentCmp.disabled = true;
			dependentCmp.setStyle("opacity", "0.3");
		} else if (dependentCmp.disabled) {
			dependentCmp.setDisabled(false);
		} else {
			dependentCmp.setDisabled(true)
		}
	},

	/**
	 * this handler is responsible for date range combobox change.
	 * @param {Object} cmp, Contains reference of combobox.
	 * @param {String} newValue, Contains new modified value.
	 * @param {String} oldValue, Contains old value before modification.
	 * @param {Object} eOpts, Event Objects.
	 */
	onComboBoxChange: function(cmp, newValue, oldValue, eOpts) {
		var date=this.getView().down("[name=dateRange]");
		var selectedDate=date.getValue();
		var btnGroup=this.getView().down("buttongroup");
		var btnSelected=false;
		btnGroup.items.items.forEach(function(ele){
			if(ele.pressed){
				btnSelected=ele.pressed;
			}
			})
			var comboStore=cmp.getStore();
			var rec=comboStore.findRecord('user_id',newValue);
		if (Ext.isEmpty(newValue)) {
			if (btnSelected == false && selectedDate == "") {
				this.getView().lookupReference("applybtn").setDisabled(true);
			}else{
				this.getView().lookupReference("applybtn").setDisabled(false);
			}
		} else {
			if(rec){
			this.getView().lookupReference("applybtn").setDisabled(false);
			this.getViewModel().set("gobutton", false);
		}else{
			this.getView().lookupReference("applybtn").setDisabled(true);
			this.getViewModel().set("gobutton", true);
		}
	}
	},

	/**
	 * this handler is responsible for date range combobox change.
	 * @param {Object} cmp, Contains reference of combobox.
	 * @param {Object} event, change event details
	 * @param {Object} eOpts, Event Objects.
	 */
	onDateRangeFieldChange: function(cmp, event, eOpts) {
		if (cmp) {
			this.getViewModel().set("gobutton", false);
			this.getView().lookupReference("applybtn").setDisabled(false);
		}
	},

	renderFilterWindow: function(cmp, eOpts) {
		this.getViewModel().set("norecord", false);
	},

	/**
	 * this handler is responsible for go button click action.
	 * @param {Object} cmp, Contains reference of go button.
	 * @param {Object} e, click event details
	 * @param {Object} eOpts, Event Objects.
	 */
	onGoButtonClick: function(cmp, e, eOpts) {
		try {
			var me, filterView, filterValues,
				badgeValue = 0,
				filterWindow,
				feedsStore, searchFeeds,
				filterView, badgeText,
				badgeCancel;

			me = this;
			
			filterView = cmp.up('toolbar').up('form');
			filterValues = filterView.getValues();
			filterValues.postType = this.getViewModel().get("posttypeValue");
			if (filterValues.postType == "Both") {
				var posttype = ""
			}
			if (Ext.isEmpty(filterValues.dateRange)) {
				delete filterValues.dateRange;
			}
			if (Ext.isEmpty(filterValues.postType) || filterValues.postType == "Both") {
				if (filterValues.postType == "Both") {
					badgeValue = badgeValue + 1;
				}
				delete filterValues.postType;
			}
			if (Ext.isEmpty(filterValues.author)) {
				delete filterValues.author;
			}
			
			badgeValue = badgeValue + me.activeComponentLength(filterValues);

			if (badgeValue > 1) {
				filterWindow = cmp.up('window');
				filterWindow.close();

				feedsStore = Ext.getStore("feeds");
				searchFeeds = Ext.getStore("searchfeeds");

				filterView = Ext.ComponentQuery.query('#badgeView')[0];

				badgeText = Ext.DomQuery.select("div[class='ddo-filter-badge-value']")[0];
				var badgeCancel = Ext.ComponentQuery.query('addfilter')[0].down('label');

				badgeText.innerHTML = (badgeValue - 1);

				badgeCancel.setHidden(false);
				badgeText.style.visibility = "visible";

				Ext.getBody().mask('');

				if(posttype){
					filterValues.postType=posttype;
				}
				Utility.feedsStartValue = 0;
				Utility.filterObj = filterValues;			
			
				feedsStore.load({
					params: filterValues,
					callback: function(records, options, success) {
						if (success) {
							Ext.getBody().unmask();
						} else {
							Ext.getBody.unmask();
							Ext.Msg.alert("Error", 'Invalid selection');
						}
					}
				});
			}
		} catch (err) {
			Utility.showToast(Messages.HOME.FILTEROPERATION, err);
		}
	},

	activeComponentLength: function(obj) {
		var size = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	},

	/**
	 * this handler is responsible for button select action.
	 * @param {Object} cmp, Contains reference of button.
	 * @param {Object} e, click event details
	 * @param {Object} eOpts, Event Objects.
	 */
	onBtnSelect: function(btn, e, eOpts) {
		var val = btn.value;
		this.getViewModel().set("posttypeValue", val);
		btn.setPressed(true);
		this.getViewModel().set("gobutton", false);
		this.getView().lookupReference("applybtn").setDisabled(false);
		var btnGrp = btn.up('buttongroup');
		btnGrp.items.items.forEach(function(rec) {
			if (rec.hasCls("filterbtn-selected-btn-cls")) {
				rec.removeCls("filterbtn-selected-btn-cls");
				rec.addCls("filterwin-btn-cls");
			}
		});
		if (btn.el.hasCls("filterwin-btn-cls")) {
			btn.el.removeCls("filterwin-btn-cls");
			btn.el.addCls("filterbtn-selected-btn-cls");
		} else {
			btn.el.removeCls("filterbtn-selected-btn-cls");
			btn.el.addCls("filterwin-btn-cls");
		}
	}
});