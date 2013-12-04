
function configMenuView(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function myMenuView_Com(config){
    extend(this,component);
    this.data  = null;
    this.itemTpl = null;
    this._innerTplEle = null;
    this._innerItemEle = null;
    this._innerCars = null;
    this.loaded = false;
    this.class = "myMenuView";
    this.type = "myMenuView";
    this.activeIndex= null;
    this.currentPage = 1;
    this.itemActiveCls = "";
    this.cars = null;
    this.isCacheTplTime = 0,
    this.cacheTimer = null;
    this.init(config);
}
myMenuView_Com.idSeed = 0,
    myMenuView_Com.prototype={
        constructor:myMenuView_Com,
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
            if(self.isCacheTplTime&&self.cars&&self.loaded){
                self.cacheTimer = setTimeout(function(){
                    self.cars.hide();
               },self.isCacheTplTime);
                //self.cars._innerCarsEle.removeClass("vshow").addClass("vhide")
                /*                    self.cars.isCacheTplTime =self.isCacheTplTime;
                 self.cars.closeEvent.call(self.cars);*/
            }
        },
        "showEvent":function(){
            var self = this;
            if(self.isCacheTplTime&&self.cars&&self.loaded){
                self.showLoading();
                clearTimeout(self.cacheTimer);
                self.cacheTimer = setTimeout(function(){
                    self.hideLoading();
                    setTimeout(function(){
                        self.cars.show();
                    },100)
                },self.isCacheTplTime)

            }

        },



        generateHtml:function(){
            var self = this;
            if(!self.dom){
                var myConStr = "";
                myConStr = "<div class='"+this.class+" ' id='"+this.id+" '>"+this.html+"<div class='myMenuView_Tep'></div><div  class='loadingIcon'></div><a src style='#' class = 'loadingError'></a></div>";
                self.dom = $(myConStr);
                self.dom.bind("singletap",function(event){
                    self.itemtap.call(self,event)
                })
            }
        },
        dealSelfLogic:function(){
            var self = this;
            self.generateItemHtml();
        },

        generateItemHtml:function(){
            var self = this;
            var str = "";
            if(!self._innerTplEle ){
                self._innerTplEle = self.dom.find(".myMenuView_Tep");
            }
            if(self.data&&self.itemTpl){
                if($.isArray(self.data)){
                    $.each(self.data,function(index,item){
                        str += self.renderTpl(self.itemTpl,item);
                    })
                    self._innerItemEle = $(str);
                    var recordsLen = self.data.length-1;
                    var pageNum = parseInt(recordsLen/4)+1;
                    var widthCls = "menuView_width"+pageNum;
                    if(pageNum==1){
                        self._innerTplEle.addClass("hbox "+widthCls);
                        $.each(self._innerItemEle ,function(index,item){
                            item.className = "flex1";
                    })
                    }else{
                        self._innerTplEle.addClass(widthCls);
                        self.dom.css({overflow:"hidden"})
                        self._innerCars = Zepto(self._innerTplEle[0]);
                        self._innerCars.flickable({segments:pageNum});
                        var itemWidth = 25/pageNum+"%";
                        $.each(self._innerItemEle ,function(index,item){
                            item.style.width = itemWidth;
                            item.style.float = "left";
                        })
                     }
                    self.pageNum = pageNum;
                    self.addActiveCls(0);
                }
                self._innerTplEle.html(self._innerItemEle);
                setTimeout(function(){
                    $.each(self.data,function(index,item){
                        var itemFlage = self.id+"_"+index;
                        var itemEle = self._innerItemEle.eq(index);
                        itemEle.data("record",item);
                        itemEle.data("index",index)
                        itemEle.data("itemFlage",itemFlage);
                    })
                },10)
            }
        },
        renderTpl:function(tpl, op){
            return tpl.replace(/{(\w+)}/g, function(e1, e2) {
                return op[e2] != null ? op[e2] : "";
            });
        },
        itemtap:function(event){
            var self = this;
            var id = event.target.id
            switch (id){
                case "onItemtapId":
                    var dataEle = $(event.target.parentNode)
                    var data = dataEle.data("record");
                    var itemFlage =  dataEle.data("itemFlage");
                    var index = dataEle.data("index");
                    if(data){
                        var page = null;
                        var parent = self.parent;
                        self.itemChange(index);
                    }

            }
        },
        "setItemTpl":function(itemTpl){
            var self= this;
            self.itemTpl = itemTpl;
            if(self.data){
                self.generateItemHtml();
            }
        },
        setCars:function(){
            var self = this;
            self.cars = self.parent.down("myCars");
            if(self.cars){
                var carItems =[];
                self.cars.decorateFun = function(index){
                    self.addActiveCls.call(self,index)
                }

                $.each(self.data,function(index,item){
                        var  page =  generatePage.call(self,item);
                        carItems.push(page);
                })
                self.cars.add(carItems)
            }
        },

        setData:function(date){
            var self = this;
            self.data = date;
            self.loaded = true;
            if(self.itemTpl){
                self.generateItemHtml();
                self.setCars();
            }
        },
        "dataUpInfo":function(url,type,successBC){
            var self = this;
            if(!self.loaded){
                self.hideErrorHtml();
                switch (type){
                    case "menuViewCar":
                        var maskObj = {"maskenIcon": self.parent,"errorRefresh":self}
                        self.loadData(maskObj,url);
                        break
                }
            }
        },
        "refresh":function(){
            var self = this;
            var sucee = function(data){
                self.setData(data);
            }
            myRequest(self.maskObj,self.url,sucee)
        },

        "loadData":function(maskObj,url){
            var self = this;
            self.url  = url;
            self.maskObj = maskObj;
            self.cacheTimer= setTimeout(function(){
                self.refresh();
            },self.isCacheTplTime)
        },
        "itemChange":function(index){
            var self = this;
            if(self.cars){
                self.cars.slide(index);
            }
        },
        "addActiveCls":function(index){
            var self= this;
            if(self.activeIndex == index){
                return
            }
            self._innerItemEle.eq(index).addClass(self.itemActiveCls )
            if($.isNumeric(self.activeIndex)){
                self._innerItemEle.eq(self.activeIndex).removeClass(self.itemActiveCls)
            }
            self.activeIndex = index;
            if(self.currentPage != (parseInt(index/4)+1) ){
                self.currentPage = (parseInt(index/4)+1)
                self._innerCars.flickable("segment",self.currentPage-1)
            }
        }
    }
