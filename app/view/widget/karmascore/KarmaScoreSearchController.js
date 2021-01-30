 /**
 * This is controller for view 'DDO.view.widget.karmascore.KarmaScoreSearch'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.karmascoresearch'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.karmascoresearch',

    /**
     * This method is used to trigger the search as per the 
     * search form fields and update the grid store accordingly.
     * @param {form} Object, contains search form reference.
     */
    triggerSearch: function(form) {
        try {
            var vm = this.getViewModel(),
                store = vm.get('allkarmascores'),
                searchString = form.getValues().employee,
                searchMinValue = form.getValues().karmaScoreRange[0],
                searchMaxValue = form.getValues().karmaScoreRange[1];
                
            if(store) {
                store.clearFilter(true);
                store.filterBy(function(record){
                    var result = record.data.employee.search(new RegExp(searchString,'gi'));
                    return result >= 0 && record.data.karmapoints >= searchMinValue && record.data.karmapoints <= searchMaxValue;
                },this);
            }
        } catch (err) {
            Utility.showToast(Messages.HOME.TRIGGERSEARCH, err);
        }
    },

    /**
     * This is a handler for the keydown events of all search fields
     * @param {field} Object, The field reference.
     * @param {e} Object, The keydown event object
     */
    onKeyupSearchBy: function(field, e) {
        try{
            var keyCode = e.keyCode;
            // restriciting to some characters
            if ((keyCode >= 48 && keyCode < 58) // numbers
                || (keyCode >= 65 && keyCode < 123) // letters
                || (keyCode === 8) // backspace
                || (keyCode === 46) // delete
            ) {
                this.triggerSearch(field.up('karmascore-searchform'));
                this.onKarmaScoreLoad();
            }       
        } catch (err) {
            Utility.showToast(Messages.HOME.TRIGGERSEARCH, err);
        }
    },

    onRangeChange: function(slider, newValue, thumb, eOpts) {
        this.triggerSearch(slider.up('karmascore-searchform'));
        this.onKarmaScoreLoad();
    },

    sliderValueFn: function() {
        var sliderValue = Utility.sliderEndRangeValue;
        this.getView().lookupReference('karmaScoreRange').setValue(1, sliderValue);
    },

    /**
     * Handles the click event on the karma score search item.
     * Redirects the page to specific profile clicked.
     * @param {view} Object, Contains reference of karma score view.
     * @param {record} Object, Contains reference of selected record.
     * @param {item} Object, Contains reference of item which is clicked.
     * @param {idx} Number, Contains index number.
     * @param {evt} Object, Contains reference of fired event details.
     * @param {opts} Object, Contains reference of event object
     */
   onKarmaScoreItemClick: function(view, record, item, idx, evt, opts) {
       try {
            var me = this,
                targetDom = evt.getTarget(),
                targetEl = Ext.get(targetDom);
            Ext.getBody().mask('');
            this.redirectTo('profile/' + record.data.employee_code);
            this.getView().hide();
            if (targetEl.hasCls('score-cls')) {
                me.onScoreClick();
            }
       } catch (err) {
            Utility.showToast(Messages.HOME.ITEMCLICK, err);
       }
    },

    onScoreClick: function() {
        var me = this,
            mainviewport = Ext.ComponentQuery.query('mainviewport')[0],
            userprofileview = mainviewport.down('userprofile'),
            profileView, detailsBtn;

        profileView = userprofileview.lookupReference('profileuserview') || null;

        if (profileView == null) {
            Ext.defer(me.onScoreClick(), 500);
        } else {
            detailsBtn = userprofileview.lookupReference('detailsBtn');

            profileView.setActiveItem(1);

            detailsBtn.removeCls('timelinebutton');
            detailsBtn.setText('View Profile');
            detailsBtn.addCls('detailsbutton');
        }
    },
    
    /**
     * Fires whenever range value changes and responsible for karma score load.
     */
    onKarmaScoreLoad: function () {
        var viewModel = this.getViewModel(),
            storeData = viewModel.getStore('allkarmascores').data,
            me = this,
            totalRecCount = 0,
            resultRecCount = 0,
            resultPercentage = 0;
    
        if(storeData.items.length > 0) {
            totalRecCount = storeData.items[0].data.totalcount,
            resultRecCount = storeData.items.length,
            resultPercentage = ((resultRecCount/totalRecCount) * 100);  
        }
        
        viewModel.set('karmaScorePercentage', ' - ' + resultRecCount +"/"+ totalRecCount + " ("+resultPercentage.toFixed(1)+"%)");
        
        if(Utility.myMask){

          Utility.myMask.hide();  
        }
    },

    /**
     * Fires whenever karma score view is being close
     * @param {cmp} Object, Contains reference of clciked component.
     */
    onKarmaSearchClose:function(cmp){ 
        this.redirectTo('home');
    }
});