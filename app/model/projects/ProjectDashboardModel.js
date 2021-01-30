Ext.define('DDO.model.projects.ProjectDashboardModel', {
	extend: 'Ext.data.Model',

	fields: ['name', 'project_id', 'image_url', 'todo_count', 'qa_audit_score', 'risks_unresolved', 'health', 'count', 'total_count',
	{
        name: 'people_count',
        type: 'int',
        default: 0
    },{
        name: 'forcast_hrs',
        type: 'int',
        default: 0
    }]
});