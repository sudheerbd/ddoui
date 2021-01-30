Ext.define('DDO.view.karmasetup.karma.KarmaWindowViewsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmawindowviewscontroller',

    onWindowOutsideTap: function (event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },

    onFormCancelClick: function (btn, e, eOpts) {
        var karmaWindow, form;

        karmaWindow = btn.up('window');
        form = karmaWindow.down('form');
        form.reset();
        //commented to remove form animation.
        /* Ext.create('Ext.fx.Anim', {
             target: karmaWindow,
             duration: 500,
             from: {
                 bottom: 500,
                 top: 150
             },
             to: {
                 bottom: 150,
                 top: -500
             }
         });

         Ext.defer(function() {
             karmaWindow.close();
         }, 500, karmaWindow);*/
        karmaWindow.close();
    },
    onRuleSelect: function (checkComboRef, record, eOpts) {
        var viewModel = this.getViewModel(),
            checkChangeText = checkComboRef.up('form').down('textfield[name="checkChangeText"]');
        var ruleBasedName = record.get("ruletype");

        if (ruleBasedName == "Prorated") {
            viewModel.set('autoapproval', false);
            viewModel.set('autoapprovalState', true);
        } else {
            viewModel.set('checkComboDisplay', false);
            viewModel.set('autoapprovalState', false);
        }
        this.isSaveEnableFn(viewModel, checkChangeText, checkComboRef);
    },

    onRuleCheckChange: function (field, newValue, oldValue, eOpts) {
       
        var viewModel = this.getViewModel(),
            checkComboRef = field.up('form').down('combobox[reference="checkComboRef"]'),
            checkChangeText = field.up('form').down('textfield[name=checkChangeText]');
        if (newValue) {
            viewModel.set('isRuleBased', true);
            viewModel.set('isRatingBased', false);
            viewModel.set('checkComboDisplay', false);
           var cardsView = Ext.ComponentQuery.query('karmadataviewcards')[0];
            //    var KarmaRuleStore = cardsView.getViewModel().getStore('karmarulestore'),
            var KarmaRuleStore = Ext.getStore('karmasetup.KarmaRuleStore'),
            recordRuleId = checkComboRef.value,
            KarmaRuleName = KarmaRuleStore.findRecord('ddo_karmarule_id', recordRuleId);
            if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Prorated"){
                viewModel.set('autoapproval', false);
                viewModel.set('autoapprovalState', true);
            }

        } else {
            viewModel.set('isRuleBased', false);
            viewModel.set('checkComboDisplay', true);
            viewModel.set('autoapprovalState', false);

        }
        this.isSaveEnableFn(viewModel, checkChangeText, checkComboRef);

    },
    onRatingCheckChange: function (field, newValue, oldValue, eOpts) {
        var viewModel = this.getViewModel(),
            checkComboRef = field.up('form').down('combobox[reference="checkComboRef"]'),
            checkChangeText = field.up('form').down('textfield[name="checkChangeText"]');
        if (newValue) {
            viewModel.set('isRuleBased', false);
            viewModel.set('isRatingBased', true);
            viewModel.set('checkComboDisplay', true);
        } else {
            viewModel.set('isRatingBased', false);
            var cardsView = Ext.ComponentQuery.query('karmadataviewcards')[0];
            //    var KarmaRuleStore = cardsView.getViewModel().getStore('karmarulestore'),
            var KarmaRuleStore = Ext.getStore('karmasetup.KarmaRuleStore'),
            recordRuleId = checkComboRef.value,
            KarmaRuleName = KarmaRuleStore.findRecord('ddo_karmarule_id', recordRuleId);
            if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Prorated"){
                viewModel.set('autoapproval', false);
                viewModel.set('autoapprovalState', true);
            }
        }
        this.isSaveEnableFn(viewModel, checkChangeText, checkComboRef);

    },
    isSaveEnableFn: function (viewModel, checkChangeText, checkComboRef) {
        var isRatingBased = viewModel.get('isRatingBased'),
            isRuleBased = viewModel.get('isRuleBased'),
            checkComboValue = checkComboRef.getValue();
        if (isRatingBased || (isRuleBased && checkComboValue)) {
            checkChangeText.setValue("new")
        } else {
            checkChangeText.setValue(null);
        }

    },

    onFormSaveClick: function (btn, e, eOpts) {
        var store, form, karmaWindow,
            paramsData, ratingStore, dataArray = [],
            cmpQuery, karmaName, karmaNmeTrim,
            karmaNameMatch, editRec,
            me = this;

        karmaWindow = btn.up('window');
        store = Ext.getStore('karmasetup.KarmaStore');

        cmpQuery = Ext.ComponentQuery.query;

        form = cmpQuery('karmaform')[0];

        //
        /**
         * For showontimeline changes
         */
        var viewModel, cardRef, karmaRatingView,
            karmapointsView, addBtnPointsContainer,
            karmaProratedView, ratingView, saveBtn, previousContainer;

        viewModel = this.getViewModel();
        cardRef = karmaWindow.down('container[reference=karmaRatingCardRef]');
        karmaRatingView = cardRef.down('ddokarmacontainer');
        karmapointsView = cardRef.down('karmapoints');
        karmaProratedView = cardRef.down('karmaprorated');
        addBtnPointsContainer = karmapointsView.items.last();
        addBtnPointsContainerProrated = karmaProratedView.items.last();
        ratingView = cmpQuery('ddokarmacontainer')[0];
        saveBtn = ratingView.down('button[reference = savebtn]');
        previousContainer = addBtnPointsContainer.previousSibling();
        previousContainerProrated = addBtnPointsContainerProrated.previousSibling();
       
        if(previousContainerProrated){
        var fieldref = karmaProratedView.items.last();
            designation = fieldref.down('combobox[name=designation]'),
            frequency = fieldref.down('combobox[name=frequency]'),
            hours = fieldref.down('numberfield[name=hours]'),
            karma = fieldref.down('numberfield[name=karma]');
        if (Ext.isEmpty(designation.getValue()) || Ext.isEmpty(hours.getValue()) || Ext.isEmpty(frequency.getValue()) || Ext.isEmpty(karma.getValue())) {
            if(!designation.isHidden() && !frequency.isHidden() && !hours.isHidden() && !karma.isHidden()){            
            designation.hide();
            frequency.hide();
            hours.hide();
            karma.hide();
            designation.allowBlank = true;
            frequency.allowBlank = true;
            hours.allowBlank = true;
            karma.allowBlank = true;
            designation.validate();
            frequency.validate();
            hours.validate();
            karma.validate();
            }
        }
    }
        ratingStore = Ext.getStore('karmasetup.KarmaRatingInstanceStore');
        formValues = form.getValues();
        var cardsView = Ext.ComponentQuery.query('karmadataviewcards')[0];
        // var KarmaRuleStore = cardsView.getViewModel().getStore('karmarulestore'),
        var KarmaRuleStore = Ext.getStore('karmasetup.KarmaRuleStore'),
        recordRuleId = formValues.ddo_karmarule_id,
        KarmaRuleName = KarmaRuleStore.findRecord('ddo_karmarule_id', recordRuleId);

        karmaName = formValues.name;

        var showontimeline, oldtimelineValue;

        showontimeline = form.getValues().showontimeline || "N";
        oldtimelineValue = me.getViewModel().get('timelineValue') || 'N';

        if (showontimeline == oldtimelineValue) {
            viewModel.set('isChangedTimeLine', false);
        } else if (showontimeline !== oldtimelineValue) {
            viewModel.set('isChangedTimeLine', true);
        }

        var submitValues, ischangedtimeline;

        ischangedtimeline = viewModel.get('isChangedTimeLine');

        karmaNmeTrim = karmaName.trim();
        karmaNameMatch = store.findRecord('name', karmaNmeTrim, 0, false, false, true);

        if (karmaWindow.edit) {
            editRec = store.findRecord('ddo_karma_id', formValues.ddo_karma_id, 0, false, false, true);

            if (karmaNameMatch && editRec
                && editRec.get('name') == karmaNameMatch.get('name')) {
                karmaNameMatch = null;
            }
        }

        submitValues = formValues;
        submitValues.ischangedtimeline = ischangedtimeline;
        /**
         * Updated with the timeline changes or not
         * by initiating in a viewmodel variable
         */
        //

        if (!karmaNameMatch) {
            if (form.isDirty()) {
                if (karmaWindow.edit) {
                    /*if we modify single field store .sync is not working.
                     * For this here,ajax request is using.
                     */
                    Ext.Ajax.request({
                        url: Api.URL.ddokarma.UPDATE,
                        method: 'PUT',
                        scope: me,
                        params: submitValues,
                        success: function (resp, b) {
                            me.getViewModel().set('timelineValue', showontimeline);
                            store.load();

                            if (formValues.isratingbased == "Y") {
                                karmaWindow.setTitle('Karma Rating');
                                cardRef.setActiveItem(1);
                            } else {
                                    if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Range"){
                                    if (previousContainer) {
                                        var endRangeValue = previousContainer.down('numberfield[name=endrange]').getValue();
                                        addBtnPointsContainer.down('numberfield[name=startrange]').setValue(endRangeValue + 1);
                                        previousContainer.down('button').setDisabled(false);
                                    }
                                    karmaWindow.setTitle('Karma Range');
                                    cardRef.setActiveItem(2);
                                }
                                else {
                                    karmaWindow.setTitle('Karma Prorated');
                                    cardRef.setActiveItem(3);
                                }
                            }
                        }
                    });

                    saveBtn.setDisabled(true);
                } else {
                    store.add(form.getValues());
                    me.getView().mask();
                    store.sync({
                        callback: function (batch, opt) {
                            karmaWindow.edit = true;
                            if (batch.operations[0].getResponse()) {
                                var jsonData = batch.operations[0].getResponse().responseText,
                                    karmaId = Ext.decode(jsonData).karmaId;
                                viewModel.set('karmaID', karmaId);
                                paramsData = {
                                    karmaId: karmaId
                                };
                                Ext.apply(ratingStore.getProxy().extraParams, paramsData);

                                ratingStore.load({
                                    callback: function (data) {
                                        if (!Ext.isEmpty(data)) {
                                            if (formValues.isratingbased == "Y") {
                                                karmaWindow.setTitle('Karma Rating');
                                                cardRef.setActiveItem(1);
                                            } else {
                                                    if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Range"){
                                                    if (previousContainer) {
                                                        var endRangeValue = previousContainer.down('numberfield[name=endrange]').getValue();
                                                        addBtnPointsContainer.down('numberfield[name=startrange]').setValue(endRangeValue + 1);
                                                        previousContainer.down('button').setDisabled(false);
                                                    }
                                                    karmaWindow.setTitle('Karma Range');
                                                    cardRef.setActiveItem(2);
                                                }
                                                else {
                                                    karmaWindow.setTitle('Karma Prorated');
                                                    cardRef.setActiveItem(3);
                                                }
                                            }

                                            data.forEach(function (rec) {
                                                Utility.createKarmaRatingItems(karmaRatingView, rec);
                                            });
                                        } else {
                                            var karmaIconUploadedStore = Ext.getStore('karmasetup.KarmaIconUploadedStore');

                                            karmaIconUploadedStore.load({
                                                scope: this,
                                                callback: function (data) {
                                                    karmaIconUploadedStore.each(function (rec) {

                                                        dataArray.push({
                                                            imagepath: rec.data.imagepath,
                                                            karmapoints: "",
                                                            karmaratingsinstance: rec.data.ddo_karmarating_id,
                                                            ratingid: "",
                                                            rewardpoints: 1,
                                                            name: rec.data.name
                                                        });
                                                    });
                                                    ratingStore.add(dataArray);
                                                    if (formValues.isratingbased == "Y") {
                                                        karmaWindow.setTitle('Karma Rating');
                                                        cardRef.setActiveItem(1);
                                                    } else {
                                                        if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Range"){
                                                            if (previousContainer) {
                                                                var endRangeValue = previousContainer.down('numberfield[name=endrange]').getValue();
                                                                addBtnPointsContainer.down('numberfield[name=startrange]').setValue(endRangeValue + 1);
                                                                previousContainer.down('button').setDisabled(false);
                                                            }
                                                            karmaWindow.setTitle('Karma Range');
                                                            cardRef.setActiveItem(2);
                                                        }
                                                        else {
                                                            karmaWindow.setTitle('Karma Prorated');
                                                            cardRef.setActiveItem(3);
                                                        }
                                                    }
                                                    Utility.isNewlyAddedRecords = true;
                                                    saveBtn.setDisabled(true);
                                                    var recordsData = ratingStore.getData().items;
                                                    recordsData.forEach(function (rec) {
                                                        Utility.createKarmaRatingItems(karmaRatingView, rec);
                                                    });
                                                    me.getView().unmask();
                                                }
                                            });
                                        }
                                    }
                                });
                                store.load();
                            }
                        }
                    });
                }
            } else {
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
            Ext.Msg.alert('Warning', AlertMessages.existKarma);
        }
    },

    onAddItemClick: function (btn) {
        var formref = btn.up('form'),
            vm = this.getViewModel(),
            karmaID = vm.get('karmaID'),
            rangeStore = Ext.getStore('karmasetup.KarmaRangeInstanceStore'),
            num = formref.items.length - 1,
            fieldref = btn.up('fieldcontainer'),
            prefieldref = fieldref.previousSibling(),
            startrange = fieldref.down('numberfield[name=startrange]').getValue(),
            endrange = fieldref.down('numberfield[name=endrange]').getValue(),
            factor = fieldref.down('numberfield[name=factor]').getValue();

        fieldref.down('numberfield[name=endrange]').setValue("");
        fieldref.down('numberfield[name=factor]').setValue("");

        if (Ext.isEmpty(startrange) || Ext.isEmpty(endrange) || Ext.isEmpty(factor)) {
            Utility.topAlertMessage('WARNING', "Please Fill All Fields");
        } else {
            // if (prefieldref) {
            //     prefieldref.down('button').setDisabled(true);
            // }

            rangeStore.add({
                karmaId: karmaID,
                startRange: startrange,
                endRange: endrange,
                factor: factor,
                temp: 'field-one' + num
            });

            fieldref.down('numberfield[name=startrange]').setValue(endrange + 1);

            formref.insert(num, {
                xtype: 'fieldcontainer',
                name: 'field-one' + num,
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    width: 120,
                    margin: '2 10'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'temp',
                    value: 'field-one' + num
                }, {
                    xtype: 'numberfield',
                    name: 'startrange',
                    required: true,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    value: startrange,
                    hideTrigger: true,
                    minLength: 1,
                    readOnly: true,
                    enforceMinLength: true,
                    enableKeyEvents: true,
                    allowBlank: false
                }, {
                    xtype: 'numberfield',
                    name: 'endrange',
                    required: true,
                    value: endrange,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    enableKeyEvents: true,

                    allowBlank: false
                }, {
                    xtype: 'numberfield',
                    name: 'factor',
                    value: factor,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    stripCharsRe: /\./,
                    allowBlank: false
                }, {
                    xtype: 'button',
                    text: '',
                    iconCls: 'plus-cross-icon-cls',
                    cls: 'upload-button-cls',
                    width: 20,
                    height: 20,
                    margin: '15 0 0 5',
                    listeners: {
                        click: 'onRemoveItemClick'
                    }
                }]
            });
        }
    },

    onRemoveItemClick: function (btn) {
        var fieldContainerView = btn.up('fieldcontainer'),
            prefieldref = fieldContainerView.previousSibling(),
            nextfieldref = fieldContainerView.nextSibling(),
            instandRef = fieldContainerView.down('hiddenfield[name=ddo_karmarange_instnace_id]') || fieldContainerView.down('hiddenfield[name=temp]'),
            karmaInstanceId = instandRef.getValue(),
            rangeStore = Ext.getStore('karmasetup.KarmaRangeInstanceStore'),
            record;

        if (karmaInstanceId) {
            record = rangeStore.findRecord('ddo_karmarange_instnace_id', karmaInstanceId) || rangeStore.findRecord('temp', karmaInstanceId);
            rangeStore.remove(record);
        }
        if (prefieldref) {
            var endRangeValue = prefieldref.down('numberfield[name=endrange]').getValue();
            nextfieldref.down('numberfield[name=startrange]').setValue(endRangeValue + 1);
            prefieldref.down('button').setDisabled(false);
        } else {
            nextfieldref.down('numberfield[name=startrange]').setValue(1);
        }

        btn.up('fieldcontainer').destroy();
    },
    onRemoveItemClickPro: function (btn) {
        var fieldContainerView = btn.up('fieldcontainer'),
            prefieldref = fieldContainerView.previousSibling(),
            nextfieldref = fieldContainerView.nextSibling(),
            instandRef = fieldContainerView.down('hiddenfield[name=ddo_karmaprorated_instnace_id]') || fieldContainerView.down('hiddenfield[name=temp]'),
            karmaInstanceId = instandRef.getValue(),
            proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore'),
            record;

        if (karmaInstanceId) {
            record = proratedStore.findRecord('ddo_karmaprorated_instnace_id', karmaInstanceId) || proratedStore.findRecord('temp', karmaInstanceId);
            proratedStore.remove(record);
        }
        // if (prefieldref) {
        //     prefieldref.down('button').setDisabled(true);
        // }

        btn.up('fieldcontainer').destroy();
    },

    onFormPointsSaveClick: function (btn) {

        var ratingStore = Ext.getStore('karmasetup.KarmaRatingInstanceStore'),
            karmaWindow = btn.up('window');
        if (Utility.isNewlyAddedRecords) {
            var fieldcontainerRef = btn.up('form').down('fieldcontainer[ref=formImagesRef]'),
                fieldcontainerValues = fieldcontainerRef.up('form').getValues(),
                vm = this.getViewModel(),
                karmaID = vm.get('karmaID'),
                len = fieldcontainerValues.rewardpoints.length,
                i, ratingObjArr = [];
            if (fieldcontainerValues.rewardpoints.constructor === Array) {
                for (i = 0; i < len; i++) {
                    ratingObjArr.push({
                        karmaID: karmaID,
                        ratingId: fieldcontainerValues.ratingId[i],
                        points: fieldcontainerValues.rewardpoints[i],
                        isactive: fieldcontainerValues.isactive[i]
                    });
                }
            } else {
                ratingObjArr.push({
                    karmaID: karmaID,
                    ratingId: fieldcontainerValues.ratingId,
                    points: fieldcontainerValues.rewardpoints,
                    isactive: fieldcontainerValues.isactive
                });

            }
            if (!Ext.isEmpty(ratingObjArr)) {
                var successCallback = function (data) {
                    // ratingStore.load();
                    karmaWindow.close();
                    Utility.isNewlyAddedRecords = false;
                },
                    failureCallback = function (data) {

                    },
                    callback = function () { },
                    config = {
                        url: "/karmaratinginstance",
                        method: 'POST',
                        params: {
                            ratingObjArr: Ext.encode(ratingObjArr)
                        }
                    };
                Utility.fireAjax(config, successCallback, failureCallback, callback);
            }
        } else {

            ratingStore.sync({
                callback: function (batch, opt) {
                    karmaWindow.close();
                    //ratingStore.load();
                }
            });

        }
    },

    onFormPointsBaclClick: function (btn) {
        var karmaWindow = btn.up('window'),
            cardRef = btn.up('container[reference=karmaRatingCardRef]');

        karmaWindow.setTitle('Karma');
        cardRef.setActiveItem(0);
    },

    onChange: function (chkbox, newValue, oldValue, eOpts) {
        var fieldValues = chkbox.up(),
            fieldPoints = fieldValues.down('numberfield[name=rewardpoints]'),
            fieldImgs = fieldValues.down('image[ref=imgRef]'),
            fieldLabel = fieldValues.down('label[ref=labelText]'),
            fieldContainerView = chkbox.up('fieldcontainer'),
            instandRef = fieldContainerView.down('hiddenfield[name=ratingId]'),
            karmaInstanceId = instandRef.getValue(),
            rangeStore = Ext.getStore('karmasetup.KarmaRatingInstanceStore'),
            ratingView = Ext.ComponentQuery.query('ddokarmacontainer')[0],
            saveBtn = ratingView.down('button[reference= savebtn]'),
            record, recordValues;

        if (karmaInstanceId) {
            record = rangeStore.findRecord('karmaratingsinstance', karmaInstanceId);
            recordValues = record.data;
            record.set(chkbox.name, ((newValue) ? "Y" : "N"));
        }
        if (!Ext.isEmpty(newValue)) {
            saveBtn.setDisabled(false);
        }

        if (newValue == true) {
            fieldImgs.setDisabled(false);
            fieldLabel.setDisabled(false);
            fieldPoints.setReadOnly(false);
        } else {
            fieldImgs.setDisabled(true);
            fieldLabel.setDisabled(true);
            fieldPoints.setReadOnly(true);
        }
    },

    onFormPointsViewSaveClick: function (btn) {
        var formref, me, karmaID,
            rangeStore, fieldref,
            karmaWindow, startrange,
            endrange, factor, isProcessed;

        formref = btn.up('form');
        vm = this.getViewModel();
        karmaID = vm.get('karmaID');
        rangeStore = Ext.getStore('karmasetup.KarmaRangeInstanceStore');
        fieldref = formref.items.last();
        karmaWindow = btn.up('window');
        startrange = fieldref.down('numberfield[name=startrange]').getValue();
        endrange = fieldref.down('numberfield[name=endrange]').getValue();
        factor = fieldref.down('numberfield[name=factor]').getValue();

        isProcessed = false;

        if (!Ext.isEmpty(startrange) && !Ext.isEmpty(endrange) && !Ext.isEmpty(factor)) {

            rangeStore.add({
                karmaId: karmaID,
                startRange: startrange,
                endRange: endrange,
                factor: factor,
                temp: 'field-one'
            });

            isProcessed = true;
        }

        rangeStore.sync({
            callback: function (batch, opt) {
                isProcessed = true;
                karmaWindow.close();
            }
        });

        if (!isProcessed &&
            rangeStore.getModifiedRecords().length == 0) {
            if (karmaWindow) {
                karmaWindow.close();
            }
        }
    },

    onRangeChange: function (me, newValue, oldValue, eOpts) {
        var fieldContainerView = me.up('fieldcontainer'),
            instandRef = fieldContainerView.down('hiddenfield[name=ddo_karmarange_instnace_id]'),
            karmaInstanceId = instandRef.getValue(),
            rangeStore = Ext.getStore('karmasetup.KarmaRangeInstanceStore'),
            record, recordValues;

        if (karmaInstanceId) {
            record = rangeStore.findRecord('ddo_karmarange_instnace_id', karmaInstanceId);
            recordValues = record.data;
            record.set(me.name, newValue);

        }
    },

    onProratedChange: function (me, newValue, oldValue, eOpts) {
        var fieldContainerView = me.up('fieldcontainer'),
            instandRef = fieldContainerView.down('hiddenfield[name=ddo_karmaprorated_instnace_id]'),
            karmaInstanceId = instandRef.getValue(),
            proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore'),
            record, recordValues;
        if (karmaInstanceId) {
            record = proratedStore.findRecord('ddo_karmaprorated_instnace_id', karmaInstanceId);
            recordValues = record.data;
            record.set(me.name, newValue);
        }
    },

    onRatingChange: function (me, newValue, oldValue, eOpts) {
        var fieldContainerView = me.up('fieldcontainer'),
            instandRef = fieldContainerView.down('hiddenfield[name=ratingId]'),
            karmaInstanceId = instandRef.getValue(),
            rangeStore = Ext.getStore('karmasetup.KarmaRatingInstanceStore'),
            storeRecords = rangeStore.getRange(),
            ratingView = Ext.ComponentQuery.query('ddokarmacontainer')[0],
            saveBtn = ratingView.down('button[reference = savebtn]'),
            record, recordValues;

        if (karmaInstanceId) {
            record = rangeStore.findRecord('karmaratingsinstance', karmaInstanceId);
            recordValues = record.data;
            record.set(me.name, newValue);
        }
        if (Ext.isEmpty(newValue)) {
            saveBtn.setDisabled(true);
        } else {
            saveBtn.setDisabled(false);
        }
    },

    onComboCheck: function (ele, rec, idx) {
        var fieldref = ele.up('fieldcontainer'),
            designation = fieldref.down('combobox[name=designation]').getValue(),
            frequency = fieldref.down('combobox[name=frequency]').getValue(),
            designationCheck = fieldref.down('combobox[name=designation]'),
            proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore');

        if (designation && frequency) {
            var index = proratedStore.findBy(function (rec) {
                return rec.data.designation == designation && rec.data.frequency == frequency;
            });
        }
        if (index != -1 && index != undefined) {
            designationCheck.suspendEvents();
            designationCheck.reset();
            designationCheck.resumeEvents();
            Utility.topAlertMessage('WARNING', "Fields Exist");
            return false;
        }
    },

    onComboCheckFre: function (ele, rec, idx) {
        var fieldref = ele.up('fieldcontainer'),
            designation = fieldref.down('combobox[name=designation]').getValue(),
            frequency = fieldref.down('combobox[name=frequency]').getValue(),
            frequencyCheck = fieldref.down('combobox[name=frequency]'),
            proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore');

        if (designation && frequency) {
            var index = proratedStore.findBy(function (rec) {
                return rec.data.designation == designation && rec.data.frequency == frequency;
            });
        }
        if (index != -1 && index != undefined) {
            frequencyCheck.suspendEvents();
            frequencyCheck.reset();
            frequencyCheck.resumeEvents();
            Utility.topAlertMessage('WARNING', "Fields Exist");
            return false;
        }
    },

    onAddItemClickPro: function (btn) {
        var formref = btn.up('form');
        vm = this.getViewModel(),
            karmaID = vm.get('karmaID'),
            proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore'),
            num = formref.items.length - 1,
            fieldref = btn.up('fieldcontainer'),
            prefieldref = fieldref.previousSibling(),
            designation = fieldref.down('combobox[name=designation]').getValue(),
            frequency = fieldref.down('combobox[name=frequency]').getValue(),
            hours = fieldref.down('numberfield[name=hours]').getValue(),
            karma = fieldref.down('numberfield[name=karma]').getValue();

        fieldref.down('combobox[name=designation]').setValue("");
        fieldref.down('numberfield[name=hours]').setValue("");
        fieldref.down('combobox[name=frequency]').setValue("");
        fieldref.down('numberfield[name=karma]').setValue("");

            var fieldrefs = formref.items.last();
            designationfield = fieldrefs.down('combobox[name=designation]'),
            frequencyfield = fieldrefs.down('combobox[name=frequency]'),
            hoursfield = fieldrefs.down('numberfield[name=hours]'),
            karmafield = fieldrefs.down('numberfield[name=karma]');
        if (Ext.isEmpty(designation) || Ext.isEmpty(hours) || Ext.isEmpty(frequency) || Ext.isEmpty(karma)) {
            if(designationfield.isHidden() && frequencyfield.isHidden() && hoursfield.isHidden() && karmafield.isHidden()){
            // designationfield.show();
            // frequencyfield.show();
            hoursfield.show();
            karmafield.show();
            designationfield.allowBlank = false;
            frequencyfield.allowBlank = false;
            designationfield.width = 180;
            hoursfield.width = 80;
            frequencyfield.width = 120;
            karmafield.width = 120;
			designationfield.queryMode = 'local';
            designationfield.show();     
            hoursfield.allowBlank = false;
            frequencyfield.show();
            karmafield.allowBlank = false;
            designationfield.validate();
            frequencyfield.validate();
            hoursfield.validate();
            karmafield.validate();
            return false;
        }
            Utility.topAlertMessage('WARNING', "Please Fill All Fields");
        }
        else {
            if (prefieldref) {
                prefieldref.down('button').setDisabled(false);
            }
            proratedStore.add({
                karmaId: karmaID,
                designation: designation,
                hours: hours,
                frequency: frequency,
                karma: karma,
                temp: 'field-one' + num
            });

            formref.insert(num, {
                xtype: 'fieldcontainer',
                name: 'field-one' + num,
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    // width: 120,
                    margin: '2 10'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'temp',
                    value: 'field-one' + num
                }, {
                    xtype: 'hiddenfield',
                    name: 'ddo_karma_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'ddo_karmaprorated_instnace_id'
                }, {
                    xtype: 'combobox',
                    name: 'designation',
                    allowBlank: false,
                    forceSelection: true,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    queryMode: 'local',                    
                    width: 180,
                    value: designation,
                    valueField: 'ddo_designation_id',
                    displayField: 'name',
                    queryMode: 'local',
                    typeAhead: true,
                    store: Ext.create('store.designationstore',{autoLoad:true}),
                    listeners: {
                        change: 'onComboCheck'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'hours',
                    required: true,
                    value: hours,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    width: 80,
                    allowBlank: false,
                    hideTrigger: true,
                    minLength: 1,
                    minValue: 0,
                    enforceMinLength: true,
                    enableKeyEvents: true,
                    allowBlank: false
                }, {
                    xtype: 'combobox',
                    name: 'frequency',
                    value: frequency,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    width: 120,
                    allowBlank: false,
                    forceSelection: true,
                    displayField: 'frequency',
                    valueField: 'value',
                    store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
                    listeners: {
                        change: 'onComboCheckFre'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'karma',
                    required: true,
                    value: karma,
                    cls: 'karmapoints-num-cls',
                    emptyText: '',
                    allowBlank: false,
                    hideTrigger: true,
                    minLength: 1,
                    minValue: 0,
                    width: 120,
                    enforceMinLength: true,
                    enableKeyEvents: true,
                    allowBlank: false
                }, {
                    xtype: 'button',
                    text: '',
                    iconCls: 'plus-cross-icon-cls',
                    cls: 'upload-button-cls',
                    width: 20,
                    height: 20,
                    margin: '15 0 0 5',
                    listeners: {
                        click: 'onRemoveItemClickPro'
                    }
                }]
            });
        }

    },

    onFormPointsViewSaveClickPro: function (btn) {
        var formref, me, karmaID, fieldref,
            karmaWindow, designation,
            hours, frequency, karma, isProcessed,
            proratedStore;
        karmaWindow = btn.up('window');
        formref = btn.up('form');
        vm = this.getViewModel();
        karmaId = vm.get('karmaID');
        proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore');
        fieldref = formref.items.last();
        var formData = formref.getValues();
        var numberOfLineItems = formref.query('fieldcontainer').length;
        var lineItemKeys = Object.keys(formData);
        if (lineItemKeys.indexOf('temp') != -1) {
            lineItemKeys.splice(lineItemKeys.indexOf('temp'), 1);
        }
        var arr = [];
        for (var k = 0; k < numberOfLineItems; k++) {
            var temp = {}, storeProratedRecords;
            if (numberOfLineItems != 1) {
                for (var itemindex = 0; itemindex < lineItemKeys.length; itemindex++) {
                    var item = lineItemKeys[itemindex];
                    temp[item] = formData[item][k];
                }
            } else {
                temp = formData;
            }
            temp['karmaId'] = karmaId;
            if (temp.ddo_karmaprorated_instnace_id && temp.ddo_karmaprorated_instnace_id != null) {
                storeProratedRecords = proratedStore.findRecord('ddo_karmaprorated_instnace_id', temp.ddo_karmaprorated_instnace_id);
                if (storeProratedRecords) {
                        storeProratedRecords.set(temp);
                }
            } else {
                var existedRec = proratedStore.findBy(function (record) {
                    return record.get('designation') == temp.designation && record.get('frequency') == temp.frequency;
                }, this);
                if(temp.designation && temp.frequency && temp.hours && temp.karma != null){
                    if (existedRec == -1) { proratedStore.add(temp); }
                }
            }
        }

        proratedStore.sync({
            callback: function (batch, opt) {
                karmaWindow.close();
            }
        });

        if (
            proratedStore.getModifiedRecords().length == 0) {
            if (karmaWindow) {
                karmaWindow.close();
            }
        }
    }
});
