/**
 *   This file  is responsible for GroupsSearchForm.
 *   @extends {Ext.form.Panel}
 *   @alias widget.groupssearchform
 *   ViewModel: 'DDO.view.groups.GroupsWindowViewModel',.
 *   ViewController :'DDO.view.groups.GroupsWindowViewController'.
 */
Ext.define('DDO.view.groups.GroupsSearchForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.groupssearchform',
    requires: [
        'Ext.toolbar.Spacer'
    ],
    layout: {
        type: 'hbox'
    },
    bind: {
        hidden: '{searchForm}'
    },
    margin: '20 10 0 30',
    cls: 'group-form-cls',
    items: [{
        xtype: 'checkbox',
        cls: 'karmasetup-checkbox-cls',
        bind: {
            disabled: '{disableFormFields}',
            boxLabel: 'All ({emloyeeSelectedCount}/{emloyeeTotalCount})'
        },
        boxLabel: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ALL,
        name: 'allRecords',
        width: Constants.ViewportWidth * 0.074,
        listeners: {
            change: 'onCheckBoxSelect'
        }
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'textfield',
        bind: {
            disabled: '{disableFormFields}',
            value: '{groupSearchFieldValue}'
        },
        reference: 'searchname',
        enableKeyEvents: true,
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.SEARCHEMP,
        cls: 'ddo-group-search-text ',
        name: 'taskname',
        enforceMaxLength: true,
        width: Constants.ViewportWidth * 0.22,
        maxLength: 400,
        listeners: {
            keyup: 'onKeyupGroupSearchBy'
        }
    }, {
        xtype: 'button',
        width: Constants.ViewportWidth * 0.008,
        height: Constants.ViewportHeight * 0.016,
        bind: {
            disabled: '{disableFormFields}'
        },
        cls: 'group-search-icon-field'
    }, {
        xtype: 'button',
        width: Constants.ViewportWidth * 0.008,
        height: Constants.ViewportHeight * 0.016,
        cls: 'clearsearch-cls x-fa fa-times',
        bind: {
            hidden: '{getGroupSearchField}',
            disabled: '{disableFormFields}'
        },
        listeners: {
            click: 'onCloseIconClick'
        }
    }, {
        xtype: 'button',
        text: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ADDTOGRP,
        bind: {
            disabled: '{addGroupBtnDisable}'
        },
        listeners: {
            click: 'onAddToGroupBtnClick'
        }
    }]
});