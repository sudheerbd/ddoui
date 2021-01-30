/**
 * The file is the controller for 'DDO.view.profile.details.Interest.
 * @extends {Ext.app.ViewController}.
 * @alias 'controller.interestcontroller'.
 */
Ext.define('DDO.view.interests.InterestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interestcontroller',

    /** adds a textfield by clicking on the button
     *  @param {button} 'button'  reference for AddInterests button
     **/
    onAddClick: function(button) {
        try{
        if (Utility.isFormDirty) {
            Ext.Msg.alert('INFO', 'Please close the other form before you want to Add Interest');
        } else {
            var textfield = this.getView().lookupReference('addtextfield');
            textfield.setVisible(true);
            this.getViewModel().set('editing', true);
            textfield.focus();
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.INTERESTS.ADDBUTTON, err);
    }
    },

    /** adds the interest entered in the textfield
     *  @param{object} [addedInterest] reference for the textfield
     *  @param{object} [e] browser events
     **/
    onAddedInterest: function(addedInterest, e) {
        try{
        var interest = addedInterest.getValue(),
            interestValue = Ext.String.trim(interest),
            interestStore = this.getViewModel().get('interestStore'),
            textfield = this.getView().lookupReference('addtextfield'),
            login = Ext.getStore('login'),
            loginData = login.getData().items[0].data,
            profileView = Ext.ComponentQuery.query('userprofile')[0],
            profileViewModel = profileView.getViewModel(),
            interestAdd = true;
        for (var k = 0, count = interestStore.getCount(); k < count; k++) {
            if (interestValue.toLowerCase() === interestStore.data.items[k].data.area.toLowerCase()) {
                interestAdd = false;
                Ext.Msg.alert('INFO', 'Already Added');
                break;
            }
        }
          this.updateInterestStore(interestAdd,e,interestStore,loginData,interestValue,profileViewModel,textfield);
        
    }catch(err){
            Utility.showToast(Messages.USERPROFILE.INTERESTS.ADDINTERESTS, err);
        }
    },
    /**
     * The function updateInterestStore is responsible to sync the added interests to the store.
     * @param {boolean} 'interestAdd' check whether true or false. 
     *  @param{object} [e] browser events
     * @param {interestsstore} 'interestStore' which is a store. 
     * @param {object} 'loginData' the l;ogin data of user.
     * @param {string} 'interestValue' the interests value. 
     * @param {ViewModel} 'profileViewModel' the voiewmodel of userprofile. 
     * @param {textfield} 'textfield' the text entering field. 
     */
    updateInterestStore:function(interestAdd,e,interestStore,loginData,interestValue,profileViewModel,textfield){
        if (interestAdd) {
            if (e.keyCode === 13) {
                if (interestValue != "" || interestValue === null) {   
                    if (interestStore) {
                        interestStore.add({
                            ddo_employee_id: loginData.ddo_employee_id,
                            area: interestValue
                        });
                        interestStore.sync({
                            callback: function(batch, options) {
                                interestStore.load();
                            }
                        });
                        profileViewModel.getData().profiledata.interest.push(interestStore.data.items.slice(-1)[0].data);
                        textfield.reset();
                    }
                }
            }
        }
    },
    /** hides the textfield when it is out of focus
     *  @param{object} [textfield] reference for the textfield
     **/
    onBlur: function(textfield) {
        textfield.hide();
        textfield.reset();
    },

    /** deletes the particular record from store
     *  @param{object} [view] reference for the interests dataview
     *  @param{object} [record] reference for the particular record clicked
     *  @param{HTMLElement} [item] particular record's HTML element
     *  @param{number} [idx] particular record's index
     *  @param{object} [event] browser's event
     **/
    onRemoveIconClick: function(view, record, item, idx, event) {
        try{
        if (event.target.getAttribute('data-action') === 'deleteInterest') {
            var intereststore = view.getStore();
            intereststore.remove(record);
            intereststore.sync({
                callback: function(batch, options) {
                    intereststore.load();
                }
            });
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.INTERESTS.REMOVECLICK, err);
    }
    },
    /**
     * The function onViewRender is responsible to set the view model values at the time of the rendering of the page.
     * @param {profilesview} 'view' 
     */
    onViewRender: function(view) {
        try{
        Ext.defer(function() {
            var store = this.getView().lookupReference('interestsadded').getStore(),
                length = store.getCount(),
                button = this.getView().lookupReference('addtextfield'),
                viewModel = this.getViewModel(),
                nonPersonal = viewModel.get('nonPersonalAcccess');
            if (nonPersonal == false) {
                if (length > 0) {
                    viewModel.set('editing', true);
                }
            } else {
                viewModel.set('editing', true);
            }
        }, 700, this);
        view.el.on('mouseover', 'onInterestsContainerMouseOver');
        view.el.on('mouseleave', 'onInterestsContainerMouseLeave');
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.INTERESTS.RENDER, err);
    }
    }
});