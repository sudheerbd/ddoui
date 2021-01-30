/**
 * This view is responsible for show list of all goals record in goals view.
 * @class 'Goals.view.goals.GoalsView'
 * @extends 'Ext.view.View'
 * @alias 'widget.goalsview'
 * @ViewModel 'Goals.view.goals.GoalMainViewModel'
 * @Controller 'Goals.view.goals.GoalsController'
 */
Ext.define('Goals.view.goals.GoalsView', {
  extend: 'Ext.view.View',

  alias: 'widget.goalsview',

  requires: [
    'Goals.view.goals.GoalsController'
  ],

  cls: 'goals-dashboard-view-cls noscrollbar',

  scrollable: 'y',

  initComponent: function() {
    Ext.getStore('Goals.store.goals.GoalsViewStore').load();
    Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
    var goalsettingstore = Ext.getStore('settings.GoalSettings');

    if(!goalsettingstore.isLoaded()){
      goalsettingstore.load();
    }
    
    this.callParent(arguments);
  },

  loadMask: false,

  controller: 'goalscontroller',

  store: 'Goals.store.goals.GoalsViewStore',

  tpl: [
    '<tpl if="this.getGoals(values)">',
    '<div class="create-goal-cls" id="{[this.setId(values)]}">',
    '<div class="create-goal-plus-icon"><span class="plus-icon"></span></div>',
    '<div class="create-goal-text">Create Goal</div>',
    '</div>',
    '<tpl else>',

    '<tpl for=".">',
    '<span class="goals-dashboard-main-cls">',
    '<tpl if="xindex === 1">',
    '<div class="create-goal-cls">',
    '<div class="create-goal-plus-icon"><span class="plus-icon"></span></div>',
    '<div class="create-goal-text">Create Goal</div>',
    '</div>',
    '</tpl>',
    '<div class="goals-dashboard-cls">',
    '<div class="goals-header-cls">',
    '<div class="goals-dash-img-cls">',
    '<img class="goals-dash-user-icon" src={[this.getUserPic(values)]} onerror='+Utility.defaultUserImg+'>',
    '</div>',
    '<div class="goals-user-name">',
    '<span>{goalUser.name}</span>',
    '</div>',
    '<div class="goals-target-date-cls">',
    '<span>Target Date:</span>',
    '<br/>',
    '<span>{[this.getTargetDateFormat(values)]}</span>',
    '</div>',
    '</div>',
    '<div class="goals-title-cls">',
    '<span>{title}</span>',
    '</div>',
    '<div class="goal-status-cls">',
    '<span><img class="goals-status-icon" src="{[this.getStatusIcon(values)]}" width="80px" height="80px"></span>',
    '<br />',
    '<span class="goal-status-text">{goalstatus}</span>',
    '</div>',
    '<tpl if="this.getStatusName(values)">',
    '<div class="goals-progress-cls">',
    '<meter class="goals-progress-meter-cls" value={[this.getStatusPerIcon(values)]} min=0 max=100></meter>',
    '<span class="goals-progress-meter-value">{[this.getStatusPerIcon(values)]}%</span>',
    '</div>',
    '</tpl>',
    '<div class="goals-karmascore-cls">',
    '<tpl if="this.getKarma(values)">',
    '<span class="karma-score-icon"></span>',
    '<span class="goals-kamra-score">{karmapoints}</span>',
    '</tpl>',
    '</div>',
    '</div>',
    '</div>',
    //'</tpl>',
    '</div>',
    '</span>',
    '</tpl>',
    '</tpl>', {
      setId: function(values) {
        var itemId;

        itemId = 'input_goals_id';

        Ext.Function.defer(this.addListener, 2, this, [itemId, values]);

        return itemId;
      },
      addListener: function(id, values) {
        if (!Ext.isEmpty(Ext.get(id)) && !Ext.get(id).hasListener('blur')) {
          Ext.get(id).on('click', function(e, opt) {
            var c = Ext.ComponentQuery.query('goalsview')[0];
            c.getController().onGoalWindowView();

          }, this);
        }
      },
      getTargetDateFormat: function(values) {
        var dt = values.targetdate,
          dtFormat = Ext.Date.format(new Date(dt), 'm-d-Y');
        return dtFormat;
      },
      getStatusIcon: function(values) {
        if (values.goalstatus == "In Progress") {
          return "resources/images/goals/inprogress.png";

        } else if (values.goalstatus == "Draft") {
          return "resources/images/goals/drafted.png";

        } else if (values.goalstatus == "Completed") {
          return "resources/images/goals/complete.jpg";

        } else if (values.goalstatus == "Pending") {
          return "resources/images/goals/pending.jpg";

        } else if (values.goalstatus == "Cancel") {
          return "resources/images/goals/close_green.png";

        } else {
          return "resources/images/goals/amazing.png";
        }
      },
      getStatusPerIcon: function(values) {
        var percentage = values.percentage;
        return percentage;
      },
      getStatusName: function(values) {
        var statusName = values.goalstatus;
        if (statusName == "In Progress") {
          return true;
        }
      },
      getGoals: function(values) {
        return Ext.isEmpty(values);
      },
      getUserPic: function(values) {
        var pics = values.goalUser.userProfilePic;
        if (!Ext.isEmpty(pics)) {
          return  Utility.imageCheck(pics);
        }
      },
      getKarma: function(values) {
        var points = values.karmapoints,
          status = values.goalstatus;
        if (points != null && status == 'Achieved') {
          return true;
        }
      }
    }
  ],

  itemSelector: '.goals-dashboard-main-cls',

  listeners: {
    itemclick: 'onGoalClick'
  }
});