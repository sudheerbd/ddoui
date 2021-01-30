Ext.define('DDO.view.profile.details.InterestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interestcontroller',

    requires: [
        'DDO.view.profile.details.InterestForm'
    ],

    /** adds a textfield
     *  @param{string} [button] reference for AddInterests button
     **/
    onAddClick: function(button) {
        var form = Ext.create('DDO.view.profile.details.InterestForm');

        form.getViewModel().set('interstFormTitle', 'Create New');
        form.show();
    },

    /** deletes the particular record from store
     *  @param{object} [view] reference for the interests dataview
     *  @param{object} [record] reference for the particular record clicked
     *  @param{HTMLElement} [item] particular record's HTML element
     *  @param{number} [idx] particular record's index
     *  @param{object} [event] browser's event
     **/
    onRemoveIconClick: function(view, index, target, record, event, eOpts) {
        var targetDom = event.getTarget(),
            targetEl = Ext.get(targetDom),
            intereststore;

        if (targetEl.hasCls('ddo-interests-delete')) {
            intereststore = view.getStore();

            intereststore.remove(record);
            intereststore.sync();

            view.refresh();
        }
    }
});