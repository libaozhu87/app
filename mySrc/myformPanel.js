
function configFormPanel(navConfig){
    var res = {};
    res = setConfig(navConfig);
    return res;
}
function myformPanel_Com(config){
    extend(this,component)
    this.class = "myformPanel";
    this.type = "myformPanel";
    this.inputValue = {};
    this._innerInput = null;
    this._innerArea = null;
    this.init(config);
}
myformPanel_Com.idSeed = 0,
    myformPanel_Com.prototype={
        constructor:myformPanel_Com,
        init:function(config){
            var self = this;
            self.mySuper.init.call(this,config);
            self.config = config.config;
            dealConfigData(self);
            dealConfigLogoic(self);
            self.dealDomClick();
        },
        dealDomClick:function(){
            var self = this;
            if(self.config.domTap&&self.dom){
                self.dom.bind("tapstart",function(event){
                    self.config.domTap.call(self,event)
                })
            }


        },
        setValues:function(obj){
            var self = this;
            var res = {};
            self._innerInput = self.dom.find("input[name]");
            self._innerArea =self.dom.find("textarea");
            if(self._innerInput){
                $.each(self._innerInput,function(index,items){
                    var name = $(items).attr("name")
                    $(items).val(obj[name]);
                });
            }
            if(self._innerArea){
                $.each(self._innerArea,function(index,items){
                    var name = $(items).attr("name");
                    $(items).val(obj[name]);
                });
            }
        },


        getValues:function(){
            var self = this;
            var res = {};
            self._innerInput = self.dom.find("input[name]");
            self._innerArea =self.dom.find("textarea");
            if(self._innerInput){
                $.each(self._innerInput,function(index,items){
                    var name = $(items).attr("name")
                    if(name){
                        res[name] = $(items).val();
                    }
                });
            }
            if(self._innerArea){
                $.each(self._innerArea,function(index,items){
                    var name = $(items).attr("name")
                    if(name){
                        res[name] = $(items).val();
                    }
                });
            }



            return res;
        },
        disable:function(){
            var self = this;
            self._innerInput = self.dom.find("input[name]");
            self._innerArea =self.dom.find("textarea");
            if(self._innerInput){
                $.each(self._innerInput,function(index,items){
                    $(items).attr("readonly","readonly");
                });
            }
            if(self._innerArea){
                $.each(self._innerArea,function(index,items){
                    $(items).attr("readonly","readonly");
                });
            }

        },
        enable:function(){
            var self = this;
            self._innerInput = self.dom.find("input[name]");
            self._innerArea =self.dom.find("textarea");
            if(self._innerInput){
                $.each(self._innerInput,function(index,items){
                    $(items).removeAttr("readonly");
                });
            }
            if(self._innerArea){
                $.each(self._innerArea,function(index,items){
                    $(items).removeAttr("readonly");
                });
            }

        },

        reset:function(){
            var self = this;
            if(self._innerInput){
                $.each(self._innerInput,function(index,items){
                    $(items).val("");
                });
            }
            if(self._innerArea){
                $.each(self._innerArea,function(index,items){
                    $(items).val("");
                });

            }



        }




    }
