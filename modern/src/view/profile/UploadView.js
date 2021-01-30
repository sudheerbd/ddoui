Ext.define('DDO.view.profile.UploadView', {
    extend: 'Ext.form.Panel',

    xtype: 'uploadview',

    controller: 'userprofileviewcontroller',
    requires: ['Ext.field.File'],
    viewModel: {
        data: {}
    },

    itemId: 'uploadview',

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 75,
    bottom: 5,
    right: 2,
    left: 2,
    height: '9%',
    enableSubmissionForm :true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    cls: 'profile-picture-upload',

    items: [{
        xtype: 'toolbar',
        cls: 'profile-pic-toolbar',
        items: [{
            xtype: 'filefield',
            opType: 'upload',
            label: "Photo Library:",
            cls: 'userProfileBtn',
            name: 'profileImage',
            accept: 'image',
            labelWidth: '55%',
            listeners: {
                change: 'onMobileProfilePicChange'
            }
         }]
    }],
    /* 
     * Fixed frame work issues with overring this below function.
     * https://ftp.sencha.com/forum/showthread.php?311465-Form-submit-filefield-error-and-fire-event-change-always-modern-toolkit&p=1137240#post1137240
     * https://www.sencha.com/forum/showthread.php?304609-Ext.Ajax.parseStatus-is-not-a-function
     */
    doBeforeSubmit: function(me, formValues, options) {
        var form = options.form || {},
            multipartDetected = false;
 
        if(this.getMultipartDetection() === true) {
            this.getFieldsAsArray().forEach(function(field) {
                if(field.isFile === true) {
                    multipartDetected = true;
                    return false;
                }
            });
 
            if(multipartDetected) {
                form.setAttribute("enctype", "multipart/form-data");
            }
        }
 
        if(options.enctype) {
            form.setAttribute("enctype", options.enctype);
        }
 
        if (me.getStandardSubmit()) {
            if (options.url && Ext.isEmpty(form.action)) {
                form.action = options.url;
            }
 
            // Spinner fields must have their components enabled *before* submitting or else the value 
            // will not be posted. 
            var fields = this.query('spinnerfield'),
                ln = fields.length,
                i, field;
 
            for (i = 0; i < ln; i++) {
                field = fields[i];
                if (!field.getDisabled()) {
                    field.getComponent().setDisabled(false);
                }
            }
 
            form.method = (options.method || form.method).toLowerCase();
            form.submit();
        } else {
            var api = me.getApi(),
                url = options.url || me.getUrl(),
                scope = options.scope || me,
                waitMsg = options.waitMsg,
                failureFn = function(response, responseText) {
                    if (Ext.isFunction(options.failure)) {
                        options.failure.call(scope, me, response, responseText);
                    }
 
                    me.fireEvent('exception', me, response);
                },
                successFn = function(response, responseText) {
                    if (Ext.isFunction(options.success)) {
                        options.success.call(options.scope || me, me, response, responseText);
                    }
 
                    me.fireEvent('submit', me, response);
                },
                submit;
 
            if (options.waitMsg) {
                if (typeof waitMsg === 'string') {
                    waitMsg = {
                        xtype   : 'loadmask',
                        message : waitMsg
                    };
                }
 
                me.setMasked(waitMsg);
            }
 
            if (api) {
                submit = api.submit;
 
                if (typeof submit === 'string') {
                    submit = Ext.direct.Manager.parseMethod(submit);
 
                    if (submit) {
                        api.submit = submit;
                    }
                }
 
                if (submit) {
                    return submit(this.element, function(data, response, success) {
                        me.setMasked(false);
 
                        if (success) {
                            if (data.success) {
                                successFn(response, data);
                            } else {
                                failureFn(response, data);
                            }
                        } else {
                            failureFn(response, data);
                        }
                    }, this);
                }
            } else {
                var request = Ext.merge({},
                    {
                        url: url,
                        timeout: this.getTimeout() * 1000,
                        form: form,
                        scope: me
                    },
                    options
                );
                delete request.success;
                delete request.failure;
 
                request.params = Ext.merge(me.getBaseParams() || {}, options.params);
                request.header = Ext.apply(
                    {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    options.headers || {}
                );
                request.callback = function(callbackOptions, success, response) {
                    var me = this,
                        responseText = response.responseText,
                        responseXML = response.responseXML,
                        // Changed Ext.Ajax.parseStatus to Ext.data.request.Ajax.parseStatus.
                        statusResult = Ext.data.request.Ajax.parseStatus(response.status, response);
 
                    if(form.$fileswap) {
                        var original, placeholder;
                        Ext.each(form.$fileswap, function(item) {
                            original = item.original;
                            placeholder = item.placeholder;
 
                            placeholder.parentNode.insertBefore(original, placeholder.nextSibling);
                            placeholder.parentNode.removeChild(placeholder);
                        });
                        form.$fileswap = null;
                        delete form.$fileswap;
                    }
 
                    me.setMasked(false);
 
                    if(response.success === false) success = false;
                    if (success) {
                        if (statusResult && responseText && responseText.length === 0) {
                            success = true;
                        } else {
                            if(!Ext.isEmpty(response.responseBytes)) {
                                success = statusResult.success;
                            }else {

                                // Changed && condition to || for preventing error

                                if(Ext.isString(responseText) || response.request.options.responseType === "text") {
                                    response.success = true;
                                } else if(Ext.isString(responseText)) {
                                    try {
                                        response = Ext.decode(responseText);
                                    }catch (e){
                                        response.success = false;
                                        response.error = e;
                                        response.message = e.message;
                                    }
                                } else if(Ext.isSimpleObject(responseText)) {
                                    response = responseText;
                                    Ext.applyIf(response, {success:true});
                                }
 
                                if(!Ext.isEmpty(responseXML)){
                                    response.success = true;
                                }
                                success = !!response.success;
                            }
                        }
                        if (success) {
                            successFn(response, responseText);
                        } else {
                            failureFn(response, responseText);
                        }
                    }
                    else {
                        failureFn(response, responseText);
                    }
                };
 
                if(Ext.feature.has.XHR2 && request.xhr2) {
                    delete request.form;
                    var formData = new FormData(form);
                    if (request.params) {
                        Ext.iterate(request.params, function(name, value) {
                            if (Ext.isArray(value)) {
                                Ext.each(value, function(v) {
                                    formData.append(name, v);
                                });
                            } else {
                                formData.append(name, value);
                            }
                        });
                        delete request.params;
                    }
                    request.data = formData;
                }
 
                return Ext.Ajax.request(request);
            }
        }
    }
    // hide: function(model) {
    //     this.destroy();
    // }
});