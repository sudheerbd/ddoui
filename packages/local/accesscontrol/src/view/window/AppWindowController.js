Ext.define('ACCTRL.view.window.AppWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.appwindowcontroller',

    onWindowOutsideTap: function(event, target) {
        var view = this;

        Utility.onWindowOutterTap(event, target, view);
    },

    onFormCancelClick: function(btn, e, eOpts) {
        var addAppWindow, form;

        addAppWindow = btn.up('window');
        form = addAppWindow.down('form[name=appwindowform]');

        form.reset();
        addAppWindow.close();
    },
    onFormSaveClick: function(btn, e, eOpts) {
        var addAppWindow, form, 
            params, allAppStore, filters, appId,imgurl,filefield,
            appLogoImagePath,appImageUpload;

        addAppWindow = btn.up('window');
        form = addAppWindow.down('form[name=appwindowform]');
        formValues = form.getValues();
        allAppStore = Ext.getStore('allappsstore');
           appImageUpload = this.getView(),
        imgurl = appImageUpload.getViewModel().get('projectLogoUrl'),
        filefield = appImageUpload.getViewModel().get('filefield'),
       
        filters = allAppStore.getFilters();
        if(filters && filters.length){
            allAppStore.clearFilter();
        }
        var appNameExists = allAppStore.findRecord("appname", formValues.appName, 0, false, false, true);
        if(filters && filters.length){
            allAppStore.setFilters(filters);
        }
        if(addAppWindow.editMode){
            var appRecord = addAppWindow.appRecord,
                activeUserCount, allowedCount;

            appId = appRecord.get('ddo_accessapp_id');
            if(appNameExists && (appId != appNameExists.get('appid'))){
                Utility.toastReuseFn('t', 'App Name Already Exists');
                return;
            }
            activeUserCount = appRecord.get('activeusercount');
            allowedCount = Number(formValues.accessAllowedUsers);
            if(activeUserCount > allowedCount){
                Utility.toastReuseFn('t', 'Active access allowed count should be grater than active users');
                return;
            }
        } else {
            if(appNameExists){
                Utility.toastReuseFn('t', 'App Name Already Exists');
                return;
            }
        }
        if(filefield){
           AmazonS3.uploadFile(filefield).then(function (img) {
             appLogoImagePath = img;
             insertAppData();
        })
        }
        else{
            insertAppData();
        }
         function  insertAppData(){
              params = {
            ownerId: formValues.ownerId,
            appName: formValues.appName,
            appLogoPath: appLogoImagePath || '',
            accessAllowedUsers: formValues.accessAllowedUsers,
            clientName: formValues.clientName,
            description: formValues.description
        }

        if(addAppWindow.editMode){
            params.appId = appId;
            Ext.Ajax.request({
                url: '/accessapp',
                method: "PUT",
                params: params,
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj) {
                        success = obj.success;
                        if (success) {
                            addAppWindow.close();
                            Ext.getStore('detailstore').load();
                            //allAppStore.load();
                        } else {
                            Utility.toastReuseFn('t', 'Failed App Update');
                        }
                    }
                },
                failure: function(response, opts) {
                    Utility.toastReuseFn('t', 'Failed App Update');
                }
            });
        } else {
            Ext.Ajax.request({
                url: '/accessapp',
                method: "POST",
                params: params,
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj) {
                        success = obj.success;
                        if (success) {
                            addAppWindow.close();
                            allAppStore.load();
                        } else {
                            Utility.toastReuseFn('t', 'Failed App Update');
                        }
                    }
                },
                failure: function(response, opts) {
                    Utility.toastReuseFn('t', 'Failed App Update');
                }
            });
        }
         }

      
    },
    onAppImageChange : function(filefield, value, eOpts){
            var  me = this ;
            var dom = Ext.getDom(filefield.fileInputEl);
                    var file =     dom.files[0];
                    var fileType = dom.files[0].type;
                    var fileName = dom.files[0].name;
                   var appImage = me.getViewModel();
                    var reader = new FileReader();
                    reader.onload =function(e){
                       appImage.set('appImg', e.target.result); 
                       appImage.set('filefield', filefield); 
                    }
                   reader.readAsDataURL(dom.files[0]);
        // var scb = function(formPanel, action) {
        //     var text = Ext.JSON.decode(action.response.responseText),
        //         pathImg = text.imgPath,
        //         appWindowModel = filefield.up('appwindow').getViewModel();

        //     // if(Utility.appImage){
        //     //     Utility.appChangedImage.push(Utility.appImage);
        //     // }
        //     Utility.appImage = pathImg;
        //     appWindowModel.set('appImg','../'+pathImg);
        // };

        // var fcb = function() {
         
        //     Utility.toastReuseFn('t', 'failed to set app image');
        // };
       
        // Utility.uploadImgFormatFn(this, filefield, '/appimage', scb, fcb);
    }
});