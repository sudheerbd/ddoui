Ext.define('DDO.view.profile.provitiontocnfm.ProbationToCnfmFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.probationtocnfmform',
    
    onSubmitProbationToCnfmForm:function(){
        var me = this,
        window = me.getView(),
         probationForm = window.down('form'),
         formValues= probationForm.getValues(),
         gridStore = window.parentReferenceView.getStore(),
         index=window.clickedRowIndex,
         rowData = gridStore.getAt(index),
         id = rowData.getData().probationtocnfm_id;
          
          if(probationForm.isValid()){
            window.mask('Saving');

         params = {
            hrDiscussion : formValues.hr_discussion,
            objectivesAchieved : formValues.objectives_acheived,
            objectivesToBeAchieved : formValues.objectives_to_be_acheived,
            performance : formValues.performance_summary,
            skillGap : formValues.skillgap,
            suggestions : formValues.suggestions,
            projectName : formValues.projectname,
            status : formValues.status,
            email:window.mailID,
            id : id
          },
         Ext.Ajax.request({
            url: Api.URL.probationtocnfm.UPDATE,
            method: 'PUT',
            scope: me,
            params: params,
            success: function (response) {
              var data = Ext.decode(response.responseText);
                window.unmask();
                probationForm.reset();
                gridStore.reload();
                window.close();
                Ext.Msg.alert('success', 'Successfully updated');
            },
            failure: function (data) {
              window.unmask();
              Ext.Msg.alert('Failure', 'Failed on submitting the review!');
              window.close();
            }
          });

          }else{
            window.unmask();
            Ext.Msg.alert('Error', 'Please fill all the fields');
          }
         
    },

    onClearProbationToCnfmForm:function(){
      this.getView().down('form').reset();
    }

});
