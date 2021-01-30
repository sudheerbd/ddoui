Ext.define('DDO.view.karmasetup.karma.KarmaViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmaviewcontroller',

    /*
     * This is the handler for the click event of the Add rule.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */

    onAddNewClick: function (button, e, eOpts) {
        var karmaWindow = Ext.ComponentQuery.query('karmawindow')[0];
        if (karmaWindow) {
            var cardRef = karmaWindow.down('container[reference=karmaRatingCardRef]'),
                karmapointsView = cardRef.down('karmapoints'),
                karmaRatingView = cardRef.down('ddokarmacontainer'),
                len = karmapointsView.items.items.length,
                i;
            cardRef.down('karmaform').reset();
            karmaRatingView.removeAll();
            karmaWindow.getViewModel().set('karmaID', null);
            cardRef.setActiveItem(0);
            karmapointsView.removeAll();

            var karmaProratedView = cardRef.down('karmaprorated');
            var itemcontainers = karmaProratedView.query('fieldcontainer[name]');
            Ext.Array.each(itemcontainers,function(item){ item.destroy()});
            Ext.getStore('karmasetup.KarmaProratedInstanceStore').loadData([],false);
            karmaProratedView.reset();

            var fieldrefs = karmaProratedView.items.last();
            designationfield = fieldrefs.down('combobox[name=designation]'),
            frequencyfield = fieldrefs.down('combobox[name=frequency]'),
            hoursfield = fieldrefs.down('numberfield[name=hours]'),
            karmafield = fieldrefs.down('numberfield[name=karma]');
            if(designationfield.isHidden() && frequencyfield.isHidden() && hoursfield.isHidden() && karmafield.isHidden()){
            designationfield.show();
            frequencyfield.show();
            hoursfield.show();
            karmafield.show();
            designationfield.allowBlank = false;
            frequencyfield.allowBlank = false;
            hoursfield.allowBlank = false;
            karmafield.allowBlank = false;
            designationfield.validate();
            frequencyfield.validate();
            hoursfield.validate();
            karmafield.validate();
            }
            karmapointsView.add({
                xtype: 'fieldcontainer',
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    width: 120,
                    margin: '2 10'
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'startrange',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'Start Range',
                    hideTrigger: true,
                    minLength: 1,
                    value: 1,
                    readOnly: true,
                    enforceMinLength: true,
                    enableKeyEvents: true
                }, {
                    xtype: 'numberfield',
                    name: 'endrange',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'End Range',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    enableKeyEvents: true
                }, {
                    xtype: 'numberfield',
                    name: 'factor',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'Factor',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    // enableKeyEvents: true
                    stripCharsRe: /\./
                }, {
                    xtype: 'button',
                    text: '',
                    iconCls: 'plus-new-icon-cls',
                    cls: 'upload-button-cls',
                    width: 20,
                    height: 20,
                    margin: '15 0 0 5',
                    listeners: {
                        click: 'onAddItemClick'
                    }
                }]
            });

        } else {

            karmaWindow = Ext.create('DDO.view.karmasetup.window.KarmaWindow');
        }

        karmaWindow.setTitle('Karma');
        karmaWindow.show();
        karmaWindow.edit = false;

    },
    onKarmaGridRowClick: function (row, record, tr, rowIndex, e, eOpts) {
        
        var karmaWindow = Ext.ComponentQuery.query('karmawindow')[0],
            form, rangeStore, paramsData, ratingStore, dataArray = [], proratedStore;
        if (karmaWindow) {
            var cardRef = karmaWindow.down('container[reference=karmaRatingCardRef]'),
                karmapointsView = cardRef.down('karmapoints'),
                karmaRatingView = cardRef.down('ddokarmacontainer'),
                len = karmapointsView.items.items.length,
                i;
            cardRef.down('karmaform').reset();
            cardRef.setActiveItem(0);
            karmaRatingView.removeAll();
            karmapointsView.removeAll();
            karmapointsView.add({
                xtype: 'fieldcontainer',
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    width: 120,
                    margin: '2 10'
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'startrange',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'Start Range',
                    hideTrigger: true,
                    minLength: 1,
                    value: 1,
                    readOnly: true,
                    enforceMinLength: true,
                    enableKeyEvents: true
                }, {
                    xtype: 'numberfield',
                    name: 'endrange',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'End Range',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    enableKeyEvents: true
                }, {
                    xtype: 'numberfield',
                    name: 'factor',
                    cls: 'karmapoints-num-cls',
                    emptyText: 'Factor',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    // enableKeyEvents: true
                    stripCharsRe: /\./
                }, {
                    xtype: 'button',
                    text: '',
                    iconCls: 'plus-new-icon-cls',
                    cls: 'upload-button-cls',
                    width: 20,
                    height: 20,
                    margin: '15 0 0 5',
                    listeners: {
                        click: 'onAddItemClick'
                    }
                }]
            });
            var karmaProratedView = cardRef.down('karmaprorated');
            karmaProratedView.removeAll();
            karmaProratedView.add({
                xtype: 'fieldcontainer',
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    // width: 120,
                    margin: '2 10'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'ddo_karma_id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'ddo_karmaprorated_instnace_id'
                    },
                    {
                        xtype: 'combobox',
                        name: 'designation',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Designation',
                        width : 180,
                        queryMode:'local',
                        forceSelection: true,
                        allowBlank: false,
                        displayField: 'name',
                        valueField: 'ddo_designation_id',
                        store: Ext.create('store.designationstore',{autoLoad:true}),
                        listeners : {
                            change : 'onComboCheck'
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'hours',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Hours',
                        hideTrigger: true,
                        minLength: 1,
                        minValue: 0,
                        width : 80,
                        allowBlank: false,
                        enforceMinLength: true,
                        enableKeyEvents: true
                    }, {
                        xtype: 'combobox',
                        name: 'frequency',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Frequency',
                        allowBlank: false,
                        forceSelection: true,
                        displayField: 'frequency',
                        width : 120,
                        valueField: 'value',
                        store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
                        listeners : {
                            change : 'onComboCheckFre'
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'karma',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Karma',
                        allowBlank: false,
                        hideTrigger: true,
                        minLength: 1,
                        minValue: 0,
                        width : 120,
                        enforceMinLength: true
                    }, {
                        xtype: 'button',
                        text: '',
                        iconCls: 'plus-new-icon-cls',
                        cls: 'upload-button-cls',
                        width: 20,
                        height: 20,
                        margin: '15 0 0 5',
                        listeners: {
                            click: 'onAddItemClickPro'
                        }
                    }]
            })

        } else {
            karmaWindow = Ext.create('DDO.view.karmasetup.window.KarmaWindow');
            var cardRef = karmaWindow.down('container[reference=karmaRatingCardRef]'),
                karmapointsView = cardRef.down('karmapoints'),
                karmaRatingView = cardRef.down('ddokarmacontainer'),
                karmaProratedView = cardRef.down('karmaprorated');
        }
     
        var cardsView = this.getView().up('karmadataviewcards');
        //    KarmaRuleStore = cardsView.getViewModel().getStore('karmarulestore'),
       var KarmaRuleStore = Ext.getStore('karmasetup.KarmaRuleStore'),
            recordRuleId = record.get('ddo_karmarule_id'),
            KarmaRuleName = KarmaRuleStore.findRecord('ddo_karmarule_id', recordRuleId),
            viewModel = karmaWindow.getViewModel();
            if(KarmaRuleName && KarmaRuleName.get('ruletype') == "Prorated"){
                viewModel.set('autoapproval', false);
                viewModel.set('autoapprovalState', true);
            }
        karmaWindow.getViewModel().set('karmaID', record.data.ddo_karma_id);
        form = karmaWindow.down('karmaform');
        proratedStore = Ext.getStore('karmasetup.KarmaProratedInstanceStore');
        rangeStore = Ext.getStore('karmasetup.KarmaRangeInstanceStore');
        ratingStore = Ext.getStore('karmasetup.KarmaRatingInstanceStore');
        paramsData = {
            karmaId: record.data.ddo_karma_id
        };
        Ext.apply(proratedStore.getProxy().extraParams, paramsData);
        Ext.apply(rangeStore.getProxy().extraParams, paramsData);
        Ext.apply(ratingStore.getProxy().extraParams, paramsData);
        proratedStore.load();
        rangeStore.load();
        ratingStore.load();
        karmaWindow.setTitle('Karma');
        karmaWindow.edit = true;
        form.loadRecord(record);

        var timeLine = record.get('showontimeline');
        karmaWindow.getViewModel().set('timelineValue', timeLine);

        karmaWindow.show();
        ratingStore.load({
            callback: function (data) {
                if (!Ext.isEmpty(data)) {
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
                            Utility.isNewlyAddedRecords = true;
                            var recordsData = ratingStore.getData().items;
                            recordsData.forEach(function (rec) {
                                Utility.createKarmaRatingItems(karmaRatingView, rec);
                            });

                        }
                    });
                }
            }
        });
        rangeStore.load({
            callback: function (data) {
                if (!Ext.isEmpty(data)) {
                    data.forEach(function (rec) {
                        var num = karmapointsView.items.length - 1;
                        karmapointsView.insert(num, {
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
                                name: 'ddo_karmarange_instnace_id',
                                value: rec.data.ddo_karmarange_instnace_id
                            }, {
                                xtype: 'hiddenfield',
                                name: 'ddo_karma_id',
                                value: rec.data.ddo_karma_id
                            }, {
                                xtype: 'numberfield',
                                name: 'startrange',
                                required: true,
                                cls: 'karmapoints-num-cls',
                                emptyText: '',
                                value: rec.data.startrange,
                                hideTrigger: true,
                                minLength: 1,
                                readOnly: true,
                                enforceMinLength: true,
                                enableKeyEvents: true,
                                allowBlank: false,
                                listeners: {
                                    change: 'onRangeChange'
                                }
                            }, {
                                xtype: 'numberfield',
                                name: 'endrange',
                                required: true,
                                value: rec.data.endrange,
                                cls: 'karmapoints-num-cls',
                                emptyText: '',
                                hideTrigger: true,
                                minLength: 1,
                                enforceMinLength: true,
                                enableKeyEvents: true,
                                allowBlank: false,
                                listeners: {
                                    change: 'onRangeChange'
                                }
                            }, {
                                xtype: 'numberfield',
                                name: 'factor',
                                required: true,
                                value: rec.data.factor,
                                cls: 'karmapoints-num-cls',
                                emptyText: '',
                                hideTrigger: true,
                                minLength: 1,
                                enforceMinLength: true,
                                enableKeyEvents: true,
                                stripCharsRe: /\./,
                                allowBlank: false,
                                listeners: {
                                    change: 'onRangeChange'
                                }
                            }, {
                                xtype: 'button',
                                text: '',
                                iconCls: 'plus-cross-icon-cls',
                                cls: 'upload-button-cls',
                                width: 20,
                                height: 20,
                                margin: '15 0 0 5',
                                disabled: true,
                                listeners: {
                                    click: 'onRemoveItemClick'
                                }
                            }]
                        });

                    });

                }

            }
        });
   
        var recordRuleId = record.data.ddo_karmarule_id;
        var cardsView = this.getView().up('karmadataviewcards'),
            ruleStore = Ext.getStore('karmasetup.KarmaRuleStore');
            // ruleStore = cardsView.getViewModel().getStore('karmarulestore');
       
        var ruleid = ruleStore.findRecord('ddo_karmarule_id',recordRuleId );
        var designationStore = Ext.getStore('setup.designation.DesignationStore');
            if(designationStore && !designationStore.isLoaded()){
                designationStore.load();
            }  
        
        if (ruleid && ruleid.get('ruletype') == "Prorated"){
            karmaProratedView.reset();
            proratedStore.load({
                callback: function (data) {
                    if (!Ext.isEmpty(data)) {
                        data.forEach(function (rec) {
                            var num = karmaProratedView.items.length - 1;
                            karmaProratedView.insert(num, {
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
                                    name: 'ddo_karmaprorated_instnace_id',
                                    value: rec.data.ddo_karmaprorated_instnace_id
                                }, {
                                    xtype: 'hiddenfield',
                                    name: 'ddo_karma_id',
                                    value: rec.data.ddo_karma_id
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'designation',
                                    required: true,
                                    width : 180,
                                    queryMode:'local',
                                    cls: 'karmapoints-num-cls',
                                    emptyText: '',
                                    value: rec.data.designation,
                                    displayField: 'name',
                                    valueField: 'ddo_designation_id',
                                    store: Ext.create('store.designationstore',{autoLoad:true}),
                                    allowBlank: false,
                                    listeners: {
                                        change: 'onProratedChange',
                                        change: 'onComboCheck'
                                    }
                                }, {
                                    xtype: 'numberfield',
                                    name: 'hours',
                                    required: true,
                                    value: rec.data.hours,
                                    cls: 'karmapoints-num-cls',
                                    emptyText: '',
                                    hideTrigger: true,
                                    minLength: 1,
                                    minValue: 0,
                                    width : 80,
                                    enforceMinLength: true,
                                    enableKeyEvents: true,
                                    allowBlank: false,
                                    listeners: {
                                        change: 'onProratedChange'

                                    }
                                }, {
                                    xtype: 'combobox',
                                    required: true,
                                    name: 'frequency',
                                    value: rec.data.frequency,
                                    cls: 'karmapoints-num-cls',
                                    emptyText: '',
                                    allowBlank: false,
                                    displayField: 'frequency',
                                    valueField: 'value',
                                    width : 120,
                                    store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
                                    listeners: {
                                        change: 'onProratedChange',
                                        change: 'onComboCheckFre'
                                    }
                                }, {
                                    xtype: 'numberfield',
                                    name: 'karma',
                                    required: true,
                                    value: rec.data.karma,
                                    cls: 'karmapoints-num-cls',
                                    emptyText: '',
                                    hideTrigger: true,
                                    minLength: 1,
                                    minValue: 0,
                                    width : 120,
                                    enforceMinLength: true,
                                    enableKeyEvents: true,
                                    allowBlank: false,
                                    listeners: {
                                        change: 'onProratedChange'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '',
                                    iconCls: 'plus-cross-icon-cls',
                                    cls: 'upload-button-cls',
                                    width: 20,
                                    height: 20,
                                    margin: '15 0 0 5',
                                    disabled: true,
                                    listeners: {
                                        click: 'onRemoveItemClickPro'
                                    }
                                }]
                            });

                        });

                    }

                }
            });
        }

    },
    onAddNewClickPro: function (button, e, eOpts) {
        var karmaWindow = Ext.ComponentQuery.query('karmawindow')[0];
        if (karmaWindow) {
            var cardRef = karmaWindow.down('container[reference=karmaRatingCardRef]'),
                karmapointsView = cardRef.down('karmapoints'),
                karmaProratedView = cardRef.down('karmapprorated'),
                karmaRatingView = cardRef.down('ddokarmacontainer'),
                len = karmapointsView.items.items.length,
                i;
            cardRef.down('karmaform').reset();
            karmaRatingView.removeAll();
            karmaWindow.getViewModel().set('karmaID', null);
            cardRef.setActiveItem(0);
            karmapointsView.removeAll();
            karmaProratedView.removeAll();
            karmaProratedView.add({
                xtype: 'fieldcontainer',
                ref: 'addedItemsref',
                layout: 'hbox',
                defaults: {
                    // width: 120,
                    margin: '2 10'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'ddo_karma_id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'ddo_karmaprorated_instnace_id'
                    },
                    {
                        xtype: 'combobox',
                        name: 'designation',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Designation',
                        forceSelection: true,
                        width : 180,
                        queryMode:'remote',
                        displayField: 'name',
                        valueField: 'ddo_designation_id',
                        store: Ext.create('store.designationstore',{autoLoad:true}),
                        listeners : {
                            change : 'onComboCheck'
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'hours',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Hours',
                        hideTrigger: true,
                        width : 80,
                        minLength: 1,
                        minValue: 0,
                        enforceMinLength: true,
                        enableKeyEvents: true
                    }, {
                        xtype: 'combobox',
                        name: 'frequency',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Frequency',
                        forceSelection: true,
                        displayField: 'frequency',
                        valueField: 'value',
                        width : 120,
                        store: Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
                        listeners : {
                            change : 'onComboCheckFre'
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'karma',
                        cls: 'karmapoints-num-cls',
                        emptyText: 'Karma',
                        hideTrigger: true,
                        minLength: 1,
                        width : 120,
                        minValue: 0,
                        enforceMinLength: true,
                        stripCharsRe: /\./
                    }, {
                        xtype: 'button',
                        text: '',
                        iconCls: 'plus-new-icon-cls',
                        cls: 'upload-button-cls',
                        width: 20,
                        height: 20,
                        margin: '15 0 0 5',
                        listeners: {
                            click: 'onAddItemClickPro'
                        }
                    }]
            });
        } else {

            karmaWindow = Ext.create('DDO.view.karmasetup.window.KarmaWindow');
        }

        karmaWindow.setTitle('Karma');
        karmaWindow.show();
        karmaWindow.edit = false;

    },

    onClearIcon: function (clearIcon) {
        clearIcon.setValue('');
        clearIcon.getTrigger('clear').setHidden(true);
        var karmaView = clearIcon.up('karma');
        var karmaGrid = karmaView.down('karmagrid');
        if (karmaGrid) {
            karmaGrid.getStore().clearFilter();
        }
    },
    onKarmaSearch: function (searchField, searchValue) {
        var karmaStore = Ext.ComponentQuery.query('karmagrid')[0].getStore();
        if (searchValue != '') {
            searchField.getTrigger('clear').setHidden(false);
            if (karmaStore) {
                karmaStore.clearFilter(true);
                karmaStore.filterBy(function (record) {                  
                    var name = record.get('name').toLowerCase();
                    var karmacategoryname = record.get('karmacategoryname').toLowerCase();
                    var walletemployeename = '';
                    var walletDescName = '';
                    if(record.get('walletemployeename')){
                        walletemployeename = record.get('walletemployeename').toLowerCase();
                    }
                    if(record.get('walletdescname')){
                        walletDescName = record.get('walletdescname').toLowerCase();
                    }
                    searchValue = searchValue.toLowerCase();
                    if (name.indexOf(searchValue) > -1 || karmacategoryname.indexOf(searchValue) > -1 || walletemployeename.indexOf(searchValue) > -1 || walletDescName.indexOf(searchValue) > -1) {
                        return record;
                    }
                })
            }
        } else {
            searchField.getTrigger('clear').setHidden(true);
            if(karmaStore){
                karmaStore.clearFilter();
            }
        }
    }
});