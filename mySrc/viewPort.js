

function viewPort(){
    extend(this,component)
    this.class = "viewPort";
    this.init();
}
viewPort.idSeed = 0,
viewPort.prototype = {
    constructor:viewPort,
    init:function(){
        this.width = getWindowWidth()+"px";
        this.height = getWindowHeight()+"px";
        this.mySuper.init.call(this);
        this.dom.addClass("fontSize_normal");
        $("#myApp").append(this.dom);
    },
    "refresh":function(){
        var self = this;
        var sucee = function(config){
            var  configObj = JSON.parse(config["config"])[0] ;
            for(var key in configObj){
                CONCIG[key]= configObj[key];
            }
            /*     config = config[0];
             for(var key in config){
             CONCIG[key]= config[key];
             }*/
            preDealConfig();
            initModeConfing();
            initConfig();
            MainView = factoryNav(appConfig.bottomConfig);
            self.add(MainView)
        }
        myRequest(self.maskObj,self.url,sucee)
    },

    "loadData":function(maskObj,url){
        var self = this;
        self.url  = url;
        self.maskObj = maskObj;
        self.refresh();
    },

}

