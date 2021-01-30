Ext.define('DDO.view.loginlanding.createaccount.CreateAccountWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.createaccountviewcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        this.onWindowOutterTap(event, target);
    },

    onWindowOutterTap: function(event, target) {
        var target = target || event.target,
            cls = target.getAttribute('class'),
            window = this.getView(),
            form = window.down('form');

        if (cls && (cls.indexOf('x-mask') !== -1)) {
            if (form && form.isDirty()) {
                var win = Ext.Msg.confirm("Confirmation", "Are you sure you want to exit from the form? All the information entered will be lost", function(btnText) {
                    if (btnText === "no") {
                        //stays with current changes 

                    } else if (btnText === "yes") {
                        form.reset();
                        window.close();
                    }
                });
            } else {
                form.reset();
                window.close();
            }
        }
    },

    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var createAccountWindow, form;

        createAccountWindow = btn.up('window');
        form = createAccountWindow.down('form');

        if (form && form.isDirty()) {
            var win = Ext.Msg.confirm("Confirmation", "Are you sure you want to exit from the form? All the information entered will be lost", function(btnText) {
                if (btnText === "no") {
                    //stays with current changes 

                } else if (btnText === "yes") {
                    form.reset();
                    createAccountWindow.close();
                }
            });
        } else {
            form.reset();
            createAccountWindow.close();
        }

    },

    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var createAccountWindow, form, formRec;
        createAccountWindow = btn.up('window');
        form = createAccountWindow.down('form');
        formRec = form.getValues();

        form.submit({
            scope: this,
            method: 'POST',
            url: '/registration',
            success: function(form, action) {
                form.reset();
                createAccountWindow.close();

                // --- TODO
                //Receive email(Message need to be refactored)
                Ext.Msg.alert('Success', 'Thank you for your interest in EngazeWell. You will receive email shortly with further details.');
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failure', JSON.parse(action.response.responseText).message);
            }
        });
    },

    onStatusMouseOut: function(params, tickRef, errContentRef, condition) {
        if (condition) {
            Ext.Ajax.request({
                url: '/registration/verifystatus',
                method: 'POST',
                scope: this,
                params: params,
                success: function(resp, b) {
                    var refs = this.getReferences(),
                        errContent = refs[errContentRef],
                        tickIconRef = refs[tickRef],
                        response = Ext.decode(resp.responseText);
                    if (response.data > 0) {
                        if (errContent && errContent.isHidden()) {
                            errContent.show();
                        }

                    } else {
                        tickIconRef.show();
                    }
                },
                failure: function(resp, b) {
                    //do nothing
                }
            });
        }
    },

    onStatusMouseIn: function(tickRef, errContent) {
        var refs = this.getReferences(),
            tickIconRef = refs[tickRef]
        errContent = refs[errContent];

        errContent.hide();
        tickIconRef.hide();
    },

    onCompanyMouseOut: function(txtfield, e, eOpts) {
        var companyValue, condition,
            paramsObj;

        companyValue = txtfield.getValue();
        condition = !Ext.isEmpty(companyValue);

        paramsObj = {
            company: companyValue
        };

        this.onStatusMouseOut(paramsObj, 'tickIcon', 'errcontent', condition);
    },

    onCompanyMouseIn: function(txtfield, e, eOpts) {
        this.onStatusMouseIn('tickIcon', 'errcontent');
    },

    onPhNumMouseOut: function(txtfield, e, eOpts) {
        var regex, phNumValue,
            condition, paramsObj;

        regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        phNumValue = txtfield.getValue();

        condition = !Ext.isEmpty(phNumValue) && regex.test(phNumValue);

        paramsObj = {
            phnum: phNumValue
        };

        this.onStatusMouseOut(paramsObj, 'phTickIcon', 'existNumber', condition);
    },

    onPhNumMouseIn: function(txtfield, e, eOpts) {
        this.onStatusMouseIn('phTickIcon', 'existNumber');
    },

    onOrgEmailMouseOut: function(txtfield, e, eOpts) {
        var orgEmailValue, condition, 
            paramsObj;

        orgEmailValue = txtfield.getValue();

        condition = txtfield.isValid();

        paramsObj = {
            org_email: orgEmailValue
        };

        this.onStatusMouseOut(paramsObj, 'emailTickIcon', 'existEmail', condition);
    },

    onOrgEmailMouseIn: function(txtfield, e, eOpts) {
        this.onStatusMouseIn('emailTickIcon', 'existEmail');
    },

    regImageToolTip: function(c) {
        var toolTipMsg;

        if (c.getReference() == 'tickIcon') {
            toolTipMsg = AlertMessages.companyValid;
        } else if(c.getReference() == 'phTickIcon'){
            toolTipMsg = AlertMessages.phNumValid;
        } else {
            toolTipMsg = AlertMessages.orgEmailValid;
        }

        Ext.create('Ext.tip.ToolTip', {
            target: c.getEl(),
            html: toolTipMsg
        });
    },

    onDesignationSelect: function(combo, record, eOpts) {
        var comboValue = combo.getValue(),
            refs = this.getReferences(),
            designationComboRef = refs.designationComboRef,
            designationtxtfield = refs.otherDesignationRef,
            designationFormBind = designationtxtfield.allowBlank;


        if (comboValue == "Others") {
            if (designationtxtfield.isHidden()) {
                designationtxtfield.allowBlank = false;
                designationtxtfield.validate();
                designationComboRef.setWidth('50%');
                designationtxtfield.show();
            }
        } else {
            designationtxtfield.allowBlank = true;
            designationtxtfield.validate();
            designationtxtfield.clearInvalid();
            designationComboRef.setWidth('100%');
            designationtxtfield.hide();
        }
    }
});