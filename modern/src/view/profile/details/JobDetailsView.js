Ext.define('DDO.view.profile.details.JobDetailsView', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.jobdetailsview',

    cls: 'jobdetailsview-cls',

    scrollable: false,

    bind: {
        selection: '{jobdetails}'
    },

    itemTpl: ['<tpl for="."><div class="employee">',
        '<div class="line"></div>',
        '<tpl if="this.getValidation(values)">',
        '<div class="ddo-title-wrap"><h3 class="designation">{designation_when_left}<img class="ddo-edit-img"  src="resources/images/edit.png" ></h3>',
        '</tpl>',
        '</div>',
        '<p>{company}</p>',
        '<p>{convertdate}</p>',
        '<p>{cityname}</p>',
        '<p>{remark}</p>',
        '</div>',
        '<div class="form"></div></tpl>', {
            getValidation: function(values) {
                var view = Ext.ComponentQuery.query('experienceview')[0],
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

    itemSelector: 'img',

    emptyText: '<div class="ddo-emptytext">No Jobs Added</div>',

    listeners: {
        itemtap: 'onEditBtnClick',
        painted: 'onJobsViewRendered'
    }
});