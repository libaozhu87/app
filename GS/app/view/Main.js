Ext.define('GS.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    config: {
        tabBarPosition: 'bottom',
        tabBar: {
            ui: 'red'
        },
        defaults: {
            styleHtmlContent: true
        },
        items: [
            {
                title: '图片',
                iconCls: 'time',
              xtype:"mainPicView"

            },
            {
                title: '列表',
                iconCls: 'home',
                xtype:"mainListView"

            },
            {
                title:"地图",
                iconCls: 'home',
                xtype:"mainMapView"

            },


        ]
    }
});





