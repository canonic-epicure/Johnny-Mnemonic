Class('App.Widget.Home', {
    
    isa : 'Symbie.Widget.Container',
    
    
    methods : {
        
        onClick : function () {
            this.dispatch('/sample').now()
        }
    },

    
    after : {
        
        onRender : function () {
            this.el.update('App.Widget.Home')
            
            this.el.on('click', this.onClick, this)
        }
        
    }    
})