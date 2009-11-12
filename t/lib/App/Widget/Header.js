Class('App.Widget.Header', {
    
    xtype : 'app-widget-header',
    
    isa : 'Symbie.Widget.Container',
    
    
    id : {
        headerPk : null
    },
    
    
    has : {
        slots       : true
    },

    
    after : {
        
        onRender : function () {
            this.el.update('Header')
        }
        
    }
    
})