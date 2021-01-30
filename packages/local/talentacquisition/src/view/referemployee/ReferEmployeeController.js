Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referemployeecontroller',
    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onReferAnEmployeeBtnClick : function(view ,rowIndex ,colIndex ,item, e, record ,row ){
        this.onSetActiveItem(1)
        var activeItem = this.onGetActiveItem(),
            formData = view.$widgetRecord.data,
            form = activeItem.getForm();
        form.setValues(formData);
        activeItem.down('textfield[name=name]').show();
        activeItem.down('textfield[name=name]').setEditable(false);
        activeItem.down('textfield[name=primaryskills]').setEditable(false);
    },
    onEnterCandidateDetailsBtnClick : function(view ,rowIndex ,colIndex ,item, e, record ,row ){
        this.onSetActiveItem(1)
        var activeItem = this.onGetActiveItem();
        activeItem.down('textfield[name=name]').hide();
        activeItem.down('textfield[name=name]').setEditable(true);
        activeItem.down('textfield[name=primaryskills]').setEditable(true);
    },
    onCancelBtnClick: function(btn,ent){    
        var me = this,
            view = me.getView(),
            form = view.down('form');
            form.reset(),
        this.onSetActiveItem(0);
    },
    onBackButtonClick: function(btn,ent){
        this.onSetActiveItem(0);
        this.getView().down('referemployeeform').reset();

    },
    onSetActiveItem: function(item){
        var me = this;
        me.getView().getLayout().setActiveItem(item);
    },
    onGetActiveItem: function(){
        var me = this;
        return me.getView().getLayout().getActiveItem();
    },
    onFormSaveClick:function(){
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid');

        form.reset();
        Ext.Ajax.request({
            url: '/employeereferral',
            method: 'POST',
            params: values,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
                me.onSetActiveItem(0);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');

            }
        });
    }, 
    onCVupload: function(filefield, value, eOpts) {

        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = value,
            reader = new FileReader(),
            format = file.type,
            form = filefield.up('form'),
            curriculumvitaeField = form.up('form').down('hiddenfield[name=curriculumvitae]');
        
        reader.onload = function() {
            
            if (format == "application/msword" ||format == "application/pdf" || format == "application/doc" || format == "application/docx" || format == "application/txt" || format == "application/wps" || format == "application/odt" || format == "application/wpd" || format == "application/rtf" ) {
                /**
                 * Docx format preventing due to stored file format issue (Storing like a zip file on server)
                 * format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 */
                form.submit({
                    url: '/feed/feedsPostedPics',
                    waitMsg: 'Uploading your cv...',
                    success: function(res, msg) {
                        var text = Ext.JSON.decode(msg.response.responseText),
                            pathImg = text.data;
                            curriculumvitaeField.setValue(pathImg);
                            Ext.toast({
                                html: 'File uploaded successfully',
                                width: 150,
                                align: 't'
                            });
                            // iconsViewStore.add({
                            //     name: '',
                            //     imagepath: pathImg,
                            //     ddo_karmarating_id: Ext.id()
                            // });
                            // filefield.setDisabled(true);
                    },
                    failure: function(res) {
                        Ext.toast({
                            html: 'File not loaded',
                            width: 150,
                            align: 't'
                        });
                    }
                });

            } else {
                Ext.toast({
                    html: 'Invalid Format',
                    width: 150,
                    align: 't'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});