/**
 * This view is responsible for displaying todo menu.
 * @class 'DDO.view.widget.todo.ToDoMenu'
 * @extends 'Ext.menu.Menu'
 * @alias 'todomenu'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.widget.todo.ToDoMenu', {
    extend: 'Ext.menu.Menu',
    // alias: 'widget.todomenu',
    xtype: 'todomenu',

    requires: [
        'DDO.view.widget.todo.ToDoListController',
        'DDO.view.widget.todo.ToDoListModel'
    ],

    controller: 'todolistcontroller',
    viewModel: {
        type: 'todolistmodel'
    },
    items: [{
        xtype: 'datepicker',
        reference: 'menuPicker',
        cls: 'ddo-create-datepicker',
        minDate: new Date(),
        createMonthPicker: function() {
            var me = this,
                picker = me.monthPicker;

            if (!picker) {
                me.monthPicker = picker = new Ext.picker.Month({
                    renderTo: me.el,
                    // We need to set the ownerCmp so that owns() can correctly
                    // match up the component hierarchy so that focus does not leave
                    // an owning picker field if/when this gets focus.
                    ownerCmp: me,
                    floating: true,
                    padding: me.padding,
                    cls: 'ddo-create-monthpicker',
                    shadow: false,
                    small: me.showToday === false,
                    footerButtonUI: me.footerButtonUI,
                    listeners: {
                        scope: me,
                        cancelclick: me.onCancelClick,
                        okclick: me.onOkClick,
                        yeardblclick: me.onOkClick,
                        monthdblclick: me.onOkClick
                    }
                });
                if (!me.disableAnim) {
                    // hide the element if we're animating to prevent an initial flicker
                    picker.el.setStyle('display', 'none');
                }
                picker.hide();
                me.on('beforehide', me.doHideMonthPicker, me);
            }
            return picker;
        },
        listeners: {
            select: 'addDateTask',
            render: 'onMenuDatePickerRender'
        }
    }]
});