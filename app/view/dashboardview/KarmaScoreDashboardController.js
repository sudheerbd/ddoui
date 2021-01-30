/**
 * This is controller file for 'DDO.view.dashboardview.KarmaScoreDashboardController'
 * @extends 'Ext.app.ViewController'
 * @alias 'viewmodel.karmascoredashboardcontroller'
 */
Ext.define('DDO.view.dashboardview.KarmaScoreDashboardController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.karmascoredashboardcontroller',

  OnIconActionClick: function (btn, rowindex, tr, rowIndex) {
          var nominateData = btn.getStore().getAt(rowindex),
          win = Ext.ComponentQuery.query('selfnominatewindow')[0],
          form = win.down('selfnominateviewform');
          win.show();
          btn.getStore().removeAt(rowindex);
          viewModel = win.getViewModel(),
          data = nominateData.data,
          month = data.nominate_month || data.karmaGivenDate;
            monthYear = month.split('-').reverse().join('-');
            monthYear = new Date(monthYear);
            viewModel.set('ddo_nomination_id', data.ddo_nomination_id);
            this.setFormValues(form, data, monthYear);
    },

    setFormValues: function (form, data, monthYear) {
      var categories = form.down('[name = categories]'),
          karmaGivenDate = form.down('[name = karmaGivenDate]'),
          karmacombo = form.down('[name = karmacombo]'),
          karmaunits = form.down('[name = karmaunits]'),
          htmlEditor = form.down('textarea'),
          karmaComboStore = karmacombo.getStore();
             karmaCateegoryStore = categories.getStore();
             karmaCateegoryStore.load({
          scope: this,
          callback: function () {
              categories.setValue(data.ddo_karmacategory_id);
              karmaGivenDate.setValue(monthYear);
          }
      });
        karmaComboStore.load({
          callback: function(){
            karmacombo.setValue(data.karma_id);
            // freqcombo.setValue(data.frequency);
            karmaunits.setRawValue(data.alteredpoints);
            htmlEditor.setValue(data.comments);
          }
        })
  },

  storeDashboardGridPending: function(tabpanel, newcard, oldcard) {

    var vm = this.getViewModel();
    if (newcard.id = "accept") {
      var acceptstore = vm.getStore('karmaDashboardaccepted');
      acceptstore.load();
    } else if (newcard.id = "pending") {
      var acceptstore = vm.getStore('karmaDashboardpending');
      acceptstore.load();
    } else if (newcard.id = "reject") {
      var acceptstore = vm.getStore('karmaDashboardreject');
      acceptstore.load();
    }
  },
  onBeforePendingRenderer: function() {
    // debugger;
    var vm = this.getViewModel();
    var store = vm.getStore('karmaDashboardpending');
    store.load();
  },
  onBeforeRejectRenderer: function() {
    // debugger;
    var vm = this.getViewModel();
    var store = vm.getStore('karmaDashboardreject');
    store.load();
  },
  onBeforeAcceptRenderer: function() {
    // debugger;
    var vm = this.getViewModel();
    var store = vm.getStore('karmaDashboardaccepted');
    store.load();
  },
  onRejectAcceptClick: function(grid, rowindex){
    var store = grid.getStore();
    var rec = store.getAt(rowindex);
    var params ={
      nominationId: rec.get('ddo_nomination_id'),
      points: rec.data.alteredpoints,
      acceptTheAlteredPoints: 'true'
    };
    var me = this;
    Ext.Ajax.request({
      url: Api.URL.karmaapproval.ACCEPT,
      method: 'POST',
      scope: me,
      params: params,
      success: function (response) {
        var data = Ext.decode(response.responseText);
        if(success){
          var vm = this.getViewModel()
          var rejectStore = vm.getStore('karmaDashboardreject');
          var acceptStore = vm.getStore('karmaDashboardaccepted');
          rejectStore.reload();
          acceptStore.reload();
        } else {
          Utility.showToast("Something happend on Accepting the karma", data.message);
        }
      },
      failure: function (data) {
        Utility.showToast("Something happend on Accepting the karma", data.message);
      }
    });
  },
   onRefreshBtntClick: function(){
    var me = this;
    var tabpanel = me.getView().getReferences().karmaDashboardRef.getActiveTab();
    tabpanel.getStore().reload();
  },
  onChangeFinancialYear: function(comboBox, newValue, oldVlaue, opts){
    var me = this;
    var vm = me.getViewModel();
    vm.set('isYearSelected', true);
    // debugger;
    var selected = comboBox.getSelectedRecord().data;
    var startDate = selected.startdate;
    var endDate = selected.enddate;

    startDate =  (new Date(startDate).getMonth()+1) + '-' + new Date(startDate).getFullYear();
    endDate = (new Date(endDate).getMonth()+1) + '-' + new Date(endDate).getFullYear();
    vm.set('startDate', startDate);
    vm.set('endDate', endDate);
    var tabpanel = me.getView().getReferences().karmaDashboardRef.getActiveTab();
    var store = tabpanel.getStore();
    var extraParams = store.getProxy().getExtraParams();
    extraParams.isYearSelected = vm.get('isYearSelected');
    extraParams.startDate = vm.get('startDate');
    extraParams.endDate = vm.get('endDate');
    store.getProxy().setExtraParams(extraParams);
    tabpanel.getStore().reload();

  },
  onTabChange: function(tabPanel, newCard, oldCard,opts){
    var me = this;
    var vm = me.getViewModel();
    vm.set('isYearSelected', false);
    vm.set('startDate', null);
    vm.set('endDate', null);
    me.getView().up().getReferences().financilaYearRef.setValue('')
  }
});