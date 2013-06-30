/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 下午6:16
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.listShow.listContent', {
    extend: 'Ext.DataView',
    xtype: 'listContent',
    id:'listContent',
    config: {

        layout: 'vbox',
        items: [
            {
                flex: 2,
                scrollable: 'vertical',
                xtype: 'container',
                id:'topListInfo',
                tpl: [
                        '<div class="header">',
                        '<div class="avatar" style="background-image: url({url});"></div>',
                        '<h3>{title}</h3>',
                        '<span>支持票{up}</span><span> -- </span><span>反对票{down}</span>',
                        '<h5>{overview}</h5>',
                        '</div>',
                        '<p>{decribe}</p>'
                    ].join('')
            },
            {
                xtype: 'component',
                html: '发表观点'
            },
            {
                flex: 1,
                xtype: 'container',
                layout: 'hbox',
                items:[ {
                    xtype:'button',
                    id : "up",
                    flex: 1,
                    html:"支持"},
                    {
                     flex: 1,
                     id : "down",
                     xtype:'button',
                      html:"反对"}
                 ]
            }
        ]

    }



})


