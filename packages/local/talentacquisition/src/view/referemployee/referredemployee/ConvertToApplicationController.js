Ext.define('TalentAcquisition.view.referemployee.referredemployee.ConvertToApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.converttoapplicationcontroller',

    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onFormSaveClick:function(){

        var form = this.getView(),
            values = form.getValues();
             form.reset();
        if(Ext.isEmpty(values.ddo_jobapplications_id)){
            delete values.ddo_jobapplications_id;
        }

        Ext.Ajax.request({
            url: '/jobapplications',
            method: Ext.isEmpty(values.ddo_jobapplications_id)?'POST':'PUT',
            params: values,
            success: function(resp, b) {
                //grid.getStore().reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
                form.up().setActiveItem(0);
                form.up('referredemployeeview').down('[name=referredEmployeeCollCon]').down('[name=eastpanel]').toggleCollapse();


            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');                
            }
        });
    },
    onCancelClick: function(){
        var view = this.getView();
        view.up().setActiveItem();
    },
     /**
     * This is the handler for the filefield change event.
     * for upload the icons.
     * @param filefield The filefield reference.
     * @param value :  string,The file value returned by the underlying file input field.
     * @param eOpts : Object.
     *
     */
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
