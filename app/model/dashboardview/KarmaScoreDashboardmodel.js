Ext.define('DDO.model.dashboardview.KarmaScoreDashboardmodel', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'karmacategory_name',
    },
    {
      name: 'karma_name',
    },
    {
      name: 'nominate_month',
    },
    {
      name: 'date'
    },
    {
      name:'hr_approved'
    },{
      name:'finance_approved'
    },
    {
      name: 'actual_karma'
    }, {
      name: 'actual_per_month'
    },
    {
      name: 'reject_message'
    },
    {
      name: 'expected_per_month'
    },{
      name: 'alteredpoints'
    }
  ]
});