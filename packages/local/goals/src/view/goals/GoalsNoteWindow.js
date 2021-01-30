/**
 * This view is responsible for goal note window in goals view.
 * @class 'Goals.view.goals.GoalsNoteWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.goalsnotewindow'
 * @ViewModel 'Goals.view.goals.GoalsNoteWindowViewModel'
 * @Controller 'Goals.view.goals.GoalsNoteWindowController'
 */
Ext.define('Goals.view.goals.GoalsNoteWindow', {
    extend:  'Ext.window.Window',

    requires: [
        'Goals.view.goals.GoalsNoteWindowController'
    ],

    alias: 'widget.goalsnotewindow',

    title: LabelsTitles.GOALS.GOALMAIN.ADDNOTES,

    controller: 'goalsnotewindowcontroller',
    viewModel: {
        type: 'goalsnotewindowviewmodel'
    },

    modal:true,

    initComponent: function() {
        this.callParent(arguments);

        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    width: 600,
    height: 300,
    // width: Constants.ViewportWidth * 0.44,
    // height: Constants.ViewportHeight * 0.47,
    items: [{
        xtype: 'form',

        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.GOALS.GOALMAIN.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.GOALS.GOALMAIN.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items: [{
            xtype: 'textarea',
            name: 'details',
            emptyText: LabelsTitles.GOALS.GOALMAIN.DETAILS,
            cls: 'rule-name-cls'
        }]
    }]
});