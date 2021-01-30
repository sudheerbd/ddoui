Ext.define('DDO.view.loginlanding.login.LoginController', {
    extend: 'DDO.view.loginlanding.LoginLandingController',
    
    alias: 'controller.login',

    //requires: [
        //'DDO.util.Socket'
    //],

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'validateSession'
            }
        }
    },

    // routes: {
    //     'login': {
    //         action: 'onRouteChange',
    //         before: 'validateSession'

    //     }
    // },

    validateSession: function(action) {
        try{
        var me = this;
        var keycloak = KeycloakLoader.getKeycloak();
        if(!keycloak) {
            KeycloakLoader.initialize();
            keycloak = KeycloakLoader.getKeycloak();
        }

        window.keyCloak = keycloak;

        if (!sessionStorage.getItem('authentication')) {
            keycloak.init({ onLoad: 'login-required',Load: 'login-required', checkLoginIframe: false
         }).success(function (authenticated) {
                if (authenticated == true) {
                    sessionStorage.setItem('authentication', keycloak.token);
                    sessionStorage.setItem('refreshToken', keycloak.refreshToken);
                    Ext.Ajax.setDefaultHeaders({ 
                        'Authorization': 'Bearer ' + keycloak.token
                     });                     
                    // me.onLoginClick(window.keyCloak.tokenParsed);
                    var email = window.keyCloak.tokenParsed.email;
                    var formValues = {"email" : email},
                loginStore = Ext.create('DDO.store.loginlanding.Login');
                loginStore.load(formValues);
                loginStore.on('load', 'onLoginStoreLoad', me);
                }
            }).error(function(){
                Utility.toastReuseFn('t', AlertMessages.authFailed);
            });
        }
        else {
            var mainviewport = Ext.ComponentQuery.query('mainviewport')[0];
            if (mainviewport) {
                if (action && typeof (action) != 'object' && action.split('/').length > 2) { //eg: action = #projectdetails/1000105/people
                    mainviewport.getController().onUnMatchRouteChange(action);
                } else {
                    mainviewport.getController().validateSession('login', action);
                }
            }
        }
    }catch(err){
        Utility.showToast(Messages.LOGIN.SESSIONS, err);
    }
    },
    /**
      It calls when route id changes  and calls respective function.
      @param {String} id The hash to execute with.
    */
    onRouteChange: function(id) {
        try{
        var me = this;
        if (id == 'login') {
            this.onLoginView();
            // -- Removed due to an issue with setting the profile image
            // } else if (id == 'home') {
            //     this.updateUserProfileInfo();
        } else if (id == 'forgotpassword') {
            this.onForgotPasswordEleClick();
        }
}catch(err){
    Utility.showToast(Messages.LOGIN.ROUTECHANGE, err);
}
    },

    /**
     * @param {Ext.form.field.Text} textView This text field
     * @event keyup
     * Keyup input field event. This event only fires if **{@link #enableKeyEvents}** is set to true.
     * @param {Ext.form.field.Text} this This text field
     * @param {Ext.event.Event} e
     *
     */

    onLoginEnterClick: function(textView) {
        try{
        textView.getEl().on('keyup', function(event) {
            if (event.browserEvent.which === 13 && event.keyCode === 13) {
                var formView = this.getView().down('form');
                this.onLoginClick(formView)
            }
        }, this);
    }catch(err){
        Utility.showToast(Messages.LOGIN.LOGINCLICK, err);
    }

    },

    /**
     * When render textbox it automatically focus 
     * focus. Only applies when {@link #editable editable} = true 
     */

    onRenderTextFocus: function(field) {
        field.focus(this, 100);
    },

    /**
     * Check Login credentials and provides authentication to login users
     * @param:{string}{button} The scope of the button (defaults to current component)
     */
    onLoginClick: function(tokenParsed) {
        this.validateSession();
        // var formValues = {"email" : tokenParsed.email},
        //         loginStore = Ext.create('DDO.store.loginlanding.Login');
        //         loginStore.load(formValues);
        //         loginStore.on('load', 'onLoginStoreLoad', this);
    },

    /** 
     * This function check user role id and provides dasboard access for accessiable role ids.
     * @param {Ext.data.Store} store The store.
     * @param {Ext.data.Model[]} records An array of records.
     * Checks if the response status was successful
     */
    onLoginStoreLoad: function(store, records, success) {
        try{
        if (Ext.isEmpty(records)) {
            Utility.toastReuseFn('t', AlertMessages.authFailed);
        } else {
            if (records[0]) {
                var navigationTreeList = this.getView().up('loginview').down('treelist[reference=navigationTreeList]');
                Utility.dashboardRemovalFn(navigationTreeList);
            }
            Ext.getBody().mask('');
            //Socket.initialize();
            this.updateUserProfileInfo();
        }
    }catch(err){
        Utility.showToast(Messages.LOGIN.STORELOAD, err);
    }

    },


    /**
     * It redirects to user profile view
     */
    updateUserProfileInfo: function(userData) {
        var loginView = Utility.setFadeAnim(this.getView().up('loginview'), 0, 1),
            loginStore = Ext.getStore('login'),
            mainviewport;
        loginView.setActiveItem(3);
        this.redirectTo('home');
        // mainviewport = Ext.ComponentQuery.query('mainviewport')[0];
        // if (mainviewport) {
        //     mainviewport.getViewModel().getStore('profiledetails').load();
        // }
    },

    /**
     * It redirects to linkedin 
     */
    onLinkedinBtnClick: function(button) {
        console.log('Clicked on linkedin button!');
    },

    /**
     * It redirects to forgot password view 
     */
    onForgotPasswordEleClick: function() {
        // var loginView = Utility.setFadeAnim(this.getView().up('loginview'), 0, 1);
        // loginView.setActiveItem(1);
        // this.redirectTo('forgotpassword');
        Ext.Msg.alert('Alert', 'Please contact IT Administrator');

        // var forgotPasswordWindow = Ext.ComponentQuery.query('forgotpasswordwindow')[0] 
        //   || Ext.widget('forgotpasswordwindow');

        // if(Utility.toastReusable) {
        //   Utility.toastReusable.hide();
        // }

        // forgotPasswordWindow.down('form').reset();
        // forgotPasswordWindow.show();
    },

    /**
     * It redirects to login view
     */
    onLoginView: function() {
        var loginView = Utility.setFadeAnim(this.getView().up('loginview'), 0.5, 1);
        loginView.setActiveItem(1);
        //this.redirectTo('login');//because of this login is rendering twice
    }
});
