Ext.define('DDO.view.vendoraccessapp.FindApplicationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.findapplicationviewmodel',

    stores:{
        findappgridstore:{
        autoLoad: true,
             fields:['name','email','mobile'],
         data:[
             { name: '--', email: '--', mobile: '--' }        	    
         ]
       }
      
     }
})