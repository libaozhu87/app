function configCars(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function myCars_Com(config){
    extend(this,component);
    this._innerCars = null;
    this._innerCarsEle = null;
    this._innerDecorate = null;
    this._decorateLen = null;
    this.decorateHtml = null;
    this.decorateCls = null;
    this.decorateFun = null;
    this.isCacheTplTime = 0;
    this.init(config);
}
myCars_Com.idSeed = 0,
myCars_Com.prototype={
    constructor:myCars_Com,
    init:function(config){
        var self = this;
        self.class = "myCars";
        this.type = "myCars";
        self.mySuper.init.call(this,config);
        self.config = config.config||{};
        dealConfigData(self);
        dealConfigLogoic(self);
        if(self.items.length!=0){
            self.startCars()
        }
    },
    generateHtml:function(){
        if(!this.dom){
            var myConStr = "";
            myConStr =  "<div class='"+this.class+" ' id='"+this.id+" '><div class = 'swipe '><div class='swipe-wrap'></div></div><div class='decorate "+this.decorateCls+"'></div>"+this.html+"<div  class='loadingIcon'></div><a src='#' class = 'loadingError'></a></div>";
            this.dom = $(myConStr)
        }
    },
    setCarsOption:function(config){
        var self = this;
        var option = {};
        option.startSlide = config.startSlide||0;
        option.speed  = config.speed ||300;
        option.auto  = config.auto ||0;
       /* option.continuous  = config.continuous &&true;*/
        option.continuous  = false;
        option.isTouch = config.isTouch;
        option.stopPropagation  = config.stopPropagation ||true;
        option.callback  = config.callback ||function(index, element) {
            if(self._innerDecorate){
                self._innerDecorate.eq(index).addClass("activity_decorate").siblings().removeClass("activity_decorate")
            }
            if(typeof self.decorateFun == "function"){
                self.decorateFun(index);

            }

        };
        option.transitionEnd  = config.transitionEnd ||function(index, element) {

        };
        return option;
    },
    setDecorateFun:function(fun){
        self.decorateFun = fun;
    },
    closeEvent:function (){
        var self = this;
        if(self.isCacheTplTime&&self.items){
            setTimeout(function(){
                if(self._innerCarsEle){
                    self.dom.hide();
                    //self._innerDecorate.hide();
                }

                /*                    self.cars.isCacheTplTime =self.isCacheTplTime;
                 self.cars.closeEvent.call(self.cars);*/
            },self.isCacheTplTime)

/*            if(self.items.length!=0){
                $.each(self.items,function(index,item){
                    item.isCacheTplTime = self.isCacheTplTime + (index*100);
                    if(typeof item.closeEvent == "function" )
                        item.closeEvent.call(item);
                })
            }*/
        }
    },
    "showEvent":function(){
        var self = this;
        if(self.isCacheTplTime&&self.items){
            self.showLoading();
            setTimeout(function(){
                self.hideLoading();
                if(self._innerCarsEle){
                    //self.dom.show();
     /*               self._innerCarsEle.show();
                    self._innerDecorate.show();*/
                }
                /*
                 self.cars.isCacheTplTime =self.isCacheTplTime;
                 self.cars.showEvent.call(self.cars);*/
            },self.isCacheTplTime)


/*            if(self.items.length!=0){
                $.each(self.items,function(index,item){
                    item.isCacheTplTime = self.isCacheTplTime + (index*100);
                    if(typeof item.showEvent == "function" )
                     item.showEvent.call(item);
                })
            }*/
        }

    },


    setItems:function(){
        var self = this;
        if(self.items){
            if($.isArray(self.items)){
                var itemsArr =[];
                $.each( self.items,function(index, item){
                    itemsArr.push(item.dom)
                    item.parent = self;
                })
                self.dom.find(".swipe-wrap").append(itemsArr);
            }else{
                self.dom.find(".swipe-wrap").append(self.items.dom);
                self.items.parent = self
            }
        }
    },
    startCars:function(){
        var self = this;
        self.setItems();
        self._innerCarsEle = self.dom.find(".swipe");
        setTimeout(function(){

            self._innerCars = new Swipe(self._innerCarsEle[0], self.setCarsOption(self.config));
            if($.isArray(self.items)&&self.decorateHtml){
                self._decorateLen = self.items.length;
                var str = "";
                for(var i = 0;i< self._decorateLen;i++){
                    str +=self.decorateHtml;
                }
                self._innerDecorate = $(str);
                self.dom.find(".decorate").append(self._innerDecorate);
                self._innerDecorate.eq(0).addClass("activity_decorate");
            }
        },100)
    },
    add:function(item){
        var self = this;
        self.items = item;
        self.startCars()
        //self.items = self.items.concat(item)
    },
    slide:function(index, duration){
        var self = this;
        duration = duration||400;
        self._innerCars.slide(index,duration);

    }






}