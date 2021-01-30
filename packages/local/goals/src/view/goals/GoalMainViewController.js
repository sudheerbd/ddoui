/**
 * This is controller for view 'Goals.view.goals.GoalsMainView'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.goalmainviewcontroller'
 */
Ext.define('Goals.view.goals.GoalMainViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.goalmainviewcontroller',

    onSearchGoalFliter: function(btn, e, eOpts) {
        var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] ||
            Ext.create('Goals.view.goals.SearchFilterWindow');
        searchfilterWin.show();
    },

    onLabelFocus: function(lbl, e, eOpts) {
        lbl.getEl().on("click", function(labeltxt, e, eOpts) {

            var searchGoalFilterRef = Ext.ComponentQuery.query('goalsheader')[0],
                comboRef = searchGoalFilterRef.down('combobox[reference = comboref]'),
                comboRecord = comboRef.getStore().findRecord('value', comboRef.getValue()),
                goalsViewStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                loginData = Ext.getStore('login').getData(),
                logEmpId = loginData.items[0].data.ddo_employee_id,
                comboRefVal;
                if(comboRecord == null){
                    comboRefVal = Ext.ComponentQuery.query('combobox[name=goaltypecombo]')[1];
                    comboRecord = comboRef.getStore().findRecord('value', comboRefVal.getValue());
                };

            if (goalsViewStore) {
                goalsViewStore.clearFilter(true);

                goalsViewStore.filterBy(function(rec) {
                    var goaltype = false,
                        comboData = comboRecord.data;

                    if (rec.data.goalType == comboData.key) {

                        if ((comboData.key == "Shared") && (rec.data.goalUser.employeeId == logEmpId)) {
                            goaltype = false;
                        } else {
                            goaltype = true;
                        }

                    } else if ((comboData.key == "All") && rec.data.goalAllView) {
                        goaltype = true;
                    } else if (rec.data.goalType == comboData.key == "Team") {
                         goaltype = true;
                    } else if (rec.data.goalType == "Shared") {

                        if ((comboData.key == "Personal") && (rec.data.goalUser.employeeId == logEmpId)) {
                            goaltype = true;
                        } else {
                             goaltype = false;
                        }

                    }
                    return goaltype;

                }, this);
            }

            var searchGoalFilterRef = Ext.ComponentQuery.query('goalsheader')[0],
                searchGoalFilterIcon = searchGoalFilterRef.down('button[reference=searchfiltericon]'),

                labelRef = searchGoalFilterRef.down('label[reference=clearfilterRef]');

            var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] ||
                Ext.create('Goals.view.goals.SearchFilterWindow'),
                btnGrpRef = searchfilterWin.down('buttongroup[reference=btnGrpRef]'),
                datefldRef = searchfilterWin.down('datefield[reference=fromDate]'),
                form;

            searchfilterWin.getViewModel().set('filterView', false);

            if (searchGoalFilterIcon.el && searchGoalFilterIcon.el.hasCls("searchgoal-selected-icon-field")) {
                searchGoalFilterIcon.el.removeCls("searchgoal-selected-icon-field");
                searchGoalFilterIcon.el.addCls("searchgoal-icon-field");
            }

            btnGrpRef.items.items.forEach(function(rec) {
                if (rec.pressed) {
                    rec.pressed = false;
                    rec.addCls('goals-btn-cls');
                    rec.removeCls('pressedBtnCls');
                }
            });


            form = searchfilterWin.down('form');
            form.reset();
            datefldRef.setValue('');
            if(!labelRef.hasCls('x-hidden')){
                    labelRef.addCls('x-hidden');
            }

        });
    },
    
    onComboSelect: function(combo, e, eOpts) {
        var comboSelection = combo.selection,
            comboData = comboSelection.data,

            goalview = Ext.widget('goalsview'),
            goalViewStore = goalview.getStore(),
            filterVal = false;
        var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0],
            loginData = Ext.getStore('login').getData(),
            logEmpId = loginData.items[0].data.ddo_employee_id;

        if (searchfilterWin) {

            filterVal = searchfilterWin.getViewModel().get('filterView');
        }
        if (filterVal) {
            var searchGoalFilterIcon = searchfilterWin.down('button[reference=filtersearchbtn]');
            searchfilterWin.getController().onGoalsFliter(searchGoalFilterIcon, null, null, true);
        } else {
            goalViewStore.clearFilter(true);
            goalViewStore.filterBy(function(rec) {
                if (rec.data.goalType == comboData.key) {

                    if ((comboData.key == "Shared") && (rec.data.goalUser.employeeId == logEmpId)) {
                        return false;
                    } else {
                        return true;
                    }
                    
                } else if ((comboData.key == "All") && rec.data.goalAllView) {
                    return true;
                } else if (rec.data.goalType == comboData.key == "Team") {
                    return true;
                } else if (rec.data.goalType == "Shared") {

                    if ((comboData.key == "Personal") && (rec.data.goalUser.employeeId == logEmpId)) {
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            });
        }
    }
});