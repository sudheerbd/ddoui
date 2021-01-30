Ext.define('DDO.view.profile.details.InterestList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'interestlist',

    cls: 'ddo-interestsadded-cls',

    inline: true,
    scrollable: false,

    itemTpl: [
        '<tpl for=".">',
        '<div class = "ddo-interesttpl">',
        '<div data-qtip = "{interest}" class="ddo-interestsadded">{interest:ellipsis(10)}</div>',
        '<tpl if="this.getValidations(values)">',
        '<span  class="ddo-interests-delete" data-action="deleteInterest"></span>',
        '</tpl>',
        '</div>',
        '</tpl>', {
            displayCloseImg: function(values) {
                return Ext.ComponentQuery.query('interestlist')[0].closeImg;
            },
            
            getValidations: function(values) {
                var view = Ext.ComponentQuery.query('interest')[0],
                    viewModel, nonPersonalAcccess;
                if (view) {
                    viewModel = view.getViewModel();
                    nonPersonalAcccess = viewModel.get('nonPersonalAcccess');
                    return !nonPersonalAcccess;
                }
                return true;
            }
        }
    ],

    itemSelector: 'div.ddo-interesttpl'
});