Ext.define('DDO.view.karmaapproval.KarmaApprovalRandomToolbar',{
extend:'Ext.toolbar.Toolbar',
requires:['DDO.view.karmaapproval.KarmaApprovalToolbarController',
                  'DDO.view.karmaapproval.KarmaApprovalToolbarViewModel'],
alias:'widget.approvalrandomtoolbar',
width:'105%',
height:40,
dock:'top',

cls:'karmaapproval-random-toolbar',
viewModel: {
    type: 'karmaapprovaltoolbarviewmodel'
},
controller:'karmaapprovaltoolbarcontroller',
items:[{
    xtype:'label',
    bind:{
        html:'<div>{itemsSelected} Items Selected</div>',
    }
},{
    xtype:'tbfill',
    // dock:'top'
},{
    xtype:'button',
    text:'Approve Selected',
    reference:'multipleapprove',
    // dock:'top',
   
        handler:'onMultipleApprove'

},{
    xtype:'button',
    text:'Reject Selected',
    reference:'multiplereject',
    // dock:'top',
    handler :'onMultipleReject'
}]
});