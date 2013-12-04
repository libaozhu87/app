function configCon(config){
    var res = {};
    res = setConfig(config);
    return res;
}
function myCon_Com(config){
    extend(this,component)
    this.class = "myCon";
    this.type = "myCon";
    this.jsonUrl = null,
        this.pageView = null,
        this.pageType = null,
        this.pageId = null,
        this.childNextPage = null,
        this.isCacheTplTime = 0;
        this._innerHtmlEle = null;
        this.init(config);
}
myCon_Com.idSeed = 0,
    myCon_Com.prototype={
        constructor:myCon_Com,
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
                myConStr = "<div class='"+this.class+" ' id='"+this.id+" '><div class='_innerHtmlEle'>"+this.html +"</div><div  class='loadingIcon'></div><a src='#' class = 'loadingError'></a></div>";
                this.dom = $(myConStr)
                this._innerHtmlEle =  this.dom.find("._innerHtmlEle");
            }
        },
        closeEvent:function (){
            var self = this;
            clearTimeout(self.cacheTimer);
            if(self.isCacheTplTime&&self._innerHtmlEle){
                setTimeout(function(){
                    self._innerHtmlEle.hide();
                    self._innerHtmlEle.html("");
                },self.isCacheTplTime)
            }
        },
        "showEvent":function(){
            var self = this;
            if(self.isCacheTplTime&&self._innerHtmlEle){
                self.showLoading();
                //clearTimeout(self.cacheTimer);
                self.cacheTimer = setTimeout(function(){
                    //self.hideLoading();
                    setTimeout(function(){
                        self._innerHtmlEle.show();
                    },200)
                },self.isCacheTplTime)
            }
        },
        "dataUpInfo":function(url,record){
            var self = this;
            self.loadData({"errorRefresh":self,
                          "maskenIcon": self
            },url);
        },
        "refresh":function(){
            var self = this;
            var sucee = function(data){
                var initPage = self.config.initPage;
                if(typeof (initPage) =="function"){
                    initPage.call(self,data)
                }
            }
            myRequest(self.maskObj,self.url,sucee)
        },
        setHtml:function(html){
            var self = this;
            self._innerHtmlEle.html(html);
        },
        "loadData":function(maskObj,url){
            var self = this;
            self.url  = url;
            self.maskObj = maskObj;
            self.clearData();
            self.cacheTimer= setTimeout(function(){
                self.refresh();
            },self.isCacheTplTime)
        }
    }