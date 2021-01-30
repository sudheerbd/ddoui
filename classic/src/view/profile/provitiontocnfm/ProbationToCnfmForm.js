
Ext.define('DDO.view.profile.provitiontocnfm.ProbationToCnfmForm', {
    extend: 'Ext.window.Window',
    xtype: 'probationtocnfmform',
    requires: [
        'DDO.view.profile.provitiontocnfm.ProbationToCnfmFormController',
        // 'DDO.store.projects.ProjectDashboardStore'
        'DDO.view.profile.provitiontocnfm.ProbationToCnfmViewModel'
    ],
    viewModel:{
    type : 'probationviewmodel'
    },
    controller: 'probationtocnfmform',
    padding: '5px 25px',
    modal: true,
    resizable: false,
    layout     : 'anchor',
    autoScroll : true,
    width: Constants.ViewportWidth*0.593,
    scrollable: 'y',
    maxHeight: 550,
    
   items:[{
    xtype: 'form',
    width: '100%',
    reference : 'probationform',
    cls:'probationtocnnfmform',
    listeners: {
        afterrender: function(data) {
            var employeeId = Ext.getStore('login').getData().items[0].data.ddo_employee_id;
            var profileUrl = location.hash;
            var hashReplace = profileUrl.replace("/"," ");
            var hashSplit = hashReplace.split(" ")[1];
            var profileId = hashSplit;
            if(profileId === employeeId){
               data.down('[reference=submitButton]').disabled;
            }
        }
    },
    layout: {
        type: 'vbox'
    },
        
        items: [{
            xtype:'combobox',
            fieldLabel: 'Project Name',
            emptyText : 'Project Name',
          
            displayField: 'name',
            valueField:'project_id',
            name:'projectname',
            padding:'20 0 0 20',
            allowBlank: false, 
            anyMatch : true ,
            minChars: 1,
            typeAhead: true,
            forceSelection: true,
            autoLoad: true,
            minChars: 1,
            editable:true,
            selectOnFocus: true,
            queryMode: 'local',
            lastQuery: '',
           bind:{
              store:'{projectnamestore}'
           }
        },{
            xtype: 'textarea',
            fieldLabel: 'Primarily Identified Skill Gap (To be filled by Mentor) :',
            labelAlign: "top",
            name:'skillgap',
            allowBlank: false,
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Specify the Objectives/ Tasks  to be achieved by the Probationer:',
            name:'objectives_to_be_acheived',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Mention the objectives achieved by the probationer in the given duration:',
            name:'objectives_acheived',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Summarize the employee’s performance and progress in the given duration:',
            name:'performance_summary',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'If Good - Provide suggestions for further improvement',
            name:'suggestions',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'If Not so Good - HR to initiate discussion with Probationer and proceed with next process and share comments below',
            name:'hr_discussion',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype:'combobox',
            fieldLabel: 'Status',
            store: ['Done','Pending'],
            name:'status',
            padding:'20 0 0 20',
            allowBlank: false           
        }],
        buttons:[{
            text:'Clear',
            scale:'medium',
            handler:'onClearProbationToCnfmForm'
        },{
            text:'Submit',
            scale:'medium',
            reference:'submitButton',
            // formBind: true,
            // disabled: true,
            handler:'onSubmitProbationToCnfmForm'
        }]
    }] ,
    
  });