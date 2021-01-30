Ext.define('DDO.model.karmasetup.KarmaCategoriesModel', {
    extend: 'Ext.data.Model',
    alias: 'model.karmacategoriesmodel',
    idProperty:'ddo_karmacategory_id',
    fields: ['name','description','ddo_karmacategory_id','self_nominate']
});