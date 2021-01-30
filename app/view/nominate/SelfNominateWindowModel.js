/**
 * The file SelfNominateWindowModel is the ViewModel of the 'DDO.view.nominate.SelfNominateWindow' And 'DDO.view.profile.nominateview.NominateViewForm'.
 */

Ext.define('DDO.view.nominate.SelfNominateWindowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.selfnominatewindowmodel',
    requires: ['DDO.model.profile.SentBackNominationModel',
        'DDO.model.profile.SelfNominateGridModel',
        'DDO.model.profile.SelfNominationFrequencyComboModel'
    ],
    data: {
        categoryName: null,
        category: null,
        karmascore: 5,
        ratingView: false,
        ruleView: true,
        minChars: 20,
        karmaId: null,
        ratingId: null,
        ruleId: null,
        points: 0,
        areaTxt: true,
        categoryComboValue: null,
        isFreqComboDisabled: false,
        karmaComboValue: null,
        iconSelection: null,
        karmaUnits: null,
        nomSubBtn: true,
        nomBtn: false,
        projectId: null,
        profileEmpId: null,
        profileNominationType: true,
        tagId: null,
        karmaComboSelectedText: null,
        scoreText: "For Each Member",
        selfNomSubBtn: true,
        addButton: true,
        sentBackNomCount: 0,
        action: false,
        selfNomSubBtnHide: false
    },
    stores: {
        SelfNominationFrequencyComboStore: {
            model: 'DDO.model.profile.SelfNominationFrequencyComboModel',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/profile/SelfNominationFrequencyCombo.json',
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
        },
        SelfNominateGridStore: {
            model: 'DDO.model.profile.SelfNominateGridModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        },
        sentBackNominationsStore: {
            model: 'DDO.model.profile.SentBackNominationModel',
            proxy: {
                type: 'ajax',
                url: Api.URL.karmaapproval.SENDBACK,
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            },
            autoLoad: false
        }
    }
});