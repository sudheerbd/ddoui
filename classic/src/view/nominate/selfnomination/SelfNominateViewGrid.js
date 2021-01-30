/**
 *   This file is responsible for Self Nominate Grid View.
 *   parent : DDO.view.profile.nominateview.SelfNominationPage is the parent file.
 *   ViewModel :  DDO.view.profile.nominateview.SelfNominateViewFormModel
 *   ViewController : DDO.view.karmascore.nominate.SelfNominateWindowController
 */
Ext.define('DDO.view.nominate.selfnomination.SelfNominateViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'selfnominateviewgrid',
    cls: "ddo-rating-grid",
    trackMouseOver: false,
    // height: Constants.ViewportHeight * 0.31,
    height: 138,
    columns: [{
            text: LabelsTitles.NOMINATION.COLUMNCATEGORYNAME,
            flex: 0.17,
            dataIndex: 'categoryName',
            cls: "removeLine"
        }, {
            text: LabelsTitles.NOMINATION.COLUMNKARMANAME,
            flex: 0.19,
            dataIndex: 'karmaname',
            cls: "removeLine"
        },
        {
            text: LabelsTitles.NOMINATION.COLUMNFREQUENCY,
            dataIndex: 'frequencyName',
            hidden: true,
            cls: "removeLine"
        },
        {
            text: LabelsTitles.NOMINATION.COLUMNKARMAPOINTS,
            dataIndex: 'hours',
            flex: 0.15,
            cls: "removeLine hours"

        },{
            text: 'Derived Karma Points',
            dataIndex: 'derivedKarmaPoints',
            flex: 0.15,
            editable: false,
            cls: "removeLine hours"
        } ,{
            text: LabelsTitles.NOMINATION.COLUMNMONTH,
            dataIndex: 'karmaGivenDate',
            flex: 0.15,
            cls: "removeLine hours"
        },
        {
            text: LabelsTitles.NOMINATION.COLUMNCOMMENT,
            dataIndex: 'description',
            flex: 0.22,
            cls: "removeLine hours",
            renderer: function (value, metaData) {
                if (value) {
                    metaData.tdCls = "self-nominate-comment-cls";
                    metaData.tdAttr = Ext.String.format('data-qtip="{0}"', value);
                }
                return value;
            }
        },
        {
            xtype: 'actioncolumn',
            text: LabelsTitles.NOMINATION.COLUMNACTION,
            flex: 0.11,
            bind: {
                hidden: '{action}'
            },
            cls: "removeLine",
            items: [{
                iconCls: 'delete-plus',
                tooltip: 'Delete',
                handler: "deleteGridRow"

            }]
        }
    ]
});