Ext.define('DDO.view.profile.details.ProfileSkillsAdded', {
    extend: 'Ext.dataview.DataView',

    alias: 'widget.profileskillsadded',

    reference: 'profileskillsadded',

    emptyText: '<div class="ddo-emptytext">No Skills Added</div>',

    scrollable: false,

    requires: [
        'DDO.store.skillslist.ProfileSkillsComboStore',
        'DDO.store.skillslist.ProfileSkillsStore'
    ],
    /**
    binding view model store skillsstore to store name and values of skils
    */
    bind: {
        store: '{profileskillsstore}'
    },
    initialize: function() {
        this.callParent(arguments);

        Ext.getStore('profileskillscombo').load();

        this.getItemTpl().skillsComboStore = Ext.getStore('profileskillscombo');
    },

    /** Creates a template from the passed element's value
    @param: {string} : contains entered rating values
    It check skills values and displays score 
    */
    itemTpl: [
        '<tpl>',
        '<div class="skillsView-cls"',
        '<tpl if="xindex === 0"> skill-first-data-cls</tpl>',
        '>',
        '<span class = "skillName-cls">{[this.getSkillName(values)]}</span>',
        '<span class="rating-cls">{[this.getStars(values)]}</span><br/>',
        '</div>',
        '</tpl>', {
            getSkillName: function(values) {
                var comboStore = this.skillsComboStore,
                    dataArray,
                    rec;

                if (comboStore.totalCount === comboStore.data.length) {
                    rec = comboStore.findRecord('skill_id', values.hr_skilltype_id);
                    if (!Ext.isEmpty(rec)) {
                        return rec.data.skill_name;
                    }
                } else {
                    if (comboStore.data.getSource()) {
                        dataArray = comboStore.data.getSource().items;
                        for (var i = 0, len = dataArray.length; i < len; i++) {
                            if (dataArray[i].data.skill_id === values.hr_skilltype_id) {
                                return dataArray[i].data.skill_name;
                            }
                        }
                    }
                }
            },
            getStars: function(values) {
                var html = [],
                    i = 1,
                    rating = parseFloat(values.rating),
                    tpl = "";

                for (var len = Math.floor(rating); i < 6; i = i + 1) {
                    if (i <= len) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Rated.png' class='starimage-cls'>"));
                    } else if (rating % 1 !== 0 && i === (len + 1)) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/halfRated.png' class='starimage-cls'>"));
                    } else {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Unrated.png' class='starimage-cls'>"));
                    }
                }
                return (html.join(" "));
            }
        }
    ],
    itemSelector: 'div.skillsView-cls',
    listeners: {
        painted: 'onSkillsViewRendered'
    }
});