Class('App.Widget.Root', {
    
    isa : Ext.Viewport,
    
    does : 'Symbie.Widget.Root',
    
    use : [ 'App.Router' ],
    
    
    has : {
        routerClass : Joose.FutureClass('App.Router'),
        
        title : 'Symbie test application',
        
        layout : 'card'
    }
    
    
})