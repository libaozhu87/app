
function configWarpCon(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function warpCon_Com(config){
    extend(this,component)
    this.class = "warpCon";
    this.type = "warpCon";
    this.jsonUrl = null,
    this.pageView = null,
    this.pageType = null,
    this.pageId = null,
    this.childNextPage = null,
    this.cacheSys = false;
    this.initEvent = false;
    this.init(config);
}
warpCon_Com.idSeed = 0,
warpCon_Com.prototype={
    constructor:warpCon_Com,
    init:function(config){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        dealConfigData(self);
        dealConfigLogoic(self);
        self.dealEvent();
    },
    dealEvent:function(){
        var self = this;
        if(self.initEvent){
            setTimeout(function(){
                self.dom.bind("show",function(){self.showEvent.call(self)});
                self.dom.bind("close",function(){self.closeEvent.call(self)});
            },500)
        }
    },
    showEvent:function(){
        var self = this;
        if(self.cacheSys){
            $.each(self.items,function(index,item){
                  if(typeof  item.showEvent == "function"){
                      item.showEvent.call(item);
                  }
            })
        }
    },
    closeEvent:function(){
        var self = this;
        if(self.cacheSys){
            $.each(self.items,function(index,item){
                if(typeof  item.closeEvent == "function"){
                    item.closeEvent.call(item);
                }
            })
        }
    },
    "selfCreate":function(record){
        var self = this;
        self.hideErrorHtml();
        var myUrl = self.jsonUrl;
        var pageView = self.pageView||"";
        var pageType = self.pageType||"";
        //提供给后台的参数
        switch(pageView){
            case "menuViewCar":
                    var myMenuView = self.down("myMenuView");
                    myMenuView.dataUpInfo(myUrl,pageView);
                return;
            case "second_list":
                var myList = self.down("myList");
                myList.dataUpInfo(myUrl,pageType);
                return;
            case "second_view":
                var mydataView = self.down("mydataView");
                mydataView.dataUpInfo(myUrl,pageType);
                return;
            case "third_normal":
                var myCon = self.down("myCon");
                myCon.dataUpInfo(myUrl,record);
                return;
        };
        //自身模板的参数
        if(pageView.indexOf("list")!=-1){
            var myList = self.down("myList");
            myList.dataUpInfo(myUrl,pageType);
        };
        if(pageView.indexOf("view")!=-1){
            var myList = self.down("mydataView");
            myList.dataUpInfo(myUrl,pageType);
        };
        if(pageView.indexOf("third")!=-1){

            var myList = self.down("myCon");
            myList.dataUpInfo(myUrl,record);
        }
    },

    setAttribute:function(obj){
         var self = this;
        for(var key in obj){
            self[key] = obj[key];
        }
    }
}
