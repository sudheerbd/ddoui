/**
 * The file MOMView is the view file for MOM tab in 'DDO.view.projects.ProjectsTabsDetailsView'.
 * @extends {Ext.container.Container}
 * @alias 'widget.momview'.
 * ViewModel : 'DDO.view.projects.MOMViewModel'.
 * ViewController : 'DDO.view.projects.MOMCmpViewController'.
 */
Ext.define('DDO.view.projects.MOMView', {
    extend: 'Ext.container.Container',

    alias: 'widget.momview',

    requires: [
        'DDO.view.projects.MOMProject',
        'DDO.view.projects.MOMCmpView',
        'DDO.view.widget.generic.HtmlEditor',
        'DDO.view.projects.MOMCmpViewController'
    ],

    controller: 'momcmpviewcontroller',
    cls: 'mom-view-cls-bck',
    // padding: '0 21',
    // listeners:{
    //     beforeRender: 'onBeforeAcceptRenderer'
    //   },
    // initComponent: function () {
    //     debugger;
    //     var me = this;
    //     var toolbarContainer;
    //     this.callParent(arguments);
    //     toolbarContainer = this.down('container[reference="projectstoolbar"]');
    //     Ext.Ajax.request({
    //         url: 'resources/data/projects.json',
    //         method: 'GET',
    //         scope: this,
    //         success: function (response) {
    //             var res = Ext.decode(response.responseText),
    //                 itemsArray = [];
    //             res.data.forEach(function (rec) {
    //                 if (rec.btnName) {
    //                     itemsArray.push({
    //                         xtype: 'button',
    //                         cls: 'projects-btn-cls',
    //                         text: rec.btnName,
    //                         toggleGroup: 'projectsGroup',
    //                         enableToggle: true,
    //                         listeners: {
    //                             click: 'onBtnClick'
    //                         }
    //                     });
    //                 // } else if (rec.projectStatus == 'ProjectStatus') {
    //                 //     itemsArray.push({
    //                 //         xtype: 'combobox',
    //                 //         name: 'status',
    //                 //         reference: 'status',
    //                 //         editable: false,
    //                 //         forceSelection: true,
    //                 //         width: Constants.ViewportWidth * 0.107,
    //                 //         height: Constants.ViewportHeight * 0.062,
    //                 //         margin: '9 0 0 6',
    //                 //         emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTS.EMPTYTEXT,
    //                 //         bind: {
    //                 //             store: '{projectStatus}'
    //                 //         },
    //                 //         listeners: {
    //                 //             // beforerender: 'onProjectSetStatus',
    //                 //             select: 'onSelectStatusValue'
    //                 //         },
    //                 //         cls: 'ddo-project-combo',
    //                 //         displayField: 'status',
    //                 //         valueField: 'status',
    //                 //     })
    //                 } else {
    //                     // itemsArray.push({
                           
    //                     // })
    //                 }
    //             });
    //             toolbarContainer.add(itemsArray);
    //         }
    //     });
    // },
    items: [
        {
        xtype: 'momproject',
        width:'100%'
    }, 
    {
        xtype: 'momcmpview',
        cls:'momcmpview',
        width:'100%'
    }]
});