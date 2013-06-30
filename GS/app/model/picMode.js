/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 上午9:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.model.picMode', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'url', type: 'string'},
            {name: 'title', type: 'string'},
        ],
    },

/*
    config: {
        fields: [
            'id',
            'title',
            'room',
            {
                name: 'time',
                type: 'date',
                convert: function(value, record) {
                    if (value) {
                        var dateArr = value.split(/[\-T:]/);
                        return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3]);
                    } else {
                        return new Date();
                    }
                }
            },
            'speakerIds',
            'description',
            'proposal_type'
        ]
    }*/
});