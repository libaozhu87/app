/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 下午5:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.store.listStore', {
    extend: 'Ext.data.Store',
    config: {
        fields: [
            {name: 'url', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'name',type: 'string'},
            {name: 'overview',type: 'string'},
            {name: 'decribe',type: 'string'},
            {name: 'index',type: 'string'},
            {name: 'up',type: 'init'},
            {name: 'down',type: 'init'}
        ],
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/list.json',
            reader: {
                type: 'json',
                rootProperty: 'list'
            }
        },
        /*   grouper: {
     sortProperty: 'time',
     groupFn: function(record) {
     return Ext.Date.format(record.get('time'), 'g:ia');
     }
     },*/

    /* sorters: [
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