Ext.define('DDO.model.projects.people.AllocationEmployee', {
    extend: 'Ext.data.Model',

    alias: 'model.allocationemployee',

    fields: ['ad_client_id', 'ad_org_id', 'employee_code', 'c_bpartner_id', 'hr_designation_id', 'hr_designation', 'employee', 'user_profile_pic_url', 'email', 'allocpercent']
});