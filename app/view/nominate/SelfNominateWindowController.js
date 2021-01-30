/**
 * The file SelfNominateWindowController is the controller for 'DDO.view.nominate.SelfNominateWindow'
 */

Ext.define('DDO.view.nominate.SelfNominateWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.selfnominatewindowcontroller',


    onWindowOutsideTap: function (event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },
    
    // onWindowOutsideClick: function ( comp, event, eOpts ) {
    //     if(event.fromComponent.reference == comp.reference){
    //         comp.close();
    //     }
    // },

    /**
     * The function deleteGridRow will perform when the event 'handler' is being fired in the SelfNominateViewGrid.
     * @param {Ext.view.Table} 'grid' is the owning table view.
     * @param {Number} 'rowIndex' which takes the rowIndex value.
     * @param {Number} 'colIndex' which takes the column index value.
     */
    deleteGridRow: function (grid, rowIndex, colIndex) {
        try{
            var view = this.getView();
            var gridStore = view.down("grid").getStore(),
                rec = gridStore.getAt(rowIndex);
            if (rec && rec.data && rec.data.ddo_nomination_id) {
                var nominationId = rec.data.ddo_nomination_id;
                var selfSendBackgridRec = Utility.selfSendBackgridRec;
                if (selfSendBackgridRec.length > 0) {
                    for (var i = 0; i < selfSendBackgridRec.length; i++) {
                        var nom = selfSendBackgridRec[i].ddo_nomination_id;
                        if (nom == nominationId) {
                            var sentBackNominationsStore = view.getViewModel().getStore('sentBackNominationsStore');
                            sentBackNominationsStore.add(selfSendBackgridRec[i]);
                            selfSendBackgridRec.splice(i, 1)
                        }
                    }
                }
            }
            gridStore.removeAt(rowIndex);
            if (gridStore.getModifiedRecords().length == 0) {
                var viewModel = view.getViewModel();
                viewModel.set('selfNomSubBtn', true);
            }
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.DELETENOMINATIONRECORD, err);
        }
        
    },

    /**
     * The function onTextAreaLength will perform when the 'change' event of the htmleditor is fired in the SelfNominateViewForm.
     * The event will fire when the value of the field is changed.
     * @param { Ext.form.field.Field} 'textarea'which is the form field.
     * @param {object} 'e' which takes the new value.
     */
    onTextAreaLength: function (textarea, e, eOpts) {
        try{
            var noLineBreakValue, trimValue, minChars, valueLen, charEnteredLen,
                view = this.getView(),
                viewModel = view.getViewModel();
            //Replacing new or read line with empty space.
            trimValue = this.getTrimValue(textarea, trimValue);
            minChars = Utility.minChars;
            valueLen = trimValue.length;
            charEnteredLen = minChars - valueLen;
            if (minChars - valueLen < 0) {
                charEnteredLen = 0;
            } else {
                charEnteredLen = charEnteredLen;
            }
            viewModel.set('minChars', charEnteredLen);
            this.changeButtonAccessibility(valueLen, trimValue, viewModel, view);
            this.isValuesEmpty();
        }
        catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.DELETENOMINATIONRECORD, err);
        }
    },
   /**
  * The function getTrimValue is used for replacing new or read line with empty space
  * @param { Ext.form.field.Field} 'textarea'which is the form field.
  * @param {trimValue} 'which is undefined'
  * @return {trimValue} 'which returns the string'
  */
    getTrimValue: function (textarea, trimValue) {
        var noLineBreakValue;
        textarea.value = textarea.value.replace(/&nbsp;/g, '');
        noLineBreakValue = textarea.value.replace(/(\r\n|\n|\r)/gm, " ");
        trimValue = noLineBreakValue.replace(/\s\s+/g, ' ').trim();
        trimValue = Ext.util.Format.stripTags(trimValue);
        return trimValue;
    },
    /**
 * The function changeButtonAccessibility is used for the vadilation of form for the existence of the button if all the validations are true in SelfNominationWindow.
 * @param {number} 'valueLen' which takes the length of the value entered in the field.
 * @param {string} 'trimValue' which takes the string of the value entered.
 * @param {viewModel} 'viewModel' which takes 'SelfNominateWindowModel'
 */
    changeButtonAccessibility: function (valueLen, trimValue, viewModel, view) {
        if (trimValue && valueLen > 19) {
            var values = view.down("selfnominateviewform").getValues();
            viewModel.set('areaTxt', false);
            if (values && values.karmacombo && values.karmaunits && values.karmaGivenDate) {
                viewModel.set('addButton', false);
            }
        } else {
            viewModel.set('addButton', true);
            viewModel.set('areaTxt', true);
        }
    },

    /**
     * The function isValueEmpty is fired whether to check form values are available or not SelfNominateViewForm.
     */
    isValuesEmpty: function () {
        var viewModel, formValues, category,
            view = this.getView(),
            form = view.down("form");
        category = view.getViewModel().getData();
        categoryid = category.category;
        formValues = view.down('form').getValues();
        var viewModel = this.getViewModel();
        if (formValues.freqcombo && formValues.karmaunits && formValues.karmacombo && formValues.karmaGivenDate) {
            return true;
        } else {
            return false;
        }
    },
      /**
   * The function karmaFrequencyAjax is used for the ajax request to get the frequency and to show the frequency value in the frequencyCombo field.
   * @param {number} 'userDesignationId' which takes the designationid number.
   * @param {number} 'karmaId' which takes the karmaId number.
   */
    karmaFrequencyAjax: function (userDesignationId, karmaId) {
        Ext.getBody().mask('');
        var me = this,
            view = me.getView();
        var promiseFrequency = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: Api.URL.ddonominate.getfrequency,
                method: 'GET',
                scope: this,
                params: {
                    designationId: userDesignationId,
                    karmaId: karmaId,
                },
                success: function (res) {
                    var resolveObj = {};
                    resolveObj.res = res;
                    resolveObj.view = view;
                    resolve(resolveObj);
                },
                failure: function (res) {
                    reject(res);
                }
            });
        });
        promiseFrequency.then(function(resolveObj){
                var result = JSON.parse(resolveObj.res.responseText),
                    frequency = null,
                    frequencyCombo = resolveObj.view.down('[name = freqcombo]');
                if (result.data.length > 0) {
                    frequency = result.data[0].frequency;
                    frequencyCombo.setValue(frequency);
                }
                Ext.getBody().unmask();
        }).catch(function(err){
            console.log('No frequency found!!!', err);
            Utility.showToast(Messages.NOMINATION.TOAST.FAILEDFREQUENCY, err);
            Ext.getBody().unmask();
        });
    },

   
    /**
     * The function onKarmaComboChange will perform when the 'change' event of the comboBox is fired in the SelfNominateViewForm.
     * The event will fire when the value of the field is changed.
     * @param { Ext.form.field.Field} 'combo'which is the form field.
     * @param {object} 'newValue' which takes the new value.
     */
    onKarmaComboChange: function (combo, newValue) {
        try{
            var isRatingBased, isRuleBased, karmaId, viewModel, params, userDesignationId;
            var viewModel = this.getViewModel();
            if (newValue) {
                var rec = combo.findRecordByValue(newValue);
                var view = this.getView(),
                    loginStore = Ext.getStore('login');
                viewModel = view.getViewModel();
                karmaId = rec.get('ddo_karma_id');
                isRuleBased = rec.get('ddo_karmarule_id');
                isRatingBased = rec.get('isratingbased');
                if (!Ext.isEmpty(loginStore)) {
                    if (!Ext.isEmpty(loginStore.getCount() > 0)) {
                        userDesignationId = loginStore.getData().items[0].data.designation;
                        viewModel.set('userDesignation', userDesignationId);

                    }
                }
                if (!Ext.isEmpty(userDesignationId) && !Ext.isEmpty(karmaId)) {
                    this.karmaFrequencyAjax(userDesignationId, karmaId);
                }
                
                viewModel.set('points', 0);
                //based on rating or rule hiding and showing
                this.changeRatingRulesApperance(isRuleBased, isRatingBased, karmaId, viewModel);
                var values = view.down("selfnominateviewform").getValues();
                if (values && values.freqcombo && values.comment && values.karmaunits && values.karmaGivenDate) {
                    viewModel.set('addButton', false);
                }
                this.isValuesEmpty();
                var numfield = combo.up('form').down('numberfield');
                if (numfield) {
                    this.onRuleFocusLeave(numfield);
                }
            }
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.KARMABASEDOPTION, err);
        }
        
    },
    /**
   * The function changeRatingRulesApperance is used to change the ratingRules in SelfNominateWindow.
   * @param {number} 'isRuleBased' which takes a number.
   * @param {string} 'isRatingBased' which is a string value.
   * @param {number} 'karmaId' which takes he karmaid number.
   * @param {viewModel} 'viewModel' which takes the 'selfnominatewindowmodel'
   */
    changeRatingRulesApperance: function (isRuleBased, isRatingBased, karmaId, viewModel) {
        if (isRatingBased && (isRatingBased === "Y")) {
            viewModel.set('ratingView', false);
            viewModel.set('ruleView', true);
        } else {
            viewModel.set('ratingView', true);
            viewModel.set('ruleView', false);
        }
        viewModel.set('ruleId', isRuleBased);
        viewModel.set('karmaId', karmaId);
    },
    /**
     * The function onAddBtn will perform when the 'handler' event of the 'button' is fired in the SelfNominateViewForm
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     */
    onAddBtn: function (btn) {
        try{
            if (this.isValuesEmpty() == true) {
                var view = this.getView(),
                    viewModel = view.getViewModel(),
                    viewModelData = viewModel.getData(),
                    category, formValues, htmlEditor, comment, ddo_nomination_id, grid, gridStore;
                category = viewModelData.category;
                var karmaScore = viewModelData.karmaScore;
                var categoryname = viewModelData.categoryName;
                var categoryid = viewModelData.categoryComboValue;
                var karmaId = viewModelData.karmaId;
                var form = view.down("form");
                var karmaName = form.down("combobox[name=karmacombo]").getDisplayValue();
                formValues = form.getValues();
                var empId = formValues.emp_id_combo;
                var empStore = Ext.getStore('projects.EmpNamesStore');
                if (empId && empId != null && empId != '') {
                    var empStoreFindRec = empStore.findRecord("user_id", empId);
                    if (empStoreFindRec && empStoreFindRec != null) {
                        var empDesignationId = empStoreFindRec.get('user_designation_id');
                    }
                }
               
                grid = view.down('grid');
                gridStore = viewModel.getStore('SelfNominateGridStore');
                var frequencyName = btn.up("window").down("combobox[name=freqcombo]").getDisplayValue();
                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var todayDate;
                var dateFieldValue = new Date(formValues.karmaGivenDate);
                var karmaGivenMonth = dateFieldValue.getMonth() + 1;
                if (karmaGivenMonth > 9) {
                    karmaGivenMonth = karmaGivenMonth;
                    todayDate = month + "-" + year;
                } else {
                    karmaGivenMonth = "0" + karmaGivenMonth
                    todayDate = "0" + month + "-" + year;
                }
                var karmaGivenYear = dateFieldValue.getFullYear();
                var karmaGivenDate = karmaGivenMonth + "-" + karmaGivenYear;
                var nominateKarmaDate;
                if (formValues.karmaGivenDate == "") {
                    nominateKarmaDate = todayDate;
                } else {
                    nominateKarmaDate = karmaGivenDate;
                }
                htmlEditor = btn.up('selfnominateviewform').down('textarea');
                comment = htmlEditor.getValue();
                function resize () {
                    comment.style.height = 'auto';
                    comment.style.height = comment.scrollHeight+'px';
                }
                /* 0-timeout to get the already changed text */
                function delayedResize () {
                    window.setTimeout(resize, 0);
                }
                var isValue = gridStore.findBy(function (record) {
                    return record.data.frequency == formValues.freqcombo && record.data.kamaCombo == formValues.karmacombo && record.data.karmaGivenDate == nominateKarmaDate;
                });
                if (isValue == -1) {
                    if (formValues.karmaunits > 0) {
                        var newRecord = {
                            category: category,
                            categoryid: categoryid,
                            karmaId: karmaId,
                            frequencyName: frequencyName,
                            frequency: formValues.freqcombo,
                            hours: formValues.karmaunits,
                            kamaCombo: formValues.karmacombo,
                            description: comment,
                            categoryName: categoryname,
                            karmaScore: karmaScore,
                            karmaname: karmaName,
                            empComboId: formValues.emp_id_combo,
                            empComboDesignation: empDesignationId || null,
                            karmaGivenDate: nominateKarmaDate
                        }
                        if (viewModel.get('ddo_nomination_id')) {
                            ddo_nomination_id = viewModel.get('ddo_nomination_id')
                            newRecord.ddo_nomination_id = ddo_nomination_id;
                            newRecord.description = viewModel.get('description') || comment;
                        }
                        newRecord.derivedKarmaPoints = viewModel.get('points');
                        gridStore.add(newRecord);
                        viewModel.set('points', 0);
                        if (ddo_nomination_id) {
                            var sentBackNomStore = viewModel.getStore('sentBackNominationsStore'),
                                sentBackgridRowIdx = viewModel.get('sendbackrowindex');
                            Utility.sentBackRecords.push(newRecord);
                            sentBackNomStore.removeAt(sentBackgridRowIdx);
                            viewModel.set('ddo_nomination_id', null)
                        }
                        if (gridStore.getModifiedRecords().length > 0) {
                            viewModel.set('selfNomSubBtn', false);
                        }
                    } else {
                        viewModel.set('points', 0);
                        Utility.topAlertMessage(Messages.NOMINATION.WARNING, Messages.NOMINATION.HOURSWARNING);
                    }
                } else {
                    viewModel.set('points', 0);
                    Utility.topAlertMessage(Messages.NOMINATION.WARNING, Messages.NOMINATION.RECORDEXIST);
                }
            }
            var form = view.down("form"),
                empCombo;
            viewModel.set('isFreqComboDisabled', false);
            form.reset();
            empCombo = form.down('[name=emp_id_combo]');
            if (empId != null && empId != '') {
                empCombo.setValue(empId);
            }
            viewModel.set('addButton', true);
            viewModel.set("karmascore", null);
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.ADDNOMINATIONRECORD, err);
        }
    },

    /**
     * onRuleFocusLeave function is the numberfield foucs leave event function.
     * @param {Ext.form.field.Text} 'numfield' this is the text field.
     * @param {Ext.event.Event} 'event'
     * @param {object} 'eOpts' which is the object.
     */

    onRuleFocusLeave: function (numfield, event, eOpts) {
        var view = this.getView(),
            formValues = view.down("form").getValues(),
            frequency = formValues.freqcombo,
            karma = formValues.karmacombo;
        if (frequency && numfield && numfield.getValue()) {
            this.nominatePoints(numfield, undefined);
        } else {
            this.getViewModel().set('points', 0);
            this.getViewModel().set('karmaUnits', null);
            numfield.setValue("");
        }
        var commentValue = formValues.comment;
        var commentValueLength = commentValue ? commentValue.length : 0;
        var isvalidComment = (commentValueLength >= 140) ? true : false;
        if (formValues && formValues.karmacombo && frequency && isvalidComment && formValues.karmaunits && formValues.karmaGivenDate) {
            this.getViewModel().set('addButton', false);
        } else {
            this.getViewModel().set('addButton', true);
        }
        this.isValuesEmpty();
    },
    /**
     * The function nominateIconDeselect will perform when the 'beforedeselect' event of Ext.view.View is fired from the NominateViewIcons.js
     * @param {Ext.selection.DataViewModel} 'me'
     * @param {Ext.data.Model} 'record' The deselected record.
     * @param {Number} 'index' The index within the store of the deselected record.
     * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
     */
    nominateIconDeSelect: function (me, record, index, eOpts) {
        var value = (Utility.isIconSelected) ? true : false;
        Utility.isIconSelected = false;
        return value;
    },
    /**
     * request call for calculatekarmascore based on rating Icon Click
     * @param {component} 'numfield' which takes a number field component where user enters for karma points.
     * @param {undefined} 'record' which is undefined.
    */
    nominatePoints: function (numfield, record) {
        
        try{
            var me, karmaId, ratingId, karmaUnits, ruleId, viewModel, params;
            var view = this.getView();
            var form = view.down("form");
            var formValues = form.getValues();
            var frequency = formValues.freqcombo;
            var empId = formValues.emp_id_combo;
            var empStore = Ext.getStore('projects.EmpNamesStore');
            if (empId && empId != null && empId != '') {
                var empStoreFindRec = empStore.findRecord("user_id", empId);
                if (empStoreFindRec && empStoreFindRec != null) {
                    var empDesignationId = empStoreFindRec.get('user_designation_id');
                }
            }
            me = this;
            viewModel = me.getViewModel();
            karmaId = viewModel.get('karmaId');
            ratingId = (record) ? record.get('ratingid') : null;
            viewModel.set('ratingId', ratingId);
            karmaUnits = (numfield) ? numfield.getValue() : null;
            viewModel.set('karmaUnits', karmaUnits);
            ruleId = viewModel.get('ruleId');
            projectId = Utility.nominateProjectId || null;
            //objects to pass params for calculate karmascore
            params = {
                karmaId: karmaId,
                ratingId: ratingId,
                karmaUnits: karmaUnits,
                karmaRuleId: ruleId,
                projectId: projectId,
                frequency: frequency,
                toCbpid: empId,
                empComboDesignation: empDesignationId
            };
            this.calulateKarmaScore(params, viewModel, form);
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.KARMACALCULATION, err);
        }
        
    },
    /**
    * The function calulateKarmaScore is to post karmascore based on emp_id_combo in self nominate window.
    * @param {params} 'params' which takes the params like 'karmaId' 'ratingId' 'karmaUnits' 'karmaRuleId' 'projectId' 'frequency' 'toCbpid' 
    * @param {viewModel} 'viewModel' which takes the viewModel of SelfNominateWindowModel.
    * @param {Ext.form.Form} 'form' which takes the SelfNominateViewForm.
    */
    calulateKarmaScore: function (params, viewModel, form) {
        var visitorScore = form.down('[reference = visitorscore]');
        visitorScore.mask('loading...');
        var promiseFrequency = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: Api.URL.ddonominate.calulateKarmaScore, //API singleton
                params: params,
                method: 'POST',
                success: function (response, opts) {
                    var resolveObj = {};
                    resolveObj.res = response;
                    resolveObj.viewModel = viewModel;
                    resolveObj.form = form;
                    resolve(resolveObj);
                    visitorScore.unmask();
                },
                failure: function (response, opts) {
                    reject(response);
                    visitorScore.unmask();
                }
            });
        });
        promiseFrequency.then(function(resolveObj){
                var obj, points, errorMessage;
                obj = Ext.decode(resolveObj.res.responseText);
                if (obj.data.errorMessage) {
                    errorMessage = obj.data.errorMessage;
                    resolveObj.viewModel.set('addButton', true);
                    var formValues = resolveObj.form.getValues();
                    var empId = formValues.emp_id_combo;
                    var karmaPointField = resolveObj.form.down('[name = karmaunits]');
                    karmaPointField.reset();
                    var empCombo = resolveObj.form.down('[name=emp_id_combo]');
                    empCombo.setValue(empId);
                    Ext.Msg.alert('Warning', errorMessage);
                    points = 0;
                } else {
                    points = obj.data.karmapoints.karma_points || null;
                }
                resolveObj.viewModel.set('points', points);
        }).catch(function(err){
            console.log(Messages.NOMINATION.SERVERERROR + err.status, err);
        });
    },
    /**
     * The function onApprovalBtn is fired when the 'click' event is hit in the SelfNominateWindow.
     */
    onApprovalBtn: function (btn) {
        try{
           var approvalClick =  btn.up('window');
           approvalClick.mask('loading...');
            var frequency, isProcessed,
                view = this.getView(),
                gridViewStore = view.down('selfnominateviewgrid').getStore(),
                viewModel = this.getViewModel(),
                ruleId = viewModel.get('ruleId'),
                ratingId = viewModel.get('ratingId'),
                loginData = Ext.getStore('login').getData(),
                toCbpid = loginData.items[0].data.ddo_employee_id,
                grid = gridViewStore.getRange(),
                categoriesList = [],
                nominateParams = {};
            this.getCategoriesList(gridViewStore, categoriesList, toCbpid, ratingId, viewModel);
            nomAccess = true;
            showalert = true;
            if (nomAccess) {
                Utility.selfnominateProcess(this, nominateParams, categoriesList, showalert);
                approvalClick.unmask();
            } else {
                Ext.Msg.alert('Error', AlertMessages.selfNomError);
                approvalClick.unmask();
            }
            var grid = view.down('grid');
            grid.getStore().removeAll();
        }  catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.SENDAPPROVAL, err);
        }
        
    },
      /**
    * The function getCategoriesList is used to get the categoriesList when we click on the approvalbutton in SelfNominateWindow.
    * @param {constructor} 'gridViewStore' which gets the store from 'SelfNominateGridModel'.
    * @param {array} 'categoriesList' which takes an empty array.
    * @param {number} 'toCbpid' which takes a number.
    * @param {number} 'ratingId' which is null.
    * @param {viewModel} 'viewModel' which takes the viewModel of 'selfnominatewindowmodel'
    */
    getCategoriesList: function (gridViewStore, categoriesList, toCbpid, ratingId, viewModel) {
        var me = this;
        gridViewStore.each(function (record) {
            var nominateParams = {};
            nominateParams.frequency = record.get("frequency");
            nominateParams.karmaUnits = record.get("hours");
            nominateParams.description = record.get("description");
            nominateParams.kamaCombo = record.get("kamaCombo");
            nominateParams.karmaId = record.get("karmaId");
            nominateParams.toCbpid = record.get("empComboId") || toCbpid;
            nominateParams.ratingId = ratingId;
            nominateParams.categoryId = record.get("categoryid");
            nominateParams.projectEmpIds = viewModel.get('tagId');
            nominateParams.projectId = Utility.nominateProjectId || null;
            nominateParams.empComboDesignation = record.get('empComboDesignation')
            nominateParams.karmaGivenDate = record.get('karmaGivenDate'),
            nominateParams.ddo_nomination_id = record.get('ddo_nomination_id') || null;
            nominateParams.derivedKarmaPoints = record.get('derivedKarmaPoints');
            nominateParams.karmaRuleId = viewModel.get('ruleId');
            nominateParams.designation = viewModel.get('userDesignation');
            categoriesList.push(nominateParams);
        }, me);
       
    },
    /**
     * The function OnFrequencySelect will perform when the 'change' event of the combobox is fired in the SelfNominateViewForm.
     * The event will fire when the value of the field is changed.
     */
    OnFrequencySelect: function () {
        try {
            var view = this.getView(),
                formValues = view.down("form").getValues();
            if (formValues && formValues.karmacombo && formValues.karmaunits) {
                var numfield = view.down('form').down("numberfield");
                this.onRuleFocusLeave(numfield);
            }
        }  catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.FREQUENCYSELECTERROR, err);
        }
        
    },
    /**
     * The function windowBeforeClose will perform before the window panel is closed.
     */
    windowBeforeClose: function () {
        try {
            var selfNominateWinodw = this.getView(),
                selfNominateForm = selfNominateWinodw.down("selfnominateviewform"),
                selfNominationGrid = selfNominateWinodw.down('grid'),
                selfNominateWindowVM = selfNominateWinodw.getViewModel(),
                SelfNominateGridStore = selfNominateWindowVM.getStore('SelfNominateGridStore'),
                categoryStore = selfNominateWinodw.down('[name = categories]').getStore(),
                items = SelfNominateGridStore.data.items[0];
            if (items) {
                var categoryName = items.data.categoryName;
            }
            if ((selfNominationGrid && categoryName) || (selfNominateForm && selfNominateForm.isDirty())) {
                this.beforeCloseConfirmation(selfNominateForm, SelfNominateGridStore, categoryStore, selfNominateWinodw);
            }
            var messageBox = Ext.ComponentQuery.query('window')[0];
            if (messageBox && messageBox.isVisible()) {
                return false;
            }
        }  catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.WINDOWCLOSEBEFORE, err);
        }
        
    },
   /**
    * The function beforeCloseConfirmation is used  before closing the window 
    * like reset the form removing the store and clearing filter and then closing the window.
    * @param {Ext.form.Form} 'selfNominateForm' which takes 'selfnominateviewform'    
    * @param {Ext.data.Model} 'SelfNominateGridStore' which takes the store of SelfNominateGridModel.
    * @param {Ext.data.Store} 'categoryStore' which takes the store of 'karmasetup.KarmaCategoriesStore'
    * @param {Ext.window.Window} 'selfNominateWinodw' which takes 'selfnominatewindow'
    */
    beforeCloseConfirmation: function (selfNominateForm, SelfNominateGridStore, categoryStore, selfNominateWinodw) {
        Ext.Msg.show({
            title: LabelsTitles.NOMINATION.CONFIRMTITLE,
            message: Messages.NOMINATION.CLOSECONFIRMATION,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (button) {
                if (button === 'yes') {
                    selfNominateForm.reset();
                    SelfNominateGridStore.removeAll();
                    categoryStore.clearFilter();
                    selfNominateWinodw.close();
                }
            }
        });
    },
    /**
     * The function onEmpComboSelect will perform when the 'change' event of the comboBox is fired in the SelfNominateViewForm.
     * The event will fire when the value of the field is changed.
     * @param { Ext.form.field.Field} 'combo' which is the form field.
     * @param {object} 'record' which takes the new value.
     * @param {object} 'eOpts' which takes the oldvalue.
     */

    onEmpComboSelect: function (combo, record, eOpts) {
        try {
            var viewModel = this.getViewModel();
            viewModel.set('karmaUnits', '');
            viewModel.set('points', 0);
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.EMPLOYEEDETAILSETUP, err);
        }
    },
    /**
     * The function onDateCancelClick will perform when the 'CancelClick'event of the picker.
     * Month is fired from the SelfNominateViewForm.Fires when the cancel button is clicked.
     * @param {Ext.picker.Month} 'm'
     * @param {Object} 'd'
     */
    onDateCancelClick: function (m, d) {
      
        
    },
    /**
     * The function 
     *  will perform when the 'OkClick'event of the picker.
     * Month is fired from the SelfNominateViewForm.Fires when the OK button is clicked.
     * @param {Ext.picker.Month} 'm'
     */
    onDateOKClick: function (m) {
        try {
            var me = m.up('datefield'),
                date = new Date(),
                month = date.getMonth(),
                currentYear = date.getFullYear(),
                selectedYear,
                allowPrevMonthCount = m.allowPrevMonthCount || 1,
                selectedMonth;
            if (me.selectMonth) {
                selectedYear = me.selectMonth.getFullYear();
                selectedMonth = me.selectMonth.getMonth();
                if (month >= selectedMonth && (month - allowPrevMonthCount) <= selectedMonth && currentYear == selectedYear) {
                    me.setValue(me.selectMonth);
                    me.fireEvent('select', me, me.selectMonth);
                } 
                else if(selectedYear < currentYear  && selectedMonth == 11){
                    me.setValue(me.selectMonth);
                    me.fireEvent('select', me, me.selectMonth);
                }
                else {
                    return '';
                }
            } else {
                me.setValue(new Date());
                me.fireEvent('select', me, new Date());
            }
            me.collapse();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTIONCONFIRMATION, err);
        }
    },
    /**
     * The function onDateSelect will perform when the 'Select' event of the picker.
     * Month is fired from the SelfNominateViewForm.Fires when a month/year is selected.
     * @param {Ext.picker.Month} 'm'
     * @param {Array} 'd' the current value.
     */
    onDateSelect: function (m, d) {
        try {
            var date = new Date();
            var currentYear = date.getFullYear();
            var me = m.up('datefield');         
            if(d[1] < currentYear){
                m.months.elements.forEach((ele) => {
                var match = -1;
                var eligableMonth = "Dec";
                match = eligableMonth.indexOf(ele.outerText);
                if(match > -1){
                    ele.classList.remove('disabled-month-year');
                } else {
                    ele.classList.add('disabled-month-year');
                }
                });
                me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
            }
            else{
                me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
            }
         } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTPROCESS, err);
        }

    },

    /**
     * The function onCategorySelect will perform when the 'change' event of the comboBox is fired in the SelfNominateViewForm.
     * The event will fire when the value of the field is changed.
     * @param { Ext.form.field.Field} 'field' which is the form field.
     * @param {object} 'value' which takes the new value.
     */
    onCategorySelect: function (field, value) {
        try {
            var val = field.getDisplayValue(),
                view = this.getView(),
                karmaComboStore = view.down('[name=karmacombo]').getStore(),           
                windowView = this.getView(),
                viewModel = windowView.getViewModel(),
                designationId;
            viewModel.set('categoryName', val);
            if (!karmaComboStore.isLoaded()) {
                karmaComboStore.load();
            }
            viewModel.set('iconSelection', null);
            viewModel.set('points', 0);
            viewModel.set('ratingView', true);
            viewModel.set('ruleView', true);
            karmaComboStore.clearFilter(true);
            designationId = this.getDesignationId(designationId);
            if (!Ext.isEmpty(designationId)) {
                this.getKarmaData(designationId, karmaComboStore, val);
            }
            viewModel.set('categoryComboValue', value);
            var data = this.getView().down('form').getValues();
            if (data && data.karmaunits && data.karmacombo && data.freqcombo && data.comment && data.karmaGivenDate) {
                viewModel.set('addButton', false);
            } else {
                viewModel.set('addButton', true);
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.KARMACATEGORYSELECTION, err);
        }
    },
     /**
   * The function getDesignationId is used to get the designationId based on the login credentials.
   * @param {number} 'designationId' which takes the number.
   */
    getDesignationId: function (designationId) {
        var loginStore = Ext.getStore('login');
        if (!Ext.isEmpty(loginStore)) {
            if (!Ext.isEmpty(loginStore.getCount() > 0)) {
                designationId = loginStore.getData().items[0].data.designation;
            }
        }
        return designationId;
    },
     /**
   * The function getKarmaData is used to get the karmaData from the backend based on the designationId.
   * @param {number} 'designationId' which takes the designationid number.
   * @param {Ext.data.Store} 'karmaComboStore' which takes the store of 'KarmaNominateStore'.
   * @param {string} 'val' which takes the string.
   */
    getKarmaData: function (designationId, karmaComboStore, val) {
        Ext.getBody().mask('');
        var promiseKarma = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: Api.URL.ddonominate.getkarma,
                method: 'GET',
                scope: this,
                params: {
                    designationId: designationId
                },
                success: function (res) {
                    var resolveObj = {};
                    resolveObj.res = res;
                    resolveObj.val = val;
                    resolveObj.karmaComboStore = karmaComboStore;
                    resolve(resolveObj);
                },
                failure: function (res) {
                    reject(res);
                }
            });
        });
        promiseKarma.then(function(resolveObj){
                    var result = JSON.parse(resolveObj.res.responseText);
                    if (result.data.length > 0) {
                        resolveObj.karmaComboStore.filterBy(function (rec) {
                        if (rec.get('karmacategoryname') == resolveObj.val) {
                            var karmaId = rec.get('ddo_karma_id');
                            var str = JSON.stringify(result.data);
                            if (str.indexOf(karmaId) > -1) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                Ext.getBody().unmask();
        }).catch(function(err){
            console.log('No karma found!!!', err);
            Ext.getBody().unmask();
        });
    },
    /**
     * The function onDateFieldCollapse will perform when 'collapse' event of datefield is fired from the SelfNominateViewForm.
     * @param {Ext.form.field.Picker} 'field' the field instance.
     * @param {object} 'eOpts'.Which is an object.
     */

    onDateFieldCollapse: function (field, eOpts) {
        try {
            var view = this.getView(),
                data = view.down("form").getValues(),
                viewModel = view.getViewModel();
            if (data && data.karmaunits && data.karmacombo && data.freqcombo && data.comment && data.karmaGivenDate) {
                viewModel.set('addButton', false);
            } else {
                viewModel.set('addButton', true);
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.DATEPICKERCLOSE, err);
        }
        
    },
    /**
     * The function onActiveDateField will perform when the 'activate' event of the picker.Month is fired in the SelfNominateViewForm.
     * The event will fires after the component is visually activated.
     * @param {Ext.Component} 'view'
     * @param {object} 'e'
     */
    onActiveDateField: function (view, e) {
        try {
         
            var date = new Date(),
                month = date.getMonth(),
                currentYear = date.getFullYear(),
                year = [],   
                allowPrevMonthCount = view.allowPrevMonthCount || 1,
                allowPrevYearCount = view.allowPrevYearCount || 1,
                match = -1,
                eligableMonth = [],
                monthName = Utility.MONTHNAME,
                prevYear = currentYear - allowPrevYearCount;                
                year.push(currentYear);
                if(month < 1){
                    year.push(prevYear);
                }
            eligableMonth.push(monthName[month]);
            if (allowPrevMonthCount > 1) {
                for (let i = allowPrevMonthCount; i > 0; i--) {
                    eligableMonth.push(monthName[month - i]);
                }
            } else {
                eligableMonth.push(monthName[month - allowPrevMonthCount]);
            }
            this.getEligibleDates(view, eligableMonth, year);
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.DATEPICKERACTIVATION, err);
        }
    },
   /**
   * The function getEligibleDates is used to check for the eligible months on onActiveFieldDate.
   * @param {Ext.month.Picker} 'view' which takes the component of month picker.
   * @param {array} 'eligableMonth' which takes the array of months.
   * @param {array} 'year' which takes the array of years.
   */
    getEligibleDates: function (view, eligableMonth, year) {
       
        //Months
        view.months.elements.forEach((ele) => {
            match = -1;
            match = eligableMonth.indexOf(ele.outerText);
            if (match > -1) {
                ele.classList.remove('disabled-month-year');
            } else {
                ele.classList.add('disabled-month-year');
            }
        });
        //Years
        year = JSON.stringify(year);
        view.years.elements.forEach((ele) => {
            match = -1;
            match = year.indexOf(ele.outerText);
            if (match > -1) {
                ele.classList.remove('disabled-month-year');
            } else {
                ele.classList.add('disabled-month-year');
            }
        });
    },
    /**
     * The function onSentbackGridRowClick will perform when the 'rowclick' of the 'Ext.grid.Panel' is fired in the SelfNominateWindow.The event will fire when the table cell is clicked.
     * @param { Ext.view.Table} 'me'
     * @param {Ext.data.Model} 'record'
     * @param {HTMLElement} 'tr' The tr element of the cell.
     * @param { Number} 'rowIndex' index number of the particular row.
     */
    // onSentbackGridRowClick: function (me, record, tr, rowIndex) {
    //     try {
    //         var view = this.getView(),
    //             viewModel = view.getViewModel(),
    //             tabPanel = view.down('tabpanel'),
    //             form = tabPanel.down('form'),
    //             data = record.data,
    //             month = data.ddo_nomination_date || data.karmaGivenDate;

    //         monthYear = month.split('-').reverse().join('-');
    //         monthYear = new Date(monthYear);
    //         viewModel.set('ddo_nomination_id', data.ddo_nomination_id);
    //         viewModel.set('sendbackrowindex', rowIndex);
    //         viewModel.set('sendbackcomment', data.description)
    //         tabPanel.setActiveTab(0);
    //         this.setFormValues(form, data, monthYear);
    //     } catch (err) {
    //          Utility.showToast(Messages.NOMINATION.TOAST.SENTBACKNOMINATION, err);
    //     }
        
    // },
    /**
   * The function setFormValues is used to set the from values when onSentbackGridRowClick is performed.
   *@param {Ext.form.Form} 'form' which takes the SelfNominateViewForm.
   *@param {data} 'data' which takes the form data.
   *@param {monthYear} 'monthYear' which takes the month from the new Date().
   */
    setFormValues: function (form, data, monthYear) {
        
        var categories = form.down('[name = categories]'),
            karmaGivenDate = form.down('[name = karmaGivenDate]'),
            karmacombo = form.down('[name = karmacombo]'),
            freqcombo = form.down('[name = freqcombo]'),
            karmaunits = form.down('[name = karmaunits]'),
            comment = form.down('[name = comments]'),
            htmlEditor = form.down('textarea'),
            frenquencyStore = freqcombo.getStore();

        frenquencyStore.load({
            scope: this,
            callback: function () {
                categories.setValue(data.ddo_karmacategory_id);
                karmaGivenDate.setValue(monthYear);
                karmacombo.setValue(data.ddo_karma_id);
                freqcombo.setValue(data.frequency);
                karmaunits.setValue(data.karmaunits);
                htmlEditor.setValue(data.comments);
                Utility.selfSendBackgridRec.push(data);
            }
        });
    },
    /**
     * The function onSelfNominationTabChange will perform when the 'tabchange' event of the 'tabpanel' is fired in the SelfNominationWindow.The event fires when the new panel has been clicked.
     * @param {Ext.tab.Panel} 'tabpanel' The TabPanel
     * @param {Ext.Component} 'newCard' The newly activated item
     * @param {Ext.Component} 'oldCard' The previously active item
     */
    onSelfNominationTabChange: function (tabPanel, newCard, oldCard) {
        try {
            var me = this,
                vm = me.getView().getViewModel();
            if (newCard.xtype == 'selfnominateviewgrid') {
                vm.set('action', true);
                vm.set('selfNomSubBtnHide', true);
            } else {
                vm.set('action', false);
                vm.set('selfNomSubBtnHide', false);
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATIONSWITCHTAB, err);
        }
    },
    /**
     * The function onNominateWindowClose will perform when the 'close' event of the 'window.Window' is fired from the SelfNominateWindow.
     */
    onNominateWindowClose: function () {
        try {
            var view = this.getViewModel();
            var windowView = this.getView();
            var categoryStore = windowView.down('[name = categories]').getStore();
            var karmaList = Ext.ComponentQuery.query('karmalist')[1];
            categoryStore.clearFilter(true);
            if (karmaList) {
                karmaList = karmaList.getView();
                karmaList = karmaList.refresh();
            }
            categoryStore.getProxy().extraParams = {};
            categoryStore.load();
            gridStore = view.getStore('SelfNominateGridStore');
            gridStore.removeAll();
            if (gridStore.getModifiedRecords().length == 0) {
                view.set('selfNomSubBtn', true);
            }
            view.set('addButton', true);
            var sentBackNominationsStore = this.getViewModel().getStore('sentBackNominationsStore');
            sentBackNominationsStore.load();
            Utility.selfSendBackgridRec = [];
            Utility.sentBackRecords = [];
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATIONWINDOWCLOSE, err);
        }
    }
});