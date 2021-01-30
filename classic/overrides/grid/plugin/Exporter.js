Ext.define('DDO.overrides.grid.plugin.Exporter', {
    override: 'Ext.grid.plugin.Exporter',


    getColumnHeaders: function (columns,grid) {

        var cols = [],
            i, obj, col, summary;



        for (i = 0; i < columns.length; i++) {
           // debugger;
            col = columns.get(i);
            // each column has a config 'ignoreExport' that can tell us to ignore the column on export
            if (!col.ignoreExport) {
                obj = {
                    text: col.text
                };

                // include summary data
                if (col.summaryType) {
                    obj.summary = {
                        renderer: col.summaryRenderer,
                        dataIndex: col.dataIndex,
                        type: col.summaryType
                    };
                }

                if (col.isGroupHeader) {
                    obj.columns = this.getColumnHeaders(col.items);
                    if (obj.columns.length === 0) {
                        // all children columns are ignored for export so there's no need to export this grouped header
                        obj = null;
                    }
                }

                if (obj) {
                    cols.push(obj);
                }

            }
        }
         if (grid && !Ext.isEmpty(grid.groupedText) && grid.features) {
                for(var j=0;j<grid.features.length;j++){
                    if(grid.features[j].ftype == "grouping"){
                           var column ={};
                           column.text = grid.groupedText;

                    cols.push(column);
                    grid.isFeatured = true;

                    }
                }
            }

        return cols;
    },

    prepareData: function () {

        var me = this,
            grid = me.grid,
            store = grid.getStore(),
            headers, group, summaryData = [];

        group = me.extractGroups(grid.getColumnManager().getColumns());
        if (grid.lockedGrid) {
            headers = Ext.Array.merge(me.getColumnHeaders(grid.lockedGrid.headerCt.items), me.getColumnHeaders(grid.normalGrid.headerCt.items));
        } else {
            headers = me.getColumnHeaders(grid.headerCt.items,grid);
        }

        // compile the summary data
        Ext.each(headers, function (col, idx) {
            var summary,
                renderer,
                dataIndex,
                value,
                text;

            if (col.summary) {
                summary = col.summary;
                renderer = summary.renderer;
                dataIndex = summary.dataIndex;

                value = store[summary.type].apply(store, [dataIndex]);

                if (renderer) {
                    value = renderer.apply(grid, [value, null, dataIndex]);
                }

                summaryData[idx] = value;
            } else {
                summaryData[idx] = null;
            }
        });

        return {
            columns: headers,
            groups: [group],
            summary: summaryData // include summary data
        };
    },

    extractGroups: function(columns){
         var grid = this.grid;

        if(grid.features && !grid.isFeaturedIndex == true){
                for(var j=0;j<grid.features.length;j++){
                    if(grid.features[j].ftype == "grouping"){
                       var groupedColumn = grid.getStore().groupField,
                           column = Ext.create('Ext.grid.column.Column',{text:grid.groupedText,dataIndex:groupedColumn,grouped:true});

                    columns.push(column);
                    grid.isFeaturedIndex = true;


                    }
                }
            }
        var store = this.grid.getStore(),
            len = store.getCount(),
            lenCols = columns.length,
            group = {
                rows: []
            },
            i, j, record, row, col, useRenderer, v;

        // we could also export grouped stores
        for(i = 0; i < len; i++){
            record = store.getAt(i);
            row = [];

            for(j = 0; j < lenCols; j++){
                col = columns[j];
                // each column has a config 'ignoreExport' that can tell us to ignore the column on export
                if(!col.ignoreExport) {
                    useRenderer = !Ext.isEmpty(col.initialConfig.formatter) && Ext.isEmpty(col.formatter);
                    v = record.get(col.dataIndex) || '';

                    row.push(useRenderer ? col.renderer(v) : v);
                }
            }

            group.rows.push(row);
        }

        return group;
    }
});