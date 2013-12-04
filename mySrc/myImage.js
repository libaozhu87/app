function configImage(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function myImage_Com(config){
    extend(this,component)
    this.width = "100%";
    this.height = "100%";
    this.class = "myImage"
    this.type = "myImage";
    this.record = null;
    this.init(config);
    this.index = 0;
}
//pageMageStore["Cars"]
myImage_Com.idSeed = 0,
myImage_Com.prototype={
    constructor:myImage_Com,
    init:function(config){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        self.dom.bind("singletap",function(event){
            self.itemtap.call(self,event)
        })
    },
    itemtap:function(event){
        var self = this;
        if(self.record){
            var infoId = self.record.id;
            var showView = choosPage(self.record,"","adv","third_normal", "" ,"",infoId);
            var nav = getPNav(self);
            if(nav){
                nav.addPush("third_normal","广告",showView);
            }

        }

    }

}