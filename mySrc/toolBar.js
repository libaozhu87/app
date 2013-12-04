function configToolBar(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function toolBar_Com(config){
    extend(this,component)
    //this.width = "100%";
    this.class = "toolBar"
    this.type = "toolBar";
    this.init(config);
}
toolBar_Com.idSeed = 0,
toolBar_Com.prototype={
    constructor:toolBar_Com,
    init:function(config){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        dealConfigData(self);
        dealConfigLogoic(self);
    },
}