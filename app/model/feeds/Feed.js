Ext.define('DDO.model.feeds.Feed', {
    extend: 'Ext.data.Model',
    alias: 'model.feed',
    fields: [{
        name: 'post_id'
    }, {
        name: 'post_content'
        // convert: function (value, record) {
        //     if (value) {
        //         //To push MetaUrlData based on the post_id and fetch the metadata with xhr request
        //         //provided in Utility as reuasble function
        //         Utility.metaUrlReplaceStatus(value, record.data.post_id, false);
        //         return value;
        //     }
        // }
    }, {
        name: 'filter_sort',
        convert: function (value, record) {
            var values = record.data;
            if (values.post_type === "idea") {
                var login = Ext.getStore('login'),
                        loginData = login.getData().items[0].data,
                        employeeId = loginData.ddo_employee_id;
                if (employeeId == values.post_author) {
                    return true;
                } else if (values.post_tagged_users_list && values.post_tagged_users_list.length > 0) {
                    if (!(values.post_tagged_users_list.indexOf(employeeId) == -1)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }, {
        name: 'comments'
    }, {
        name: 'post_attachments'
    }, {
        name: 'post_author'
    }, {
        name: 'post_date'
    }, {
        name: 'post_id'
    }, {
        name: 'post_like_users'
    }, {
        name: 'post_modified_date'
    }, {
        name: 'post_share'
    }, {
        name: 'post_tagged_users_list'
    }, {
        name: 'post_type'
    }, {
        name: 'user'
    }, {
        name: 'tagged_group_details'
    }]
});

