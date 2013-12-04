function configView(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function mydataView_Com(config){
    extend(this,component);
    this.data  = null;
    this.itemTpl = null;
    this._innerTplEle = null;
    this.loaded = false;
    this.cache = true;
    this.isCacheTplTime = 0;
    this.class = "mydataView";
    this.type = "mydataView";
    this.cars = null;
    this.cacheTimer = null;

    this.isHavePugin =false;
    this.padding = false;
    this.showItemStore = [];
    this.itemStore ={};
    this.listPage = 1;
    this.paddingEl = null;
    this.haveChangeTip = false;

    this.init(config);
}
mydataView_Com.idSeed = 0,
mydataView_Com.prototype={
    constructor:mydataView_Com,
    init:function(config){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        dealConfigData(self);
        dealConfigLogoic(self);
        self.dealSelfLogic();
    },

    closeEvent:function (){
        var self = this;
        clearTimeout(self.cacheTimer);
        if(self.isCacheTplTime&&self._innerTplEle&&self.loaded){
            self._innerTplEle.hide();
        }

    },



    "showEvent":function(){
        var self = this;
        if(self.isCacheTplTime&&self._innerTplEle&&self.loaded){
            self.showLoading();
            self.cacheTimer = setTimeout(function(){
                self.hideLoading();
                setTimeout(function(){
                    self._innerTplEle.show();
                },100)
            },self.isCacheTplTime)
        }

    },

    generateHtml:function(){
        var self = this;
        if(!self.dom){
            var myConStr = "";
            myConStr = "<div class='"+this.class+" ' id='"+this.id+" '>"+this.html+"<div class='dataView_Tep' ></div><div  class='loadingIcon'></div><a src='#' class = 'loadingError'></a></div>";
            self.dom = $(myConStr);
        }
    },
    dealSelfLogic:function(){
        var self = this;
        if(!self.generateItemHtml()){
            if(self.url){
                self.loadData("",self.url);
            }
        };
    },


    refreshItem:function(){
        var self = this;
        var res = false;
        var str = "";
        if($.isArray(self.data)&&self.data.length!=0&&self.itemTpl){
            $.each(self.data,function(index,item){
                str += self.renderTpl(self.itemTpl,item);
            })
            var tempEle = document.createElement("div");
            tempEle.innerHTML =str;
            var tempEle$ = $(tempEle);
            var tempEle$_children =tempEle$.children();
            self.itemStore[self.listPage] = tempEle$_children;
            self.refreshDataStore();

            if(!self.isHavePugin&&self.scrollable&&self.padding){
                self.generateTlpPugin(tempEle$_children);
                setTimeout(function(){
                    self.initTlpPugin();
                },100)
            }
            res = true
            setTimeout(function(){
                $.each(self.data,function(index,item){
                    var itemFlage = self.id+"_"+index;
                    var itemEle = tempEle$_children.eq(index);
                    itemEle.data("record",item);
                    itemEle.data("itemFlage",itemFlage);
                    tempEle$_children.eq(index).bind("singletap",function(event){
                        self.itemtap.call(self,event)
                    })
                })
            },10)
        }else if($.isArray(self.data)&&self.data.length==0&&self.paddingEl){
            self.maxPage = --self.listPage;
            self.paddingEl.children(".pullUpLabel").show();
            self.paddingEl.children(".pullUpLabel").html("没有更多的数据了")
            //self.noDataPadding();
        }
        return res
    },

    generateTlpPugin:function(tempEleChildren){
        var self = this;
        if(self.padding){
            var paddingStr = '<div id="pullUp" style="float:left;width:100%">\
               <div class ="loading"></div>\
               <span class="pullUpLabel">加载更多数据</span>\
            </div>';
            self.paddingEl = $(paddingStr);
            tempEleChildren.last().after(self.paddingEl);
        }

        self.isHavePugin = true;
    },
    pullUpAction:function(){
        var self = this;
        if(typeof self.maxPage =="undefined"||self.maxPage !=self.listPage){
            self.listPage++;
            self.paddingRefresh = true;
            self.paddingEl.children(".pullUpLabel").hide();
            self.refreshDataStore();
        }
    },
    initTlpPugin:function(){
        var self = this;
        self.scroll = function(event){
            var maxScrolly = event.target.scrollHeight -event.target.offsetHeight;
            if(event.target.scrollTop>Math.abs(maxScrolly)-10){
                self.dom.unbind("scroll",self.scroll)
                self.pullUpAction.call(self);
            }
        }
        self.dom.bind("scroll",self.scroll)
    },

    changeLoadingMasked:function(){
        var self = this;
        self.showLoading = function(){
            var self = this;
            self.loadingIconEle = self.paddingEl.children(".loading");
            self.loadingIconEle.show();
        }
        self.showErrorHtml = function(){
            var self = this;
            self.loadingErrorEle = self.paddingEl.children(".pullUpLabel");
            self.loadingErrorEle.html("加载失败");
            self.dom.bind("scroll",self.scroll)
            self.loadingErrorEle.show();
            self.listPage--;
        };
        self.showNoInfoHtml = function(){
        };
    },
    refreshDataStore:function(){
        var self = this;
        if(!self.itemStore[self.listPage]){
            if(self.listPage!=1&&!self.haveChangeTip){
                self.haveChangeTip = true;
                self.changeLoadingMasked();

            }
            self.refresh();
            return;
        }else{
            var currentItem$ = self.itemStore[self.listPage];
            self.showItemStore.push(currentItem$);
            if(self.listPage ==1){
                self._innerTplEle.append(currentItem$)
            }else{

                setTimeout(function(){
                    self.paddingEl.before(currentItem$);
                },50)
            }
            self.showItemStore[0].first().addClass("item_first");
            if(self.showItemStore.length-2>=0){
                self.showItemStore[self.showItemStore.length-2].last().removeClass("item_last");
            }
            currentItem$.last().addClass("item_last");
            self.paddingRefresh = false;
            if(self.scroll){
                self.dom.bind("scroll",self.scroll)
            }
        }
    },

    generateItemHtml:function(){
        var self = this;
        var str = "";
        if(!self._innerTplEle ){
            self._innerTplEle = self.dom.find(".dataView_Tep");
        }
        var res = self.refreshItem();
        return res;
    },

    renderTpl:function(tpl, op){
        return tpl.replace(/{(\w+)}/g, function(e1, e2) {
            return op[e2] != null ? op[e2] : "";
        });
    },
    itemtap:function(event){
        var self = this;
        var cid = event.currentTarget.id;
        switch (cid){
            case "onItemtapId":
                var data = $(event.currentTarget).data("record");
                var itemFlage =  $(event.currentTarget).data("itemFlage");
                var page = null;
                if(data){
                    var page = generatePage.call(self,data,itemFlage);
                    if(page){
                        var flage =  page.pageView;
                        var parentNav = getPNav(self);
                        if(parentNav){
                            var title = null;
                            if(self.flag=="index_Channel"){
                            title = data["title"];
                            }
                            if(flage == "second_list"||flage =="second_view"||flage == "menuViewCar"){
                                parentNav.addPush(page.id,title,page);
                            }else{
                                parentNav.addPush(flage,title,page);
                            }
                        }
                    }
                }
        }
        event.preventDefault();
        return false
    },
    "setItemTpl":function(itemTpl){
       var self= this;
        self.itemTpl = itemTpl;
        if(self.data){
            self.generateItemHtml();
        }
    },
    setData:function(date){
        var self = this;
        self.data = date;
        self.loaded = self.cache;
        if(self.itemTpl){
            self.generateItemHtml();
        }
    },

    "loadData":function(maskObj,url){
        var self = this;
        self.url  = url;
        self.maskObj = maskObj;
        self.cacheTimer= setTimeout(function(){
            self.refresh();
        },self.isCacheTplTime)
    },
    "refresh":function(){
        var self = this;

        var params = (self.padding)?{
            page:self.listPage,
            size:6
        }:""
        var sucee = function(data){
            self.setData(data);
        }
          var  masked = {"errorRefresh":self,
            "maskenIcon": self,
        };
        myRequest(masked,self.url,sucee,"","","",params)
    },

    "dataUpInfo" :function(url,mode){
        var self = this;
        var itemTpl = null;
        if(!self.loaded){
        switch(mode){
            case "menu":
                break;
            case "news":
            case "image":
            case "needs":
            case "product":
            case "company":
                itemTpl = dataViewStore[mode](self);
                break;
            case "companyNav":
                var height = shangQiu_dataViewHeight('companyNav');
                itemTpl = '<div style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_productView_icon" style="background-image:url({logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
        }
        if(itemTpl){
            self.setItemTpl(itemTpl);
        }
        self.hideErrorHtml();
        self.loadData(self,url);
    }

 }


}