Ext.define('DDO.view.ddocharts.DDOChartsViewController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.ddochartsviewcontroller',
	 //requires: ["DDO.util.Socket"],
   


    init: function() {
        var me = this;
        // Socket.on({
            // newfeed: me.onNewFeedNotification,
            // nominationcallback:me.onNewNominationNotification,
            // scope: me
        // });
    },
      onNewFeedNotification: function(post) {
      	  Ext.getStore('ddocharts.FeedsPieStore').load();

      	  var i=this.getView(),
      	      chartView =i.down('feedspiechart'),      	  
			  polar =chartView.down('polar');

			polar.getStore().reload();

      },
      onNewNominationNotification:function(){
      	  Ext.getStore('ddocharts.KarmaPieStore').load();

      	  var i=this.getView(),
      	      chartView =i.down('karmapiechart'),     	  
			  panel=chartView.down('panel'),
			  dataview =panel.down('dataview');

			dataview.getStore().reload();
      },

	onBarItemClick:function(chart, item, event){
		this.redirectTo("karmascore");
		var mainView = Ext.ComponentQuery.query('mainviewport')[0],

		    view = Ext.ComponentQuery.query('karmascoreview')[0],
			vm = this.getViewModel();
		

			dateValue = item.record.data.month;

			var myMonth=dateValue; 
			var	myMonth = "1 "+myMonth,
				 date = new Date(myMonth),	

				checkDate = new Date(myMonth),
				d1 = new Date(checkDate.getFullYear(), checkDate.getMonth() + 1, 0),
				
				
				fromdate=Ext.Date.format(date, 'd-m-Y'),

			    enddate =Ext.Date.format(d1, 'd-m-Y'),

				searchdate=fromdate+"-"+enddate;



		mainView.getViewModel().set('showkarmascorefilters', false);
		 
		mainView.getViewModel().set('dateObj',searchdate);

	},

	onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('post_type') + ': ' + record.get('count'));
    },
    onKarmaBarTooltipRender:function (tooltip, record, item) {
        tooltip.setHtml(record.get('month') + ': ' + record.get('count'));
    },
    onKarmaPieTooltipRender:function (tooltip, record, item) {
        tooltip.setHtml(record.get('name') + ': ' + record.get('count'));
    }
});