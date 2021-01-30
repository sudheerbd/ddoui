Ext.define('DDO.view.profile.nominateview.NominateViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.nominateviewcontroller'//,

    // onRatingParamsClick: function(view, record, item, index, e, eOpts) {
    //     var viewModel = this.getViewModel(),
    //         ratingStore = Ext.getStore('profile.NominateNames'),
    //         profileName = viewModel.get('name'),
    //         profileDesignation = viewModel.get('designation'),
    //         ratingWindow = Ext.ComponentQuery.query('nominatewindow')[0],

    //         karmapointsColor = '#fab82e',
    //         rewardpointsColor = '#000',
    //         kamrmaPoints = parseInt(Utility.userAboutData.karmapoints) || 0,
    //         rewardPoints = parseInt(Utility.userAboutData.rewardpoints) || 0,
    //         ratingFormVM, ratingWindowModel, ratingForm, ratingRedeemImg, multiProgressBar;
    //     // Check if a Rating window already exists        
    //     ratingWindow = ratingWindow || Ext.widget({
    //         xtype: 'nominatewindow'
    //     });

    //     ratingWindowModel = ratingWindow.getViewModel();
    //     // by default, sending rating type as 'N' to API

    //     ratingStore.getProxy().extraParams = {
    //         'ratingType': 'N',
    //         'ratingId': record.data.ratingId
    //     };
    //     Utility.ratingId = record.data.ratingId;

    //     ratingForm = ratingWindow.down('ratingviewform');
    //     ratingForm.reset();
        
    //     ratingFormVM = ratingForm.getViewModel();

    //     // temporarily setting values
    //     ratingFormVM.set('karmapointsColor', karmapointsColor);
    //     ratingFormVM.set('rewardpointsColor', rewardpointsColor);

    //     ratingForm.setRatingId(record.data.ratingId);

    //     ratingWindowModel.set('profileName', Ext.String.trim(profileName));

    //     ratingRedeemImg = ratingForm.lookupReference('nominateProgressContainer');

    //     // setting the values for progress bar
    //     multiProgressBar = ratingWindow.down('multicircularprogressbar');
    //     multiProgressBar.setCenterIcon(record.data.imgurlover);
    //     multiProgressBar.setValue([kamrmaPoints, rewardPoints]);

    //     ratingStore.load({
    //         scope: this,
    //         callback: function(records, operation, success) {
    //             ratingWindow.show();
    //             var activityBtn = ratingForm.down('button[name=activity]'),
    //                     feedBackbtn = ratingForm.down('button[name=feedback]');
    //             if (record.data.value < 0) {
    //                 activityBtn.setHidden(true);
    //                 ratingForm.getController().onTypeButtonClick(feedBackbtn);
    //             } else {
    //                 activityBtn.setHidden(false);
    //             }
                
    //         }
    //     });
    // }
});