/**
 * The file 'NominateViewIcons' is a part of the view form of the window which comes  as an icons oin the view form after choosing all the credentials i the viewform.
 * ViewModel:'DDO.view.profile.nominateview.NominateViewFormModel' is the ViewModel of this file.
 * ViewController:'DDO.view.profile.nominateview.NominateViewFormController' is the ViewController of this file.
 */

Ext.define('DDO.view.nominate.nominateothers.NominateOthersViewIcons', {
    extend: 'Ext.view.View',

    xtype: 'nominateothersviewicons',

    loadMask: true,

    store: 'projects.nominate.NominateRatingInstanceStore',

    emptyText: '<div class = "ddo-nominatesetup-emptytext">No Icons Added</div>',

    cls: 'ddo-nominateview-icons',

    tpl: [
        '<tpl for=".">',
        '<div class="nominatesetup-main-cls">',
        '<div class = "ddo-nominatesetup-uploadicon ","{[this.getICons(values)]}">',
        '<img src="{[this.setImagepath(values)]}" class="ddo-nominatesetup-icon" wrap-td="image_url">',
        '</div>',
        '<div class="ddo-nominatesetup-name">{name}</div>',
        '</div>',
        '</tpl>', {
            getICons: function (values) {
                return true;
            },
            setImagepath: function (values) {
                if (values && values.imagepath) {
                    return Utility.imageCheck(values.imagepath)
                } else {
                    return Utility.projectImg;
                }

            }
        }
    ],

    itemSelector: 'img.ddo-nominatesetup-icon',

    listeners: {
        itemclick: 'nominateIconItemClick',
        selectionchange: 'nominateIconItemSelectionChange',
        beforedeselect: 'nominateIconDeSelect'
    }
});