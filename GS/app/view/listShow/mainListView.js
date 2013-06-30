/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-29
 * Time: 下午10:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.listShow.mainListView', {
    extend: 'Ext.NavigationView',
    xtype: 'mainListView',
    config: {
        autoDestroy: false,
        items: [
            {    title: '列表展示',
                xtype: 'listInfo',
                //store: 'Sessions',
                //grouped: true,
               // pinHeaders: false
            }
        ]
    },


                //xtype: 'sessions',
                /*                store: 'Sessions',
                 grouped: true,
                 pinHeaders: false*/








})