/**
 * The file NotesViewController is the ViewController for DDO.view.projects.NotesView.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.notesviewcontroller'.
 */
Ext.define('DDO.view.projects.NotesViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.notesviewcontroller',

    /**
     * This is the handler for the item click event of the Notes dataview.
     * @param {view} 'view' The dataview reference
     * @param {record} 'record' The dataview current clicked item record.
     * @param {item} 'item' the div item which is selected.
     * @param {number} 'index' at what index the item is selected.
     * @param {Event} 'evt'  The raw event object.
     * @param {object} 'eOpt' which event object which is being hit.
     */
       onNoteItemClick: function(view, record, item, index, evt, eOpt) {
        try{
        var me = this,
        targetDom = evt.getTarget(),
        targetEl = Ext.get(targetDom),
            store, projectStore;
        if (!targetEl.hasCls('note-table-cls') && !targetEl.hasCls('edit-cls') 
            && !targetEl.hasCls('delete-cls') && !targetEl.hasCls('note-td-cls') 
            && !targetEl.hasCls('edit-note-cls') && !targetEl.hasCls('delete-note-cls') 
            && !targetEl.hasCls('note-td-next-cls')) {
            this.individualNoteWindow(false, false, record, true);
        } else if (targetEl.hasCls('edit-cls')) {
            this.individualNoteWindow(true, false, record, false);
        } else if (targetEl.hasCls('delete-cls')) {
            me.alertConfirmMessage(me,store,projectStore,record);
        }
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.OPENWINDOW, err);
    }
    },
    /**
     * The function alertConfirmMessage is responsible for the alert message which occurs by clicking on delete button.
     * @param {view} 'me' which is the scope. 
     * @param {store} 'store' the variable which holds the store. 
     * @param {store} 'projectStore' the variable which holds the store. 
     * @param {record} 'record' The dataview current clicked item record.
     */
    alertConfirmMessage : function(me,store,projectStore,record){
        Ext.Msg.confirm("Confirm", "Are you sure you want to delete this Note?", function(btnText) {
            if (btnText === "no") {}
             else if (btnText === "yes") {
                var view = this.getView(),
                notesDataView = view.down('notesdataview'),
                store = notesDataView.getStore();
                projectStore = Ext.getStore('projects.ProjectDashboardStore');
                store.remove(record);
                store.sync({
                    success: function(batch, options) {
                        store.load({
                            params: {
                                projectId: me.getViewModel().get('activeProData').project_id
                            }
                        });
                        projectStore.load();
                    },
                    failure: function(batch, options) {
                        Ext.Msg.alert('ERROR', 'Please check your connection');
                    }
             });
            }
        }, this);
    },
    /**
     * The function individualNoteWindow is responsible to set the model values when the window is opened.
     * @param {boolean} 'editPermit' which holds the value of true or false. 
     * @param {boolean} 'deletePermit' which holds the value of true or false. 
     * @param {record} 'record' which holds the selected record. 
     * @param {boolean} 'nonEditPermit' which holds the boolean value. 
     */
    individualNoteWindow: function(editPermit, deletePermit, record, nonEditPermit) {
        var view = this.getView();
        var individualNote = Ext.ComponentQuery.query('notewindow')[0] 
            || Ext.create('DDO.view.projects.NoteWindow',{
                parentViewRef: view
            }),
            ref = individualNote.getReferences(),
            noteType = individualNote.down('[name = note_type]'),
            noteStatus = individualNote.down('[name = note_status]'),
            statusStore = noteStatus.getStore(),
            noteComboStore = noteType.getStore(),
            model = individualNote.getViewModel();
        model.set('activeProId', this.getViewModel().get('activeProData').project_id);
        model.set('editBtnVisible', editPermit);
        model.set('deleteBtnVisible', deletePermit);
        model.set('rec', record);
        model.set('nonEditablePermit', nonEditPermit);
        statusStore.clearFilter(true);
        statusStore.filterBy(function(rec) {
            if (rec.data.note_status_name !== 'All') {
                return true;
            }
        });
        noteComboStore.clearFilter(true);
        noteComboStore.filterBy(function(rec) {
            if (rec.data.note_name !== 'All') {
                return true;
            }
        });
        individualNote.show();
        ref.notesform.loadRecord(record);
    },
/**
 * The function onNoteCreateClick is responsible for opening the window and fill the form by clicking on the breate button.
 * @param {Ext.button.Button} 'btn' which is a create button. 
 * @param {Event} 'e' which is a event. 
 * @param {Object} 'eOpts' the event options object passed. 
 */
    onNoteCreateClick: function(btn, e, eOpts) {
        try{
        var view = this.getView();
        var noteWindow = Ext.ComponentQuery.query('notewindow')[0] 
            || Ext.create('DDO.view.projects.NoteWindow',{
                parentViewRef: view
            }),
            viewModel = noteWindow.getViewModel(),
            noteType = noteWindow.down('[name = note_type]'),
            noteStatus = noteWindow.down('[name = note_status]'),
            statusStore = noteStatus.getStore(),
            noteComboStore = noteType.getStore(),
            ref = noteWindow.getReferences();
        statusStore.clearFilter(true);
        statusStore.filterBy(function(rec) {
            if (rec.data.note_status_name !== 'All') {
                return true;
            }
        });
        noteComboStore.clearFilter(true);
        noteComboStore.filterBy(function(rec) {
            if (rec.data.note_name !== 'All') {
                return true;
            }
        });
      this.setViewModelClick(viewModel,ref,noteWindow);
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.CREATEWINDOW, err);
    }
    },
    /**
     * The function setViewModelClick is responsible to set the values in the view model by clicking on the create button.
     * @param {Ext.ViewModel} 'viewModel' which holds the view model. 
     * @param {references} 'ref' which contains the references of the notewindow. 
     * @param {Ext.window.Window} 'noteWindow' which contains the window. 
     */
    setViewModelClick:function(viewModel,ref,noteWindow){
        viewModel.set('activeProId', this.getViewModel().get('activeProData').project_id);
        viewModel.set('editBtnVisible', true);
        viewModel.set('deleteBtnVisible', true);
        viewModel.set('nonEditablePermit', false);
        viewModel.set('statusValue', null);
        viewModel.set('noteDescValue', null);
        viewModel.set('noteTypeValue', null);
        viewModel.set('noteTitleValue', null);
        ref.notesform.reset();
        noteWindow.show();
    },
    /**
     * The function onStatusItemSelect is reponsible for the validations performs when the particular value is selected in the combobox.
     * @param {Ext.form.field.ComboBox} 'combo' the combobox. 
     * @param {Ext.data.Model} 'record' the record which is selected. 
     * @param {Object} 'eOpts' the events object. 
     */
    onStatusItemSelect: function(combo , record , eOpts) {
        try{
            var view = this.getView(),
                noteDataView = view.down('notesdataview'),
                noteStore = noteDataView.getStore(),
                me = this,
                viewModel = this.getViewModel(),
                fromDate = viewModel.get('fromDate'),
                toDate = viewModel.get('toDate'),
                noteTypeValue = combo.up('container').down('combo[reference="NotesType"]').getValue();

            noteStore.clearFilter(true);
            noteStore.filterBy(function(rec) {
            if(fromDate && toDate && noteTypeValue) {
                var createdDate = Ext.Date.clearTime(new Date(rec.data.created_date));
                me.validateStatusDatesOne(createdDate,fromDate,toDate,rec,combo,noteTypeValue);
            }
            if(fromDate && toDate) {
                me.validateStatusDatesTwo(fromDate,toDate,rec,combo);
            }
            if(noteTypeValue) {
               me.statusNoteTypeValidation(noteTypeValue,rec,combo);
            } 
            if(rec.data.note_status == combo.value) {
                return true;
            } else if(combo.value === "1") {
                return true;
            } else {
                return false;
            }
        });
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.STATUSCLICK, err);
    }
    },
    /**
     * The function validateStatusDatesOne is responsible for the validation of dates by clicking on the status in the combobox.
     * @param {date} 'createdDate' which holds the date. 
     * @param {date} 'fromDate' which is the from date value. 
     * @param {date} 'toDate' which is the todate value. 
     * @param {record} 'rec' records in the store. 
     * @param {Ext.form.field.ComboBox} 'combo' which is a combobox. 
     * @param {value} 'noteTypeValue' which holds the value of the note type. 
     */
    validateStatusDatesOne:function(createdDate,fromDate,toDate,rec,combo,noteTypeValue){
        if(Ext.Date.between(createdDate, fromDate, toDate) 
        && rec.data.note_status == combo.value
         && rec.data.note_type == noteTypeValue) {
        return true;
    } else if(Ext.Date.between(createdDate, fromDate, toDate) 
        && combo.value === "1"
         && rec.data.note_type == noteTypeValue) {
        return true;
    } else if(Ext.Date.isEqual(fromDate, toDate) 
        && Ext.Date.isEqual(createdDate, toDate)
         && rec.data.note_status == combo.value
          && rec.data.note_type == noteTypeValue) {
        return true;
    } else if(Ext.Date.isEqual(fromDate, toDate) 
        && Ext.Date.isEqual(createdDate, toDate)
         && combo.value === "1"
          && rec.data.note_type == noteTypeValue) {
        return true;
    } else if(Ext.Date.between(createdDate, fromDate, toDate) 
        && rec.data.note_status == combo.value
         && noteTypeValue === "1") {
        return true;
    } else if(Ext.Date.between(createdDate, fromDate, toDate) 
        && combo.value === "1"
         && noteTypeValue === "1") {
        return true;
    } else if(Ext.Date.isEqual(fromDate, toDate) 
        && Ext.Date.isEqual(createdDate, toDate)
         && rec.data.note_status == combo.value
          && noteTypeValue === "1") {
        return true;
    } else if(Ext.Date.isEqual(fromDate, toDate) 
        && Ext.Date.isEqual(createdDate, toDate)
         && combo.value === "1"
          && noteTypeValue === "1") {
        return true;
    } else {
        return false;
    }
    },
    /**
     * The function validateStatusDatesTwo is responsible for the validation of dates by clicking on the status in the combobox.
     * @param {date} 'fromDate' which is the from date value. 
     * @param {date} 'toDate' which is the todate value. 
     * @param {record} 'rec' records in the store. 
     * @param {Ext.form.field.ComboBox} 'combo' which is a combobox. 
     */
    validateStatusDatesTwo:function(fromDate,toDate,rec,combo){
        var createdDate = Ext.Date.clearTime(new Date(rec.data.created_date));
        if(Ext.Date.between(createdDate, fromDate, toDate) 
            && rec.data.note_status == combo.value) {
            return true;
        } else if(Ext.Date.between(createdDate, fromDate, toDate) 
            && combo.value === "1") {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && rec.data.note_status == combo.value) {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && combo.value === "1") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * The function statusNoteTypeValidation is responsible for validation of NoteType in the status combobox.
     * @param {value} 'noteTypeValue' which holds the value of the note type. 
     * @param {record} 'rec' records in the store. 
     * @param {Ext.form.field.ComboBox} 'combo' which is a combobox. 
     */
     statusNoteTypeValidation:function(noteTypeValue,rec,combo){
        if(noteTypeValue === "1" 
        && rec.data.note_status == combo.value) {
        return true;
    } else if(rec.data.note_type == noteTypeValue
        && rec.data.note_status == combo.value) {
        return true;
    } else if(rec.data.note_type == noteTypeValue 
        && combo.value === "1") {
        return true;
    } else if(combo.value === "1" 
        && noteTypeValue === "1") {
        return true;
    } else {
        return false;
    }
     },
    /**
     * The function onNoteTypeItemSelect is responsible for the valiadtion of filter by clicking on the note type.
     * @param {Ext.form.field.ComboBox} 'combo' which is a combobox. 
     * @param {record} 'record' the record which is selected. 
     * @param {object} 'eOpts' the object of events. 
     */
    onNoteTypeItemSelect: function(combo , record , eOpts) {
        try{
        var view = this.getView(),
            noteDataView = view.down('notesdataview'),
            noteStore = noteDataView.getStore(),
            me = this,
            viewModel = this.getViewModel(),
            fromDate = viewModel.get('fromDate'),
            toDate = viewModel.get('toDate'),
            statusValue = combo.up('container').down('combo[reference="status"]').getValue();

        noteStore.clearFilter(true);
        noteStore.filterBy(function(rec) {
            if(fromDate && toDate && statusValue) {
                me.validateNotesDateOne(fromDate,toDate,rec,combo,statusValue);
            }
            if(fromDate && toDate) {
                me.validateNotesDateTwo(fromDate,toDate,rec,combo);
            }
            if(statusValue) {
                me.validateSatusValue(statusValue,rec,combo);
            } 
            if(rec.data.note_type == combo.value) {
                return true;
            } else if(combo.value === "1") {
                return true;
            } else {
                return false;
            }
        });
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.NOTETYPE, err);
    }
    },
    /**
     * The function validateNotesDateOne is responsible to filter the records by the selectoin of the comobox value.
     * @param {date} 'fromDate' which holds the from date value. 
     * @param {date} 'toDate' which holds the to date value. 
     * @param {record} 'rec' which holds the selected record. 
     * @param {Ext.form.field.ComboBox} 'combo' which holds the combobox. 
     * @param {value} 'statusValue' which holds the status value. 
     */
    validateNotesDateOne:function(fromDate,toDate,rec,combo,statusValue){
        var createdDate = Ext.Date.clearTime(new Date(rec.data.created_date));
        if(Ext.Date.between(createdDate, fromDate, toDate) 
            && rec.data.note_type == combo.value
             && rec.data.note_status == statusValue) {
            return true;
        } else if(Ext.Date.between(createdDate, fromDate, toDate) 
            && combo.value === "1"
             && rec.data.note_status == statusValue) {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && rec.data.note_type == combo.value
              && rec.data.note_status == statusValue) {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && combo.value === "1"
              && rec.data.note_status == statusValue) {
            return true;
        } else if(Ext.Date.between(createdDate, fromDate, toDate) 
            && rec.data.note_type == combo.value
             && statusValue === "1") {
            return true;
        } else if(Ext.Date.between(createdDate, fromDate, toDate) 
            && combo.value === "1"
             && statusValue === "1") {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && rec.data.note_type == combo.value
              && statusValue === "1") {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && combo.value === "1"
              && statusValue === "1") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * The function validateNotesDateTwo responsible to filter the records as per the selected value in the combobox.
     * @param {date} 'fromDate' which holds the from date value. 
     * @param {date} 'toDate' which holds the to date value. 
     * @param {record} 'rec' which holds the selected record. 
     * @param {Ext.form.field.ComboBox} 'combo' which holds the combobox. 
     */
    validateNotesDateTwo:function(fromDate,toDate,rec,combo){
        var createdDate = Ext.Date.clearTime(new Date(rec.data.created_date));
        if(Ext.Date.between(createdDate, fromDate, toDate) 
            && rec.data.note_type == combo.value) {
            return true;
        } else if(Ext.Date.between(createdDate, fromDate, toDate) 
            && combo.value === "1") {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && rec.data.note_type == combo.value) {
            return true;
        } else if(Ext.Date.isEqual(fromDate, toDate) 
            && Ext.Date.isEqual(createdDate, toDate)
             && combo.value === "1") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * The function validateSatusValue is responsible for validation based on the status value.
     * @param {value} 'statusValue' which holds the status value.
     * @param {record} 'rec' which holds the selected record. 
     * @param {Ext.form.field.ComboBox} 'combo' which holds the combobox. 
     */
     validateSatusValue:function(statusValue,rec,combo){
        if(statusValue === "1" 
        && rec.data.note_type == combo.value) {
        return true;
    } else if(rec.data.note_status == statusValue
        && rec.data.note_type == combo.value) {
        return true;
    } else if(rec.data.note_status == statusValue 
        && combo.value === "1") {
        return true;
    } else if(combo.value === "1" 
        && statusValue === "1") {
        return true;
    } else {
        return false;
    }
     },
    /**
     * The function onTriggerItemClick is responsible to hide the trigger when the trigger is being clicked.
     * @param {component} 'cmp' the component where the trigger item is. 
     * @param {trigger} 'trigger' the trigger which is used. 
     * @param {event.target} 'target' the target where the events needs to fire. 
     */
    onTriggerItemClick:function(cmp, trigger, target) {
        try{
        cmp.setValue('');
        trigger.hide();
        }catch(err){
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.TRIGGERCLICK, err);
        }
    },
/**
 * The function onDateRangeChange is responsible to show or hide the cancel trigger based on the selection of the date value.
 * @param { daterangefield} 'me' the date renge field. 
 * @param {string} 'newValue' the new value which is selected. 
 * @param {string} 'oldValue' the old value. 
 * @param {object} 'eOpts' the event which is fired. 
 */
     onDateRangeChange:function(me, newValue , oldValue , eOpts ){
         try{
        if(Ext.isEmpty(newValue)){
                me.triggers.cancel.hide();
                var view = this.getView(),
                    projectStatus = view.down('notesdataview'),
                    noteStore = projectStatus.getStore();

                noteStore.clearFilter(true);
                this.getView().down('notesdataview').refresh();
           }else{
            me.triggers.cancel.show();
        }
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTES.DATEFILTER, err);
    }
     }
});