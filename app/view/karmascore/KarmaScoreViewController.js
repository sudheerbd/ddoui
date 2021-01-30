/**
 * The file KarmaScoreViewController is the controller for the 'DDO.view.karmascore.KarmaScoreView'.
 * @extends {Ext.app.ViewController}
 * @alias controller.karmascoreview
 */
Ext.define('DDO.view.karmascore.KarmaScoreViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmascoreview',

    /**
     * This is a handler for the keydown events of all search fields
     * @param field The field reference.
     * @param e The keydown event object
     */
    onKeyupSearchBy: function (field, e) {
        try {
            var keyCode = e.keyCode;
            // restriciting to some characters
            if ((keyCode >= 48 && keyCode < 58) // numbers
                ||
                (keyCode >= 65 && keyCode < 123) // letters
                ||
                (keyCode === 8) // backspace
                ||
                (keyCode === 46) // delete
            ) {
                var mainview = field.up('karmascoreview');
                this.triggerSearch(field.up('searchformview'), mainview.down('karmascorefilterview'));
                this.onKarmaScoreLoad();
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.SEARCH, err);
        }
    },
    /**
     * The function onKarmaScoreItemClick is perform when the 'itemclick' event isfired from the karmaScoreDataView.
     * this function will open the profile of the selecte employee.
     * @param {Ext.view.View} 'view' containing the karmaScoreDataView.
     * @param 'record' which is a selected record.
     * @param {numbers} 'index, which is a index Number'.
     * @param {event} 'e' - click event.
     * @param {Object} 'eOpts' which is an object.
     */
    onKarmaScoreItemClick: function (view, record, item, index, e, eOpts) {
        try {
            var code = Ext.getStore('login').getAt(0).getData().empcode;
            this.redirectTo('profile/' + record.data.c_bpartner_id);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.KARMASCOREITEM, err);
        }
    },
    /**
     * The function onTriggerItemClick is used to clear the date field by clicking on the icon and to hide the trigger icon.
     * @param {cmp} 'cmp' which renders the daterangefield.
     * @param {trigger} 'trigger' the one which we have declared.
     * @param {target} 'event details'.
     */
    onTriggerItemClick: function (cmp, trigger, target) {
        try {
            cmp.setValue('');
            trigger.hide();
            var mainview = cmp.up('karmascoreview'),
                advSearchView = mainview.down('karmascoreadvancedsearchview');
            this.triggerSearch(advSearchView.down('searchformview'), cmp.up('karmascorefilterview'));
            this.onKarmaScoreLoad();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.TRIGGERITM, err);
        }
    },
    /**
     * The Function onKarmaBeforeRefresh will perform beforerefresh the karmaSuperVisorDataView.
     * this function will set the count and supervisorCount zero and empDesignId and empSuperVisorName null.
     * @param 'me' - which is a controller referance.
     * @param {Object} 'eOpts' which is an object.
     */
    onKarmaBeforeRefresh: function (me, eOpts) {
        var vm = me.up('karmascoreview').getViewModel();
        vm.set('count', 0);
        vm.set('supervisorCount', 0);
        vm.set('empDesignId', null);
        vm.set('empSuperVisorName', null);
    },
    /**
     * The function 'onItemSelect' will perform when the 'select'event is fired in karmaScoreFilterview.
     * Show the record according to the selected conditions.
     * @param {comboBox} 'combo' which takes the combobox.
     * @param {Object} 'eOpts' which is an object.
     * @param { Ext.data.Model} 'record' The selected records.
     */
    onItemSelect: function (combo, record, eOpts) {
        try {
            combo.triggers.cancel.show();
            var mainview = combo.up('karmascoreview'),
                advSearchView = mainview.down('karmascoreadvancedsearchview');
            this.triggerSearch(advSearchView.down('searchformview'), combo.up('karmascorefilterview'));
            this.onKarmaScoreLoad();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.ITEMSELECT, err);
        }
    },
    /**
     * The Function onAdvRangeChange will perform  when 'changecomplete' event is fired from beforerefresh the advanceKarmaScoreSlider.
     * this function will show the employee list according to the karmaScore range change.
     * @param 'slider' - which is a slider old value.
     * @param {numbers} 'newValue' - it will take new slider value.
     * @param {Object} 'eOpts' which is an object.
     */
    onAdvRangeChange: function (slider, newValue, thumb, eOpts) {
        try {
            var mainview = slider.up('karmascoreview'),
                advSearchView = mainview.down('karmascoreadvancedsearchview');
            this.triggerSearch(advSearchView.down('searchformview'), slider.up('karmascorefilterview'));
            this.onKarmaScoreLoad();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.RANGECHANGE, err);
        }
    },
    /**
     * This method is used to trigger the search as per the 
     * search form fields and update the grid store accordingly.
     * @param form The search form reference.
     */
    triggerSearch: function (searchform, filterform) {
        try {
            var vm = this.getViewModel(),
                store = vm.get('allkarmascores'),
                formValues = filterform.getValues(),
                refObject = {};
            refObject.searchString = searchform.getValues().employee;
            refObject.searchMinValue = formValues.advKarmaScoreRange[0];
            refObject.searchMaxValue = formValues.advKarmaScoreRange[1];
            refObject.daterangefield = formValues.daterangefield;
            refObject.department = formValues.department;
            refObject.designation = formValues.designation;
            refObject.primarySkill = formValues.primarySkill;
            refObject.projectsOrCustomers = formValues.projectsOrCustomers;
            refObject.supervisor = formValues.supervisor;
            vm.set('count', 0);
            vm.set('supervisorCount', 0);
            vm.set('empDesignId', null);
            vm.set('empSuperVisorName', null);
            this.triggerSratchFunction(store, refObject, filterform);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.SEARCHTGGR, err);
        }
    },
    /**
     * this function will show the record according to the selected item.
     * @param 'store' - which is containing the allkarmascores,
     * @param 'refObject' - which is an object with searchString, searchMinValue, etc.
     */
    triggerSratchFunction: function (store, refObject, filterform) {
        if (store) {
            store.clearFilter(true);
            store.filterBy(function (record) {
                var daterangefields = false,
                    departments = false,
                    designations = false,
                    primarySkills = false,
                    projectsOrCustomerss = false,
                    supervisors = false,
                    projectArr = (record.data.project_id) ? record.data.project_id.split(",") : record.data.project_id;
                if (Ext.isEmpty(refObject.department) || (refObject.department == record.data.hr_department_id)) {
                    departments = true;
                }
                if (Ext.isEmpty(refObject.designation) || (refObject.designation == record.data.hr_designation_id)) {
                    designations = true;
                }
                if (Ext.isEmpty(refObject.primarySkill) || (refObject.primarySkill == record.data.hr_skilltype_id)) {
                    primarySkills = true;
                }
                if (Ext.isEmpty(filterform.projectsOrCustomers) || (projectArr && projectArr.indexOf(projectsOrCustomers.toString()) != -1)) {
                    projectsOrCustomerss = true;
                }
                if (Ext.isEmpty(refObject.supervisor) || (refObject.supervisor == record.data.supervisor_id)) {
                    supervisors = true;
                }
                var result = record.data.employee.search(new RegExp(refObject.searchString, 'gi'));
                if (filterform.isHidden()) {
                    return result >= 0;
                } else {
                    return result >= 0 && record.data.karmapoints >= refObject.searchMinValue && record.data.karmapoints <= refObject.searchMaxValue &&
                        departments && designations && primarySkills && projectsOrCustomerss && supervisors;
                }
            }, this);
        }
    },

    /**
     * this function will show the record according to the karma score.
     */
    onKarmaScoreLoad: function () {
        try {
            var viewModel = this.getViewModel(),
                storeData = viewModel.getStore('allkarmascores').data,
                karmaFilterView = this.getView().down('karmascorefilterview'),
                dateRangeField = karmaFilterView.down('daterangefield'),
                mainView = Ext.ComponentQuery.query('mainviewport')[0],
                mainVm = mainView.getViewModel(),
                me = this,
                totalRecCount = 0,
                resultRecCount = 0,
                resultPercentage = 0;
            if (storeData.items.length > 0) {
                totalRecCount = storeData.items[0].data.totalcount,
                    resultRecCount = storeData.items.length,
                    resultPercentage = ((resultRecCount / totalRecCount) * 100);
            }
            viewModel.set('karmaScorePercentage', resultRecCount + "/" + totalRecCount + " (" + resultPercentage.toFixed(1) + "%)");
            if (mainVm.data.dateObj) {
                dateRangeField.setValue(mainVm.data.dateObj);
            }
            Ext.getBody().unmask();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.LARMALOAD, err);
        }
    },
    /**
     * The function onGroupItemSelect will perform when the 'select' event of the comboBox is fired in the SearchForm View.
     * This function is filtering the store and showing the data related to selected item in combo.
     * The event will fire when the value of the field is selecte.
     * @param { Ext.form.field.Field} 'combo' which is the form field.
     * @param 'record' - selected item.
     * @param {Object} 'eOpts'
     */
    onGroupItemSelect: function (combo, record, eOpts) {
        try {
            Ext.getBody().mask('');
            var view = this.getView(),
                viewModel = this.getViewModel(),
                store = viewModel.getStore('allkarmascores'),
                ref = view.getReferences(),
                dataViewCards = ref.dataViewCards,
                designCont = dataViewCards.down('dataview[reference="designation"]'),
                count;
            store.clearGrouping();
            viewModel.set('count', 0);
            viewModel.set('supervisorCount', 0);
            viewModel.set('empDesignId', null);
            viewModel.set('empSuperVisorName', null);
            if (combo.value === 1) {
                store.group('hr_designation_id');
            } else if (combo.value === 2) {
                store.group('supervisor_id');
            } else { //do nothing
            }
            dataViewCards.setActiveItem(record.get('group_value'));
            Ext.getBody().unmask();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.GROUPITEM, err);
        }
    },
    /**
     * The function itemHeaderClickFn will open those employee profile according to the selected item in combo.
     * @param 'scope' - containing the karmaScoreview
     * @param {Ext.view.View} 'view' containing the karmaScoreDataView.
     * @param 'selec' it will containing the combo item.
     * @param 'relativeId' it will containing the combo item id.
     */
    itemHeaderClickFn: function (scope, view, item, count, selec, relativeId) {
        var viewModel = scope.getViewModel();
        viewModel.set(count, 0);
        if (viewModel.get(selec) == item.getAttribute(relativeId)) {
            viewModel.set(selec, null);
        } else {
            viewModel.set(selec, item.getAttribute(relativeId));
        }
        view.refresh();
    },
    /**
     * This function will redirect to the selected employee profile.
     */
    redirectProfileItemClick: function (mouseevent, karmaitemblock, events) {
        try {
            var empCode = karmaitemblock.getAttribute('emp-code');
            this.up('karmascoreview').getController().redirectTo('profile/' + empCode);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.PROFILE, err);
        }
    },
    /**
     * The function onDesignItemHeaderClick is perform when the 'itemclick' event isfired from the karmaDesignitemClick.
     * this function will open those employee list who have that Designation.
     * @param {Ext.view.View} 'view' containing the karmaScoreDataView.
     * @param 'record' which is a selected record.
     * @param {numbers} 'index, which is a index Number'.
     * @param {event} 'e' - click event.
     * @param {Object} 'eOpts' which is an object.
     */
    onDesignItemHeaderClick: function (view, record, item, index, e, eOpts) {
        this.itemHeaderClickFn(this, view, item, 'count', 'selecDesignId', 'hr-design-id');
    },
    /**
     * The function onDesignViewRender is perform when the onDesignView is render.
     * when we click on the profile of the emloyee then this function will open the 
     * profile of the selected employee.
     * @param {Ext.view.View} 'view' containing the karmaDesignationDataView.
     * @param {Object} 'eOpts' which is an object.
     */
    onDesignViewRender: function (view, eOpts) {
        try {
            this.getView().getEl().on({
                scope: view,
                click: this.redirectProfileItemClick,
                delegate: 'div.ddo-adv-design-search-item'
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.DESIGNATION, err);
        }
    },
    /**
     * The function onSuperVisorViewRender is perform when the SuperVisorView is render.
     * when we click on the profile of the emloyee then this function will open the 
     * profile of the selected employee.
     * @param {Ext.view.View} 'view' containing the karmaSuperVisorDataView.
     * @param {Object} 'eOpts' which is an object.
     */
    onSuperVisorViewRender: function (view, eOpts) {
        try {
            this.getView().getEl().on({
                scope: view,
                click: this.redirectProfileItemClick,
                delegate: 'div.ddo-adv-design-search-item'
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.SUPERVISOR, err);
        }
    },
    /**
     * The function onSuperVisorItemHeaderClick is perform when the 'itemclick' event isfired from the karmaSuperVisorDataView.
     * this function will open those employee list who have that SuperVisor.
     * @param {Ext.view.View} 'view' containing the karmaSuperVisorDataView.
     * @param 'record' which is a selected record.
     * @param {numbers} 'index, which is a index Number'.
     * @param {event} 'e' - click event.
     * @param {Object} 'eOpts' which is an object.
     */
    onSuperVisorItemHeaderClick: function (view, record, item, index, e, eOpts) {
        try {
            var clsName = e.target.className,
                empCode = e.target.getAttribute('sup-emp-code');
            if ((clsName === 'profileImage-adv-cls' ||
                    clsName === 'scorerName-cls') &&
                empCode != "0") {
                this.redirectTo('profile/' + empCode);
            } else {
                this.itemHeaderClickFn(this, view, item, 'supervisorCount', 'selecSuperVisorId', 'super-visor-id');
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.SUPERVISORHEADER, err);
        }
    },
    /**
     * The function onDateRangeChange is responsible to format the dates in the required manner.
     * @param {daterangefield} 'me' which renders the daterangefield.
     * @param {string} 'newValue' the new value which is clicked by the user.
     * @param {oldvalue} - which is an empty string.
     */
    onDateRangeChange: function (me, newValue, oldValue, eOpts) {
        try {
            var viewModel = this.getViewModel(),
                store = viewModel.getStore('allkarmascores'),
                mainview = me.up('karmascoreview'),
                advSearchView = mainview.down('karmascoreadvancedsearchview');
            if (Ext.isEmpty(newValue)) {
                me.triggers.cancel.hide();
                store.getProxy().setUrl('/karma/getAllkarmascores');
                store.getProxy().setExtraParams({
                    all: true
                });
                store.load();
            } else {
                me.triggers.cancel.show();
                var dateValues = newValue.split(" - "),
                    startDateValue = dateValues[0].split("-"),
                    toDateValue = dateValues[1].split("-"),
                    startDateFormat = startDateValue[2] + "-" + startDateValue[1] + "-" + startDateValue[0],
                    endDateFormat = toDateValue[2] + "-" + toDateValue[1] + "-" + toDateValue[0],
                    params = {
                        fromDate: startDateFormat,
                        toDate: endDateFormat
                    };
                store.getProxy().setUrl('/karma/daterange');
                store.getProxy().setExtraParams(params);
                store.load();
            }
            this.triggerSearch(advSearchView.down('searchformview'), me.up('karmascorefilterview'));
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.DATERANGE, err);
        }
    },
    /**
     * The function onDownloadBtnclick will perform when the 'click' event  in the SearchForm View.
     * This function will download the employee record.
     */
    onDownloadBtnclick: function () {
        try {
            var viewModel = this.getViewModel(),
                KarmaScoreStore = viewModel.getStore('karmaReportStore');
            var arrData = [];
            KarmaScoreStore.each(function (record) {
                delete record.data.id; /*removing Ext generated Ext.model Id*/
                arrData.push(record.data);
            });
            var data = JSON.stringify(arrData);
            var ShowLabel = true;
            var title = 'karmascore';
            var arrData = typeof data != 'object' ? JSON.parse(data) : data;
            var CSV = '';
            if (ShowLabel) {
                var row = "";
                for (var index in arrData[0]) {
                    row += index + ',';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';
            }
            this.downloadRecord(arrData, CSV, title);
            this.karmaScoreDwld(CSV, title);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASCORE.DOWNLOAD, err);
        }
    },
    /**
     * This function will download the employee record which is containing the karma score.
     */
    downloadRecord: function (arrData, CSV, title) {
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            alert("Invalid data");
            return;
        }
    },
    /**
     * This function will download the employee record which is containing the karma score.
     */
    karmaScoreDwld(CSV, title) {
        var fileName = "MyReport_";
        fileName += title.replace(/ /g, "_");
        var blob = new Blob([CSV], {
            type: 'text/xls;charset=utf-8;'
        });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName + ".xls");
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.download = fileName + ".xls";
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                saveAs(blob, 'EmployeeKarma.xls');
            }
        }
    }
});