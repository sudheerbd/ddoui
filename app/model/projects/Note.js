Ext.define('DDO.model.projects.Note', {
	extend: 'Ext.data.Model',

	alias: 'model.note',

	idProperty: 'note_id',

	fields: ['note_status', 'note_title','note_description',{
		name: 'note_description_normal',
		convert: function(value, record) {
			return Ext.util.Format.stripTags(record.data.note_description);
		}
	}, 'note_type', 'note_id']
});