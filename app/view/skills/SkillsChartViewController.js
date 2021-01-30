Ext.define('DDO.view.skills.SkillsChartViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.skillschartviewcontroller',

    /** 
     * Based on all users information column chart loads.
     * @param {Ext.data.Store} store The store.
     * @param {Ext.data.Model[]} records An array of records.
     * Checks if the response status was successful
     */

    onLoadingColumnChart: function(store, records, successful, operation, eOpts) {
        var groupedItemsCount = [],
            groupedItemsSkills = [],
            groupedItemsList = store.data.getGroups().items,
            groupItemsLength = groupedItemsList.length,
            skillTotalCount,
            skillName;
        for (var i = 0; i < groupItemsLength; i++) {
            skillTotalCount = groupedItemsList[i].items.length;
            var emp = [];
            for (var j = 0; j < skillTotalCount; j++) {
                skillName = groupedItemsList[i].items[j].data.skills;
                var empname = groupedItemsList[i].items[j].data.employee;
                emp.push(empname);
                emp.sort();
                groupedItemsSkills.push(skillName);
            };
            groupedItemsCount.push({
                skillTotalCount: skillTotalCount,
                skillName: skillName,
                empName: emp
            });
        };
        store.setData(groupedItemsCount);
    },

    /** 
      * This function provide list of skills and count.
      * @param {object}  ToolTip is a {@link Ext.tip.Tip} implementation that handles the common 
      * case of displaying a tooltip when hovering over a certain element or elements on the page.
      * @param {Ext.data.Model[]} records An array of records.
    */
    onSkillsTooltipRender: function(tooltip, rec) {
        tooltip.setData({
            skillName: rec.data.skillName,
            skillTotalCount: rec.data.skillTotalCount,
            empName: rec.data.empName
        });
    }

});
