/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src'
});
//</debug>
Ext.application({
    name: 'GS',

    requires: [
        'Ext.MessageBox',
        'Ext.Map',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
        'Ext.Toolbar',
    ],

    views: [
        'Main',
        'picShow.show',
        'mapShow.mainMapView',
        'picShow.mainPicView',
        'listShow.mainListView',
        'picShow.picContainer',
        'listShow.listInfo',
        'listShow.listContent'
    ],
    controllers:[
    'picController',
    ],
    models: [
        'picMode'
    ],
    stores:[
    'picStore',
    'listStore'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('GS.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});



/*var myApp = new Ext.application({
    name: 'myApp',
    launch: function () {
		
        var myPanel1 = new Ext.Panel({
            id: 'myPanel1',
            layout: 'vbox',
            html: 'Oh, this is Panel1!',
            items: {
                xtype: 'button',
                text: '前往Panel2',    
                handler: function(){
                    myApp.mainPanel.setActiveItem(    //设置活动项的方法
                        "#myPanel2", 
'slide'               //第一个参数为mypanel2的id 在这里也可以填数字 ‘1’
                                              //这个参数为切换效果
                    );
                }
            }
        });
        
        var myPanel2 = new Ext.Panel({
            id: 'myPanel2',
            layout: 'vbox',
			alias:'2myPane',
            html:  'This is Panel2!',
            items: {
                xtype: 'button',
                text: '前往Panel3',
                handler: function(){
                    
                    var pnl = new Ext.Panel({
                        html:'这个是点击按钮之后才创建的Panel,演示到此结束'
                    });
                    
                    myApp.mainPanel.setActiveItem(
                        pnl,{            //这里参数是刚创建的panel
                        type: 'slide',    //这里动画效果为一个动画效果对象
                        direction: 'right'
                    });
                }
            }
        });
        
        myApp.mainPanel = new Ext.Panel({
            fullscreen: true,
            layout: {type :'card',
			//animation:'slide'
			},
			
            items: [myPanel1, myPanel2]    //第一个为默认界面
        });
    }
});*/


/*Ext.application(
{
	name:"sencha",
	launch:function()
	{
		var button = Ext.create('Ext.Button', {
	      text: 'Button',
	      id: 'rightButton',
		  handler:function(){
			  pan.close();
			pan.showBy(this);
			  
			  
			  }
		 });
		var button1 = Ext.create('Ext.Button', {
	      text: 'Button1',
	      id: 'leftButton',
		  		  handler:function(){
			  pan.close();
			pan.showBy(this);
			  
			  
			  }
		  
		 });
		
		 Ext.create('Ext.Container', {
		     fullscreen: true,
			 layout:'hbox',
		     items: [
		         {
		              docked: 'top',
		              xtype: 'titlebar',
		              items: [
		                  button,
						  button1
		              ]
		          }
		     ]
		 });
		
		var pan =  Ext.create('Ext.Panel', {
		     html: 'Floating Panel',
		     left: 0,
		     padding: 10
		 });
		
	}
}
)*/

/*Ext.application(
{
	name:"sencha",
	launch:function()
	{
		
		Ext.create(
		"Ext.Carousel",
		{
			fullscreen:true,
			direction: 'vertical',
			defaults: {
		        styleHtmlContent: true
		    },
			items:[
			{
				xtype:"list",
				items:[
				{
					xtype:"toolbar",
					dock:"top",//????????????
					title:"列表哦"
				}
				],
				store:
				{
					fields:["name"],
					data:[
					{name:"陈乃共"}
					]
				},
				itemTpl:'name'
				
			},
			{
				html:"html1",
				style:"background-color:#00FF00"
			},
			{
				html:"html1",
				style:"background-color:#0000FF"
			}
			]
		}
		)
		
	}
}
)
*/
/*Ext.application({
    name: 'Sencha',

    launch: function() {
        // The whole app UI lives in this tab panel
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: true,
            tabBarPosition: 'bottom',//??????????????????????

            items: [
                // This is the home page, just some simple HTML
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    html: [
                        '<img height=260 src="http://staging.sencha.com/img/sencha.png" />',
                        '<h1>Welcome to Sencha Touch</h1>',
                        "<p>Building the Getting Started app.</p>",
                        '<h2>Sencha Touch</h2>'
                    ].join("")
                },

                // This is the recent blogs page. It uses a tree store to load its data from blog.json.
                {
                    xtype: 'nestedlist',
                    title: 'Blog',
                    iconCls: 'star',
                    cls: 'blog',
                    displayField: 'title',

                    store: {
                        type: 'tree',

                        fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
                            name: 'leaf',
                            defaultValue: true
                        }],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    }
                },

                // This is the contact page, which features a form and a button. The button submits the form.
                {
                    xtype: 'formpanel',
                    title: 'Contact Us',
                    iconCls: 'user',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: 'Email address is optional',

                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name',
                                    name: 'name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email',
                                    name: 'email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message',
                                    name: 'message',
                                    height: 90
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',

                            // The handler is called when the button is tapped
                            handler: function() {

                                // Look up the items stack and get a reference to the first form it finds
                                var form = this.up('formpanel');

                                // Send an AJAX request with form data to the URL for contact.php
                                // Call the success callback if we get a non-error response from the server
                                form.submit({
                                    success: function() {
                                        // Run the callback function when a user taps the OK button
                                        Ext.Msg.alert('Thank You', 'Your message has been received', function() {
                                            form.reset();
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        });
    }
});*/


/*Ext.application({
    name: 'Sencha',

    launch: function() {
        Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            items: [
                {
                    title: 'Home',
                    iconCls: 'home',
                    html: 'Welcome'
                }
            ]
        });
    }
});*/






