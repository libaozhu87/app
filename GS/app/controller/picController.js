/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 上午12:06
 * To change this template use File | Settings | File Templates.
 */


Ext.define('GS.controller.picController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            picMain:'#mainPicView',
            picCon:'#myCon',
            picShow:'show',
            listMain: 'mainListView',
            lists:'listInfo',
            listCon:'#listContent',
            topInfo: '#listContent #topListInfo',
            listUp: '#listContent #up',
            listDowm: '#listContent #down'
        },
        control: {
            picCon:{
                itemtap: 'onPicSelect'
            },
            lists:{
                itemtap: 'onListSelect'
            },
            listUp:{
                tap:'onListUp'
            },
            listDowm:{
                tap:'onListDown'
            }
        }
    },
    onListUp:function(but){
         Ext.Msg.alert("你投了支持票");
        var a= this.getTopInfo().getRecord();
        var count = a.get("up");
        a.set({"up":count+1});

    },
    onListDown:function(but){
        Ext.Msg.alert("你投了反对票");
        var a= this.getTopInfo().getRecord();
        var count = a.get("down");
        a.set({"down":count+1});
    },
    onPicSelect:function(list, index, target, record){
        var showWin = this.picShow;
        var mainWin = this.getPicMain();
        if (!showWin) {
            showWin = Ext.create('GS.view.picShow.show');
        }
        var pro = record.raw.index;
        showWin.setMasked({
            xtype: 'loadmask',
            message: '加载中...'
        });
        Ext.Ajax.request({
            url: 'data/pic.json',
            success: function(response) {
                var data = Ext.decode( response.responseText);
                var images = data[pro];
                var len = images.length;
                var items = [];
                for(var i = 0;i<len;i++){
                    items.push({
                        xtype: 'image',
                        cls: 'my-carousel-item-img',
                        src: images[i].url
                    });
                }
                showWin.setItems(items);
                showWin.unmask();
                mainWin.push(showWin);
            },
            failure: function() {
                showWin.unmask();
            }
        });




    },


    onListSelect: function(list, idx, el, record) {

       // var sessionStore = Ext.getStore('SpeakerSessions'),
        //sessionIds = record.get('')

            ;
/*        sessionStore.clearFilter(true);
        sessionStore.filterBy(function(session) {
            return Ext.Array.contains(sessionIds, session.get('id'));
        });*/

        if (!this.listCon) {
            this.listCon = Ext.widget('listContent');
        }
        this.listCon.config.title = record.get('title');
        this.getListMain().push(this.listCon);
       var a =  this.getTopInfo().setRecord(record);
},

onSessionDateChange: function(seg, btn, toggle) {
    if (toggle) {
        this.filterByButton(btn);
    }
},

filterByButton: function(btn) {
    if (this.getSessionSpeakers()) {
        this.getSessionSpeakers().deselectAll();
    }
    Ext.getStore('Sessions').clearFilter(true);
    Ext.getStore('Sessions').filter(function(record) {
        return record.get('time').getDate() == btn.config.day;
    });
},

onSessionTap: function(list, idx, el, record) {
    var speakerStore = Ext.getStore('SessionSpeakers'),
        speakerIds = record.get('speakerIds');

    speakerStore.clearFilter(true);
    speakerStore.filterBy(function(speaker) {
        return Ext.Array.contains(speakerIds, speaker.get('id'));
    });

    if (!this.session) {
        this.session = Ext.widget('session');
    }

    this.session.setTitle(record.get('title'));
    this.getSessionContainer().push(this.session);
    this.getSessionInfo().setRecord(record);
},

onSpeakerTap: function(list, idx, el, record) {
    if (!this.speakerInfo) {
        this.speakerInfo = Ext.widget('speakerInfo', {
            scrollable: 'vertical'
        });
    }

    this.speakerInfo.config.title = record.getFullName();
    this.speakerInfo.setRecord(record);
    this.getSessionContainer().push(this.speakerInfo);
},

onSessionsActivate: function() {
    if (this.session) {
        this.session.down('speakers').deselectAll();
    }
}
});