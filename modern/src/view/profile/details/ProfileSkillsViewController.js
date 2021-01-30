Ext.define('DDO.view.profile.details.ProfileSkillsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profileskillsviewcontroller',

    /**
     * Dynamically Adding skills form when user required to fill skills.
     * @param:{string} btn contains The current component always passed as the button reference.
     * If form exists disable the button.
     */
    onAddSkillsBtnClick: function(btn) {
        var skills = this.getView().lookupReference('profileskillsadded'),
            form = Ext.create('DDO.view.profile.details.ProfileSkillsForm');

        form.show();
    },

    onSkillsExpandOrCollapse: function(btn) {
        var me = this;
        if (btn.getIconCls().indexOf('fa-chevron-down') > 0) {
            btn.setIconCls('fa fa-chevron-up');
            Ext.Array.each(me.lookupReference('profileskillsadded').getViewItems(), function(item) {
                item.style.display = "block";
            });
        } else {
            btn.setIconCls('fa fa-chevron-down');
            Ext.Array.each(me.lookupReference('profileskillsadded').getViewItems(), function(item, index) {
                if (index > 0) {
                    item.style.display = "none";
                }
            });
        }
    },

    onSkillsViewRendered: function() {
        var me = this,
            store = me.lookupReference('profileskillsadded').getStore();
        Ext.defer(function() {

            if (!Ext.isEmpty(store) && !Ext.isEmpty(store.data) && store.data.length < 1) {
                me.lookupReference('expandOrCollapse').hide();
            }
        }, 1000);
    }
});