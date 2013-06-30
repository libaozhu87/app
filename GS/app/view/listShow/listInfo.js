/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.listShow.listInfo', {
    extend: 'Ext.List',
    xtype: 'listInfo',
    config: {
        variableHeights: true,
        store:"listStore",
        itemTpl: [
            '<div class="avatar" style="background-image: url({url});"></div>',
            '<h3>{title}</h3>',
            '<span>支持票{up}</span><span> -- </span><span>反对票{down}</span>',
            '<h5>{overview}</h5>',
            ]
    }
});