/**
 *   This file is responsible for TechnologiesDataView.
 *   @extends {Ext.view.View}
 *   @alias widget.technologiesdataview
 *   ViewModel :'DDO.view.projects.TechnologiesViewModel'.
 *   ViewController :'DDO.view.projects.TechnologiesViewController.
 */
Ext.define('DDO.view.projects.TechnologiesDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.technologiesdataview',
    cls: 'techno-dataview-cls',
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.NOTECHNOLOGY,
    viewModel: {
        type: 'technologiesviewmodel'
    },
    loadMask: false,
    bind: {
        store: '{technologiesstore}'
    },
    tpl: [
        '<tpl for=".">',
        '<div class="technologies-dashboard-cls">',
        '<table border="1" class="project-dash-table-cls">',
        '<tr>',
        '<td rowspan="1" class="pro-dash-td-cls">',
        '<tpl if="this.imgExistance(values)">',
        '<img src="{image_url}" class="technology-dash-img-cls" wrap-td="image_url">',
        '<tpl else>',
        '<div style="background: {[this.nonImgColor(values)]};" wrap-td="image_url" class="technology-non-img-cls">',
        '<span class="first-letter-tech-cls">{[this.getNonImgFirstLetter(values)]}</span></div>',
        '</tpl>',
        '<div class="technology-name-cls">{name} - {description}</div>',
        '<div class="deleteicon-div"><span wrap-td="todo_count" class="delete-cls"></span></div>',
        '</td>',
        '</tr>',
        '</table>',
        '</div>',
        '</tpl>', {
            imgExistance: function (values) {
                if (values.image_url && values.image_url != "null") {
                    return true;
                } else {
                    return false;
                }
            },
            nonImgColor: function (values) {
                values.color = Utility.colorPicker[Math.floor(Math.random() * Utility.colorPicker.length)];
                return values.color;
            },
            getNonImgFirstLetter: function (values) {
                return values.name[0];
            },
            getIndex: function (values, index) {
                return index;
            }
        }
    ],
    itemSelector: '.technologies-dashboard-cls',
    listeners: {
        itemclick: 'onDataItemDeleteClick',
    }
});