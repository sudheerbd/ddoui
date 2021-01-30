Ext.define('DDO.view.vendoraccessapp.FindApplicationController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.findapplicationcontroller',


  onAppSearch: function (btn, e, eopts) {
    var view = this.getView(),
      form = view.down('form').getForm(),
      values = form.getValues();
    var params = {
      mobile: values.mobile
    };
    var url = "/jobapplication/getAppDetailsByMobileNo";
    var method = 'GET';
    Ext.Ajax.request({
      url: url,
      method: method,
      scope: this,
      params: params,
      success: function (response, options) {
        var resp = Ext.decode(response.responseText);
        var data = {
          name: resp.data[0].lastname + " " + resp.data[0].firstname,
          email: resp.data[0].emailid
        }
        var store =this.getStore('findappgridstore');
        var data={
            name:resp.data[0].lastname +" "+ resp.data[0].firstname,
            email:resp.data[0].emailid,
            mobile:resp.data[0].mobile
        }
        store.removeAll();
        store.add(data);
       // Ext.ComponentQuery.query('[reference = displayEnquiryName]')[0].show().setValue(resp.data[0].lastname + "&nbsp" + resp.data[0].firstname);
       // Ext.ComponentQuery.query('[reference = displayEnquiryEmail]')[0].show().setValue(resp.data[0].emailid);
       // Ext.ComponentQuery.query('[reference = displayEnquiryMobileNo]')[0].show().setValue(resp.data[0].mobile);
        Ext.ComponentQuery.query('[reference = enquiryDetailsNotfound]')[0].hide();
        Ext.ComponentQuery.query('[reference = enquiryDetailsResults]')[0].show();
       // Ext.ComponentQuery.query('[reference = jobtitleref]')[0].setValue("");
        //form.reset();
      },
      failure: function (response, options) {
        Ext.ComponentQuery.query('[reference = enquiryDetailsNotfound]')[0].show();
        Ext.ComponentQuery.query('[reference = enquiryDetailsResults]')[0].hide();
        Ext.ComponentQuery.query('[reference = displayEnquiryName]')[0].hide();
        Ext.ComponentQuery.query('[reference = displayEnquiryEmail]')[0].hide();
        Ext.ComponentQuery.query('[reference = displayEnquiryMobileNo]')[0].hide();

        var store =this.getStore('findappgridstore');
                var data = { name: '--', email: '--',mobile: '--' };
                store.removeAll();
                store.add(data);

       // form.reset();
      }
    });
  }
});