/**
 * The file KarmaList is the view file for grid view in the karma rule and karma category.
 * common used file.
 * @extends {Ext.grid.Panel}.
 * @alias widget.karmalist.
 * ViewModel : 'DDO.view.karmasetup.KarmaRuleViewModel',
 * ViewController : 'DDO.view.karmasetup.KarmaRuleViewController'.
 */
Ext.define('DDO.view.karmasetup.grid.KarmaList', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.karmalist',

    cls: 'karmalist-cls',

    plugins: 'gridfilters',

    viewConfig: {
        loadMask: false
    },

    height: Constants.ViewportHeight*0.78,
    width: '100%',

    columns: [{
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.NAME,
        dataIndex: 'name',
        flex: 0.3,
        height: 42,
        filter: {
            type: 'string',
            itemDefaults: {
                emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.SEARCH
            }
        }
    }, {
        text:LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.DESCRIPTION ,
        dataIndex: 'description', 
        flex: 0.5
    },{
        xtype: 'checkcolumn',
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.SELFNOMINATE,
        flex: 0.2,
        bind:{
            hidden: '{gridCheckBox}'
        },
        dataIndex: 'self_nominate',
        disabled: true
    },{
        text:LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARULE.RULETYPE,
        flex: 0.2,
        bind:{
            hidden: '{ruletypeHidden}'
        },
        dataIndex: 'ruletype',
        cls : 'karmaruletypecolumn'
    }],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});
