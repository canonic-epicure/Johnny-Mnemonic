Class('App.Widget.Sample', {
    
    xtype : 'app-widget-sample',
    
    isa : 'Symbie.Widget.Container',
    
    
    id : {
        pkField : null
    },
    
    
    has : {
        slots       : true,
        
        attr1       : 'value1'
    },
    
    
    methods : {
        
        onClick : function () {
            this.dispatch('/home').now()
        }
    },

    
    after : {
        
        onRender : function () {
            this.el.update('App.Widget.Sample')
            
            this.el.on('click', this.onClick, this)
        }
        
    }
    
})