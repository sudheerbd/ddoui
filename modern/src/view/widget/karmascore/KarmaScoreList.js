/**
 * This view is an example list of people.
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreList', {
    extend: 'Ext.dataview.DataView',

    alias: 'widget.karmascorelist',

    reference: 'karmascorelist',

    requires: [
        'DDO.view.widget.karmascore.KarmaScoreViewController',
        'DDO.view.widget.karmascore.KarmaScoreViewModel'
    ],

    controller: 'karmascoreview',

    viewModel: {
        type: 'karmascoreview'
    },

    bind: {
        store: '{scoredetails}'
    },

    cls: 'DDO-main-container',

    width: '100%',

    itemTpl: [
        '<div class="DDO-scoreViewData-cls DDO-noscrollbar">',
        '<tpl for=".">',
        '<div style="margin: 10px;" class="DDO-scoreView-cls">',
        '<img class="DDO-profileImage-cls" src="{[this.getProfileImg(values)]}"/>',
        '<span class="DDO-scorerName-cls">{employee}</span>',
        '<span class="DDO-score-cls">{[this.getKarmaPoints(values)]}</span><br />',
        '<span class="DDO-profession-cls">{[this.getHrDesignation(values)]}</span>',
        '</div>',
        '</tpl>',
        '</div>', {
            getKarmaPoints: function(values) {
                var karma = parseFloat(values.karmapoints);
                if (karma >= 1000) {
                    karma = karma / 1000;
                    karma = karma + 'K';
                }
                return karma;
            },
            getHrDesignation: function(values) {
                var designation = values.hr_designation;
                if (designation.length >= 20) {
                    designation = values.hr_designation.substr(0, 20) + '...';
                }
                return designation;
            },
            getProfileImg: function(values) {
                return values.user_profile_pic_url || Utility.gravatarImageUrl(values.email);
            }
        }
    ],

    listeners: {
        itemtap: 'onKarmaItemTap'
    }
});