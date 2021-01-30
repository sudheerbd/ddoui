/**
 * This is controller for view 'Goals.view.goals.SearchFilterWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.searchfilterwindowcontroller'
 */
Ext.define('Goals.view.goals.SearchFilterWindowController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchfilterwindowcontroller',

	onWindowOutsideTap: function(event, target) {
		var view = this,
			searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] ||
			Ext.create('Goals.view.goals.SearchFilterWindow'),
			form = searchfilterWin.down('form');
		if (!form.isDirty()) {
			if (Utility.nominatAlert) {
				Utility.onWindowOutterTap(event, target, view);
			}
		}
	},
	onGoalsFliter: function(btn, e, eOpts, isComboSelect) {
		var form = btn.up('window').down('form'),
			formValues = form.getValues(),
			vm = this.getViewModel(),
			datefieldValue = btn.up('window').down('datefield').getValue(),
			goalsViewStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
			buttongroup = btn.up('window').down('buttongroup');

		var goalsHeader = Ext.ComponentQuery.query('goalsheader')[0],
			comboRef = goalsHeader.down('combobox[reference = comboref]'),
			comboRecord = comboRef.getStore().findRecord('value', comboRef.getValue()),
			comboRefVal;
		if (comboRecord == null) {
			comboRefVal = Ext.ComponentQuery.query('combobox[name=goaltypecombo]')[1];
			comboRecord = comboRef.getStore().findRecord('value', comboRefVal.getValue());
		}
		var loginData = Ext.getStore('login').getData(),
			logEmpId = loginData.items[0].data.ddo_employee_id;

		var buttongroupArr = [];
		buttongroup.items.items.forEach(function(rec) {
			if (rec.pressed) {
				buttongroupArr.push(rec.text)
			}
		})
		vm.set('filterView', true);
		if (goalsViewStore) {
			goalsViewStore.clearFilter(true);

			goalsViewStore.filterBy(function(record) {
				var mom_agendaValue = false,
					people_tagValue = false,
					goaltype = false,
					goalstatus = false,
					dateValue = false;
				if (Ext.isEmpty(formValues.people_tag) || (formValues.people_tag.indexOf(record.data.goalUser.employeeId) != -1)) {
					mom_agendaValue = true;

				}
				if (Ext.isEmpty(buttongroupArr) || (buttongroupArr.indexOf(record.data.goalstatus) != -1)) {
					goalstatus = true;
				}
				var result = record.data.title.search(new RegExp(formValues.goal, 'gi'));

				if (Ext.isEmpty(comboRecord) || (comboRecord.data.key == record.data.goalType)) {
					if ((comboRecord.data.key == "Shared") && (record.data.goalUser.employeeId == logEmpId)) {
						goaltype = false;
					} else {
						goaltype = true;
					}

				} else if ((comboRecord.data.key == "All") && record.data.goalAllView) {
					goaltype = true;
				} else if (record.data.goalType == "Shared") {
					if ((comboRecord.data.key == "Personal") && (record.data.goalUser.employeeId == logEmpId)) {
						goaltype = true;
					} else {
						goaltype = false;
					}
				}
				if (Ext.isEmpty(datefieldValue) || (Ext.Date.diff((new Date(record.data.targetdate)), datefieldValue, Ext.Date.DAY) >= 0)) {
					dateValue = true;
				}

				return result >= 0 && mom_agendaValue && goalstatus && goaltype && dateValue;

			}, this);
		}

		if (!isComboSelect) {
			var searchfilterWin = btn.up('window'),
				form = searchfilterWin.down('form'),
				searchFilterIcon = goalsHeader.down('button[reference=searchfiltericon]'),
				labelRef = goalsHeader.down('label[reference=clearfilterRef]');


			//labelRef.setVisible(true);
			if (form.isDirty() || !Ext.isEmpty(buttongroupArr)) {
				if (labelRef.hasCls('x-hidden')) {
					labelRef.removeCls('x-hidden');
				}

				searchfilterWin.hide();
			} else {
				if (!labelRef.hasCls('x-hidden')) {
					labelRef.addCls('x-hidden');

				}

				Ext.Msg.alert("Error", "Atleast one parameter should be selected for filtering.")
			}
		}

	},
	onDraft: function(btn, e, eOpts) {
		//for this if condition to work, enableToggle has to be true in the buttons
		if (btn.pressed) {
			btn.removeCls('goals-btn-cls');
			btn.addCls('pressedBtnCls');
		} else {
			btn.removeCls('pressedBtnCls')
			btn.addCls('goals-btn-cls')
		}
	}
});