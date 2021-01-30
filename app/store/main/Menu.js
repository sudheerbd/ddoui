Ext.define('DDO.store.main.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.menuStore',
    storeId: 'menuStore',
    fields: [
        'title'
    ],
    data: {
        items: [
            {title: 'Logout', iconcls: 'x-fa fa-sign-out'}
            //{title: 'Availability sheet', iconcls: 'x-fa fa-bar-chart-o'}
            // {title: 'Finance', iconcls: 'x-fa fa-home'},
            // {title: 'Projects', iconcls: 'x-fa fa-cog'},
            // {title: 'Sales', iconcls: 'x-fa fa-tags'},
            // {title: 'HR', iconcls: 'x-fa fa-user'},
            // {title: 'Recruitment', iconcls: 'x-fa fa-search'},
            // {title: 'Performance Summary', iconcls: 'x-fa fa-bar-chart'},
            // {title: 'Business Workflow', iconcls: 'x-fa fa-paperclip'},
            // {title: 'Security & Settings', iconcls: 'x-fa fa-lock'},
            // {title: 'Finance', iconcls: 'x-fa fa-home'},
            // {title: 'Projects', iconcls: 'x-fa fa-cog'},
            // {title: 'Sales', iconcls: 'x-fa fa-tags'},
            // {title: 'HR', iconcls: 'x-fa fa-user'},
            // {title: 'Recruitment', iconcls: 'x-fa fa-search'},
            // {title: 'Performance Summary', iconcls: 'x-fa fa-bar-chart'},
            // {title: 'Business Workflow', iconcls: 'x-fa fa-paperclip'},
            // {title: 'Security & Settings', iconcls: 'x-fa fa-lock'},
            // {title: 'Finance', iconcls: 'x-fa fa-home'},
            // {title: 'Projects', iconcls: 'x-fa fa-cog'},
            // {title: 'Sales', iconcls: 'x-fa fa-tags'},
            // {title: 'HR', iconcls: 'x-fa fa-user'},
            // {title: 'Recruitment', iconcls: 'x-fa fa-search'},
            // {title: 'Performance Summary', iconcls: 'x-fa fa-bar-chart'},
            // {title: 'Business Workflow', iconcls: 'x-fa fa-paperclip'},
            // {title: 'Security & Settings', iconcls: 'x-fa fa-lock'}
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
