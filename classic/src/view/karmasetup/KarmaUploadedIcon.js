/**
 * This is Karma upload icon view in karma setup section responsible for uploading new rating icon.
 * @class 'DDO.view.karmasetup.KarmaUploadedIcon'
 * @extends 'Ext.view.View'
 * @alias 'karmauploadedicon'
 */
Ext.define('DDO.view.karmasetup.KarmaUploadedIcon', {
    extend: 'Ext.view.View',

    xtype: 'karmauploadedicon',

    loadMask: false,
    width: Constants.ViewportWidth * 0.38,
    height: Constants.ViewportHeight * 0.668,

    store: 'karmasetup.KarmaIconUploadedStore',

    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.NOICON,

    tpl: [
        '<tpl for=".">',
        '<div class="karmasetup-main-cls">',
        '<div class = "ddo-karmasetup-uploadicon">',
        '<img src="{[this.getImageUrl(values)]}" class="ddo-karmasetup-icon" wrap-td="image_url">',
        '</div>',
        '<div class="ddo-karmasetup-icon-delete" data-action="deleteIcon"></div>',
        '<input type ="text" class="ddo-karmasetup-name" id="{[this.setId(values)]}"   value="{name}"></input>',
        '</div>',
        '</tpl>', {

            setId: function (values) {
                var itemId;

                if (typeof values.name === "string") {
                    itemId = 'input_' + values.ddo_karmarating_id;
                }

                Ext.Function.defer(this.addListener, 1, this, [itemId, values]);

                return itemId;
            },
            getImageUrl: function (values) {
                return Api.URL.imageUrl + values.imagepath;
            },
            addListener: function (id, values) {
                if (!Ext.isEmpty(Ext.get(id)) && !Ext.get(id).hasListener('blur')) {
                    Ext.get(id).on('blur', function (e, opt) {
                        var store = Ext.getStore('karmasetup.KarmaIconUploadedStore'),
                            record = store.findRecord('ddo_karmarating_id', e.currentTarget.id.split("_")[1]);

                        if (!(record.data.name == e.currentTarget.value)) {

                            var rec = store.findRecord('name', e.currentTarget.value.trim(), 0, false, false, true);
                            if (rec) {
                                Ext.Msg.alert("Same name already exist");
                                e.currentTarget.value = record.data.name;
                            } else {
                                record.set('name', e.currentTarget.value);

                            }
                        }
                    }, this);
                }
            }
        }
    ],

    itemSelector: 'div.karmasetup-main-cls',

    listeners: {
        itemclick: 'karmaSetupItemClick',
        itemkeyup: 'onKarmaIconItemKeyUp'

    }
});