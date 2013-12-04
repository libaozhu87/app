/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 上午8:40
 * To change this template use File | Settings | File Templates.
 */
function configBar(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function mainBar(config){
    extend(this,component)
    this.width = "100%";
    this.class = "mainBar"
    this.type = "mainBar";
    this.init(config);
}
mainBar.idSeed = 0,
mainBar.prototype={
    constructor:mainBar,
    init:function(config){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        dealConfigData(self);
        dealConfigLogoic(self);
    },
    generateHtml:function(){
        if(!this.dom){
            var myConStr = "";
            myConStr = "<div class='"+this.class+" ' id='"+this.id+" '>"+this.html +"</div>";
            this.dom = $(myConStr)
        }
    },

}