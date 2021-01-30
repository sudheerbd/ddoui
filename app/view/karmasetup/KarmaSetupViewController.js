/**
 * This is controller file for 'DDO.view.karmasetup.KarmaSetupView'
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.karmasetupview'
 */
Ext.define('DDO.view.karmasetup.KarmaSetupViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.karmasetupview',

    /**
     * This is the handler for the itemclick event of the karmasetupicon dataview.
     * Checks whether the records are editable or not.
     * @param {view} ,The dataview reference.
     * @param {record} (Ext.data.Model) belongs to the item.
     * @param {item} :  HTMLElement.
     * @param {index} :  Number The item's index.
     * @param {evt} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object. 
     */
    karmaSetupItemClick: function(view, record, item, index, evt, eOpts) {
        try {
            var me = this,
                targetDom = evt.getTarget(),
                targetEl = Ext.get(targetDom);

            if (targetEl.hasCls('ddo-karmasetup-icon-delete')) {
                Ext.Msg.alert('Status', 'Delete operation cannot be performed');        
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.ITEMCLICK, err);
        }
    },

    /**
     * This is the handler for the save button .
     * to save the icons and icon names.
     * @param {btn} ,The save button reference.
     * @param {e} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object.
     */
    onIconsSaveClick: function(btn, e, eOpts) {
        try {
            var iconsView = btn.up('karmaiconview').down('karmauploadedicon'),
                iconsViewStore = iconsView.getStore(),
                vm = this.getViewModel(),
                iconObj = {};

            iconObj.add = true;
            iconObj.imageArray = [];
            this.checkIconNames(iconsViewStore, iconObj);
            if (iconObj.add && !Ext.isEmpty(iconObj.imageArray)) {
                this.processImageUploadOperation(iconsViewStore, vm, iconObj.imageArray, iconsView);
            } 
            iconsViewStore.sync({
                callback: function(operations, records, options) {
                    iconsViewStore.load();
                }
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.ICONSAVEClICK, err);
        }
    },

    /**
     * This is the handler for checking icon name is mentioned or not.
     * @param {iconsViewStore} Store, Contains reference of icon store.
     * @param {iconObj} Object, contains reference of add flag and imageArray.
     */
    checkIconNames: function(iconsViewStore, iconObj){
        iconsViewStore.each(function(rec) {
            if (Ext.isEmpty(rec.data.name)) {
                Ext.Msg.alert("Alert", "Please fill icon names");
                iconObj.add = false;
            } else {
                if (!Ext.isNumber(parseInt(rec.data.ddo_karmarating_id))) {
                    iconObj.imageArray.push({
                        icon_name: rec.data.name,
                        icon_path: rec.data.imagepath
                    });
                }
            }
        });
    },

    /**
     * This handler is responsible for uploading images in S3 bucket.
     * @param {iconsViewStore} Store, Contains reference of icon store.
     * @param {vm} Object, contains reference of this viewmodel
     * @param {imageArray} Array, contains reference of imageArray.
     * @param {iconsView} Object, contains reference of icons view.
     */
    processImageUploadOperation: function (iconsViewStore, vm, imageArray, iconsView) {
        var successCallback = function (data) {
                Ext.Msg.alert('Success', Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.IMAGESUCCESS);
                iconsViewStore.load();
                vm.set('saveBtnVisible', true);
                iconsView.refresh();
            },
            failureCallback = function (data) {
                Ext.Msg.alert('Failure', Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.IMAGEFAIL);
                vm.set('saveBtnVisible', false);
            },
            callback = function () {},
            config = {
                url: "/karmarating",
                method: 'POST',
                params: {
                    imagePath: Ext.encode(imageArray)
                }
            };
        Utility.fireAjax(config, successCallback, failureCallback, callback);
    },

    /**
     * This is the handler for the filefield change event.
     * for upload the icons.
     * @param {filefield} The filefield reference.
     * @param {value} :  string,The file value returned by the underlying file input field.
     * @param {eOpts} : Object.
     *
     */
    onImgUpload: function (filefield, value, eOpts) {
        try {
            var me = this,
                file = filefield.fileInputEl.dom.files[0],
                fileValue = filefield.value,
                reader = new FileReader(),
                format = file.type,
                iconsView = filefield.up('karmaiconview').down('karmauploadedicon'),
                iconsViewStore = iconsView.getStore();

            reader.onload = function () {
                if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
                    AmazonS3.uploadFile(filefield).then(function (rec, data) {
                        pathImg = rec;
                        iconsViewStore.add({
                            name: '',
                            imagepath: pathImg,
                            ddo_karmarating_id: Ext.id()
                        });
                    });
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.IMGUPLOAD, err);
        }
    },

    /**
     * This is the handler for the itemkeyup event of the karmasetupicon dataview.
     * update the names if user modifies name of icons.
     * @param {view} ,The dataview reference.
     * @param {record} (Ext.data.Model) belongs to the item.
     * @param {item} :  HTMLElement.
     * @param {index} :  Number The item's index.
     * @param {e} :  Ext.event.Event The raw event object.
     *
     */
    onKarmaIconItemKeyUp: function(view, record, item, index, e) {
        try {
            if (e.keyCode === 13 || e.getCharCode() === 13 
                || e.keyCode === 27 || e.getCharCode() === 27) {
                //do nothing
            } else {
                var itemEl = Ext.get(item),
                    commentTextEl = itemEl.down("input"),
                    commentValue = commentTextEl.getValue().trim(),
                    vm = this.getViewModel();

                if (commentValue === "") {
                    vm.set('saveBtnVisible', true);
                } else {
                    vm.set('saveBtnVisible', false);
                }
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.ICONNAME, err);
        }
    },

    /**
     * This is the handler for the itemclick event of the karmaprogressbar dataview.
     * Checks whether the records are editable or not.
     * @param {view} The dataview reference.
     * @param {record} (Ext.data.Model) belongs to the item.
     * @param {item} :  HTMLElement.
     * @param {index} :  Number The item's index.
     * @param {evt} :  Ext.event.Event The raw event object.
     * @param {eOpts} : Object. 
     */
    onProgressBarItemClick: function(view, record, item, index, evt, eOpts) {
        var mainView = view.up('karmasetupview'),
            cardsView = mainView.down('karmadataviewcards');

        cardsView.setActiveItem(record.data.view_value);
        this.getViewModel().set('activeItemIndex', record.data.view_value);
        view.refresh();
    }
});