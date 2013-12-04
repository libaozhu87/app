function configNav(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}

function myNav_Com(config,topConfig){
    extend(this,component)
    this.class = "myNav";
    this.type = "myNav";
    this.html = "";
    this.headHtml = "";
    this._HeadCom = null;
    this._NavButtonEle = null;
    this._NavContentEle = null;
    this._NavTitleEle = null;
    this._NavPuginEle = null;
    this._NavHeadEle = null;
    this._NavHeadHtmlEle = null;
    this._TopConfig = null;
    this.cacheSys = false;
    this.initEvent = false;

    this._warpComManage = {};
    this._warpTitleManage ={};
    this._warpConfigManage = {};
    this._warpComIndex = 0;
    this.init(config,topConfig);
}
myNav_Com.idSeed = 0,
myNav_Com.prototype={
    constructor:myNav_Com,
    init:function(config,topConfig){
        var self = this;
        self.mySuper.init.call(this,config);
        self.config = config.config;
        dealConfigData(self);
        dealConfigLogoic(self);
        self.setNavTop(topConfig);
        self.dom.addClass("fontSize_normal");
        //self.dealEvent();
    },
    dealEvent:function(){
        var self = this;
        if(self.initEvent){
            setTimeout(function(){
                if(!self._NavContentEle){
                    self._NavContentEle = $("<div class='warpCon' style='width:100%;background-color: #ffffff'></div>");
                }
                self._NavContentEle.bind("show",function(){self.showEvent.call(self)});
                self._NavContentEle.bind("close",function(){self.closeEvent.call(self)});
            },200)
        }
    },
    showEvent:function(){
        var self = this;
        if(self.cacheSys){
            $.each(self.items,function(index,item){
                if(typeof  item.showEvent == "function"){
                    item.showEvent.call(item);
                }
            })
        }
    },
    closeEvent:function(){
        var self = this;
        if(self.cacheSys){
            $.each(self.items,function(index,item){
                if(typeof  item.closeEvent == "function"){
                    item.closeEvent.call(item);
                }
            })
        }
    },


    generateHtml:function(){
        var self = this;
        if(!this.dom){
            var myConStr = "";
            myConStr  = "<div class='myNav "+this.class+" ' id='"+this.id+" '><div class='myNavHead'><div class='backButton' id='myNav_backButton' ></div><div class='headText'></div><div class='myNavHeadHtml'>"+this.headHtml+"</div></div><div class='navCon' style='-webkit-box-flex:1;position:relative'>"+this.html+"</div></div>";
            self.dom = $(myConStr);
            self.dom.find(".backButton").bind("tapstart",function(event){
                self.itemtap.call(self,event)
            })
            self._NavPuginEle = self.dom.find(".navCon");
        }
    },
    add:function(components){
        var self = this;
        if($.isArray(components)&&components.length!=0){
            var itemsArr =[];
            if(!self._NavContentEle){
                self._NavContentEle = $("<div class='warpCon' style='width:100%;background-color: #ffffff'></div>");
            }
            $.each( components,function(index, item){
                item.parent = self
                itemsArr.push(item.dom)
            })
            self._NavContentEle.append(itemsArr);
            self.items =  self.items.concat(components)
        }else if(!$.isArray(components)){
            if(!self._NavContentEle){
                self._NavContentEle = $("<div class='warpCon'  style='width:100%;background-color: #ffffff'></div>");
            }
            self._NavContentEle.append(components.dom);
            self.items.push(components)
            self.parent = self
        }
        setTimeout(function(){
            self.generatePugin();
        },10)
    },
    generatePugin:function(){
        var self= this;
        if(self._NavContentEle){
            var puginFlage = self.flag||self.id;
            var puginOption = {};
            puginOption[puginFlage] = {
                "htmlEle":self._NavContentEle
            }
            $.MODE.addConfig("Pugin",puginOption);
            Pugin.show(puginFlage,self._NavPuginEle,"",true);
            self._warpComManage[self._warpComIndex ] = puginFlage;
            self._warpTitleManage[self._warpComIndex] =  self._TopConfig.comConfig.title;
            self._warpConfigManage[self._warpComIndex] = "comConfig";

        }
    },

    setNavTop:function(topConfig){
        this._TopConfig  = topConfig;
        this._NavHeadEle = topConfig.comConfig.dom = this.dom.find(".myNavHead");
        topConfig.comConfig = topConfig.comConfig||{}
         this.reSetNavTopOPtion(topConfig.comConfig);
        this._NavButtonEle.hide();
        this._HeadCom =  new toolBar_Com(configToolBar(topConfig));
    },
    reSetNavTopOPtion:function(topConfig){

        if(!this._NavHeadEle){
            this._NavHeadEle = this.dom.find(".myNavHead");
        }
          this._NavHeadEle.addClass(topConfig.class);

        if(!this._NavHeadHtmlEle){
            this._NavHeadHtmlEle =this.dom.find(".myNavHeadHtml") ;
        }
            this._NavHeadHtmlEle.html(topConfig.html);
        if(!this._NavButtonEle ){
            this._NavButtonEle = this.dom.find(".backButton")
        }
        var backButtonOption = topConfig.backButton;
        if(backButtonOption){
            if(backButtonOption.class){
                this._NavButtonEle.addClass(backButtonOption.class);
            }
        }
        if(!this._NavTitleEle){
            this._NavTitleEle = this.dom.find(".headText");
        }
        var title = topConfig.title;
        if(typeof  title =="string"){
            this._NavTitleEle.html(title);
        }


        var titleClass = topConfig.titleClass;
        if(titleClass){
            this._NavTitleEle.attr("class",titleClass);
        }
        return topConfig
    },





    setTitle:function(title){
        this._NavTitleEle.html(title);
    },
    addPush:function(flage,title,page,topConfig){
         var self = this;
         if(page){
             page.parent = self;
         }else{
           var page  = childPageManage[flage]||backParPageManage[flage];
           page.parent = self;
         }
        topConfig = topConfig||"children";
        if(topConfig!= self._warpConfigManage[self._warpComIndex-1]){
            if(self._TopConfig[topConfig]){
                self.reSetNavTopOPtion(self._TopConfig[topConfig]);
            }


        }
        var showflage = Pugin.show(flage,self._NavPuginEle);
         if(showflage){
             setTimeout(function(){
                 self._NavButtonEle.show();
             },600)
             //self._NavButtonEle.show();
         }
         if(typeof title == "string"){
            self.setTitle(title);
         }
        self._warpComIndex++
        self._warpComManage[self._warpComIndex ] = flage;
        self._warpTitleManage[self._warpComIndex] = title||null;
        self._warpConfigManage[self._warpComIndex] = topConfig;
    },
    pop:function(){
        var self= this;
        if(self._warpComIndex>0){
            self._warpComIndex--;
            if(self._warpConfigManage[self._warpComIndex+1]!=self._warpConfigManage[self._warpComIndex]){
                self.reSetNavTopOPtion(self._TopConfig[self._warpConfigManage[self._warpComIndex]]);
            }
            if(self._warpTitleManage[self._warpComIndex+1]!=self._warpTitleManage[self._warpComIndex]){
                var title = self._warpTitleManage[self._warpComIndex];
                if(typeof title == "string"){
                    self.setTitle(title);
                }
            }
            if(self._warpConfigManage[self._warpComIndex+1]!=self._warpConfigManage[self._warpComIndex]){
                var topConfig = self._warpConfigManage[self._warpComIndex];
                if(self._TopConfig[topConfig]){
                    self.reSetNavTopOPtion(self._TopConfig[topConfig]);
                }
            }

            var flage =  Pugin.show(self._warpComManage[self._warpComIndex] ,self._NavPuginEle);



            delete  self._warpComManage[self._warpComIndex+1];
            delete self._warpTitleManage[self._warpComIndex+1];
            delete self._warpConfigManage[self._warpComIndex+1];



            if( self._warpComIndex ==0&&flage){

                //setTimeout(function(){
                    self._NavButtonEle.hide();
                //},600)

            }
        }
    },
    reset:function(){
        var self= this;
        var puginFlage = self.flag||self.id;
        Pugin.show(puginFlage,self._NavPuginEle);
        self._warpComManage = {};
        self._warpComIndex = 0;
        self._warpComManage[self._warpComIndex ] = puginFlage;
        //setTimeout(function(){
            self._NavButtonEle.hide();
        //},600)

    },
    itemtap:function(event){
        var self = this;
        var id =event.target.id;
        switch (id){
            case "myNav_backButton":
                self.pop();
                break
        }
    }

}