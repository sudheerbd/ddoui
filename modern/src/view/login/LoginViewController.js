Ext.define('DDO.view.loginlanding.login.LoginViewController', {
    extend: 'DDO.view.loginlanding.login.LoginController',
    alias: 'controller.loginviewcontroller',

    //requires: [
        // 'DDO.util.Socket'
    //],

    onLoginBtnTap: function(button, e, eOpts) {
        var form = button.up('formpanel'),
            formFieldValues = form.getValues(),
            loginStore = Ext.create('DDO.store.loginlanding.Login'),
            password = formFieldValues.password,
            username = formFieldValues.username,
            userId_cross = form.down('label[reference=userId_label]'),
            password_cross = form.down('label[reference=password_label]');

        if (username === null || username === "" && password === null || password === "") {
            userId_cross.setHidden(false);
            password_cross.setHidden(false);
        } else if (username === null || username === "") {
            userId_cross.setHidden(false);
        } else if (password === null || password === "") {
            password_cross.setHidden(false);
        } else {
            loginStore.load(formFieldValues);
            loginStore.on('load', 'onLoginStoreLoad', this);
        }
    },

    onLoginStoreLoad: function(store, records, success, user) {
        if (Ext.isEmpty(records)) {
            Ext.Msg.alert('Authentication failed', 'Please try again with proper credential.');
        } else {
            // Socket.initialize();
            var loginView = this.getView().up('loginview').down('container[reference=logincontainer]'),
                mv = loginView.down('mainviewport'),
                feedsdataview = mv.down('feedsview').down('feedscontainer').down('dataview'),
                feedsviewStore = feedsdataview.getStore();

            loginView.setActiveItem(4);

            /*
             * Availability sheet visible for perticular roles only
             * Implemented Array protype aumentation - STEVENSON
             */
            var role = records[0].getData().roles[0].roleid,
                roleId = [7000029, 7000021, 7000028, 1000001, 7000000, 7000026],
                menulist = loginView.down('mainmenu').down('list');

            //Augmenting Built-in Objects using prototype
            if (!Array.prototype.inArray) { // Checking whether inArray is available in Array.prototype or not.
                Array.prototype.inArray = function(value) {
                    return this.indexOf(value) === -1 ? false : true;
                }
            }
            //if roleid is not matched then removing records from menulist.
            if (!roleId.inArray(role)) {
                var avaRecord = menulist.getStore().findRecord('title', 'Availability sheet');
                if (avaRecord) {
                    menulist.getStore().remove(avaRecord);
                }
            }

            feedsviewStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    // the <a href='Ext.data.operation.Operation.html'>Ext.data.operation.Operation</a> object
                    // contains all of the details of the load operation
                    if (success) {
                        loginView.setActiveItem(1);
                    } else {
                        loginView.setActiveItem(0);
                    }
                }
            });
        }
    },

    onForgotPasswordTap: function() {
        Ext.Msg.alert('Warning', 'Please contact IT Administrator');
    },

    showLogin: function() {
        var loginView = this.getView().up('loginview').down('container[reference=logincontainer]');

        loginView.setActiveItem(0);
    },

    init: function(view) {
        view.setMasked({
            xtype: 'loadmask',
            cls: 'appLoadingIndicator'
        });

        setTimeout(function() {
            // code to be executed when loading
            // Unmask the container
            view.setMasked(false);
        }, 2000);
    }
});