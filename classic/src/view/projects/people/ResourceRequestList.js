/**
 * This file is the grid view of the resource request.
 */
Ext.define('DDO.view.projects.people.ResourceRequestList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.resourcerequestlist',
  overItemCls: 'over',

  cls: 'ddo-dashboard-grid karmaapproval',
  loadMask: 'true',
  padding: '20 0 0 0',
  columns: [

    {
      text: LabelsTitles.RESOURCEREQUEST.EMPLOYEE,
      dataIndex: 'empfullname',
      flex: 1
      
    },
    {
      text:  LabelsTitles.RESOURCEREQUEST.STARTDATE,
      tooltip: LabelsTitles.RESOURCEREQUEST.STARTTOOLTIP,
      dataIndex: 'startdate',
      flex: 0.5
    },
    {
      text: LabelsTitles.RESOURCEREQUEST.ENDDATE,
      tooltip:  LabelsTitles.RESOURCEREQUEST.ENDTOOLTIP,
      dataIndex: 'enddate',
      flex: 0.5
    },
    {
      text: LabelsTitles.RESOURCEREQUEST.ROLE,
      tooltip: LabelsTitles.RESOURCEREQUEST.ROLETOOLTIP,
      dataIndex: 'projectrole',
      flex: 0.7
    },
    {
      text: LabelsTitles.RESOURCEREQUEST.ALLOCATIONPERCENT,
      tooltip: LabelsTitles.RESOURCEREQUEST.ALLOCATIONTOOLTIP,
      dataIndex: 'allocationperct',
      flex: 0.7
    },
    {
      text: LabelsTitles.RESOURCEREQUEST.SHADOWRESOURCE,
      tooltip: LabelsTitles.RESOURCEREQUEST.SHADOWTOOLTIP,
      dataIndex: 'shadow_resource',
      flex: 0.7
    },
    {
      xtype: 'actioncolumn',
      text: LabelsTitles.RESOURCEREQUEST.ACTIONCOLUMN,
      flex: 0.7,
      bind: {
        hidden: '{!editMode}'
      },
      items: [{
        iconCls: 'x-fa fa-edit',
        tooltip: LabelsTitles.RESOURCEREQUEST.EDITTOOLTIP,
        reference: 'editrecord',
        reference: 'actionColumn',
        handler: function(grid, rowIndex, colIndex) {
          var rec = grid.getStore().getAt(rowIndex);
          this.getView().up('mainviewport').mask();
          var pname = null;
          var empId = rec.data.cbpid;
          this.getView().up('projectrequest').getController().onEmployeeSelect(undefined,undefined,undefined,empId);
          var projectWindow = this.getView().up('projectrequest').add({xtype:'resourcerequestwindowupdate'});
          if (projectWindow) {
            projectWindow.show();
            projectWindow.down('form').loadRecord(rec);
            projectWindow.down('[reference=employee]').setValue(rec.data.empfullname);
            projectWindow.down('[name=projectrole]').setValue(rec.data.projectroleid);
          }
        },
      }],
    },
       {
      xtype: 'actioncolumn',
      text: LabelsTitles.RESOURCEREQUEST.ACTIONCOLUMN,
      flex: 0.7,
      bind: {
        hidden: '{editMode}'
      },
      items: [{
        iconCls: 'x-fa fa-trash',
        tooltip: LabelsTitles.RESOURCEREQUEST.DELETETOOLTIP,
        reference: 'deleterecord',
        handler: function(grid, rowIndex, colIndex) {
          grid.getStore().removeAt(rowIndex);
        }
      }
      ],
    }]

});
