// this is extended by the login and forgot password viewcontrollers
Ext.define('DDO.view.loginlanding.LoginLandingController', {
    extend: 'Ext.app.ViewController',
    alias:'controller.loginlanding',


    onAccountRegistration: function(btn, e, eOpts) {
        // debugger;
        var form = this.getView().down('form'),
        formRec = form.getValues();
        var me = this;
        form.submit({
            scope: me,
            method: 'POST',
            url: '/registration',
            success: function(form, action) {
                var responseData = Ext.decode(action.response.responseText).data[0];
                form.reset();
                var landingView = me.getView();
                landingView.removeAll();
                var generateOtpView = Ext.create('DDO.view.loginlanding.otp.GenerateOtpView',{
                    registrationID :responseData.ddo_registration_id,
                    receivedOtp:responseData.otp
                });
                landingView.add(generateOtpView);
                // Ext.Msg.alert('Success', 'Thank you for your interest in EngazeWell. You will receive email shortly with further details.');
            },
            failure: function(form, action) {
                form.reset();
                // Ext.Msg.alert("Failed", JSON.parse(action.response.responseText).message);
                Ext.Msg.alert("Failed", 'Registration Failed' );
            }
        });
    },

    onCreateAccount: function(btn, e, opts) {
        var landingView = this.getView();
        landingView.removeAll();
        var createAccountView = Ext.create('DDO.view.loginlanding.login.CreateAccount');
        landingView.add(createAccountView);
        // var CreateAccountWindow = Ext.ComponentQuery.query('createaccountwindow')[0] 
        //     || Ext.create('DDO.view.loginlanding.createaccount.CreateAccountWindow'),
        //     form = CreateAccountWindow.down('form'),
        //     refs, cityComboRef, stateComboRef,
        //     tickIconRef ,errContent, designationRef,
        //     phTickIconRef, existNumber,
        //     errEmailContent, emailTickIconRef,
        //     designationComboRef;

        // form.reset();

        // refs = CreateAccountWindow.getReferences();

        // errContent = refs.errcontent;
        // tickIconRef = refs.tickIcon;

        // phTickIconRef = refs.phTickIcon;
        // existNumber = refs.existNumber;

        // errEmailContent = refs.existEmail;
        // emailTickIconRef = refs.emailTickIcon;
        
        // designationRef = refs.otherDesignationRef;
        // designationComboRef = refs.designationComboRef;
        
        // errContent.hide();
        // tickIconRef.hide();

        // existNumber.hide();
        // phTickIconRef.hide();

        // errEmailContent.hide();
        // emailTickIconRef.hide();

        // designationRef.hide();

        // designationComboRef.setWidth('100%');

        // CreateAccountWindow.show();
    },

    onResendOtp:function(ele){
        var me = this;
        var resend = true;
            var registrationID = me.getView().down('generateotp').registrationID;
            var params = {
                regID:registrationID,
                resendOtp:resend
            }
                Ext.Ajax.request({

                    scope: me,
                    url: Api.URL.validateotp.UPDATE,
                    method: 'PUT',
                    params: params,
                    success: function (res) {
                        // debugger;
                        var response = Ext.decode(res.responseText).data[0];
                        me.getView().down('generateotp').receivedOtp = response.otp; 
                        Ext.Msg.alert("Success",'New OTP has been sent to you');
                    },
                    failure: function (rec) {
                        Ext.Msg.alert("Failed","Failed to resend otp");
                    }
                });
    },
    onConfirmOtp:function(){
            var otpEntered = this.getView().down('textfield').getValue();
            var me =this;
            var refs = me.getReferences();
            var receivedOtp = this.getView().down('generateotp').receivedOtp,
            registrationID = this.getView().down('generateotp').registrationID;
            var params = {
                regID:registrationID
            }
            if(otpEntered == receivedOtp){
                Ext.Ajax.request({
                    scope: me,
                    url: Api.URL.validateotp.UPDATE,
                    method: 'PUT',
                    params: params,
                    success: function (res) {
                        Ext.Msg.alert("Success",'OTP validated succesfully.Please continue with login');
                        me.getView().down('textfield').reset();
                        refs.resendotp.setHidden(true);
                        refs.otp.setHidden(true);
                        refs.confirmotp.setHidden(true);
                        var text = LabelsTitles.AFTEROTPVALIDATION;
                        refs.extratext.setHtml(text);
                    },
                    failure: function (rec) {
                        Ext.Msg.alert("Failed",'Failed to validate OTP');
                    }
                });
            }else{
                Ext.Msg.alert("Failed",'OTP you entered is incorrect.Please try again');
            }
    },

    onLoginClick:function(){
        var landingView = this.getView().down('container').up('loginlanding');
        landingView.setActiveItem(0);
    }
});