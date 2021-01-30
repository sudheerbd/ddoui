Ext.define('DDO.model.karmasetup.KarmaDepartmentModel', {
    extend: 'Ext.data.Model',
    alias: 'model.karmadepartmentmodel',
    idProperty:'ddo_karmadepartment_id',
    fields: ['name','depheadid','headofdeptname','description','ddo_department_id','deptId']
});