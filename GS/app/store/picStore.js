/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 上午9:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.store.picStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'GS.model.picMode',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/pic.json',
            reader: {
                type: 'json',
                rootProperty: 'pics'
            }
        },
        autoLoad: true
     /*   grouper: {
            sortProperty: 'time',
            groupFn: function(record) {
                return Ext.Date.format(record.get('time'), 'g:ia');
            }
        },*/

/*        sorters: [
            {
                property: 'time',
                direction: 'ASC'
            },
            {
                property: 'title',
                direction: 'ASC'
            }
        ]*/
    }
});