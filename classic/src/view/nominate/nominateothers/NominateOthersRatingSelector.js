/**
 * The file 'NominateRatingSelector' is a container which is a part of the view form of the window which comes by clicking on the 'Nominate Others' option in the 'Nominate' button.
 * ViewModel:'DDO.view.nominate.SelfNominateWindowModel' is the ViewModel of this file.
 * ViewController:'DDO.view.profile.nominateview.NominateViewFormController' is the ViewController of this file.
 */

Ext.define('DDO.view.nominate.nominateothers.NominateOthersRatingSelector', {
    extend: 'Ext.container.Container',

    alias: 'widget.nominateothersratingselector',
    requires: [
      //  'Ext.container.ButtonGroup'
    ],
    // initComponent: function () {
    //     this.callParent(arguments);
    //     var karmaCategoryViewStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
    //     if (karmaCategoryViewStore.isLoaded()) {
    //         Utility.addKarmaCategories(karmaCategoryViewStore, this);
    //         Utility.isRendered = true;
    //     } else {
    //         karmaCategoryViewStore.load({
    //             scope: this,
    //             callback: function (argument) {
    //                 Utility.addKarmaCategories(karmaCategoryViewStore, this);
    //                 Utility.isRendered = true;
    //             }
    //         })

    //     }
    // },
    // listeners: {
    //     afterrender: function (me, e, eOpts) {
    //         debugger;
    //         var karmaCategoryViewStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
    //         if (Utility.isRendered) {
    //             Utility.isRendered = false;
    //         } else {
    //             Utility.addKarmaCategories(karmaCategoryViewStore, me);
    //         }
    //     }
    // }
});