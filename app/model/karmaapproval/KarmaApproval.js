Ext.define('DDO.model.karmaapproval.KarmaApproval', {
    extend: 'Ext.data.Model',
    alias: 'model.karmaapproval',
    fields: ['from', 'to', 'comments',   {
        name:'submiteddate',
    convert:function(value){
        value = Ext.Date.format(new Date(value), 'Y-m-d') ;
          return value;
    }
}]
});