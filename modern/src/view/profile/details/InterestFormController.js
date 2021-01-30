Ext.define('DDO.view.profile.details.InterestFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interestformviewcontroller',
    /** adds the interest entered in the textfield
     *  @param{object} [addedInterest] reference for the textfield
     *  @param{object} [e] browser events
     **/
    onRemoveIconClick: function(view, index, target, record, event, eOpts) {
        var targetDom = event.getTarget(),
            targetEl = Ext.get(targetDom),
            intereststore;

        if (targetEl.hasCls('ddo-interests-delete')) {
            intereststore = view.getStore();
            intereststore.remove(record);
            view.refresh();
        }
    },

    // onAddedInterest: function(addedInterest, e) {
    //     var textfield = this.getView().lookupReference('addtextfield'),
    //         textbutton = this.getView().lookupReference('textbutton'),
    //         interest = textfield.getValue(),
    //         interestValue = Ext.String.trim(interest),
    //         interestTempStore = this.getView().down('interestlist').getStore(),
    //         interestView = Ext.ComponentQuery.query('interest')[0],
    //         interestStore = interestView.down('interestlist').getStore(),
    //         interestAdd = true,
    //         add = true;

    //     for (var k = 0, count = interestStore.getCount(); k < count; k++) {
    //         if (interestValue.toLowerCase() == interestStore.data.items[k].data.interest.toLowerCase()) {
    //             add = false;
    //             break;
    //         }
    //     }
    //     if (interestAdd) {
    //         for (var j = 0, countTemp = interestTempStore.getCount(); j < countTemp; j++) {
    //             if (interestValue.toLowerCase() == interestTempStore.data.items[j].data.interest.toLowerCase()) {
    //                 interestAdd = false;
    //                 Ext.Msg.alert('INFO', 'Already Added');
    //                 break;
    //             }
    //         }
    //     }
    //     if (interestAdd) {
    //         if (interestValue != "" || interestValue === null) {
    //             if (interestTempStore) {
    //                 interestTempStore.add({
    //                     interest: interestValue,
    //                     temp: true,
    //                     add: add
    //                 });
    //                 textfield.reset();
    //             }
    //         }
    //     }
    // },

    onInterestBackBtnTap: function() {
        var interestForm = this.getView();
        interestForm.destroy();
    },

    onSaveBtnClick: function(btn) {
        var interestView = Ext.ComponentQuery.query('interest')[0],
            interestForm = this.getView(),
            interestList = this.getView().down('interestlist'),
            interestFormValue = interestForm.lookupReference('addtextfield').getValue(),
            // interestStoreTemp = interestList.getStore(),
            interestStore = interestView.getViewModel().get('interestStore'),
            login = Ext.getStore('login'),
            loginData = login.getData().items[0].data,
            records = [];

        Ext.Viewport.setActiveItem(1);

        interestList.suspendLayout = true;

        // interestStoreTemp.each(function(rec) {
        //     if (rec.data.temp) {
        //         delete rec.data.temp;
        //         if (rec.data.add) {
        //             records.push(rec.data.interest);
        //         }
        //         delete rec.data.add;
        //     }
        // });

        if (interestFormValue.trim().length > 0) {
            interestStore.add({
                userid: loginData.userid,
                pass: loginData.pass,
                interest: interestFormValue
            });

            interestStore.sync({
                callback: function(batch, options) {
                    interestStore.load();
                    Ext.Viewport.setActiveItem(0);
                }
            });

            interestForm.destroy();
        } else {
            interestForm.destroy();
        }

        interestList.suspendLayout = false;

        interestList.updateLayout();

        Ext.Viewport.setActiveItem(0);
    }
});