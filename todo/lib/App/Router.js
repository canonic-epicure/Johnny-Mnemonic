Class('App.Router', {
    
    isa : 'Symbie.Router',
    
    
    routes : {
        
        home : {
            mapTo : '/home',
            
            via : function (context, root) {
                //root == this, btw
                
                var layout = root.findOrCreate('App.Layout.Site')
                
                layout.slot('header').findOrCreate('App.Widget.Header', {
                    headerPk : 1
                })
                
                layout.slot('center').findOrCreate('App.Widget.Home')
                
                layout.slot('footer').findOrCreate('App.Widget.Footer', {
                    footerPk : 1
                })
            } 
        },
        
        
        index : {
            mapTo : '/',
            
            via : function (context, root) {
                root.collectFrom('home')
            }
        },
        
        
        sample : {
            mapTo : '/sample',
            
            via : function (context, root) {
                var layout = root.findOrCreate('App.Layout.Site')
                
                layout.slot('header').findOrCreate('App.Widget.Header', {
                    headerPk : 1
                })
                
                layout.slot('center').findOrCreate('App.Widget.Sample', {
                    pkField : 1
                })
                
                layout.slot('footer').findOrCreate('App.Widget.Footer', {
                    footerPk : 1
                })
            }
        },
        
        
        mainLayout : {
            via : function (context, root) {
                var layout = root.findOrCreate('App.Layout.Site')
                
                layout.slotAndMark('header').findOrCreate('App.Widget.Header', {
                    headerPk : 1
                })
                
                layout.slot('center').mark('center')
                
                layout.slotAndMark('footer')
            }
        },
        
        
        home2 : {
            mapTo : '/home2',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('App.Widget.Home')
                
                context.getMark('footer').findOrCreate('App.Widget.Footer', {
                    footerPk : 1
                })
            }
        }
        
    }
    //eof routes
       
})
