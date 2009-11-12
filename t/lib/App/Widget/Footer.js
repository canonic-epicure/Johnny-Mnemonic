Class('App.Widget.Footer', {
    
    xtype : 'app-widget-footer',
    
    isa : 'Symbie.Widget.Container',
    
    
    id : {
        footerPk : null
    },
    
    
    has : {
        slots       : true
    },

    
    after : {
        
        onRender : function () {
            this.el.update('Footer')
        }
        
    }
    
})