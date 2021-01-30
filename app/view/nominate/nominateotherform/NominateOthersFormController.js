/**
 * The file NominateViewFormController is the controller for the DDO.view.nominate.nominateothers.NominateOthersViewForm file.
 */

Ext.define('DDO.view.nominate.nominateotherform.NominateOthersFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.nominateothersviewform',

    /**
     *The function 'isValuesEmpty' is to check form validations to enable and disable submit button
     * @param {undefined} 'rateview' which is undefined.
     */

    isValuesEmpty: function (rateview) {
       
        var viewModel, data = {},
            iskarmaNominate = false,
            submitContinue, employeeCombo;

        viewModel = this.getViewModel();
        data.ratingView = viewModel.get('ratingView');
        data.ruleView = viewModel.get('ruleView');
        data.areaTxt = viewModel.get('areaTxt');
        data.categoryComboValue = viewModel.get('categoryComboValue');
        data.karmaComboValue = viewModel.get('karmaComboValue');
        data.karmaUnits = viewModel.get('karmaUnits');
        employeeCombo = this.getView().down('tagfield');
        if (!employeeCombo.isHidden()) {
            ddo_employee_id = employeeCombo.getValue();
            if (!Ext.isEmpty(ddo_employee_id)) {
                iskarmaNominate = true;
            }
        } else {
            iskarmaNominate = true;
        }
        this.submitButtonEligbility(rateview, data, iskarmaNominate);
    },
  /**
   * The function 'submitButtonEligbility' is fired from the function 'isValuesEmpty' in the NominateOthersFormController
   * @param {undefined} 'rateview' which is undefined.
   * @param {object} 'data' which is an object having number of properties.
   * @param {boolean} 'iskarmaNominate' which takes a boolean value which is 'true' here.
   */
    submitButtonEligbility: function(rateview, data, iskarmaNominate){
        
        var nomBtn = this.getView().down('button[reference=submit]'),
            iconSelection = this.getView().down('nominateothersviewicons').getSelection()[0] || null,
            icon = false;
        //  rating view not hidden, it view executes.
        if (!data.ratingView) {
            if (rateview) {
                icons = true;
            } else {
                icons = (iconSelection !== null);
            }
            if (data.areaTxt === false && data.categoryComboValue !== null &&
                data.karmaComboValue !== null && icons && iskarmaNominate) {
                nomBtn.enable(true);
            } else {
                nomBtn.disable(true);
            }
        }
        //  rulebased view not hidden, it view executes.
        if (!data.ruleView) {
            if (data.areaTxt === false && data.categoryComboValue !== null &&
                data.karmaComboValue !== null && data.karmaUnits !== null && iskarmaNominate) {
                nomBtn.enable(true);
            } else {
                nomBtn.disable(true);
            }
        }
    },
    /**
     * The function 'onTextAreaLength' will perform when the 'change' event of the 'htmleditor' is fired in the Nominate Others View Form.
     * @param {Ext.form.field.Field}'textarea'
     * @param {Object} 'e' The new value.
     * @param {object} 'eOpts'.
     */
    //Updating remaining characters from minimum characters from HtmlContent
    onTextAreaLength: function (textarea, e, eOpts) {
        try{
            textarea.value = textarea.value.replace(/&nbsp;/g, '');
            var noLineBreakValue, trimValue, viewModel,
                minChars, valueLen, charEnteredLen;

            //Replacing new or read line with empty space
            noLineBreakValue = textarea.value.replace(/(\r\n|\n|\r)/gm, " ");
            trimValue = noLineBreakValue.replace(/\s\s+/g, ' ').trim();
            trimValue = Ext.util.Format.stripTags(trimValue);
            viewModel = this.getViewModel();
            minChars = 20;
            valueLen = trimValue.length;
            charEnteredLen = minChars - valueLen;
            if (minChars - valueLen < 0) {
                charEnteredLen = 0;
            } else {
                charEnteredLen = charEnteredLen;
            }
            viewModel.set('minChars', charEnteredLen);
            if (trimValue && valueLen > 19) {
                viewModel.set('areaTxt', false);
            } else {
                viewModel.set('areaTxt', true);
            }
            this.isValuesEmpty();
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.DELETENOMINATIONRECORD, err);
        }
    },
    /**
     * The function 'onKarmaComboSelect' will perform when 'select' event of the 'combobox' is fired in the Nominate Others View Form.
     * @param {Ext.form.field.ComboBox} 'combo' the combobox.
     * @param { Ext.data.Model} 'rec'
     */
    //karma combobox select event while selecting making ajax call and sending data to backend
    onKarmaComboSelect: function (combo, rec) {
        try{
            var ratingFormView, karmaUnits, nominateViewIcons,
                isRatingBased, isRuleBased, karmaId,
                nominateView, formRefs;

            ratingFormView = combo.up('nominateothersviewform');
            formRefs = ratingFormView.getReferences();
            karmaUnits = formRefs.karmaunits;
            nominateViewIcons = formRefs.nominateviewicons;
            karmaId = rec.get('ddo_karma_id');
            isRuleBased = rec.get('ddo_karmarule_id');
            isRatingBased = rec.get('isratingbased');
            
            nominateViewIcons.setSelection(null);
            karmaUnits.setValue(null);
            
            this.loadIconStores(karmaId, nominateViewIcons);

            //based on rating or rule hiding and showing
            this.ratingRulesAccess(isRatingBased, isRuleBased, karmaId);
            this.isValuesEmpty();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATEOTHERKARMASELECTION, err);
        }
        
    },
  /**
   * The function 'ratingRulesAccess' is fired from the function 'onKarmaComboSelect' in the NominateOthersFormController
   * @param {string} 'isRatingBased' which takes a string value.
   * @param {null} 'isRuleBased' which is a null.
   * @param {number} 'karmaId' which takes a number.
   */
    ratingRulesAccess: function(isRatingBased, isRuleBased, karmaId){
        var viewModel = this.getViewModel();
        viewModel.set('points', 0);
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
    * The function 'loadIconStores' is fired from the function 'onKarmaComboSelect' to load the iconStores in the NominateOthersFormController.
    * @param {number} 'karmaId' which takes a number.
    * @param {Ext.Component.constructor} 'nominateViewIcons' which takes nominateothersviewicons.
    */
    loadIconStores: function(karmaId, nominateViewIcons){
   //debugger;
        var params = {
            karmaId: karmaId,
            isactive: true
        }; 
       // var iconStore = Ext.getStore('projects.nominate.NominateRatingInstanceStore');
          var view = this.getView(),
          iconStore = view.down('nominateothersviewicons').getStore();

        iconStore.load({
            params: params,
            callback: function (store,rec) {
                if (iconStore.getCount() > 5) {
                    nominateViewIcons.removeCls('nominateviewicon');
                    nominateViewIcons.addCls('nominateviewicon-scroll');
                } else {
                    nominateViewIcons.removeCls('nominateviewicon-scroll');
                }
            }
        });
    },
    /**
     * The function 'onRuleFocusLeave' will perform when 'keyup' event of the 'numberfield' is fired in the Nominate Others View Form.
     * @param {Ext.form.field.Text} 'numfield' The text field.
     * @param {Ext.event.Event} 'event'.
     */
    //On rule numberfield foucs leave event function
    onRuleFocusLeave: function (numfield, event) {
        try{
            if (numfield && numfield.getValue()) {
                this.nominatePoints(numfield, undefined);
            } else {
                this.getViewModel().set('points', 0);
                this.getViewModel().set('karmaUnits', null);
            }
            this.isValuesEmpty();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.RULEFOCUSLEAVE, err);
        }
        
    },
    /**
     * The function 'nominateIconItemClick' will perform when the 'itemclick' event of the 'view' is fired from the NominateViewIcons.
     * rating Icon click function in nomination
     * @param {Ext.view.View}'view'
     * @param {Ext.data.Model}'record' The record that belongs to the item.
     * @param {HTMLElement}'item'.The item's element
     * @param {Number}'index'The item's index
     * @param {Ext.event.Event}'e'The raw event object
     */
    
    nominateIconItemClick: function (view, record, item, index, e) {
        try{
            var selectionKarmaRatingId, karmaRatingId,
                selecRating = view.getSelection(),
                karmaRatingId = record.get('ddo_karmarating_id');

            var selectionArr = view.getSelection();
            if (selectionArr.length > 0) {
                Utility.isIconSelected = true;
            } else {
                Utility.isIconSelected = false;
            }
            if (selecRating.length > 0) {
                selectionKarmaRatingId = selecRating[0].get('ddo_karmarating_id');
            }
            if (selectionKarmaRatingId && karmaRatingId && selectionKarmaRatingId === karmaRatingId) {
                return false;
            } else {
                //To make a request call for calculatekarmascore API
                this.nominatePoints(undefined, record);
            }
            this.isValuesEmpty();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATEOTHERATINGICON, err);
        }
        
    },
    /**
     * The function 'nominateIconDeSelect' will perform when the 'beforedeselect' event of the 'View' is fired from the NominateViewIcons.
     * @param {Ext.selection.DataViewModel} 'me'
     * @param {Ext.data.Model} 'record'The deselected record.
     * @param {Number} 'index'The index within the store of the deselected record.
     */
    nominateIconDeSelect: function (me, record, index) {
        var value = (Utility.isIconSelected) ? true : false;
        Utility.isIconSelected = false;
        return value;

    },
    /**
     * The function 'nominatePoints' is fired from the function 'nominateIconItemClick' in the NominateOthetsFormController.
     * Request call for calculatekarmascore based on rating Icon Click
     * @param {undefined} 'numfield' which is undefined.
     * @param {constructor} 'record' which contains the data 'imagepath' 'isactive' 'karmapoints' 'karmaratingsinstance' 'name' 'ratingid' 'rewardpoints'
     */
    nominatePoints: function (numfield, record) {
        
        var me, karmaId, ratingId,
            karmaUnits, ruleId, viewModel,
            params;

        me = this;
        viewModel = me.getViewModel();
        karmaId = viewModel.get('karmaId');
        ratingId = (record) ? record.get('ratingid') : null;
        viewModel.set('ratingId', ratingId);
        karmaUnits = (numfield) ? numfield.getValue() : null;
        viewModel.set('karmaUnits', karmaUnits);
        ruleId = viewModel.get('ruleId');
        projectId = null;
        //objects to pass params for calculate karmascore
        params = {
            karmaId: karmaId,
            ratingId: ratingId,
            karmaUnits: karmaUnits,
            karmaRuleId: ruleId,
            projectId: projectId,
            frequency: 12
        };
        this.calculateKarmaScores(params, viewModel);
    },
  /**
   * The function 'calculateKarmaScores' is fired from the function 'nominatePoints' in the NominateOthetsFormController.
   * @param {object} 'params' which takes an object of parameters.
   * @param {Ext.app.ViewModel} 'viewModel' which takes the viewmodel of 'selfnominatewindowmodel'
   */
    calculateKarmaScores: function(params, viewModel){
       
        var promiseCalculateKarma = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: Api.URL.ddonominate.calulateKarmaScore, //API singleton
                params: params,
                method: 'POST',
                success: function (response, opts) {
                    var resolveObj = {};
                    resolveObj.res = response;
                    resolveObj.vm = viewModel;
                    resolve(resolveObj); 
                },
                failure: function (response, opts) {
                    reject(response);
                }
            });
        });
        promiseCalculateKarma.then(function (resolveObj) {
            var obj, points, errorMessage;
            obj = Ext.decode(resolveObj.res.responseText);
            if (obj.data.errorMessage) {
                errorMessage = obj.data.errorMessage;
                Ext.Msg.alert('Warning', errorMessage);
                points = 0;
            } else {
                points = obj.data.karmapoints.karma_points || null;
            }
            resolveObj.vm.set('points', points);
        }).catch(function (err) {
            console.log(Messages.NOMINATION.SERVERERROR + err.status, err);
        });
    },
    /**
     * The function 'onNominateFormSubmit' will perform when the 'click' event of the 'button' is fired in the NominateOthersViewForm.
     * @param {Ext.button.Button}'btn'
     * @param {Event} 'e' the click event.
     */
    //Submission of nomination form
    onNominateFormSubmit: function (btn, e) {
        try{
            Ext.getBody().mask('loading...');

            var karmaId, KarmaNumberField, karmaUnits, KarmaRuleId,
                categoryCombo, karmaCategoryId,
                textarea, comment, karmaRatingId,
                toCbpid, points, params, showalert,
                viewModel, projectId, loginData,
                nomAccess, formRefs,
                nominateParams = {};

            var nominateProceed = true;

            viewModel = this.getViewModel();

            loginData = Ext.getStore('login').getData();

            formRefs = this.getReferences();

            points = viewModel.get('points');
            projectId = viewModel.get('projectId') || null;

            if (points > 6000) {
                btn.up('window').unmask();
                Ext.Msg.alert(Messages.NOMINATION.ERROR, Messages.NOMINATION.MAXLENGTH);
            } else {
                if (!viewModel.get('profileNominationType')) {
                    var empCombo = btn.up('window').down('tagfield');
                    if (empCombo && empCombo.getValue()) {
                        console.log("proceed for submit");
                    } else {
                        Ext.Msg.alert(Messages.NOMINATION.ERROR, Messages.NOMINATION.SELECTEMPLOYEE);
                        btn.up('window').unmask();
                        return;
                    }
                }

                if (projectId || Utility.nominateProjectId) {
                
                    var peopleViewStore = Ext.getStore('projects.people.PeopleViewStore');

                    peopleViewStore.each(function (rec) {
                        if (!rec.get('ddo_wallet_id')) {
                            nominateProceed = false;
                        }
                    });
                }

                if (nominateProceed) {
                    if (points) {
                        nomAccess = true;

                        categoryCombo = formRefs.nominatecategorycombo;
                        karmaCategoryId = viewModel.get('categoryComboValue');
                        karmaId = viewModel.get('karmaId');
                        KarmaNumberField = formRefs.karmaunits;
                        karmaUnits = KarmaNumberField.getValue();
                        karmaScoreDate = formRefs.karmaGivenDate;
                        karmaDate = karmaScoreDate.getValue();
                        textarea = btn.up('nominateothersviewform').down('textarea');
                        comment = textarea.getValue();
                        karmaRatingId = viewModel.get('ratingId');
                        karmaRuleId = viewModel.get('ruleId');
                        if (!viewModel.get('profileNominationType')) {
                            toCbpid = empCombo.getValue();

                            if (toCbpid.length > 0) {
                                for (var i = 0; i < toCbpid.length; i++) {
                                    if (toCbpid[i] == loginData.getAt(0).get('ddo_employee_id')) {
                                        nomAccess = false;
                                    }
                                }
                            }
                        } else {
                            toCbpid = Utility.profileAppeared || loginData.items[0].get('ddo_employee_id');
                        }

                        showalert = true;
                        var dateFieldValue = new Date(karmaDate);
                        var karmaGivenMonth = dateFieldValue.getMonth() + 1;
                        var karmaGivenYear = dateFieldValue.getFullYear();
                        if (karmaGivenMonth > 9) {
                            karmaGivenMonth = karmaGivenMonth;
                        } else {
                            karmaGivenMonth = "0" + karmaGivenMonth
                        }
                        var karmaGivenDate = karmaGivenMonth + "-" + karmaGivenYear;
                        var dateObj = new Date();
                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        var day = dateObj.getUTCDate();
                        var year = dateObj.getUTCFullYear();
                        var todayDate;
                        if (month > 9) {
                            todayDate = month + "-" + year;
                        } else {
                            todayDate = "0" + month + "-" + year;
                        }
                        nominateParams.points = points;
                        nominateParams.karmaId = karmaId;
                        nominateParams.toCbpid = toCbpid;
                        nominateParams.karmaUnits = karmaUnits;
                        nominateParams.karmaRuleId = karmaRuleId;
                        nominateParams.karmaRatingId = karmaRatingId;
                        nominateParams.karmaCategoryId = karmaCategoryId;
                        nominateParams.projectEmpIds = viewModel.get('tagId');
                        nominateParams.projectId = Utility.nominateProjectId || null; //for projectId
                        if (karmaDate == null) {
                            nominateParams.karmaGivenDate = todayDate;
                        } else {
                            nominateParams.karmaGivenDate = karmaGivenDate;
                        }
                        var successCallBack = function (data) {
                            var karmascoreView = Ext.ComponentQuery.query('karmascorelist')[0];
                            if (karmascoreView) {
                                var karmascoreStore = karmascoreView.getStore();
                                karmascoreStore.reload();
                            }

                            if (viewModel.get('profileNominationType')) {
                                var profileView = Ext.ComponentQuery.query('userprofile')[0];

                                if (profileView) {
                                    var profilecontroller = profileView.getController();
                                    var vm = profileView.getViewModel();
                                    var profileEmpId = vm.get('profileEmpId');

                                    Ext.defer(profilecontroller.onLoadProfileData.bind(profilecontroller, false, profileEmpId), 500);
                                    btn.up("window").close();
                                }
                            } else {
                                if (btn.reference == "submit") {
                                    btn.up('window').close();
                                    Ext.getBody().unmask();
                                } else {
                                    btn.up('window').fireEvent('resetform');
                                }
                            }
                            btn.up('window').unmask();
                            if (btn.text != "Submit and Continue") {
                                btn.up("window").close();
                            }
                        };

                        var failureCallBack = function () {
                            Ext.getBody().unmask();
                        };

                        if (nomAccess) {
                            Utility.nominateProcess(this, nominateParams, comment, showalert, true, successCallBack, failureCallBack);
                        } else {
                            Ext.Msg.alert('Error', AlertMessages.selfNomError);
                            btn.up('window').unmask();
                        }
                    } else {
                        Ext.create('Ext.window.MessageBox', {
                            listeners: {
                                activate: function (me, eOpts) {
                                    Utility.nominatAlert = false;
                                },
                                deactivate: function (me, eOpts) {
                                    Utility.nominatAlert = true;
                                }
                            }
                        }).alert(Messages.NOMINATION.ERROR, Messages.NOMINATION.INSUFFICENTBALANCE);
                        btn.up('window').unmask();
                    }
                } else {
                    btn.up('window').unmask();
                    Ext.Msg.alert('Error!', AlertMessages.proEmpWalletNotFound);
                }
            }
            var formView = this.getView('nominateothersviewform');
            var submitBtn = formView.down('button[reference=submit]');
            if (submitBtn) {
                submitBtn.disable(true);
            }
            var nominateForm = btn.up('form');
            if (nominateForm) {
                nominateForm.down('combo[reference=comboTagview]').setValue("");
                nominateForm.down('combo[reference=nominatekarmacombo]').setValue("");
                nominateForm.down('numberfield[reference=karmaunits]').setValue("");
                nominateForm.down('textarea[reference=ratingcomment]').setValue("");
                nominateForm.down('[reference=karmaGivenDate]').setValue("");
                nominateForm.down('[reference=karmacategoryycombo]').setValue("");
                this.getView().up('window').close();
                Ext.getBody().unmask();
            }
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATEOTHERSAVERECORD, err);
        }
        
    },
    /**
     * The function 'nominateIconItemSelectionChange' will perform when the 'selectionchange' event of the 'View' is fired.
     * Fired after a selection change has occurred.
     * @param {Ext.selection.Model} 'me'
     * @param { Ext.data.Model} 'record' The selected records.
     */
    nominateIconItemSelectionChange: function (me, record) {
        try{
            this.isValuesEmpty();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATEOTHERICON, err);
        }
    },
    /**
     * The fuinction 'onSelect' will perform when the 'click' event of the 'button' is fired.
     * @param {Ext.button.Button}'btn'.
     * @param {event}'e' the click event.
     */
    onSelect: function (comb, e) {
        try{
            //for this if condition to work, enableToggle has to be true in the buttons
            var val = comb.rawValue,
                 view = this.getView(),
                 karmaComboStore = view.down('[name=nominatestoreform]').getStore(),
                
                nomView = comb.up('nominateothersviewform'),
                nomViewModel = nomView.getViewModel();

            if (!karmaComboStore.isLoaded()) {
                karmaComboStore.load();
            }
            nomViewModel.set('iconSelection', null);
            nomViewModel.set('points', 0);
            nomViewModel.set('ratingView', true);
            nomViewModel.set('ruleView', true);
           // var btnGrp = btn.up('buttongroup');
            // btnGrp.items.items.forEach(function (rec) {
            //     if (rec.hasCls("nom-selected-btn-cls")) {
            //         rec.removeCls("nom-selected-btn-cls");
            //         rec.addCls("nominate-btn-cls");
            //     }
            // });
            this.filterByCategory(karmaComboStore, val);
            this.changeButtonStyles(comb, nomViewModel);
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATEOTHERSELECT, err);
        }
    },
  /**
   * The function 'filterByCategory' is fired from the function 'onSelect' in the NominateOthersFormController.
   * @param {Ext.data.Store} 'karmaComboStore' which takes the 'KarmaNominateStore'.
   * @param {string} 'val' which takes the string value.
   */
    filterByCategory: function(karmaComboStore, val){
        
        karmaComboStore.clearFilter(true);
        karmaComboStore.filterBy(function (rec) {
            if (rec.get('karmacategoryname') == val) {
                return true;
            }
            return false;
        });
    },
  /**
   * The function 'changeButtonStyles' is fired from the function 'onSelect' in the NominateothersFormController.
   * @param {Ext.button.Button} 'btn' which takes the button to be selected from the nominateothersviewform.
   * @param {Ext.app.ViewModel} 'nomViewModel' which takes the 'nominateotherswindowmodel'.
   */
    changeButtonStyles: function(comb, nomViewModel){
        // if (btn.el.hasCls("nominate-btn-cls")) {
        //     btn.el.removeCls("nominate-btn-cls");
        //     btn.el.addCls("nom-selected-btn-cls");
        // } else {
        //     btn.el.removeCls("nom-selected-btn-cls");
        //     btn.el.addCls("nominate-btn-cls");
        // }
        nomViewModel.set('categoryComboValue', comb.getValue());
        var nomBtn = this.getView().down('button[reference=submit]');
        if (nomBtn) {
            nomBtn.disable(true);
        }
    },
    /**
     * The function onNominateTagSelect will perform when the 'select' event of the 'tagfield' is fired in the NominateothersViewForm.Fires when at least one list item is selected.
     * @param {Ext.form.field.ComboBox}'combo' which is a combobox.
     * @param {Ext.data.Model}'record'
     */
    onNominateTagSelect: function (combo, record) {
        try{
            combo.inputEl.dom.value = '';
            combo.collapse();
        } catch (err) {
             Utility.showToast(Messages.NOMINATION.TOAST.NOMINATETAGSELECTED, err);
        }
        
    },
    /**
     * The function onNominateTagChange will perform when the 'change' event of the 'tagfield' is fired in the NominateOthersViewForm.Fires when the value of a field is changed.
     * @param {Ext.form.field.Field}'combo'
     * @param {Object}'record'.which is a new value
     */
    onNominateTagChange: function (combo, record) {
        try{
            var nominateViewModel = this.getViewModel(),
                viewModelData = nominateViewModel.getData(),
                length = (record.length > 0),
                comment = combo.up('form').down('textarea').getValue();
            nomBtn = this.getView().down('button[reference=submit]');
            if (length && viewModelData.karmaComboValue && viewModelData.karmaId && viewModelData.points && comment) {
                if (nomBtn) {
                    nomBtn.enable(true);
                }
            } else {
                nomBtn.disable(true);
            }
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.NOMINATIONSWITCHTAB, err);
        }
    },
    /**
     * The function onDateCancelClick will perform when the 'CancelClick' event of the 'picker.month' is fired.Fires when the cancel button is pressed.
     * @param {Ext.picker.Month} 'm'
     * @param {object} 'd'
     */
    onDateCancelClick: function (m, d) {
        try{
            var me = m.up('datefield');
            me.selectMonth = null;
            me.collapse();
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTCANCEL, err);
        }
    },
    /**
     * The function onDateOKClick will perform when the 'OkClick' event of the 'picker.month' is fired in the NominateOthersViewForm.
     * @param {Ext.picker.Month}
     */
    onDateOKClick: function (m) {
        try{
            var me = m.up('datefield');
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
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
     * The function onDateSelect will perform when the 'select' event of the 'picker.month' is fired in the NominateOthersViewForm.
     * @param {Ext.picker.Month} 'm'
     * @param {Array} 'd' Which takes an array.
     */
    onDateSelect: function (m, d) {
        try{
            var me = m.up('datefield');
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        } catch (err) {
            Utility.showToast(Messages.NOMINATION.TOAST.DATESELECTPROCESS, err);
        }
    }

});