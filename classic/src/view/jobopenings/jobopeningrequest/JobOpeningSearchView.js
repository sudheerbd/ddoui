Ext.define('DDO.view.jobopenings.jobopeningrequest.JobOpeningSearchView', {
    extend: 'Ext.container.Container',
    xtype:'jobopeningsearchview',

    items:[{
        xtype: 'button',
        width: 6,
        cls: 'karmascore-search-icon-field',
        height: 6
    }, {
        xtype: 'textfield',
        name: 'employee',
        margin:'10 10 10 0',       
        cls: 'karmascore-search-field',
        width: '15%',
        reference: 'searchbynameref',
        enableKeyEvents: true        
    }]

});