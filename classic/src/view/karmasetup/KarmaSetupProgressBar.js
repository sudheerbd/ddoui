/**
 * This view is responsible for progress bar status shows on karma setup view.
 * @extends 'Ext.view.View',
 * @alias 'karmasetupprogressbar',
 * @viewmodel: 'DDO.view.karmasetup.KarmaSetupViewModel'
 * @controller: 'DDO.view.karmasetup.KarmaSetupViewController'
 */
Ext.define('DDO.view.karmasetup.KarmaSetupProgressBar', {
    extend: 'Ext.view.View',

    xtype: 'karmasetupprogressbar',

    loadMask: false,

    width:'100%',

    bind: {
        store: '{karmaProgressStore}'
    },
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.NOICON,

    tpl: [
        '<tpl for=".">',
            '<div class="karmasetup-progressbar-cls {[this.getClsName(values)]}">',
            '<div class="progressbar-cls">',
            '<div class="progressbar-outer">',
            '<div class="progressbar-view-title active-view-title {view_title_cls}">{view_title}</div>',
            '<div class="progressbar-inner"></div></div>',
            '</div>',
            '</div>',
        '</tpl>',{
            getClsName:function(values){
               var karmasetupView = Ext.ComponentQuery.query('karmasetupview')[0],
                   activeItemIndex = karmasetupView.viewModel.data.activeItemIndex;
                   if(activeItemIndex == values.view_value){
                     return "active-cls"
                   } else if(activeItemIndex > values.view_value){
                    return "completed-cls"
                   }else{
                     return "not-completed-cls"
                   }
            }
        }
    ],

    itemSelector: 'div.karmasetup-progressbar-cls',

    listeners:{
        itemclick:'onProgressBarItemClick'
    }
});