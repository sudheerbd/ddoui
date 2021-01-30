Ext.define('DDO.view.profile.nominateview.SelfNominateViewFormController', {
    extend: 'Ext.app.ViewController',
    alias:'controller.selfnominateviewformcontroller',


    initViewModel: function(){

    	var x= Ext.getStore('login');
    	var y=x.data.items[0].data.fullname;
    	this.getViewModel().data.loggedInUserFullName= y;        
    },
    
    onSelect: function(btn, e, eOpts) {
    var btnText= btn.text,
    karmaComboStore = Ext.getStore('karmasetup.KarmaSelfNominateStore');
    console.log(karmaComboStore);
    // nomView= btn.up('selfnominateviewform'),
    // nomViewModel = nomView.getViewModel();

    


   

}

});