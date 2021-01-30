/**
 * This is controller for view 'Goals.view.goals.GoalsNoteWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.goalsnotewindowcontroller'
 */
Ext.define('Goals.view.goals.GoalsNoteWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.goalsnotewindowcontroller',

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

    onFormCancelClick: function(btn, e, eOpts) {
        var noteWindow, form;

        noteWindow = btn.up('window');
        form = noteWindow.down('form');

        form.reset();
        noteWindow.close();
    },

    onFormSaveClick: function(btn, e, eOpts) {
        var win = btn.up('window'),
            form = win.down('form'),
            formRec = form.getValues(),
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            gridStre = execPlan.down('[reference = notegrid]').getStore(),
            execPlanViewModel = execPlanView.getViewModel(),
            goalid = execPlanViewModel.get('ddo_employeegoal_id');
        params = {
            goalid: goalid,
            type: "Standard",
            details: formRec.details
        };
       var notesobj = {
                        details: formRec.details,
                        notetype: "Standard",
                        targetdate: new Date()
                    };
        Ext.Ajax.request({
            url: '/goalnote',
            method: 'POST',
            params: params,
            success: function(resp, b) {
                Ext.getBody().unmask();
                gridStre.add(notesobj);
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();

            }
        });
        win.close();
    }
});