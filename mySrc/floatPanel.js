function configFloatPanel(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}

function floatPanel_Com(config){
    extend(this,component)
    this.class = "floatPanel";
    this.type = "floatPanel";
    this._innerMaskEle = "";
    this.dialogFlage = "";
    this.init(config);
}
floatPanel_Com.idSeed = 0,
    floatPanel_Com.prototype={
        constructor:floatPanel_Com,
        init:function(config){
            var self = this;
            self.mySuper.init.call(this,config);
            self.config = config.config;
            dealConfigData(self);
            dealConfigLogoic(self);
            self.dealSelf();
        },
        dealSelf:function (){
            var self= this;
            if(self.dom){
                self.dialogFlage =  self.flag||self.id;
                var dialogOption = {};
                dialogOption[self.dialogFlage] = {
                    "htmlEle":self.dom
                }
                $.MODE.addConfig("Dialogue",dialogOption);
                self.dom.css({"zIndex":80,"border": "4px solid"});
            }

        },
        show:function (){
            var self = this;
            var flage =  Dialogue.show(self.dialogFlage,DialogueLayer);
            if(flage){
                shadeLayer.show();
            }
        },
        hide:function(){
            var self = this;
            Dialogue.close(self.dialogFlage)
            shadeLayer.hide();

        }


    }