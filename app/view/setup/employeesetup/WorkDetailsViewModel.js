/**
 * The file WorkDetails is the viewModel file of the work details form.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.workdetailsviewmodel'.
 */
Ext.define('DDO.view.setup.employeesetup.WorkDetailsViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.workdetailsviewmodel',

    stores: {
        reportingstore: {
            type: 'reportingstore',
            autoLoad: false
        },
        statusstore:{
        	type:'statusstore',
        	autoLoad:false
        },
        jobTypeStore:{
            fields:['name','typeId'],
            proxy:{
                type:'ajax',
                url:'/resources/data/employeesetup/WorkDetailsJobType.json',
                reader:{
                    type:'json',
                    rootProperty:'data'
                }
            },
            autoLoad:true
        }
    },
    data:{
        workdetailssavebutton:true,
        isDateSelected:false,
        notice:true,
        separated:true,
        confirm:true,
        valueResetted:false
    }
 
});
