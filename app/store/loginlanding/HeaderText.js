Ext.define('DDO.store.loginlanding.HeaderText',{
	extend:'Ext.data.Store',
	alias: 'store.headertext',
	autoLoad:false,
	storeId:'headertextstore',
	fields: ['heading','details','src','color'],
   	 data:[
	    {
		'header':'Unleash Your creativity',
		'details':'Share your thoughts and idea',
		'src':'resources/images/Unleash.png',
		'color':'#E94435'
	    },
	    {
		'header':'To Do',
		'details':'Never miss a task or deadline',
		'src':'resources/images/Todo.png',
		'color':'#F8BB15'
	    },
	    {
		'header':'Karma Score',
		'details':'Stay on the top of charts',
        //'iconCls':'karma-score-cls',
		'src':'resources/images/Karmascore.png',
		'color':'#34A751'
	    }]
});
