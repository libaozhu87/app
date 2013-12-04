/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 上午9:14
 * To change this template use File | Settings | File Templates.
 */
function component(){
    this.width = 0;
    this.height =0;
    this.type = "component";
    this.html ="";
    this.class = "";
    this.id = "";
    this.dom = null;
    this.items = [];
    this.mySuper = null;
    this.mySub = null;
    this.parent = null;
    this.flex= 0;
    this.style={};
    this.flag = "";
    this.layout = null;
    this.scrollable = false;
    this.config = {};
    this.loadingIconEle = null;
    this.loadingErrorEle = null;
    this.emptyText = "";

}
component.idSeed = 0
component.prototype={
    init:function(config){
        var self = this;
        config =config||{}
        applyFilter(this,config);
        self.generateId(config.id);
        self.generateHtml();
        self.setBaseCls();
    },
    generateId:function(id){
        var self = this;
        (id)?(self.id = id):(self.id = (self.type)+(self.constructor.idSeed));
         self.constructor.idSeed++;
    },
    add:function (components){
        var self = this;
        if($.isArray(components)){
            var itemsArr =[];
            $.each( components,function(index, item){
                itemsArr.push(item.dom)
                item.parent = self
            })
            self.dom.append(itemsArr);
            self.items = self.items.concat(components)
        }else{
            self.dom.append(components.dom);
            self.items.push(components);
            components.parent = self;
        }
    },
    showLoading :function(){
        var self = this;
        if(!self.loadingIconEle){
            self.loadingIconEle = self.dom.children(".loadingIcon");
        }
        var pos = {}
        pos.left = "43%";
        pos.top = "43%";
        self.loadingIconEle.css(pos);
        self.loadingIconEle.show();
    },

    hideLoading:function(){
        var self = this;
        if(self.loadingIconEle){
            self.loadingIconEle.hide();
        }

    },
    showErrorHtml:function(msg,refreshObj){
       var self = this;
        if(!self.loadingErrorEle){
            self.loadingErrorEle = self.dom.children(".loadingError");
        }
        var pos = {}
        pos.top = (deviceHeight/2 - 50);
        pos.left ="5em";
        pos.zIndex = 20;
        self.loadingErrorEle.css(pos);
        self.loadingErrorEle.show();
        self.loadingErrorEle.html(msg);
        self.loadingErrorEle.one("tapstart",function(){
            if(typeof refreshObj.refresh == "function"){
                if(refreshObj){
                    refreshObj.refresh.call(refreshObj);
                }else{
                    self.refresh.call(self);
                }
                self.loadingErrorEle.hide();
            }
            return false
        })
    },
    clearData:function(){
        var self = this;
        if(self.loadingErrorEle&&self.loadingErrorEle.html()){
            self.loadingErrorEle.html("");
        }
    },
    showNoInfoHtml:function(){
        var self = this;
        if(!self.loadingErrorEle){
            self.loadingErrorEle = self.dom.children(".loadingError");
        }
        if(self.emptyText){
            self.loadingErrorEle.html("");
            self.loadingErrorEle.show();
            self.loadingErrorEle.html(self.emptyText);
        }
    },
    hideErrorHtml:function(){
        var self = this;
        if(self.loadingErrorEle){
            self.loadingErrorEle.hide();
           // self.loadingErrorEle.unbind("click");
        }
    },
    addEle:function(items){
        var self = this;
        self.dom.append(items);
    },
    generateHtml:function(){
        if(!this.dom){
            var myConStr = "";
            myConStr = "<div class='"+this.class+" ' id='"+this.id+" '>"+this.html +"<div  class='loadingIcon'></div><a src='#' class = 'loadingError'></a></div>";
            this.dom = $(myConStr)
        }
    },
    isType:function(type){
        if(type == this.type){
            return true;
        }
        return false;
    },
    setBaseCls:function (){
        var self = this;
        var cssOption = {};
        if(self.width){
            cssOption.width = self.width;
        }
        if(self.height){
            cssOption.height = self.height;
        }
        if(self.flex){
           //cssOption.webkitBoxFlex = self.flex
            self.dom[0].style.webkitBoxFlex = self.flex;
            cssOption.height = "100%";
        }
        if(self.layout){
            switch(self.layout){
                case "vbox":
                    cssOption.webkitBoxOrient = "vertical";
                    cssOption.display = "-webkit-box";
                    break;
                case "hbox":
                    cssOption.webkitBoxOrient = "horizontal";
                    cssOption.display = "-webkit-box";
                    break;
            }
        }
        if( self.scrollable){
            cssOption.overflowY ="auto";
        }
        //添加白色默认呢背景
        cssOption.backgroundColor = "#fff";
/*        cssOption.left = "0px";
        cssOption.top = "0px";*/
        if(self.style){
            cssOption  =  applyFilter(self.style,cssOption);
        }
        self.dom.css(cssOption)
    },
    down:function(type){
        var self = this;
        var com = null;
        if(self.items.length!=0){
            $.each(self.items,function(index,item){
                if(item.type == type){
                    com = item;
                    return com
                }
            })
        }
        return com
    },
    show:function(){
        var self = this;
        if(self.dom){
            self.dom.show();
        }
    },
    hide:function(){
        var self = this;
        if(self.dom){
            self.dom.hide();
        }
    },
    setAttribute:function(obj){
        var self = this;
        for(var key in obj){
            self[key] = obj[key];
        }
    }
}